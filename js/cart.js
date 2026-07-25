function initApp() {
    console.log("Application start")

    let EmptyBox = document.getElementById("EmptyBox")
    let tableOfCartItems = document.getElementById("tableOfCartItems")
    let serialNum = 1

    // JOB : get all cart items form localStorage and show in table 
    function showAllCartItems() {
        let cart = getCartItems()
        if (cart.length === 0) {
            EmptyBox.innerHTML = ""
            EmptyBox.innerHTML = "No Items to Show in cart"
        } else {
            EmptyBox.innerHTML = ""
            tableOfCartItems.innerHTML = ""
            cart.forEach(function (currentItem) {
                tableOfCartItems.innerHTML += `
                <tr>
                    <th scope="row">${serialNum++}</th>
                    <td><img class="productImage" src="${currentItem.image}"
                            alt=""></td>
                    <td>${currentItem.title}</td>
                    <td>${currentItem.price}</td>
                    <td>${(currentItem.price * currentItem.quantity).toFixed(2)}</td>
                    <td><button class="plusBtn" data-id="${currentItem.id}"><span><i class="fa-solid fa-plus icons"></i></span></button>
                        <strong class="p-1">${currentItem.quantity}</strong>
                        <button class="minusBtn" data-id="${currentItem.id}" ${currentItem.quantity === 1 ? "disabled" : ""} ><span><i class="fa-solid fa-minus icons"></i></span></button>
                    </td>
                    <td><button class="removeIcon" data-id="${currentItem.id}"><i class="fa-solid fa-trash trashIcon"></i></button></td>
                </tr>
                `
            })
        }
        QuantityPlusBtn()
        QuantityMinusBtn()
        removeCartItem()
    }

    // JOB : increarse qunatity onclick of plus btn and saved in localStorage     
    function QuantityPlusBtn() {
        let plusBtn = document.querySelectorAll(".plusBtn")
        plusBtn.forEach(function (currentBtn) {
            currentBtn.addEventListener("click", function () {
                let productId = Number(this.dataset.id);
                let cart = getCartItems()
                let matchedId = cart.find(function (cartId) {
                    return cartId.id === productId
                })
                if (matchedId) {
                    matchedId.quantity++
                    saveCartItemProducts(cart)
                    Toastify({
                        text: "Quantity updated Successfully",
                        duration: 2000,
                        gravity: "top", // 'top' or 'bottom'
                        position: "right", // 'left', 'center' or 'right'
                        style: {
                            background: "blue",
                        }
                    }).showToast()

                    setTimeout(function () {
                        window.location.reload();
                    }, 500);
                }
            })
        })
    }


    // JOB : decrease qunatity onclick of minus btn and saved in localStorage
    function QuantityMinusBtn() {
        let minusBtn = document.querySelectorAll(".minusBtn")
        minusBtn.forEach(function (currentBtn) {
            currentBtn.addEventListener("click", function () {
                let productId = Number(this.dataset.id);
                let cart = getCartItems()
                let matchedId = cart.find(function (cartId) {
                    return cartId.id === productId
                })
                if (matchedId.quantity > 1) {
                    matchedId.quantity--
                    saveCartItemProducts(cart)
                    Toastify({
                        text: "Quantity updated Successfully",
                        duration: 2000,
                        gravity: "top", // 'top' or 'bottom'
                        position: "right", // 'left', 'center' or 'right'
                        style: {
                            background: "blue",
                        }
                    }).showToast()

                    setTimeout(function () {
                        window.location.reload();
                    }, 500);
                }
            })
        })
    }

    // JOB : rmove item form localStorage
    function removeCartItem() {
        let removeIcon = document.querySelectorAll(".removeIcon")
        removeIcon.forEach(function (currentItem) {
            currentItem.addEventListener("click", function () {
                let cart = getCartItems()
                let productId = Number(this.dataset.id)
                // Why !==? Because you're saying:
                // "Keep everything whose id is not equal to the clicked product."
                let removeItems = cart.filter(function (remove) {
                    return remove.id !== productId
                })
                saveCartItemProducts(removeItems)
                Toastify({
                    text: "Item removed from cart",
                    duration: 2000,
                    gravity: "top", // 'top' or 'bottom'
                    position: "right", // 'left', 'center' or 'right'
                    style: {
                        background: "blue",
                    }
                }).showToast()

                setTimeout(function () {
                    window.location.reload();
                }, 500);
            })
        })
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

    
    let cart = getCartItems()
    let summaryTable = document.getElementById("summaryTable")
    let emptyCart = document.getElementById("emptyCart")
    if (cart.length === 0) {
        emptyCart.innerHTML = ""
        emptyCart.innerHTML = "No items to show in cart : "
    } else {
        emptyCart.innerHTML = ""
        summaryTable.innerHTML = ""
        summaryTable.innerHTML = `
        
         <p class="bold">Sub-Total : <span class="text-success">${totalAmount.toFixed(2)}</span></p>
            <p>GST : <span class="text-danger">${gstBill.toFixed(2)}</span></p>
            <p>Discount : <span class="text-danger">${discountOnBill.toFixed(2)}</span></p>
            <p>Shipping Charges : <span class="text-danger">${shippingOnBill.toFixed(2)}</span></p>
            <div class="line my-2"></div>
            <p>Total : <span class="text-success">${finalAmountofProducts.toFixed(2)}</span></p>
            <button id="checkoutBtn" class="btn btn-primary px-5">CheckOut</button>
        `
    }

    let checkoutBtn = document.getElementById("checkoutBtn")
    checkoutBtn.addEventListener("click" , function(checkout){
        if (cart.length === 0) {
        checkout.disabled = true
    }else{
        checkout.disabled = false
        window.location.href = "./checkout.html"
    }
    })
    

    showAllCartItems();




}

initApp()