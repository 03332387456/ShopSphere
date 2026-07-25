function initApp() {

    function showCheckoutProducts() {
        let cart = getCartItems()
        let ProductInformation = document.getElementById("ProductInformation")
        let infoOfProduct = document.getElementById("infoOfProduct")
        if (!cart) {
            ProductInformation.innerHTML = ""
            ProductInformation.innerHTML = "No product to Show"
            return
        } else {
            ProductInformation.innerHTML = ""
            infoOfProduct.innerHTML = ""
            cart.forEach(function (currentProduct) {
                infoOfProduct.innerHTML += `
                <p class="">Name : ${currentProduct.title}</p>
                <p>Quantity : ${currentProduct.quantity}</p>
                <p>Price : ${currentProduct.price}</p>
                <hr>
                `
            })
        }
    }


    // JOB : calculate subTotal means (quantity * price)
    function calculateSubTotal() {
        let cart = getCartItems()
        let subTotal = 0
        cart.forEach(function (currentPrice) {
            subTotal += currentPrice.price * currentPrice.quantity;
        })
        return subTotal
    }


    // JOB : calculate GST on product 
    function calculateGST(subTotal) {
        let GST = 0
        if (subTotal > 3000) {
            GST = 0.10
        } else {
            GST = 0.05
        }
        let gstPrice = subTotal * GST
        return gstPrice
    }

    // JOB : calculate discount on product 
    function calculateDiscount(subTotal) {
        let discount = 0
        if (subTotal > 3000) {
            discount = 0.07
        } else {
            discount = 0.04
        }
        let discountPrice = subTotal * discount
        return discountPrice
    }

    // JOB : calculate Shipping charges on product 
    function calculateShipping(subTotal) {
        let Shipping = 0
        if (subTotal > 10000) {
            Shipping = 0.07
        } else {
            Shipping = 0.10
        }
        let shippingPrice = subTotal * Shipping
        return shippingPrice
    }


    // JOB : calculate Final of products
    function calculateFinalBill(subTotal, gstPrice, discountPrice, shippingPrice) {
        let finalAmount = subTotal + gstPrice - discountPrice + shippingPrice;
        return finalAmount
    }

    let totalAmount = calculateSubTotal();
    let gstBill = calculateGST(totalAmount);
    let discountOnBill = calculateDiscount(totalAmount);
    let shippingOnBill = calculateShipping(totalAmount)
    let finalAmountofProducts = calculateFinalBill(totalAmount, gstBill, discountOnBill, shippingOnBill);

    let summaryTable = document.getElementById("summaryTable")
    summaryTable.innerHTML = ""
    summaryTable.innerHTML += `
    
    <div class="d-flex justify-content-between mb-2">
                            <span>Subtotal</span>
                            <strong>${totalAmount.toFixed(2)}</strong>
                        </div>

                        <div class="d-flex justify-content-between mb-2">
                            <span>GST</span>
                            <strong>${gstBill.toFixed(2)}</strong>
                        </div>

                        <div class="d-flex justify-content-between mb-2">
                            <span>Discount</span>
                            <strong>${discountOnBill.toFixed(2)}</strong>
                        </div>

                        <div class="d-flex justify-content-between mb-3">
                            <span>Shipping</span>
                            <strong>${shippingOnBill.toFixed(2)}</strong>
                        </div>

                        <hr>

                        <div class="d-flex justify-content-between mb-4">
                            <h5>Grand Total</h5>
                            <h5 class="text-success">
                                ${finalAmountofProducts.toFixed(2)}
                            </h5>
                        </div>

    `

    let fullName = document.getElementById("fullName")
    let email = document.getElementById("email")
    let phone = document.getElementById("phone")
    let address = document.getElementById("address")
    let city = document.getElementById("city")
    let postalCode = document.getElementById("postalCode")
    let country = document.getElementById("country")
    let cashMethod = document.getElementById("cashMethod")
    let cardMethod = document.getElementById("cardMethod")
    let placeOrderBtn = document.getElementById("placeOrderBtn")


    placeOrderBtn.addEventListener("click", function () {

        let cart = getCartItems()

        let paymentMethod = "";
        let selectedPayment = document.querySelector(
            'input[name="payment"]:checked'
        );

        paymentMethod = selectedPayment.id

        let orderDetails = {
            fullName: fullName.value,
            email: email.value,
            phone: phone.value,
            address: address.value,
            city: city.value,
            postalCode: postalCode.value,
            country: country.value,
            paymentMethod: paymentMethod
        }

        if (orderDetails.fullName.length < 4) {
            Toastify({
                text: "Name should be atLeast 5 charecters ",
                duration: 2000,
                gravity: "top", // 'top' or 'bottom'
                position: "right", // 'left', 'center' or 'right'
                style: {
                    background: "blue",
                }
            }).showToast()
            return
        } else if (orderDetails.email.length < 10) {
            Toastify({
                text: "Email not correct",
                duration: 2000,
                gravity: "top", // 'top' or 'bottom'
                position: "right", // 'left', 'center' or 'right'
                style: {
                    background: "blue",
                }
            }).showToast()
        } else if (orderDetails.phone.length < 10) {
            Toastify({
                text: "Enter correct Phone-no",
                duration: 2000,
                gravity: "top", // 'top' or 'bottom'
                position: "right", // 'left', 'center' or 'right'
                style: {
                    background: "blue",
                }
            }).showToast()
            return
        } else if (orderDetails.address.length < 10) {
            Toastify({
                text: "Enter Your correct Address",
                duration: 2000,
                gravity: "top", // 'top' or 'bottom'
                position: "right", // 'left', 'center' or 'right'
                style: {
                    background: "blue",
                }
            }).showToast()
            return
        } else if (orderDetails.city.length < 4) {
            Toastify({
                text: "Enter Your correct City Name",
                duration: 2000,
                gravity: "top", // 'top' or 'bottom'
                position: "right", // 'left', 'center' or 'right'
                style: {
                    background: "blue",
                }
            }).showToast()
            return
        } else if (orderDetails.postalCode.length < 4) {
            Toastify({
                text: "Enter Your correct postal Code",
                duration: 2000,
                gravity: "top", // 'top' or 'bottom'
                position: "right", // 'left', 'center' or 'right'
                style: {
                    background: "blue",
                }
            }).showToast()
            return
        } else if (orderDetails.country.length < 4) {
            Toastify({
                text: "Enter Your correct Country Name",
                duration: 2000,
                gravity: "top", // 'top' or 'bottom'
                position: "right", // 'left', 'center' or 'right'
                style: {
                    background: "blue",
                }
            }).showToast()
            return
        } else if (orderDetails.paymentMethod === "") {
            Toastify({
                text: "Please select Payment method",
                duration: 2000,
                gravity: "top", // 'top' or 'bottom'
                position: "right", // 'left', 'center' or 'right'
                style: {
                    background: "blue",
                }
            }).showToast()
            return
        } else {

            // saving every thing in a single object 
            let order = {
                 orderId: generateOrderId(),
                customerDetails: orderDetails,
                AllProducts: cart,
                summary: {
                    totalAmount,
                    gstBill,
                    discountOnBill,
                    shippingOnBill,
                    finalAmountofProducts
                },
                orderDate: new Date().toLocaleString()
            }
            let getOrders = getAllOrders()
            getOrders.push(order)
            saveOrders(getOrders)
            Toastify({
                text: "Order Have been placed successfully ",
                duration: 2000,
                gravity: "top", // 'top' or 'bottom'
                position: "right", // 'left', 'center' or 'right'
                style: {
                    background: "blue",
                }
            }).showToast()
            localStorage.removeItem('cart')
            setTimeout(() => {
                window.location.href = "./successPage.html"
            }, 1500);
        }

    })

    function generateOrderId() {
        let orders = getAllOrders();
        let orderNumber = orders.length + 1;
        return `SP${1000 + orderNumber}`;
    }


    showCheckoutProducts()

}
initApp()