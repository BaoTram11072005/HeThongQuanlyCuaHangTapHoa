function layDanhSachHoaDon() {
    return JSON.parse(localStorage.getItem("hoaDonList")) || [
        {
            ma: "HD001",
            khachHang: "Bảo Trâm",
            ngay: "10/06/2026",
            tongTien: "250.000đ",
            thanhToan: "Đã thanh toán"
        },
        {
            ma: "HD002",
            khachHang: "Thanh Phúc",
            ngay: "11/06/2026",
            tongTien: "450.000đ",
            thanhToan: "Đã thanh toán"
        },
        {
            ma: "HD003",
            khachHang: "Hoàng Mãi",
            ngay: "12/06/2026",
            tongTien: "180.000đ",
            thanhToan: "Chưa thanh toán"
        }
    ];
}

function luuDanhSachHoaDon(list) {
    localStorage.setItem("hoaDonList", JSON.stringify(list));
}

function hienThiHoaDon(list = layDanhSachHoaDon()) {
    const bang = document.getElementById("bangHoaDon");

    if (!bang) return;

    bang.innerHTML = "";

    list.forEach((hd) => {
        bang.innerHTML += `
            <tr>
                <td>${hd.ma}</td>
                <td>${hd.khachHang}</td>
                <td>${hd.ngay}</td>
                <td>${hd.tongTien}</td>
                <td>${hienThiThanhToan(hd.thanhToan)}</td>
                <td><button class="icon-btn" onclick="xemHoaDon('${hd.ma}')">👁️</button></td>
                <td><button class="icon-btn" onclick="inHoaDon('${hd.ma}')">🖨️</button></td>
            </tr>
        `;
    });

    capNhatThongKeHoaDon();
}

function hienThiThanhToan(thanhToan) {
    if (thanhToan === "Đã thanh toán") {
        return `<span style="color:#16a34a;font-weight:bold;">● Đã thanh toán</span>`;
    }

    return `<span style="color:#ef4444;font-weight:bold;">● Chưa thanh toán</span>`;
}

function capNhatThongKeHoaDon() {
    const list = layDanhSachHoaDon();

    const tongHD = list.length;
    const daThanhToan = list.filter(hd => hd.thanhToan === "Đã thanh toán").length;
    const chuaThanhToan = list.filter(hd => hd.thanhToan === "Chưa thanh toán").length;

    let doanhThu = 0;

    list.forEach(hd => {
        const soTien = Number(hd.tongTien.replaceAll(".", "").replace("đ", ""));
        doanhThu += soTien;
    });

    document.getElementById("tongHoaDon").innerText = tongHD;
    document.getElementById("tongDoanhThu").innerText = doanhThu.toLocaleString("vi-VN") + "đ";

    document.getElementById("tongHDBox").innerText = tongHD;
    document.getElementById("daThanhToan").innerText = daThanhToan;
    document.getElementById("chuaThanhToan").innerText = chuaThanhToan;
    document.getElementById("doanhThuBox").innerText = doanhThu.toLocaleString("vi-VN") + "đ";
}

function timKiemHoaDon() {
    const tuKhoa = document.getElementById("searchHoaDon").value.toLowerCase();
    const list = layDanhSachHoaDon();

    const ketQua = list.filter(hd =>
        hd.ma.toLowerCase().includes(tuKhoa) ||
        hd.khachHang.toLowerCase().includes(tuKhoa) ||
        hd.ngay.toLowerCase().includes(tuKhoa) ||
        hd.tongTien.toLowerCase().includes(tuKhoa) ||
        hd.thanhToan.toLowerCase().includes(tuKhoa)
    );

    hienThiHoaDon(ketQua);
}

function themHoaDon() {
    window.location.href = "themhoadon.html";
}

function xemHoaDon(maHD) {
    const list = layDanhSachHoaDon();
    const hd = list.find(item => item.ma === maHD);

    if (!hd) return;

    document.getElementById("ctMaHD").innerText = hd.ma;
    document.getElementById("ctKhachHangHD").innerText = hd.khachHang;
    document.getElementById("ctNgayLapHD").innerText = hd.ngay;
    document.getElementById("ctThanhToanHD").innerText = hd.thanhToan;

    document.getElementById("ctDonGiaHD").innerText = hd.tongTien;
    document.getElementById("ctTongTienHD").innerText = hd.tongTien;
    document.getElementById("ctTrangThaiHD").innerHTML = hienThiThanhToan(hd.thanhToan);

    document.getElementById("hoaDonDetailModal").style.display = "flex";
}

function dongChiTietHoaDon() {
    document.getElementById("hoaDonDetailModal").style.display = "none";
}

function inHoaDon(maHD) {
    const list = layDanhSachHoaDon();
    const hd = list.find(item => item.ma === maHD);

    if (!hd) {
        alert("Không tìm thấy hóa đơn!");
        return;
    }

    const noiDungIn = `
        <html>
        <head>
            <title>In hóa đơn</title>
            <style>
                body { font-family: Arial; padding: 30px; }
                h1 { text-align: center; color: #0f766e; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                td { padding: 10px; border: 1px solid #ccc; }
            </style>
        </head>
        <body>
            <h1>HÓA ĐƠN BÁN HÀNG</h1>
            <table>
                <tr><td>Mã hóa đơn</td><td>${hd.ma}</td></tr>
                <tr><td>Khách hàng</td><td>${hd.khachHang}</td></tr>
                <tr><td>Ngày lập</td><td>${hd.ngay}</td></tr>
                <tr><td>Tổng tiền</td><td>${hd.tongTien}</td></tr>
                <tr><td>Thanh toán</td><td>${hd.thanhToan}</td></tr>
            </table>
        </body>
        </html>
    `;

    const cuaSoIn = window.open("", "_blank");
    cuaSoIn.document.write(noiDungIn);
    cuaSoIn.document.close();
    cuaSoIn.print();
}

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("bangHoaDon")) {
        hienThiHoaDon();
    }
});
