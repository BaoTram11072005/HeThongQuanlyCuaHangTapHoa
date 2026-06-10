function luuHoaDon() {
    const maHD = document.getElementById("maHD").value.trim();
    const khachHang = document.getElementById("khachHang").value;
    const tongTien = document.getElementById("tongTien").value;
    const ngayLap = document.getElementById("ngayLap").value;
    const trangThai = document.getElementById("trangThai").value;

    if (!maHD || !khachHang || !tongTien || !ngayLap) {
        alert("Vui lòng nhập đầy đủ thông tin bắt buộc!");
        return;
    }

    const ngay = new Date(ngayLap).toLocaleDateString("vi-VN");

    const list = JSON.parse(localStorage.getItem("hoaDonList")) || [];

    list.push({
        ma: maHD,
        khachHang: khachHang,
        ngay: ngay,
        tongTien: Number(tongTien).toLocaleString("vi-VN") + "đ",
        thanhToan: trangThai === "Đã thanh toán" ? "Đã thanh toán" : "Chưa thanh toán"
    });

    localStorage.setItem("hoaDonList", JSON.stringify(list));

    alert("Thêm hóa đơn thành công!");
    window.location.href = "hoadon.html";
}