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

// Get Address

async function GetAddress() {
    try {
        var token = localStorage.getItem("login");
        const getClassUrl = `https://localhost:7029/api/ChangeAddress?token=${token}`;
        const response = await fetch(getClassUrl);
        const data = await response.json();

        const productContainer = document.getElementById("left");
        productContainer.innerHTML = '';

        if (data.statusCode === 400) {
            productContainer.innerHTML = '<h1 id="Data__null">Không có dữ liệu</h1>';
        } else {
            var productDiv = document.createElement('div');
            productDiv.className = 'left_test';

            productDiv.innerHTML = `
                <h4>${data.result.firstName + " " + data.result.lastName} | 0${data.result.phoneNumber}</h4>
                <h4>${data.result.address}</h4>
            `;

            productContainer.appendChild(productDiv);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
    }
}

// Update Address
function ChangeAddress() {
    const token = localStorage.getItem("login");
    const fistname = document.getElementById("FirstName").value;
    const lastname = document.getElementById("LastName").value;
    const phone = document.getElementById("Phone").value;
    const address = document.getElementById("textarea").value;
    const loginUrl = `https://localhost:7029/api/ChangeAddress?token=${token}`;
    fetch(loginUrl, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstName: fistname,
            lastName: lastname,
            phoneNumber: phone,
            address: address
        }),
    })
    .then((response) => {
        if (!response.ok) {
          alert("Sửa địa chỉ không thành công");
        throw new Error("Sửa địa chỉ không thành công");
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

//   Call api Get All My Shop

async function GetAllProductMyShop(search) {
    try {
        var token = localStorage.getItem("login");
        const getClassUrl = `https://localhost:7029/api/GetProductMyShop?token=${token}&search=${search}`;
        const response = await fetch(getClassUrl);
        const data = await response.json();

        const productContainer = document.getElementById("product_manager");
        productContainer.innerHTML = '';

        if (!Array.isArray(data.result) || data.result.length === 0) {
            productContainer.innerHTML = '<h1 id="Data__null">Không có dữ liệu</h1>';
        } else {
            const table = document.createElement('table');
                table.id = "product__myshop"
                table.innerHTML = `
                    <thead id="product__myshop--title">
                        <tr>
                            <th>Image</th>
                            <th>Product's name</th>
                            <th>Caregory</th>
                            <th>Quantity</th>
                            <th>Sold</th>
                            <th>Action</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                `;
                productContainer.appendChild(table);
            data.result.forEach(product => {
                var productDiv = document.createElement('tr');
                productDiv.className = 'product__myshop--body';

                productDiv.innerHTML = `
                <td><img class="td_img" src="${product.img}" alt=""></td>
                <td class="product_name">${product.nameProduct}</td>
                <td>${product.category}</td>
                <td>${product.quantity}</td>
                <td>${product.sold}</td>
                <td class="product_details">
                    <a href="">Details</a>
                </td>
                <td class="option">
                    <div class="select_option">
                        <i class="fa-regular fa-trash-can delete--icon" >Ok</i>
                        <a href="">
                            <i class="fa-solid fa-screwdriver-wrench" style="color: black;"></i>
                        </a>
                    </div>
                </td>
                `;

                productContainer.appendChild(productDiv);
            });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
    }
}

// Add product
async function GetCategory() {
    try {
        const getClassUrl = `https://localhost:7029/api/ProductType?pageIndex=1&pageSize=100`;
        const response = await fetch(getClassUrl);
        const data = await response.json();

        const productContainer = document.getElementById("body__productcategory");
        productContainer.innerHTML = '';

        if (!Array.isArray(data.result) || data.result.length === 0) {
            productContainer.innerHTML = '<p id="Data__null">Không có dữ liệu</p>';
        } else {
            var productSelect__title = document.createElement("label");
            productSelect__title.className = "productcategory_label"
            productSelect__title.textContent = "Category";
            productContainer.appendChild(productSelect__title)
            var productSelect = document.createElement('select');
            productSelect.id = "select__type"
            data.result.forEach(product => {
                var option = document.createElement('option');
                option.value = product.id;
                option.textContent = product.name;
                productSelect.appendChild(option);
            });
            productContainer.appendChild(productSelect);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
    }
}

function AddProduct() {
    const token = localStorage.getItem("login");
    const name_product = document.getElementById("productname_input").value;
    const img_main = document.getElementById("productimg_input--img__main").value;
    const img_1 = document.getElementById("productimg_input--img__1").value;
    const img_2 = document.getElementById("productimg_input--img__2").value;
    const img_3 = document.getElementById("productimg_input--img__3").value;
    const img_4 = document.getElementById("productimg_input--img__4").value;
    const product_information = document.getElementById("productinfo_input").value;
    const product_detail = document.getElementById("productdetails_input").value;
    const price = document.getElementById("productprice_input").value;
    const Material = document.getElementById("productmaterial_input").value;
    const type = document.getElementById("select__type").value;
    const colors = getTableData().color;
    const sizes = getTableData().size;
    const numbers = getTableData().number;

    const loginUrl = `https://localhost:7029/api/Product?token=${token}`;
    fetch(loginUrl, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name_product,
            idProducer: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            idProductType: type,
            material: Material,
            price: price,
            description: product_information,
            idDiscount: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            images: [
                {
                    img: img_main,
                    usedStatus: 1
                },
                {
                    img: img_1,
                    usedStatus: 2
                },
                {
                    img: img_2,
                    usedStatus: 2
                },
                {
                    img: img_3,
                    usedStatus: 2
                },
                {
                    img: img_4,
                    usedStatus: 2
                }
            ],
            product_Detail: generateProductDetail(colors, sizes, product_detail,numbers ),
        }),
    })
    .then((response) => {
        if (!response.ok) {
          alert("Thêm sản phẩm không thành công");
        throw new Error("Thêm sản phẩm không thành công");
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

function generateProductDetail(colors, sizes, productDetail, numbers) {
    const productDetailArray = [];

    for (let i = 0; i < sizes.length; i++) {
        const size = sizes[i];
        const color = colors[i % colors.length]; // Lấy màu tương ứng với kích thước hiện tại
        const number = numbers[i % numbers.length]; 

        productDetailArray.push({
            number: number,
            description: productDetail,
            color: color,
            size: size,
        });
    }

    return productDetailArray;
}



function getTableData() {
    const table = document.getElementById("table_size");
    const sizeRow = table.querySelector("#header_size + #header_long");
    const colorRow = table.querySelector("#header_long + #header_height");
    const numberRow = table.querySelector("#header_height");

    const sizeData = getSizeData(sizeRow);
    const colorData = getColorData(colorRow);
    const numberData = getNumberData(numberRow);
    return {
        size: sizeData,
        color: colorData,
        number: numberData
    };
    }

    function getSizeData(row) {
        const cells = row.getElementsByTagName("td");
        const sizeData = [];

        for (let i = 1; i < cells.length; i++) {
            sizeData.push(cells[i].textContent);
        }

        return sizeData;
    }

    function getColorData(row) {
        const cells = row.getElementsByTagName("td");
        const colorData = [];

        for (let i = 1; i < cells.length; i++) {
            colorData.push(cells[i].textContent);
        }

        return colorData;
    }

    function getNumberData(row) {
        const cells = row.getElementsByTagName("td");
        const numberData = [];

        for (let i = 1; i < cells.length; i++) {
            numberData.push(cells[i].textContent);
        }

        return numberData;
    }

async function GetAllCart(pageIndex, pageSize,search) {
    try {
        var token = localStorage.getItem("login");
        const getClassUrl = `https://localhost:7029/api/Cart?pageIndex=${pageIndex}&pageSize=${pageSize}&token=${token}&search=${search}`;
        const response = await fetch(getClassUrl);
        const data = await response.json();

        const productContainer = document.getElementById("my_cart");
        productContainer.innerHTML = '';

        if (!Array.isArray(data.result) || data.result.length === 0) {
            productContainer.innerHTML = '<h1 id="Data__null">Không có dữ liệu</h1>';
        } else {
            data.result.forEach(product => {
                var productDiv = document.createElement('div');
                productDiv.className = 'cart';
                let BrandType = product.brandName
                if(product.brandName == "BleuBird") BrandType = "Mall";
                else BrandType = "Yêu thích";
                productDiv.innerHTML = `
                    <div class="shop">
                        <div class="check">
                            <p class="real">${BrandType}</p>
                        </div>
                        <div class="shop_name">
                            <p>${product.brandName}</p>
                        </div>
                        <div class="viewstore">
                            <i class="fa-solid fa-shop"></i>
                            <a href="">View store</a>
                        </div>
                        <div class="select">
                            <input class="select_check" type="checkbox">
                        </div>
                    </div>
                    <div class="product_information">
                        <div class="product_information--img">
                            <img src="${product.img}" alt="">
                        </div>
                        <div class="product_information--info">
                            <p class="product_name">${product.nameProduct}</p>
                            <p class="product_color">Color: ${product.color}</p>
                            <p class="product_size">Size: ${product.size}</p>
                            <span>Price:</span>
                            <span class="product_price" id="product_price">${product.totalPrice}</span>
                        </div>
                        <div class="product_information--price">
                            <div class="product_quantity">
                                <span>Quantity</span>
                                <button class="minus" id="minus" onclick="ChangeNumber()"><i class="fa-solid fa-minus"></i></button>
                                <input class="quantity" id="quantityInput" type="text" value="${product.number}">
                                <button class="plus" id="plus" onclick="ChangeNumber()"><i class="fa-solid fa-plus"></i></button>
                            </div>
                            <div class="product_price">
                                <span class="product_total">Total:</span>
                                <span class="price_total" id="price_total">${product.totalPrice}</span>
                            </div>
                            <div class="product_delete" onclick="DeleteCart('${product.id}')">
                                <button>DELETE</button>
                            </div>
                        </div>
                    </div>
                `;

                productContainer.appendChild(productDiv);
            });

            const table = document.createElement('div');
                table.id = "option",
                table.className = "option";
                table.innerHTML = `
                <div class="select_all">
                    <div>
                        <input type="checkbox">
                        <span>Select all</span>
                    </div>
                    <span>Delete</span>
                    <div>
                        <span>Total payment: </span>
                        <span class="total_payment">0</span>
                    </div>
                    <button>BUY NOW</button>
                    </div>
                `;
            productContainer.appendChild(table);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
    }
}


function ChangeNumber() {
    var quantityControls = document.querySelectorAll('.cart');

    // Lặp qua từng phần tử và gán sự kiện onclick
    quantityControls.forEach(function(control) {
        var minusButton = control.querySelector('.minus');
        var plusButton = control.querySelector('.plus');
        var quantityInput = control.querySelector('.quantity');
        minusButton.onclick = function() {
            changeQuantity("minus", quantityInput);
            var price = document.getElementById("product_price").textContent;
            var number = document.getElementById("quantityInput").value;
            var totalPrice = document.getElementById("price_total");
            const PriceTotal = price * number ;
            totalPrice.textContent = PriceTotal
        };

        plusButton.onclick = function() {
            changeQuantity("plus", quantityInput);
            var price = document.getElementById("product_price").textContent;
            var number = document.getElementById("quantityInput").value;
            var totalPrice = document.getElementById("price_total");
            const PriceTotal = price * number ;
            totalPrice.textContent = PriceTotal
        };
    });
}

function changeQuantity(action, quantityInput) {
    var currentQuantity = parseInt(quantityInput.value, 100);

    if (action === "minus" && currentQuantity > 1) {
        currentQuantity--;
    } else if (action === "plus") {
        currentQuantity++;
    }
}

function UpdatePriceCart() {
    var price = document.getElementById("product_price").textContent;
    var number = document.getElementById("quantityInput").value;
    var totalPrice = document.getElementById("price_total");
    const PriceTotal = price * number ;
    totalPrice.textContent = PriceTotal
}

// Xóa Cart 
function DeleteCart(Id) {
    if(confirm("Bạn có chắc muốn xóa đơn hàng này?")) {
        const loginUrl = `https://localhost:7029/api/Cart?Id=${Id}`;
        fetch(loginUrl, {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json",
            },
        })
        .then((response) => {
            if (!response.ok) {
            alert("Xóa đơn hàng không thành công");
            throw new Error("Xóa đơn hàng không thành công");
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
    else alert("Xóa đơn hàng thất bại");
}



  