$(document).ready(function () {
    let books = [
        { title: "Nếu chỉ còn một ngày để sống", price: 80000, image: "./image/anh/anh1.jpg.jpg" },
        { title: "Tây du ký ", price: 90000, image: "./image/anh/anh2.jpg.jpg" },
        { title: "Người đua diều ", price: 120000, image: "./image/anh/anh3.jpg.jpg" },
        { title: "Hồ quý ly ", price: 100000, image: "./image/anh/anh4.jpg.jpg" },
        { title: "Cuộc chiến đầu tiên ", price: 85000, image: "./image/anh/anh5.jpg.jpg" },
        { title: "Kiếp nào là cũng tìm tim thấy nhau ", price: 110000, image: "./image/anh/anh6.jpg.jpg" },
        { title: "Cuộc đời cuat Pi ", price: 95000, image: "./image/anh/anh7.jpg.jpg" },
        { title: "Hoàng tử bé ", price: 60000, image: "./image/anh/anh8.jpg.jpg" },
        { title: "Ông già và biển cả ", price: 70000, image: "./image/anh/anh9.jpg.jpg" },
        { title: "Khải huyền muộn ", price: 95000, image: "./image/anh/anh10.jpg.jpg" },
        { title: "Cây cam ngọt của tôi ", price: 130000, image: "./image/anh/anh11.jpg.jpg" },
        { title: "Trăm năm cô đơn ", price: 50000, image: "./image/anh/anh12.jpg.jpg" }
    ];

    books.forEach((book) => {
        $("#book-list").append(`
            <div class="book">
                <img src="${book.image}" alt="${book.title}">
                <h3>${book.title}</h3>
                <p class="price">${book.price.toLocaleString()} VND</p>
                <button class="add-to-cart" onclick="addToCart('${book.title}', ${book.price}, '${book.image}')"> Thêm vào giỏ</button>
                <button class="buy-now" onclick="buyNow('${book.title}', ${book.price})"> Mua ngay</button>
            </div>
        `);
    });

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartDisplay() {
        $("#cart-items").empty();
        if (cart.length === 0) {
            $("#cart-items").append("<li>Giỏ hàng trống</li>");
        } else {
            cart.forEach((item, index) => {
                $("#cart-items").append(`
                    <li>
<img src="${item.image}" alt="${item.book}" style="width:50px; height:70px; margin-right:10px;">
                        ${item.book} - ${item.price.toLocaleString()} VND 
                        <button class="remove-btn" onclick="removeFromCart(${index})">❌</button>
                    </li>
                `);
            });
        }
    }

    window.addToCart = function (book, price, image) {
        let currentUser = localStorage.getItem("user");
        if (!currentUser) {
            alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
            window.location.href = "login.html";
            return;
        }
        cart.push({ book, price, image });
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${book} đã thêm vào giỏ hàng!`);
        updateCartDisplay();
    };

    window.buyNow = function (book, price) {
        let currentUser = localStorage.getItem("user");
        if (!currentUser) {
            alert("Bạn cần đăng nhập để mua sản phẩm!");
            window.location.href = "login.html";
            return;
        }
        alert(`Bạn đã mua "${book}" với giá ${price.toLocaleString()} VND`);
    };

    window.removeFromCart = function (index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
    };

    $("#cart-btn").click(function () {
        $("#cart-modal").fadeIn();
        updateCartDisplay();
    });

    $(".close").click(function () {
        $("#cart-modal").fadeOut();
    });

    $("#clear-cart").click(function () {
        localStorage.removeItem("cart");
        cart = [];
        updateCartDisplay();
    });

    let currentUser = localStorage.getItem("user");

    function updateAuthUI() {
        if (currentUser) {
            $("#user-info").text(`Xin chào, ${currentUser}`);
            $("#login-link").hide();
            $("#logout-btn").show();
        } else {
            $("#user-info").text("");
            $("#login-link").show();
            $("#logout-btn").hide();
        }
    }

    $("#logout-btn").click(function () {
        localStorage.removeItem("user");
        alert("Bạn đã đăng xuất!");
        location.reload();
    });

    updateAuthUI();
});
document.getElementById("checkout-btn").addEventListener("click", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Giỏ hàng trống!");
        return;
    }

    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    let paymentMethod = prompt("Nhập phương thức thanh toán (Ví điện tử, Thẻ, Chuyển khoản):");
    if (paymentMethod) {
        alert(`Thanh toán thành công! Bạn đã thanh toán ${total} VND bằng ${paymentMethod}.`);
        localStorage.removeItem("cart");
        document.getElementById("cart-items").innerHTML = "";
    }
});