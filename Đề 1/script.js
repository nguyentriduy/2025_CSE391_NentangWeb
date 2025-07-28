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

  function validateForm(name, email, phone) {
    let valid = true;
    document.getElementById("nameError").textContent = name ? "" : "Vui lòng nhập họ tên";
    document.getElementById("emailError").textContent = email ? "" : "Vui lòng nhập email";

    const phoneRegex = /^0\\d{9}$/;
    if (!phone) {
      document.getElementById("phoneError").textContent = "Vui lòng nhập số điện thoại";
      valid = false;
    } else if (!phoneRegex.test(phone)) {
      document.getElementById("phoneError").textContent = "SĐT phải có 10 chữ số và bắt đầu bằng 0";
      valid = false;
    } else {
      document.getElementById("phoneError").textContent = "";
    }

    return name && email && valid;
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!validateForm(name, email, phone)) return;

    employees.push({ name, email, address, phone });
    renderEmployees();
    form.reset();
    bootstrap.Modal.getInstance(document.getElementById("addModal")).hide();
  });

  renderEmployees();
});
