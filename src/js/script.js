console.log("script da chay");
function themSanPham() {
    const bang = document.getElementById("bangSanPham");
    if (!bang) {
        alert("Không tìm thấy bảng sản phẩm");
        return;
    }

    const ma = prompt("Nhập mã sản phẩm:");
    const ten = prompt("Nhập tên sản phẩm:");
    const loai = prompt("Nhập loại sản phẩm:");
    const gia = prompt("Nhập giá bán:");
    const ton = prompt("Nhập tồn kho:");

    if (!ma || !ten || !loai || !gia || !ton) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    const row = bang.insertRow(-1);

    row.innerHTML = `
        <td>${ma}</td>
        <td>${ten}</td>
        <td>${loai}</td>
        <td>${gia}</td>
        <td>${ton}</td>
        <td><button onclick="suaSanPham(this)">Sửa</button></td>
        <td><button onclick="xoaSanPham(this)">Xóa</button></td>
    `;

    capNhatTongSanPham();
}

function xoaSanPham(button) {
    const dong = button.closest("tr");
    const xacNhan = confirm("Bạn có chắc muốn xóa sản phẩm này không?");

    if (xacNhan) {
        dong.remove();
        capNhatTongSanPham();
    }
}

function suaSanPham(button) {
    const dong = button.closest("tr");
    const o = dong.getElementsByTagName("td");

    const ma = prompt("Sửa mã sản phẩm:", o[0].innerText);
    const ten = prompt("Sửa tên sản phẩm:", o[1].innerText);
    const loai = prompt("Sửa loại sản phẩm:", o[2].innerText);
    const gia = prompt("Sửa giá bán:", o[3].innerText);
    const ton = prompt("Sửa tồn kho:", o[4].innerText);

    if (!ma || !ten || !loai || !gia || !ton) {
        alert("Không được để trống thông tin!");
        return;
    }

    o[0].innerText = ma;
    o[1].innerText = ten;
    o[2].innerText = loai;
    o[3].innerText = gia;
    o[4].innerText = ton;
}

function capNhatTongSanPham() {
    const bang = document.getElementById("bangSanPham");
    const tong = document.querySelector(".tong-sp");

    if (!bang || !tong) return;

    const soDong = bang.rows.length - 1;
    tong.innerText = "Tổng sản phẩm: " + soDong;
}

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");

    if (searchInput) {
        searchInput.addEventListener("keyup", function () {
            const keyword = this.value.toLowerCase();
            const bang = document.getElementById("bangSanPham");
            const rows = bang.getElementsByTagName("tr");

            for (let i = 1; i < rows.length; i++) {
                const text = rows[i].innerText.toLowerCase();

                if (text.includes(keyword)) {
                    rows[i].style.display = "";
                } else {
                    rows[i].style.display = "none";
                }
            }
        });
    }

    capNhatTongSanPham();
});
function luuSanPham() {
    const ten = document.getElementById("tenSP").value.trim();
    const loai = document.getElementById("loaiSP").value.trim();
    const gia = document.getElementById("giaSP").value.trim();
    const soLuong = document.getElementById("soLuongSP").value.trim();

    if (ten === "" || loai === "" || gia === "" || soLuong === "") {
        document.getElementById("ghiChuSP").value = "Vui lòng nhập đầy đủ thông tin!";
        return;
    }

    let products = JSON.parse(localStorage.getItem("products")) || [];

    let maMoi = "SP" + String(products.length + 1).padStart(2, "0");

    products.push({
        ma: maMoi,
        ten: ten,
        loai: loai,
        gia: gia,
        ton: soLuong
    });

    localStorage.setItem("products", JSON.stringify(products));

    alert("Lưu sản phẩm thành công!");
    window.location.href = "sanpham.html";
}

function huySanPham() {
    const xacNhan = confirm("Bạn có chắc muốn hủy thêm sản phẩm không?");

    if (xacNhan) {
        window.location.href = "sanpham.html";
    }
}
function xemTruocAnh(event) {
    const file = event.target.files[0];

    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
        const previewBox = document.querySelector(".preview-box");
        const modalImage = document.getElementById("modalImage");

        previewBox.innerHTML = `
            <img 
                src="${e.target.result}" 
                style="width:100%; height:100%; object-fit:cover; display:block;"
            >
        `;

        if (modalImage) {
            modalImage.src = e.target.result;
        }
    };

    reader.readAsDataURL(file);
}

function moAnhLon() {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");

    if (!modalImage.src) {
        alert("Bạn chưa chọn ảnh!");
        return;
    }

    modal.style.display = "flex";
}

function dongAnhLon() {
    document.getElementById("imageModal").style.display = "none";
}
document.addEventListener("DOMContentLoaded", function () {
    const bang = document.getElementById("bangSanPham");

    if (bang) {
        const products = JSON.parse(localStorage.getItem("products")) || [];

        products.forEach(sp => {
            const row = bang.insertRow(-1);

            row.innerHTML = `
                <td>${sp.ma}</td>
                <td>${sp.ten}</td>
                <td>${sp.loai}</td>
                <td>${sp.gia}</td>
                <td>${sp.ton}</td>
                <td><span class="action-text" onclick="suaSanPham(this)">Sửa</span></td>
                <td><span class="action-text" onclick="xoaSanPham(this)">Xóa</span></td>
            `;
        });
    }
});
function xoaSanPham(button) {
    let xacNhan = confirm("Bạn có chắc muốn xóa sản phẩm này không?");
    if (!xacNhan) return;

    let row = button.closest("tr");
    let maSP = row.cells[0].innerText;

    row.remove();

    let products = JSON.parse(localStorage.getItem("products")) || [];

    products = products.filter(sp => sp.ma !== maSP);

    localStorage.setItem("products", JSON.stringify(products));

    alert("Đã xóa sản phẩm!");
}
function suaSanPham(button) {

    let row = button.parentElement.parentElement;

    let tenSP =
        row.cells[1].innerText;

    let giaSP =
        row.cells[3].innerText;

    let giaMoi = prompt(
        "Nhập giá mới cho " + tenSP,
        giaSP
    );

    if (giaMoi != null && giaMoi != "") {

        row.cells[3].innerText =
            giaMoi;

        alert("Đã cập nhật!");
    }
}
function xemTruocAnhSanPham(event) {
    const file = event.target.files[0];
    const img = document.getElementById("previewSanPhamImg");
    const text = document.getElementById("previewSanPhamText");

    if (!file) return;

    img.src = URL.createObjectURL(file);
    img.style.display = "block";
    text.style.display = "none";
}
/* ===== TRANG QUẢN LÝ KHÁCH HÀNG ===== */

// ================= KHÁCH HÀNG =================

function layDanhSachKhachHang() {
    const data = localStorage.getItem("khachHangList");

    if (data) {
        return JSON.parse(data);
    }

    return [
        {
            ma: "KH01",
            ten: "Bảo Trâm",
            sdt: "0912345678",
            diaChi: "Trà Vinh"
        },
        {
            ma: "KH02",
            ten: "Thanh Phúc",
            sdt: "0987654321",
            diaChi: "Vĩnh Long"
        },
        {
            ma: "KH03",
            ten: "Hoàng Mãi",
            sdt: "0909111222",
            diaChi: "Bến Tre"
        }
    ];
}

function luuDanhSachKhachHang(list) {
    localStorage.setItem("khachHangList", JSON.stringify(list));
}

function hienThiKhachHang(list = layDanhSachKhachHang()) {
    const bang = document.getElementById("bangKhachHang");
    const tong = document.getElementById("tongKhachHang");

    if (!bang) return;

    bang.innerHTML = `
        <tr>
            <th>Mã KH</th>
            <th>Tên khách hàng</th>
            <th>SĐT</th>
            <th>Địa chỉ</th>
            <th>Sửa</th>
            <th>Xóa</th>
        </tr>
    `;

    list.forEach(function (kh) {
        bang.innerHTML += `
            <tr>
                <td>${kh.ma}</td>
                <td>${kh.ten}</td>
                <td>${kh.sdt}</td>
                <td>${kh.diaChi}</td>
                <td><span class="action-text" onclick="suaKhachHang('${kh.ma}')">Sửa</span></td>
                <td><span class="action-text" onclick="xoaKhachHang('${kh.ma}')">Xóa</span></td>
            </tr>
        `;
    });

    if (tong) {
        tong.innerText = "Tổng khách hàng: " + layDanhSachKhachHang().length;
    }
}

function luuKhachHang() {
    const ten = document.getElementById("tenKH")?.value.trim();
    const sdt = document.getElementById("sdtKH")?.value.trim();
    const email = document.getElementById("emailKH")?.value.trim();
    const diaChi = document.getElementById("diaChiKH")?.value.trim();

    if (!ten || !sdt || !email || !diaChi) {
        alert("Vui lòng nhập đầy đủ thông tin khách hàng!");
        return;
    }

    let list = layDanhSachKhachHang();

    const maMoi = "KH" + String(list.length + 1).padStart(2, "0");

    list.push({
        ma: maMoi,
        ten: ten,
        sdt: sdt,
        diaChi: diaChi
    });

    luuDanhSachKhachHang(list);

    alert("Lưu khách hàng thành công!");
    window.location.href = "khachhang.html";
}

function suaKhachHang(maKH) {
    let list = layDanhSachKhachHang();
    let kh = list.find(function (item) {
        return item.ma === maKH;
    });

    if (!kh) return;

    const tenMoi = prompt("Sửa tên khách hàng:", kh.ten);
    const sdtMoi = prompt("Sửa số điện thoại:", kh.sdt);
    const diaChiMoi = prompt("Sửa địa chỉ:", kh.diaChi);

    if (!tenMoi || !sdtMoi || !diaChiMoi) {
        alert("Không được để trống thông tin!");
        return;
    }

    kh.ten = tenMoi;
    kh.sdt = sdtMoi;
    kh.diaChi = diaChiMoi;

    luuDanhSachKhachHang(list);
    hienThiKhachHang();

    alert("Sửa khách hàng thành công!");
}

function xoaKhachHang(maKH) {
    if (!confirm("Bạn có chắc muốn xóa khách hàng này không?")) return;

    let list = layDanhSachKhachHang();

    list = list.filter(function (kh) {
        return kh.ma !== maKH;
    });

    luuDanhSachKhachHang(list);
    hienThiKhachHang();

    alert("Xóa khách hàng thành công!");
}

function huyKhachHang() {
    if (confirm("Bạn có chắc muốn hủy thêm khách hàng không?")) {
        window.location.href = "khachhang.html";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const bangKhachHang = document.getElementById("bangKhachHang");

    if (bangKhachHang) {
        hienThiKhachHang();

        const searchCustomer = document.getElementById("searchCustomer");

        if (searchCustomer) {
            searchCustomer.addEventListener("keyup", function () {
                const keyword = this.value.toLowerCase().trim();

                const ketQua = layDanhSachKhachHang().filter(function (kh) {
                    return (
                        kh.ma.toLowerCase().includes(keyword) ||
                        kh.ten.toLowerCase().includes(keyword) ||
                        kh.sdt.toLowerCase().includes(keyword) ||
                        kh.diaChi.toLowerCase().includes(keyword)
                    );
                });

                hienThiKhachHang(ketQua);
            });
        }
    }
});
function xemTruocAnhKH(event) {
    const file = event.target.files[0];

    if (!file) return;

    const img = document.getElementById("previewImgKH");
    const text = document.getElementById("previewTextKH");
    const modalImg = document.getElementById("modalImageKH");

    img.src = URL.createObjectURL(file);
    img.style.display = "block";
    text.style.display = "none";

    if (modalImg) {
        modalImg.src = img.src;
    }
}

function moAnhLonKH() {
    const modal = document.getElementById("imageModalKH");
    const modalImg = document.getElementById("modalImageKH");

    if (!modalImg || !modalImg.src) {
        alert("Bạn chưa chọn ảnh!");
        return;
    }

    modal.style.display = "flex";
}

function dongAnhLonKH() {
    document.getElementById("imageModalKH").style.display = "none";
}

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
      nguoiDaiDien: "Nguyễn Văn A",
      ghiChu: "Nhà cung cấp sữa"
    },
    {
      ma: "NCC02",
      ten: "Coca Cola Việt Nam",
      sdt: "0902222222",
      diaChi: "Long An",
      email: "cocacola@gmail.com",
      trangThai: "Hoạt động",
      nguoiDaiDien: "Trần Văn B",
      ghiChu: "Nhà cung cấp nước giải khát"
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
function dangXuat() {
    if (confirm("Bạn có muốn đăng xuất khỏi hệ thống không?")) {
        localStorage.removeItem("isLogin");
        localStorage.removeItem("username");
        window.location.href = "login.html";
    }
}


function moPopupDangXuat() {
    document.getElementById("logoutModal").classList.add("show");
}

function dongPopupDangXuat() {
    document.getElementById("logoutModal").classList.remove("show");
}

function xacNhanDangXuat() {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("username");
    window.location.href = "login.html";
}