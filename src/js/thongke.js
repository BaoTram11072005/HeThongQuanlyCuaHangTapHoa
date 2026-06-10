document.addEventListener("DOMContentLoaded", function () {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const customers = JSON.parse(localStorage.getItem("khachHangList")) || [];
    const orders = JSON.parse(localStorage.getItem("donHangList")) || [];

    document.getElementById("tongDonHang").innerText = 3;
    document.getElementById("tongKhachHang").innerText = 3;
    document.getElementById("tongSanPham").innerText = 4;

    let tongDoanhThu = 880000;

    const doanhThu = document.getElementById("tongDoanhThu");
    const doanhThuNam = document.getElementById("tongDoanhThuNam");

    doanhThu.innerText = tongDoanhThu.toLocaleString("vi-VN") + "đ";
    doanhThuNam.innerText = "Tổng doanh thu năm: " + tongDoanhThu.toLocaleString("vi-VN") + "đ";
});