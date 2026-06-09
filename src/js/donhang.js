function layDanhSachDonHang() {
    return JSON.parse(localStorage.getItem("donHangList")) || [
        {
            ma: "DH001",
            khachHang: "Bảo Trâm",
            ngay: "10/06/2026",
            tongTien: "250.000đ",
            trangThai: "Hoàn thành"
        },
        {
            ma: "DH002",
            khachHang: "Thanh Phúc",
            ngay: "11/06/2026",
            tongTien: "120.000đ",
            trangThai: "Đang giao"
        },
        {
            ma: "DH003",
            khachHang: "Hoàng Mãi",
            ngay: "11/06/2026",
            tongTien: "450.000đ",
            trangThai: "Chờ xử lý"
        }
    ];
}

function luuDanhSachDonHang(list) {
    localStorage.setItem("donHangList", JSON.stringify(list));
}

function hienThiDonHang(list = layDanhSachDonHang()) {
    const bang = document.getElementById("bangDonHang");

    if (!bang) return;

    bang.innerHTML = `
        <tr>
            <th>Mã ĐH</th>
            <th>Khách hàng</th>
            <th>Ngày đặt</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Chi tiết</th>
        </tr>
    `;

    list.forEach((dh) => {
        bang.innerHTML += `
            <tr>
                <td>${dh.ma}</td>
                <td>${dh.khachHang}</td>
                <td>${dh.ngay}</td>
                <td>${dh.tongTien}</td>
                <td>${hienThiTrangThai(dh.trangThai)}</td>
                <td><span class="action-text" onclick="xemChiTietDonHang('${dh.ma}')">👁 Xem</span></td>
            </tr>
        `;
    });

    capNhatThongKeDonHang();
}

function hienThiTrangThai(trangThai) {
    if (trangThai === "Hoàn thành") {
        return `<span class="status-done">🟢 Hoàn thành</span>`;
    }

    if (trangThai === "Đang giao") {
        return `<span class="status-shipping">🟠 Đang giao</span>`;
    }

    return `<span class="status-pending">🔴 Chờ xử lý</span>`;
}

function capNhatThongKeDonHang() {
    const list = layDanhSachDonHang();

    const tongDon = list.length;
    const hoanThanh = list.filter(dh => dh.trangThai === "Hoàn thành").length;
    const dangGiao = list.filter(dh => dh.trangThai === "Đang giao").length;
    const choXuLy = list.filter(dh => dh.trangThai === "Chờ xử lý").length;

    let doanhThu = 0;

    list.forEach(dh => {
        const soTien = Number(dh.tongTien.replaceAll(".", "").replace("đ", ""));
        doanhThu += soTien;
    });

    document.getElementById("tongDonHang").innerText = "Tổng đơn hàng: " + tongDon;
    document.getElementById("tongDoanhThu").innerText = "Tổng doanh thu: " + doanhThu.toLocaleString("vi-VN") + "đ";

    document.getElementById("tongDonBox").innerText = "Tổng đơn: " + tongDon;
    document.getElementById("hoanThanhBox").innerText = "🟢 Hoàn thành: " + hoanThanh;
    document.getElementById("dangGiaoBox").innerText = "🟠 Đang giao: " + dangGiao;
    document.getElementById("choXuLyBox").innerText = "🔴 Chờ xử lý: " + choXuLy;
}

function timKiemDonHang() {
    const tuKhoa = document.getElementById("searchOrder").value.toLowerCase();
    const list = layDanhSachDonHang();

    const ketQua = list.filter(dh =>
        dh.ma.toLowerCase().includes(tuKhoa) ||
        dh.khachHang.toLowerCase().includes(tuKhoa) ||
        dh.ngay.toLowerCase().includes(tuKhoa) ||
        dh.tongTien.toLowerCase().includes(tuKhoa) ||
        dh.trangThai.toLowerCase().includes(tuKhoa)
    );

    hienThiDonHang(ketQua);
}

function xemChiTietDonHang(maDH) {
    const list = layDanhSachDonHang();
    const dh = list.find(item => item.ma === maDH);

    if (!dh) return;

    document.getElementById("ctMaDH").innerText = dh.ma;
    document.getElementById("ctKhachHang").innerText = dh.khachHang;
    document.getElementById("ctSdt").innerText = dh.sdt || "0912345678";
    document.getElementById("ctNgay").innerText = dh.ngay;
    document.getElementById("ctSanPham").innerText = dh.sanPham || "Sữa Vinamilk";
    document.getElementById("ctSoLuong").innerText = dh.soLuong || "2";
    document.getElementById("ctDonGia").innerText = dh.tongTien;
    document.getElementById("ctTongTien").innerText = dh.tongTien;
    document.getElementById("ctTrangThai").innerHTML = hienThiTrangThai(dh.trangThai);

    document.getElementById("orderDetailModal").style.display = "flex";
}

function dongChiTietDonHang() {
    document.getElementById("orderDetailModal").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("bangDonHang")) {
        hienThiDonHang();
    }
});