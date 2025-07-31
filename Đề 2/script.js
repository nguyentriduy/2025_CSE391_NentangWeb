document.addEventListener("DOMContentLoaded", function () {
  function renderTable() {
    const tbody = document.getElementById("dataTable");
    tbody.innerHTML = "";
    data.forEach((item) => {
      tbody.innerHTML += `
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
      `;
    });

    // Xoá 1 dòng
    document.querySelectorAll(".btn-delete-one").forEach(button => {
      button.addEventListener("click", function () {
        const id = parseInt(this.dataset.id);
        if (confirm("Bạn có chắc muốn xoá dòng này?")) {
          data = data.filter(item => item.id !== id);
          renderTable();
        }
      });
    });

    // Checkbox chọn tất cả
    const selectAll = document.getElementById("selectAll");
    if (selectAll) {
      selectAll.addEventListener("change", function () {
        const isChecked = this.checked;
        document.querySelectorAll(".row-check").forEach(cb => {
          cb.checked = isChecked;
        });
      });
    }
  }

  // Thêm mới bản ghi
  document.getElementById("addForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const khachHang = document.getElementById("khachHang").value.trim();
    const nhanVien = document.getElementById("nhanVien").value.trim();
    const soTien = parseInt(document.getElementById("soTien").value.trim());

    if (!khachHang || !nhanVien || isNaN(soTien)) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (khachHang.length > 30 || nhanVien.length > 30) {
      alert("Tên không được vượt quá 30 ký tự.");
      return;
    }

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
    document.getElementById("addForm").reset();
    bootstrap.Modal.getInstance(document.getElementById("addModal")).hide();
  });

  // Xoá nhiều dòng
  document.getElementById("deleteSelected").addEventListener("click", () => {
    const checkedBoxes = document.querySelectorAll(".row-check:checked");
    if (checkedBoxes.length === 0) {
      alert("Vui lòng chọn ít nhất một bản ghi để xoá.");
      return;
    }

    if (confirm("Bạn có chắc muốn xoá các dòng đã chọn?")) {
      const idsToDelete = Array.from(checkedBoxes).map(cb => parseInt(cb.dataset.id));
      data = data.filter(item => !idsToDelete.includes(item.id));
      renderTable();
    }
  });

  renderTable();
});
