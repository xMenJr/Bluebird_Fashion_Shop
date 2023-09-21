function Login() {
    const loginUrl = "https://localhost:7029/api/Users/SignIn";
  const username = document.getElementById("userName").value;
  const password = document.getElementById("passWord").value;
  fetch(loginUrl, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
      email: username,
      password: password,
      }),
  })
  .then((response) => {
      if (!response.ok) {
        alert("Đăng nhập không thành công.\nVui lòng kiểm tra lại tài khoản và mật khẩu");
      throw new Error("Đăng nhập không thành công.");
      }
      return response.json();
  })
  .then((data) => {
    if(data.token === "Tên đăng nhập hoặc mật khẩu không đúng" || data.token === "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ Admin để mở") {
        alert(data.token);
    }
    else {
        // Xử lý dữ liệu trả về từ API
        // console.log(data);
        // const setjson=JSON.stringify(data);
        
        localStorage.setItem("login",data.token);
        // Thực hiện các hành động khác sau khi đăng nhập thành công
        const namelogin = data.name;
        localStorage.setItem("fullname",namelogin);
        localStorage.setItem("email",data.email);
        localStorage.setItem("avata",data.avata);
        if(data.status === "Thành công") {
            window.location.href = "index.html";
        }
        else {
            alert(data.token);
        }
    }

      // localStorage.removeItem("signin");
  })
  .catch((error) => {
      // Xử lý lỗi
      console.error(error);
  });
}

function SignIn() {
    
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmpassword = document.getElementById("confirm_password").value;
  const firstname = document.getElementById("first_name").value;
  const lastname = document.getElementById("last_name").value;
  const NumberPhone = document.getElementById("phone_number").value;
  const Address = document.getElementById("address").value;
  const avataShop = document.getElementById("imageInput").value;
  const BrandName = document.getElementById("brandName").value;
  const CheckShop = document.getElementById("action");
  if(CheckShop.checked) {
    const signinUrl = "https://localhost:7029/api/Users/SignUpShop";
    fetch(signinUrl, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        first_Name :firstname,
        last_Name:lastname,
        email: email,
        password: NumberPhone,
        confirmPassword: password,
        phone: confirmpassword,
        address: Address,
        brandName: BrandName,
        avata: avataShop
        }),
    })
    .then((response) => {
        if (!response.ok) {
        alert("Đăng ký không thành công.\nVui long kiểm tra lại")
        throw new Error("Đăng ký không thành công.");
        }
        return response.json();
    })
    .then((data) => {
        // Xử lý dữ liệu trả về từ API
        alert(data.status);
        // window,location.href = "index.html";
        // alert(data.result);

    })
    .catch((error) => {
        // Xử lý lỗi
        console.error(error);
    });
  }
  else {
        const signinUrl = "https://localhost:7029/api/Users/SignUp";
        fetch(signinUrl, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            first_Name :firstname,
            last_Name:lastname,
            email: email,
            password: password,
            confirmPassword: confirmpassword,
            phone: NumberPhone,
            address: Address
            }),
        })
        .then((response) => {
            if (!response.ok) {
            alert("Đăng ký không thành công.\nVui long kiểm tra lại")
            throw new Error("Đăng ký không thành công.");
            }
            return response.json();
        })
        .then((data) => {
            // Xử lý dữ liệu trả về từ API
            alert(data.status);
            // window,location.href = "index.html";
            // alert(data.result);
    
        })
        .catch((error) => {
            // Xử lý lỗi
            console.error(error);
        });
    }
}



async function displayProductByProductType(pageIndex, productType, IdClass, NameProduct) {
    try {
        const getClassUrl = `https://localhost:7029/api/Product?pageIndex=${pageIndex}&pageSize=5&ProductType=${productType}`;
        const response = await fetch(getClassUrl);
        const data = await response.json();

        const productContainer = document.getElementById(IdClass);
        productContainer.innerHTML = '';

        if (!Array.isArray(data.result) || data.result.length === 0) {
            productContainer.innerHTML = '<h1 id="Data__null">Không có dữ liệu</h1>';
        } else {
            const productTitle = document.createElement('div');
            productTitle.className = 'col l-12'
            productTitle.innerHTML = `
                <div class="product_bag--heading">
                    <h2>${NameProduct}</h2>
                </div>
            `;
            productContainer.appendChild(productTitle);
            data.result.forEach(product => {

                
                const productDiv = document.createElement('div');
                productDiv.className = 'col l-2-4';

                productDiv.innerHTML = `
                    <div class="product_shoe--item">
                        <div class="shoe_item--img">
                            <i class="fa-sharp fa-solid fa-bookmark shoe_item--icon"></i>
                            <img src="${product.images[0].img || ''}" alt="${product.name}">
                        </div>
                        <div class="shoe_item--content">
                            <div class="bag_content--discount">
                                <p>Sale</p><span>10%</span>
                            </div>
                            <div class="shoe_content--name">
                                <span>${product.name}</span>
                            </div>
                            <div class="shoe_content--price">
                                <span>$${product.price}</span>
                            </div>
                        </div>
                    </div>
                `;

                productContainer.appendChild(productDiv);
            });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
    }
}


// Call API Page Bag

async function displayPageBagByProductType(pageIndex, productType, IdClass, NameProduct) {
    try {
        const getClassUrl = `https://localhost:7029/api/Product?pageIndex=${pageIndex}&pageSize=20&ProductType=${productType}`;
        const response = await fetch(getClassUrl);
        const data = await response.json();

        const productContainer = document.getElementById(IdClass);
        productContainer.innerHTML = '';

        if (!Array.isArray(data.result) || data.result.length === 0) {
            productContainer.innerHTML = '<h1 id="Data__null">Không có dữ liệu</h1>';
        } else {
            data.result.forEach(product => {

                
                const productDiv = document.createElement('div');
                productDiv.className = 'product product__one';

                productDiv.innerHTML = `

                    <img src="${product.images[0].img || ''}" alt="${product.name}">
                        <div class="product__one--name">
                            <p>${product.name}</p>
                        </div>
                        <div class="product__one--price">
                            <span>$${product.price}</span>
                        </div>
                `;

                productContainer.appendChild(productDiv);
            });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
    }
}


// Call api history order

async function ShowHistoryOrders(pageIndex, IdClass) {
    try {
        var token = localStorage.getItem("login");
        const getClassUrl = `https://localhost:7029/api/Orders?pageIndex=${pageIndex}&pageSize=10&token=${token}`;
        const response = await fetch(getClassUrl);
        const data = await response.json();

        const productContainer = document.getElementById(IdClass);
        productContainer.innerHTML = '';

        if (!Array.isArray(data.result) || data.result.length === 0) {
            productContainer.innerHTML = '<h1 id="Data__null">Không có dữ liệu</h1>';
        } else {
            data.result.forEach(product => {
                let ShipStatus = product.usedStatus ;
                if(ShipStatus == 0) {
                    ShipStatus = "Waiting for confirmation from the shop"
                }
                if(ShipStatus == 3) {
                    ShipStatus = "Order has been delivered successfully";
                }
                // Phân định dạng tiền
                var totalPrice = product.totalPrice.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                var price = product.price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                var shipPrice = product.shipPrice.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

                function formatPrice(price) {
                    if (price.endsWith('.00')) {
                      return price.slice(0, -3); // Loại bỏ phần thập phân .00
                    }
                    return price;
                  }

                var productDiv = document.createElement('div');
                productDiv.className = 'history__product';

                productDiv.innerHTML = `


                        <div class="shop">
                            <div class="check">
                                <p class="real">Mall</p>
                            </div>
                            <div class="shop_name">
                                <p> ${product.brandName} </p>
                            </div>
                            <div class="viewstore">
                                <i class="fa-solid fa-shop"></i>
                                <a href="">View store</a>
                            </div>
                        </div>
                        <div class="product_information">
                            <div class="product_information--img">
                                <img src="${product.img}" alt="">
                            </div>
                            <div class="product_information--info">
                                <p class="product_name">${product.name}</p>
                                <p class="product_color">Color: ${product.color}</p>
                                <p class="product_quantity">Quantity: ${product.number}</p>
                                <p class="product_size">Size: ${product.size}</p>
                            </div>
                            <div class="product_information--price">
                                <p class="product_price">Price: ${formatPrice(price)}</p>
                                <p class="product_ship">Ship: ${formatPrice(shipPrice)}</p>
                                <p class="product_total">Total: ${formatPrice(totalPrice)}</p>
                            </div>
                        </div>
                        <div class="status">
                            <i class="fa-solid fa-truck"></i>
                            <span>${ShipStatus}</span>
                        </div>
                        <div class="option">
                            <div class="feedback">
                                <button>Feedback</button>
                            </div>
                            <div class="buyback">
                                <button>Buy back</button>
                            </div>
                        </div>
                `;

                productContainer.appendChild(productDiv);
            });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
    }
}

// Change Password

function ChangePassWord() {
  const token = localStorage.getItem("login");
  const passOld = document.getElementById("oldpass_input").value;
  const passNew = document.getElementById("newpass_input").value;
  const ConfirmPass = document.getElementById("enternewpass_input").value;
  const loginUrl = `https://localhost:7029/api/ChangePassWord?token=${token}`;
  fetch(loginUrl, {
      method: "PUT",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
        passWordOld: passOld,
        passWordNew: passNew,
        confirmPassWord: ConfirmPass
      }),
  })
  .then((response) => {
      if (!response.ok) {
        alert("Sửa mật khẩu không thành công");
      throw new Error("Sửa mật khẩu không thành công");
      }
      return response.json();
  })
  .then((data) => {
        alert(data.result);
        location.reload(true);
  })
  .catch((error) => {
      // Xử lý lỗi
      console.error(error);
  });
}



//  Test push Cu Quân




  