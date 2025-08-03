document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("employeeTableBody");
  const form = document.getElementById("employeeForm");

  function renderEmployees() {
    tableBody.innerHTML = "";
    employees.forEach(emp => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="text-center"><input type="checkbox" /></td>
        <td class="text-start">${emp.name}</td>
        <td class="text-start">${emp.email}</td>
        <td class="text-start">${emp.address}</td>
        <td class="text-center">${emp.phone}</td>
        <td class="text-center">
          <i class="fas fa-pencil-alt text-warning me-2" role="button"></i>
          <i class="fas fa-trash-alt text-danger" role="button"></i>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  function validateForm(name, email, address, phone) {
    let valid = true;

    // Xóa lỗi cũ
    $(".text-danger").text("");
    $(".form-control").removeClass("is-invalid");
    $("#addressError").remove();

    // Họ tên
    if (!name) {
      $("#nameError").text("Vui lòng nhập họ tên.");
      $("#name").addClass("is-invalid");
      valid = false;
    } else if (name.length > 30) {
      $("#nameError").text("Họ tên không được vượt quá 30 ký tự.");
      $("#name").addClass("is-invalid");
      valid = false;
    } else if (!/[a-zA-ZÀ-ỹà-ỹ\s]/.test(name)) {
      $("#nameError").text("Họ tên phải có ý nghĩa (chứa chữ cái).");
      $("#name").addClass("is-invalid");
      valid = false;
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      $("#emailError").text("Vui lòng nhập email.");
      $("#email").addClass("is-invalid");
      valid = false;
    } else if (!emailRegex.test(email)) {
      $("#emailError").text("Email không đúng định dạng.");
      $("#email").addClass("is-invalid");
      valid = false;
    }

    // Địa chỉ
    if (!address) {
      $("#address").addClass("is-invalid");
      $("#address").after('<div class="text-danger small" id="addressError">Vui lòng nhập địa chỉ.</div>');
      valid = false;
    }

    // Số điện thoại
    const phoneRegex = /^\d+$/;
    if (!phone) {
      $("#phoneError").text("Vui lòng nhập số điện thoại.");
      $("#phone").addClass("is-invalid");
      valid = false;
    } else if (!phoneRegex.test(phone)) {
      $("#phoneError").text("Số điện thoại chỉ được chứa chữ số.");
      $("#phone").addClass("is-invalid");
      valid = false;
    }

    return valid;
  }

  form.addEventListener("submit", e => {
    e.preventDefault();

    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const address = $("#address").val().trim();
    const phone = $("#phone").val().trim();

    if (!validateForm(name, email, address, phone)) return;

    employees.push({ name, email, address, phone });
    renderEmployees();
    form.reset();

    // Xóa lỗi sau khi submit thành công
    $(".form-control").removeClass("is-invalid");
    $(".text-danger").text("");
    $("#addressError").remove();
    bootstrap.Modal.getInstance(document.getElementById("addModal")).hide();
  });

  // Xoá lỗi khi người dùng bắt đầu nhập lại
  $("#name, #email, #address, #phone").on("input", function () {
    $(this).removeClass("is-invalid");
    $(this).next(".text-danger").text("");
    if (this.id === "address") {
      $("#addressError").remove();
    }
  });

  renderEmployees();
});
