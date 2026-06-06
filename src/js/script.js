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
function xemTruocAnh(event){
    const file = event.target.files[0];

    if(file){
        const reader = new FileReader();

        reader.onload = function(e){

            document.getElementById("previewImage").src = e.target.result;
            document.getElementById("previewImage").style.display = "block";

            document.getElementById("previewText").style.display = "none";

            document.getElementById("modalImage").src = e.target.result;
        }

        reader.readAsDataURL(file);
    }
}
function capNhatTrangThai() {
    const trangThai = document.getElementById("trangThaiSP").value;
    document.getElementById("ghiChuSP").value = "Trạng thái: " + trangThai;
}
function moAnhLon(){

    const img = document.getElementById("previewImage");

    if(img.src){
        document.getElementById("imageModal").style.display = "flex";
    }
}

function dongAnhLon(){
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