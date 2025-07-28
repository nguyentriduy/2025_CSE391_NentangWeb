let selectedRow = null;

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formSinhVien");
  const btnThem = document.getElementById("btnThem");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const maSV = document.getElementById("StudentID").value.trim();
    const hoTen = document.getElementById("StudentName").value.trim();
    const email = document.getElementById("StudentEmail").value.trim();
    const dob = document.getElementById("StudentDoB").value;
    const genderInput = document.querySelector('input[name="StudentGender"]:checked');
    const gender = genderInput ? genderInput.value : "";

    if (!maSV || !hoTen || !email || !gender) {
      alert("Vui lòng nhập đầy đủ thông tin bắt buộc.");
      return;
    }

    const regexEmail = /^\S+@\S+\.\S+$/;
    if (!regexEmail.test(email)) {
      alert("Email không hợp lệ.");
      return;
    }

    if (selectedRow === null) {
      themSinhVien(maSV, hoTen, email, gender, dob);
      hienThongBao("Thêm sinh viên thành công!");
    } else {
      capNhatSinhVien(maSV, hoTen, email, gender, dob);
      hienThongBao("Cập nhật sinh viên thành công!");
    }

    form.reset();
    selectedRow = null;
    btnThem.textContent = "Thêm sinh viên";
  });

  // ✅ Event Delegation cho nút Sửa / Xoá
  document.querySelector("table tbody").addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
      const btn = e.target;
      const action = btn.textContent.trim();

      if (action === "Xoá") {
        xoaDong(btn);
      } else if (action === "Sửa") {
        suaDong(btn);
      }
    }
  });
});

function themSinhVien(maSV, hoTen, email, gender, dob) {
  const table = document.querySelector("table tbody");
  const newRow = table.insertRow();

  newRow.insertCell(0); // STT
  newRow.insertCell(1).innerText = maSV;
  newRow.insertCell(2).innerText = hoTen;
  newRow.insertCell(3).innerText = email;
  newRow.insertCell(4).innerText = gender;
  newRow.insertCell(5).innerText = dinhDangNgay(dob);
  newRow.insertCell(6).innerHTML = `
    <button class="btn btn-sm btn-warning me-1">Sửa</button>
    <button class="btn btn-sm btn-danger">Xoá</button>
  `;

  capNhatSTT();
}

function xoaDong(btn) {
  if (confirm("Bạn có chắc chắn muốn xoá?")) {
    btn.closest("tr").remove();
    capNhatSTT();
    console.log("Đã gọi thông báo xoá!");
    hienThongBao("Xoá sinh viên thành công!");
  }
}

function suaDong(btn) {
  selectedRow = btn.closest("tr");

  document.getElementById("StudentID").value = selectedRow.cells[1].innerText;
  document.getElementById("StudentName").value = selectedRow.cells[2].innerText;
  document.getElementById("StudentEmail").value = selectedRow.cells[3].innerText;
  document.getElementById("StudentDoB").value = chuyenDoiNgay(selectedRow.cells[5].innerText);
  const gender = selectedRow.cells[4].innerText;
  document.querySelector(`input[name="StudentGender"][value="${gender}"]`).checked = true;

  document.getElementById("btnThem").textContent = "Cập nhật";
}

function capNhatSinhVien(maSV, hoTen, email, gender, dob) {
  selectedRow.cells[1].innerText = maSV;
  selectedRow.cells[2].innerText = hoTen;
  selectedRow.cells[3].innerText = email;
  selectedRow.cells[4].innerText = gender;
  selectedRow.cells[5].innerText = dinhDangNgay(dob);
  selectedRow = null;
  capNhatSTT();
}

function capNhatSTT() {
  const rows = document.querySelectorAll("table tbody tr");
  rows.forEach((row, index) => {
    row.cells[0].innerText = index + 1;
  });
}

function hienThongBao(message) {
  const div = document.getElementById("thongBao");
  div.innerText = message;
  setTimeout(() => {
    div.innerText = "";
  }, 4000);
}

function dinhDangNgay(inputDate) {
  if (!inputDate) return "";
  const date = new Date(inputDate);
  return date.toLocaleDateString("vi-VN");
}

function chuyenDoiNgay(ngayVN) {
  const parts = ngayVN.split("/");
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
}
