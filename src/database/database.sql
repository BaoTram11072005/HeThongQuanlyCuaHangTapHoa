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
    hinh_anh nvarchar(255)
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