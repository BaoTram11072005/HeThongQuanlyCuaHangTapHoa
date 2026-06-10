function dangNhap() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
        alert("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!");
        return;
    }

    localStorage.setItem("isLogin", "true");
    localStorage.setItem("username", username);

    window.location.href = "index.html";
}
function dangXuat() {
    if (confirm("Bạn có muốn đăng xuất khỏi hệ thống không?")) {
        localStorage.removeItem("isLogin");
        localStorage.removeItem("username");
        window.location.href = "login.html";
    }
}