function initApp() {

    let orderDetails = document.getElementById("orderDetails")
    let productsCard = document.getElementById("productsCard")

    function showOrders() {

        let getOrder = getAllOrders()

        let getonlyOneItem = getOrder[getOrder.length - 1]

        orderDetails.innerHTML = ""

        orderDetails.innerHTML += `
       

                <div class="d-flex justify-content-between mb-2">
                    <span>Customer</span>
                    <strong id="customerName">${getonlyOneItem.orderId}</strong>
                </div>

                <div class="d-flex justify-content-between mb-2">
                    <span>Customer</span>
                    <strong id="customerName">${getonlyOneItem.customerDetails.fullName}</strong>
                </div>

                <div class="d-flex justify-content-between mb-2">
                    <span>Email</span>
                    <strong id="customerEmail">${getonlyOneItem.customerDetails.email}</strong>
                </div>

                <div class="d-flex justify-content-between mb-2">
                    <span>Payment Method</span>
                    <strong id="paymentMethod">${getonlyOneItem.customerDetails.paymentMethod}</strong>
                </div>

                <div class="d-flex justify-content-between mb-2">
                    <span>Order Date</span>
                    <strong id="orderDate">${getonlyOneItem.orderDate}</strong>
                </div>

                <div class="d-flex justify-content-between mb-3">
                    <span>Grand Total</span>
                    <strong class="text-success" id="grandTotal">${getonlyOneItem.summary.finalAmountofProducts.toFixed(2)}</strong>
                </div>
                <hr/>      `
    }

    function showOrderdProducts() {

        let getOrder = getAllOrders()

        let getonlyOneItem = getOrder[getOrder.length - 1]

        productsCard.innerHTML = ""
        getonlyOneItem.AllProducts.forEach(function (currentitem) {
            productsCard.innerHTML += `
    
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 ">
                        <div class="product-card h-100 p-3 border border-dark rounded">
                            <div class="img-wrapper border p-1 mb-3">
                                <img src="${currentitem.image}" alt="${currentitem.title}"
                                    class="img-fluid">
                            </div>
                            <p class="name fw-bold mb-1">Name: ${currentitem.title}</p>
                            <p class="price mb-1">Price: <span class="fw-bold text-dark">${currentitem.price}</span></p>
                           <p class="price mb-1">Quantity : <span class="fw-bold text-dark">${currentitem.quantity}</span></p>
                           <hr/>
                           <p class="price mb-1">Total Amount :<span class="fw-bold text-success">${currentitem.quantity * currentitem.price}</span></p>
                          
                        </div>
                    </div>
    `
        })

    }
    showOrderdProducts()



    showOrders()

}
initApp()