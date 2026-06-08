/* Nhà cung cấp */

function layDanhSachNhaCungCap() {
  return JSON.parse(localStorage.getItem("nhaCungCapList")) || [
    {
      ma: "NCC01",
      ten: "Công ty Vinamilk",
      sdt: "0901111111",
      diaChi: "TP.HCM",
      email: "vinamilk@gmail.com",
      trangThai: "Hoạt động",
      nguoiDaiDien: "Kim Tài",
      ghiChu: "Nhà cung cấp sữa"
    },
    {
      ma: "NCC02",
      ten: "Coca Cola Việt Nam",
      sdt: "0902222222",
      diaChi: "Long An",
      email: "cocacola@gmail.com",
      trangThai: "Hoạt động",
      nguoiDaiDien: "Thanh Thịnh",
      ghiChu: "Nhà cung cấp nước giải khát"
    },
    {
      ma: "NCC03",
      ten: "Acecook Việt Nam",
      sdt: "0903333333",
      diaChi: "Vĩnh Long",
      email: "acecook@gmail.com",
      trangThai: "Hoạt động",
      nguoiDaiDien: "Duy Tân",
      ghiChu: "Nhà cung cấp mì ăn liền"
    },
    {
      ma: "NCC04",
      ten: "Masan Consumer",
      sdt: "0904444444",
      diaChi: "Hà Nội",
      email: "masan@gmail.com",
      trangThai: "Hoạt động",
      nguoiDaiDien: "Đại Phát",
      ghiChu: "Nhà cung cấp hàng tiêu dùng"
    }
  ];
}

function luuDanhSachNhaCungCap(list) {
  localStorage.setItem("nhaCungCapList", JSON.stringify(list));
}

function hienThiNhaCungCap(list = layDanhSachNhaCungCap()) {
  const bang = document.getElementById("bangNhaCungCap");
  const tong = document.getElementById("tongNhaCungCap");

  if (!bang) return;

  bang.innerHTML = `
    <tr>
      <th>Mã NCC</th>
      <th>Tên nhà cung cấp</th>
      <th>SĐT</th>
      <th>Địa chỉ</th>
      <th>Email</th>
      <th>Sửa</th>
      <th>Xóa</th>
    </tr>
  `;

  list.forEach((ncc, index) => {
    bang.innerHTML += `
      <tr>
        <td>${ncc.ma}</td>
        <td>${ncc.ten}</td>
        <td>${ncc.sdt}</td>
        <td>${ncc.diaChi}</td>
        <td>${ncc.email}</td>
        <td><span class="action-text" onclick="suaNhaCungCap(${index})">Sửa</span></td>
        <td><span class="action-text" onclick="xoaNhaCungCap(${index})">Xóa</span></td>
      </tr>
    `;
  });

  if (tong) {
    tong.textContent = "Tổng nhà cung cấp: " + list.length;
  }
}

function themNhaCungCap() {
  const ten = document.getElementById("tenNCC").value.trim();
  const sdt = document.getElementById("sdtNCC").value.trim();
  const email = document.getElementById("emailNCC").value.trim();
  const diaChi = document.getElementById("diaChiNCC").value.trim();
  const trangThai = document.getElementById("trangThaiNCC").value;
  const nguoiDaiDien = document.getElementById("nguoiDaiDien").value.trim();
  const ghiChu = document.getElementById("ghiChuNCC").value.trim();

  if (ten === "" || sdt === "" || email === "" || diaChi === "") {
    alert("Vui lòng nhập đầy đủ các thông tin bắt buộc!");
    return;
  }

  const list = layDanhSachNhaCungCap();

  const maMoi = "NCC" + String(list.length + 1).padStart(2, "0");

  const nhaCungCapMoi = {
    ma: maMoi,
    ten: ten,
    sdt: sdt,
    email: email,
    diaChi: diaChi,
    trangThai: trangThai,
    nguoiDaiDien: nguoiDaiDien,
    ghiChu: ghiChu
  };

  list.push(nhaCungCapMoi);
  luuDanhSachNhaCungCap(list);

  alert("Thêm nhà cung cấp thành công!");
  window.location.href = "nhacungcap.html";
}

function xoaNhaCungCap(index) {
  const list = layDanhSachNhaCungCap();

  if (confirm("Bạn có chắc muốn xóa nhà cung cấp này không?")) {
    list.splice(index, 1);
    luuDanhSachNhaCungCap(list);
    hienThiNhaCungCap();
  }
}

function suaNhaCungCap(index) {
  alert("Chức năng sửa sẽ làm ở bước tiếp theo.");
}

function timKiemNhaCungCap() {
  const tuKhoa = document.getElementById("searchSupplier").value.toLowerCase();
  const list = layDanhSachNhaCungCap();

  const ketQua = list.filter(ncc =>
    ncc.ten.toLowerCase().includes(tuKhoa) ||
    ncc.sdt.includes(tuKhoa) ||
    ncc.email.toLowerCase().includes(tuKhoa) ||
    ncc.diaChi.toLowerCase().includes(tuKhoa)
  );

  hienThiNhaCungCap(ketQua);
}

function xemTruocAnh(event) {
  const file = event.target.files[0];
  const img = document.getElementById("previewImg");
  const text = document.getElementById("previewText");

  if (file) {
    img.src = URL.createObjectURL(file);
    img.style.display = "block";
    text.style.display = "none";
  }
}

function huyThem() {
    if (confirm("Bạn có muốn hủy thêm nhà cung cấp không?")) {
        window.location.href = "nhacungcap.html";
    }
}
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("bangNhaCungCap")) {
    hienThiNhaCungCap();
  }
});