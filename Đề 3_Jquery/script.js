let filteredData = [...data];

function renderTable() {
  let html = "";
  filteredData.forEach((item) => {
    html += `
      <tr>
        <td><input type="checkbox" class="row-check" data-id="${item.id}"></td>
        <td>${item.hoDem}</td>
        <td>${item.ten}</td>
        <td>${item.diaChi}</td>
        <td>
          <span class="toggle-hoatdong text-primary" data-id="${item.id}" style="cursor:pointer;">
            ${item.hoatDong ? "✔" : "✖"}
          </span>
        </td>
      </tr>
    `;
  });
  $("#dataTable").html(html);
}

$(document).ready(function () {
  // Tìm kiếm theo tên
  $("#searchInput").on("input", function () {
    const keyword = $(this).val().toLowerCase();
    filteredData = data.filter(item => item.ten.toLowerCase().includes(keyword));
    renderTable();
  });

  // Toggle hoạt động ✔ ↔ ✖
  $("#dataTable").on("click", ".toggle-hoatdong", function () {
    const id = $(this).data("id");
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
      data[index].hoatDong = !data[index].hoatDong;
      filteredData = [...data];
      renderTable();
    }
  });

  // Submit thêm nhân viên
  $("#addForm").submit(function (e) {
    e.preventDefault();

    const ten = $("#ten").val().trim();
    const hoDem = $("#hoDem").val().trim();
    const diaChi = $("#diaChi").val().trim();

    let isValid = true;
    $(".text-danger").text("");

    if (!ten) {
      $("#errorTen").text("Tên không được để trống.");
      isValid = false;
    } else if (ten.length > 15) {
      $("#errorTen").text("Tên không vượt quá 15 ký tự.");
      isValid = false;
    }

    if (!hoDem) {
      $("#errorHoDem").text("Họ đệm không được để trống.");
      isValid = false;
    } else if (hoDem.length > 20) {
      $("#errorHoDem").text("Họ đệm không vượt quá 20 ký tự.");
      isValid = false;
    }

    if (!diaChi) {
      $("#errorDiaChi").text("Địa chỉ không được để trống.");
      isValid = false;
    } else if (diaChi.length > 50) {
      $("#errorDiaChi").text("Địa chỉ không vượt quá 50 ký tự.");
      isValid = false;
    }

    if (!isValid) return;

    data.push({
      id: Date.now(),
      ten,
      hoDem,
      diaChi,
      hoatDong: true
    });

    filteredData = [...data];
    renderTable();
    $("#addModal").modal("hide");
    this.reset();
  });

  // Xoá các dòng đã chọn
  $("#deleteSelected").click(function () {
    const checked = $(".row-check:checked");
    if (checked.length === 0) {
      alert("Vui lòng chọn ít nhất một dòng để xoá.");
      return;
    }

    if (confirm("Bạn có chắc chắn muốn xoá các dòng đã chọn?")) {
      const ids = checked.map(function () {
        return $(this).data("id");
      }).get();

      data = data.filter(item => !ids.includes(item.id));
      filteredData = [...data];
      renderTable();
    }
  });

  $("#selectAll").change(function () {
    $(".row-check").prop("checked", this.checked);
  });

  renderTable();
});
