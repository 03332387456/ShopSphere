function initApp() {
    console.log("Application started")

    // JOB : Get selected product (for show product details) form localStorage
    function ShowAllProducts() {
        let selected = getSelectedProduct()
        if (!selected) {
            window.location.href = "./index.html"
        } else {
            let productDetails = document.getElementById("productDetails")
            productDetails.innerHTML = ""
            productDetails.innerHTML = `
   <div class="row d-flex g-5">
                <div class="col-md-6">
                    <img src="${selected.image}"
                        class="img-thumbnail productImage" alt=${selected.title}>
                </div>
                <div class="col-md-6">
                    <h4 class="name fw-bold mb-1">Product Name : ${selected.title}</h4>
                    <p class="categoryOfProduct text-muted  small mb-1">Category: <span>${selected.category}</span></p>
                    <p class="categoryOfProduct text-dark small mb-1">Id: <span>${selected.id}</span></p>
                    <p class="ratings mb-1">Ratings : <span class="badge bg-warning text-dark">${selected.rating.rate} <i
                                class="fa-solid fa-star"></i></span></p>
                    <p class="price mb-1">Reviews : <span class="fw-bold text-primary">${selected.rating.count}</span></p>
                    <p class="price mb-1">Price : <span class="fw-bold text-primary">${selected.price}$</span></p>
                    <p class="price mb-1">GST on Product : <span class="fw-bold text-primary">10%</span></p>
                    <p class="price mb-1">Discount on Product : <span class="fw-bold text-danger">8%</span></p>
                    <p class="price mb-1">Final Price : <span class="fw-bold text-success">150,000</span></p>
                    <p class="stock mb-3">Stock Status : <span class="text-success fw-semibold">
                            Available </span></p>
                    <p class="title"><strong>Description : </strong> ${selected.description}</p>
                        

                    <div class="row mt-auto border-top border-bottom pt-3">
                        <div class="col-6 border-end">
                            <button id="wishListIcon" class="wishListbtn border-none"><p class="text-danger small">
                                <i class="fa-regular fa-heart d-block fs-5 mb-1 icon"></i>Add to Wishlist
                            </p></button>
                        </div>
                        <div class="col-6 px-3">
                         <button class="cartItembtn text-primary small" id="cartItembtn" >
                            <i class="fa-solid fa-bag-shopping d-block fs-5 mb-1 icon"></i>Add to Cart
                        </button>
                        </div>
                    </div>


                </div>
            </div>
   `

        }


        // JOB : save items in wishlist also check duplicate  
        function wishListIcon() {
            let wishListIcon = document.getElementById("wishListIcon")
            wishListIcon.addEventListener('click', function () {
                let getWishListProduct = getWishListProducts()
                let matchedId = getWishListProduct.find(function (wishlistProduct) {
                    return wishlistProduct.id === selected.id
                })
                if (matchedId) {
                    Toastify({
                        text: "This items is also in wishList - try another item",
                        duration: 2000,
                        gravity: "top", // 'top' or 'bottom'
                        position: "right", // 'left', 'center' or 'right'
                        style: {
                            background: "red",
                        }
                    }).showToast();
                    return
                } else {
                    getWishListProduct.push(selected)
                    saveWishListProducts(getWishListProduct)
                    Toastify({
                        text: "Successfully Added in Wishlist",
                        duration: 2000,
                        gravity: "top", // 'top' or 'bottom'
                        position: "right", // 'left', 'center' or 'right'
                        style: {
                            background: "blue",
                        }
                    }).showToast();
                }
            })
        }
        wishListIcon()



        // JOB : when we click on cart icon it add items in cart if item already exist increase qunatity otherwise add qunatity 1 
        function cartIcon() {
            let cartItembtn = document.getElementById("cartItembtn")
            cartItembtn.addEventListener("click", function () {
                let cartItems = getCartItems()
                let checkedId = cartItems.find(function (cart) {
                    return cart.id === selected.id
                })
                // this check if quantity exist then increment by 1 in quantity
                if (checkedId) {
                    checkedId.quantity++;
                    // this creates a new obeject with new property name as quantity 
                } else {
                    let newProduct = {
                        ...selected,
                        quantity: 1
                    };
                    cartItems.push(newProduct);
                }
                saveCartItemProducts(cartItems)
                Toastify({
                        text: "Check Your Cart - Item saved",
                        duration: 2000,
                        gravity: "top", // 'top' or 'bottom'
                        position: "right", // 'left', 'center' or 'right'
                        style: {
                            background: "blue",
                        }
                    }).showToast();
            })
        }
        cartIcon()
    }

    ShowAllProducts()

}
initApp()

