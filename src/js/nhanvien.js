function layDanhSachNhanVien() {
  return JSON.parse(localStorage.getItem("nhanVienList")) || [
    {
      ma: "NV01",
      ten: "Phúc Minh",
      sdt: "0933444555",
      email: "phucminh@gmail.com",
      diaChi: "Trà Vinh",
      chucVu: "Quản lý",
      luong: "12.000.000đ",
      caLam: "Ca sáng"
    },
    {
      ma: "NV02",
      ten: "Phương Thùy",
      sdt: "0909111999",
      email: "phuongthuy@gmail.com",
      diaChi: "Vĩnh Long",
      chucVu: "Thu ngân",
      luong: "8.000.000đ",
      caLam: "Ca chiều"
    },
    {
      ma: "NV03",
      ten: "Hiếu Tâm",
      sdt: "0909116666",
      email: "hieutam@gmail.com",
      diaChi: "Bến Tre",
      chucVu: "Bán hàng",
      luong: "7.000.000đ",
      caLam: "Ca tối"
    }
  ];
}

function luuDanhSachNhanVien(list) {
  localStorage.setItem("nhanVienList", JSON.stringify(list));
}

function hienThiNhanVien(list = layDanhSachNhanVien()) {
  const bang = document.getElementById("bangNhanVien");
  const tong = document.getElementById("tongNhanVien");

  if (!bang) return;

  bang.innerHTML = `
    <tr>
      <th>Mã NV</th>
      <th>Tên nhân viên</th>
      <th>SĐT</th>
      <th>Chức vụ</th>
      <th>Lương</th>
      <th>Sửa</th>
      <th>Xóa</th>
    </tr>
  `;

  list.forEach((nv, index) => {
    bang.innerHTML += `
      <tr>
        <td>${nv.ma}</td>
        <td>${nv.ten}</td>
        <td>${nv.sdt}</td>
        <td>${nv.chucVu}</td>
        <td>${nv.luong}</td>
        <td><span class="action-text" onclick="suaNhanVien(${index})">Sửa</span></td>
        <td><span class="action-text" onclick="xoaNhanVien(${index})">Xóa</span></td>
      </tr>
    `;
  });

  if (tong) {
    tong.textContent = "Tổng nhân viên: " + list.length;
  }
}

function themNhanVien() {
  const ten = document.getElementById("tenNV").value.trim();
  const sdt = document.getElementById("sdtNV").value.trim();
  const email = document.getElementById("emailNV").value.trim();
  const diaChi = document.getElementById("diaChiNV").value.trim();
  const chucVu = document.getElementById("chucVuNV").value;
  const luong = document.getElementById("luongNV").value.trim();
  const caLam = document.getElementById("caLamNV").value;

  if (ten === "" || sdt === "" || email === "" || diaChi === "") {
    alert("Vui lòng nhập đầy đủ thông tin bắt buộc!");
    return;
  }

  const list = layDanhSachNhanVien();
  const maMoi = "NV" + String(list.length + 1).padStart(2, "0");

  list.push({
    ma: maMoi,
    ten: ten,
    sdt: sdt,
    email: email,
    diaChi: diaChi,
    chucVu: chucVu,
    luong: luong,
    caLam: caLam
  });

  luuDanhSachNhanVien(list);

  alert("Thêm nhân viên thành công!");
  window.location.href = "nhanvien.html";
}

function xoaNhanVien(index) {
  const list = layDanhSachNhanVien();

  if (confirm("Bạn có chắc muốn xóa nhân viên này không?")) {
    list.splice(index, 1);
    luuDanhSachNhanVien(list);
    hienThiNhanVien();
  }
}

function suaNhanVien(index) {
  alert("Chức năng sửa nhân viên sẽ làm sau.");
}

function timKiemNhanVien() {
  const tuKhoa = document.getElementById("searchEmployee").value.toLowerCase();
  const list = layDanhSachNhanVien();

  const ketQua = list.filter(nv =>
    nv.ten.toLowerCase().includes(tuKhoa) ||
    nv.sdt.includes(tuKhoa) ||
    nv.chucVu.toLowerCase().includes(tuKhoa) ||
    nv.luong.toLowerCase().includes(tuKhoa)
  );

  hienThiNhanVien(ketQua);
}

function xemTruocAnhNhanVien(event) {
  const file = event.target.files[0];
  const img = document.getElementById("previewEmployeeImg");
  const text = document.getElementById("previewEmployeeText");

  if (file) {
    img.src = URL.createObjectURL(file);
    img.style.display = "block";
    text.style.display = "none";
  }
}

function huyThemNhanVien() {
  if (confirm("Bạn có muốn hủy thêm nhân viên không?")) {
    window.location.href = "nhanvien.html";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("bangNhanVien")) {
    hienThiNhanVien();
  }
});