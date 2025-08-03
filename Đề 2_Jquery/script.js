$(document).ready(function () {
  function renderTable() {
    const $tbody = $("#dataTable");
    $tbody.empty();

    $.each(data, function (index, item) {
      $tbody.append(`
        <tr data-id="${item.id}">
          <td><input type="checkbox" class="row-check" data-id="${item.id}"></td>
          <td>
            <button class="btn btn-danger btn-sm me-1 btn-delete-one" data-id="${item.id}">✕</button>
            <button class="btn btn-warning btn-sm me-1">✎</button>
            <button class="btn btn-info btn-sm">👁️</button>
          </td>
          <td>${item.id}</td>
          <td>${item.khachHang}</td>
          <td>${item.nhanVien}</td>
          <td>${item.soTien.toLocaleString()} đ</td>
          <td>${item.ngayMua}</td>
        </tr>
      `);
    });

    $(".btn-delete-one").on("click", function () {
      const id = parseInt($(this).data("id"));
      if (confirm("Bạn có chắc muốn xoá dòng này?")) {
        data = data.filter(item => item.id !== id);
        renderTable();
      }
    });

    $("#selectAll").off("change").on("change", function () {
      const isChecked = $(this).is(":checked");
      $(".row-check").prop("checked", isChecked);
    });
  }

  // Thêm mới có validate hiển thị lỗi dưới input
  $("#addForm").on("submit", function (e) {
    e.preventDefault();

    const khachHang = $("#khachHang").val().trim();
    const nhanVien = $("#nhanVien").val().trim();
    const soTienStr = $("#soTien").val().trim();

    let isValid = true;

    // Xóa các thông báo lỗi cũ
    $("#errorKhachHang").text("");
    $("#errorNhanVien").text("");
    $("#errorSoTien").text("");

    // Validate khách hàng
    if (!khachHang) {
      $("#errorKhachHang").text("Khách hàng không được để trống.");
      isValid = false;
    } else if (khachHang.length > 20) {
      $("#errorKhachHang").text("Khách hàng không được vượt quá 50 ký tự.");
      isValid = false;
    }

    // Validate nhân viên
    if (!nhanVien) {
      $("#errorNhanVien").text("Nhân viên không được để trống.");
      isValid = false;
    } else if (nhanVien.length > 20) {
      $("#errorNhanVien").text("Nhân viên không được vượt quá 50 ký tự.");
      isValid = false;
    }

    // Validate số tiền
    const soTien = parseInt(soTienStr);
    if (!soTienStr) {
      $("#errorSoTien").text("Số tiền không được để trống.");
      isValid = false;
    } else if (isNaN(soTien) || !/^\d+$/.test(soTienStr)) {
      $("#errorSoTien").text("Số tiền phải là số nguyên dương.");
      isValid = false;
    }

    if (!isValid) return;

    const ngay = new Date();
    const day = ngay.getDate().toString().padStart(2, '0');
    const month = ngay.getMonth() + 1;
    const year = ngay.getFullYear();
    const hours = ngay.getHours();
    const minutes = ngay.getMinutes().toString().padStart(2, '0');
    const ngayMua = `${day} Tháng ${month} ${year} ${hours}:${minutes}`;

    data.push({
      id: Math.floor(1000 + Math.random() * 9000),
      khachHang,
      nhanVien,
      soTien,
      ngayMua
    });

    renderTable();
    $("#addForm")[0].reset();
    bootstrap.Modal.getInstance($("#addModal")[0]).hide();
  });

  $("#deleteSelected").on("click", function () {
    const checkedBoxes = $(".row-check:checked");
    if (checkedBoxes.length === 0) {
      alert("Vui lòng chọn ít nhất một bản ghi để xoá.");
      return;
    }

    if (confirm("Bạn có chắc muốn xoá các dòng đã chọn?")) {
      const idsToDelete = checkedBoxes.map(function () {
        return parseInt($(this).data("id"));
      }).get();

      data = data.filter(item => !idsToDelete.includes(item.id));
      renderTable();
    }
  });

  renderTable();
});
