create database quan_ly_cua_hang_tap_hoa;
go

use quan_ly_cua_hang_tap_hoa;
go

create table san_pham (
    ma_sp varchar(20) primary key,
    ten_sp nvarchar(100) not null,
    loai_sp nvarchar(50),
    gia_ban decimal(18,2),
    so_luong int,
    hinh_anh nvarchar(255),
    mo_ta nvarchar(255)
);

create table khach_hang (
    ma_kh varchar(20) primary key,
    ten_kh nvarchar(100) not null,
    sdt varchar(15),
    dia_chi nvarchar(255)
);

create table nha_cung_cap (
    ma_ncc varchar(20) primary key,
    ten_ncc nvarchar(100) not null,
    sdt varchar(15),
    dia_chi nvarchar(255),
    san_pham_cung_cap nvarchar(100)
);

create table nhan_vien (
    ma_nv varchar(20) primary key,
    ten_nv nvarchar(100) not null,
    sdt varchar(15),
    chuc_vu nvarchar(50),
    tai_khoan varchar(50),
    mat_khau varchar(50),
    trang_thai nvarchar(50)
);

create table don_hang (
    ma_dh varchar(20) primary key,
    ma_kh varchar(20),
    ma_nv varchar(20),
    ten_khach_hang nvarchar(100),
    sdt varchar(15),
    dia_chi_giao_hang nvarchar(255),
    ngay_dat_hang date,
    tong_tien decimal(18,2),
    trang_thai nvarchar(50),
    foreign key (ma_kh) references khach_hang(ma_kh),
    foreign key (ma_nv) references nhan_vien(ma_nv)
);

create table chi_tiet_don_hang (
    ma_ctdh int identity(1,1) primary key,
    ma_dh varchar(20),
    ma_sp varchar(20),
    so_luong int,
    don_gia decimal(18,2),
    thanh_tien decimal(18,2),
    foreign key (ma_dh) references don_hang(ma_dh),
    foreign key (ma_sp) references san_pham(ma_sp)
);

create table hoa_don (
    ma_hd varchar(20) primary key,
    ma_dh varchar(20),
    ngay_lap date,
    tong_tien decimal(18,2),
    trang_thai nvarchar(50),
    foreign key (ma_dh) references don_hang(ma_dh)
);

-- du lieu mau bang san pham

insert into san_pham
values
('SP01', N'Sữa Vinamilk', N'Đồ uống', 35000, 100, 'vinamilk.jpg', N'Sữa hộp dùng hằng ngày'),
('SP02', N'Coca Cola', N'Đồ uống', 12000, 150, 'cocacola.jpg', N'Nước giải khát có gas'),
('SP03', N'Mì Hảo Hảo', N'Mì gói', 5000, 200, 'mihaohao.jpg', N'Mì ăn liền vị tôm chua cay'),
('SP04', N'Bánh Oreo', N'Bánh kẹo', 10000, 80, 'oreo.jpg', N'Bánh quy kem socola');

-- du lieu mau bang khach hang

insert into khach_hang
values
('KH01', N'Bảo Trâm', '0901111111', N'Trà Vinh'),
('KH02', N'Thanh Phúc', '0902222222', N'Vĩnh Long'),
('KH03', N'Hoàng Mãi', '0903333333', N'Bến Tre');

-- du lieu mau bang nha cung cap

insert into nha_cung_cap
values
('NCC01', N'Công ty Vinamilk', '0911111111', N'TP. Hồ Chí Minh', N'Sữa và sản phẩm từ sữa'),
('NCC02', N'Công ty Coca Cola', '0922222222', N'Cần Thơ', N'Nước giải khát'),
('NCC03', N'Nhà phân phối thực phẩm miền Tây', '0933333333', N'Trà Vinh', N'Mì gói, bánh kẹo, gia vị');

-- du lieu mau bang nhan vien

insert into nhan_vien
values
('NV01', N'Phúc Minh', '0988888888', N'Quản lý', 'admin', '123456', N'Đang làm việc'),
('NV02', N'Phương Thùy', '0977777777', N'Thu ', 'thuy', '123456', N'Đang làm việc'),
('NV03', N'Hiếu Tâm', '0966666666', N'Nhân viên', '', '123456', N'Đang làm việc');

-- du lieu mau bang don hang

insert into don_hang
values
('DH01', 'KH01', 'NV01', N'Bảo Trâm', '0901111111', N'Trà Vinh', '2026-06-10', 82000, N'Đã giao'),
('DH02', 'KH02', 'NV02', N'Thanh Phúc', '0902222222', N'Vĩnh Long', '2026-06-11', 47000, N'Chờ xử lý');

-- du lieu mau bang chi tiet don hang

insert into chi_tiet_don_hang (ma_dh, ma_sp, so_luong, don_gia, thanh_tien)
values
('DH01', 'SP01', 2, 35000, 70000),
('DH01', 'SP02', 1, 12000, 12000),
('DH02', 'SP03', 5, 5000, 25000),
('DH02', 'SP04', 2, 10000, 20000);

-- du lieu mau bang hoa don

insert into hoa_don
values
('HD01', 'DH01', '2026-06-10', 82000, N'Đã thanh toán'),
('HD02', 'DH02', '2026-06-11', 47000, N'Chưa thanh toán');