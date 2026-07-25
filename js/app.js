// JOB : only show message : Application started 
async function initApp() {
    console.log("Application started")


    // JOB : fetch produncts from Api 
    async function fetchProducts() {
        try {
            let response = await fetch("./data/products.json")
            let products = await response.json()
            return products
        } catch (error) {
            console.log(error)
        }
    }


    // JOB : check if data exist load else fecth from api then load then save in localStorage 
    async function loadProducts() {
        let products = getProducts()
        if (products) {
            return products
        } else {
            let fetchedProducts = await fetchProducts()
            if (!fetchedProducts) {
                return
            } else {
                saveProducts(fetchedProducts)
                return fetchedProducts
            }
        }
    }

    let products = await loadProducts();
    let currentProducts = [...products];
    if (!products) {
        return
    } else {
        // JOB : render all products only on web page 
        function renderProducts(products) {
            const productsContainer = document.getElementById("productsCard");
            productsContainer.innerHTML = ""
            products.forEach(function (currentProduct) {
                productsContainer.innerHTML += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                        <div class="product-card h-100 p-3">
                            <div class="img-wrapper mb-3">
                                <img src="${currentProduct.image}" alt="Laptop"
                                    class="img-fluid">
                            </div>
                            <p class="name fw-bold mb-1">Title : ${currentProduct.title}</p>
                            <p class="categoryOfProduct text-muted small mb-1">Category: <span>${currentProduct.category}</span></p>
                             <p class="text-muted small mb-1">ID : <span>${currentProduct.id}</span></p>
                            <p class="price mb-1">Price: <span class="fw-bold text-primary">$${currentProduct.price}</span></p>
                            <p class="ratings mb-1">Ratings: <span class="badge bg-warning text-dark">${currentProduct.rating.rate} <i
                                        class="fa-solid fa-star"></i></span></p>
                            <p class="stock mb-3">Reviews on Product: <span class="text-success fw-semibold">
                                    ${currentProduct.rating.count}</span></p>

                            <!-- Action Buttons Wrap -->
                            <div class="row g-2 border-top pt-5">
                                <div class="col-6 border-end">
                                     <button data-id="${currentProduct.id}" class="wishListbtn wishListIcon border-none"><p class="text-danger small">
                                <i class="fa-regular fa-heart d-block fs-5 mb-1 icon"></i>Add to Wishlist
                            </p></button>
                                </div>
                                <div class="col-6">
                        <button data-id="${currentProduct.id}" class="cartItembtn text-primary small" >
                            <i class="fa-solid fa-bag-shopping d-block fs-5 mb-1 icon"></i>Add to Cart
                        </button>
                                </div>
                            </div>
                           <div class="text-center">
                        <button
                            type="button"
                            class="checkDetailsBtn btn btn-primary px-5 mt-2"
                            data-id="${currentProduct.id}">
                            View Details
                        </button>
                        </div>
                        </div>
                    </div>
            `
            })
            currentProducts = [...products];
        }


        // JOB: Attach click events to all "View Details" buttons to get the current clicked button 
        function viewDetailsofProduct(products) {
            let checkDetailsBtns = document.querySelectorAll(".checkDetailsBtn");
            checkDetailsBtns.forEach(function (product) {

                product.addEventListener("click", function () {

                    // JOB: Read product id from the clicked button
                    let productId = Number(this.dataset.id)

                    // JOB: Find the matching product object
                    let matchedProduct = products.find(function (product) {
                        return product.id === productId
                    })
                    saveSelectedProduct(matchedProduct);
                    window.location.href = "./productDetails.html"
                })
            })
        }


        //JOB : search method search products by any single word / Alphabet if match give else show All products  
        let searchText = document.getElementById("SearchBar");
        searchText.addEventListener("input", function () {
            let searchValue = this.value.toLowerCase().trim();
            if (searchValue === "") {
                renderProducts(products);
                return;
            }
            let filteredProducts = products.filter(function (product) {
                return product.title.toLowerCase().includes(searchValue);
            });
            renderProducts(filteredProducts);
            viewDetailsofProduct(products)
            wishListIcon()
            cartIcon()
        });


        // JOB : this filter products by categorey not in dropDown in li  
        function categoreyFilter() {
            let categories = document.querySelector(".categories")
            categories.addEventListener("click", function (e) {
                // e.target.closest("li") its always find li no matter what is inside image and other thing 
                let dataCategory = e.target.closest("li").dataset.category
                let filterProductsByCategorey = products.filter(function (clickCategorey) {
                    return clickCategorey.category === dataCategory
                })
                renderProducts(filterProductsByCategorey);
                viewDetailsofProduct(products)
                wishListIcon()
                cartIcon()
            })
        }
        categoreyFilter()


        // JOB : this filter products by categorey not in dropDown - All Categories the Api contain    
        function allcategories() {
            let ulOfDropDown = document.querySelector(".ulOfDropDown")
            ulOfDropDown.addEventListener("click", function (e) {
                let dataCategory = e.target.closest("a").dataset.category
                let filterProductsByCategorey = products.filter(function (clickCategorey) {
                    return clickCategorey.category === dataCategory
                })
                renderProducts(filterProductsByCategorey);
                viewDetailsofProduct(products)
                wishListIcon()
                cartIcon()
            })
        }
        allcategories()


        // JOB : Sort price from low to high from high to low
        function sortPrice() {
            let PriceSort = document.querySelector(".PriceSort");
            PriceSort.addEventListener("click", function (e) {

                // JOB : in (a) it take first obj and in (b) it takes second obj then minus a to b which one is lesser is low and otherwise high same as els method 

                let priceSorting = e.target.closest("a").dataset.sort;
                if (priceSorting === "LowtoHigh") {
                    let sortLowToHigh = currentProducts.sort(function (a, b) {
                        return a.price - b.price;
                    });
                    renderProducts(sortLowToHigh);
                    viewDetailsofProduct(products)
                } else {
                    let sortHighToLow = currentProducts.sort(function (a, b) {
                        return b.price - a.price;
                    });
                    renderProducts(sortHighToLow);
                    viewDetailsofProduct(products)
                    wishListIcon()
                    cartIcon()
                }
            });
        }
        sortPrice();



        // JOB : this function is for ratings if ratings grater than 4 than show grater than 4 else less than 4 
        function ratings() {
            let ratings = document.querySelector(".ratings")
            ratings.addEventListener("click", function (e) {
                let productRating = e.target.closest("a").dataset.rating;
                let filterRatings = currentProducts.filter(function (checkRatings) {
                    if (productRating === "Greater") {
                        return checkRatings.rating.rate > 4
                    } else if (productRating === "lesser") {
                        return checkRatings.rating.rate < 4
                    }
                })
                renderProducts(filterRatings);
                viewDetailsofProduct(products)
                wishListIcon()
                cartIcon()
            })
        }
        ratings()

        // JOB filter price by range 
        function priceFilter() {
            let priceFiltersList = document.querySelector(".priceFiltersList")
            priceFiltersList.addEventListener("click", function (e) {
                let getDataOFList = e.target.closest("a").dataset.price
                let filterPriceRange = currentProducts.filter(function (priceOfProduct) {
                    if (getDataOFList === "100-200") {
                        return priceOfProduct.price > 100 && priceOfProduct.price <= 200
                    } else if (getDataOFList === "200-300") {
                        return priceOfProduct.price > 200 && priceOfProduct.price <= 300
                    } else if (getDataOFList === "300-500") {
                        return priceOfProduct.price > 300 && priceOfProduct.price <= 500
                    } else if (getDataOFList === "500+") {
                        return priceOfProduct.price > 500
                    }
                })
                renderProducts(filterPriceRange);
                viewDetailsofProduct(products)
                wishListIcon()
                cartIcon()
            })
        }
        priceFilter()

        // JOB : save items in wishlist also check duplicate  
        function wishListIcon() {
            let wishListBtns = document.querySelectorAll(".wishListIcon");

            wishListBtns.forEach(function (currentBtn) {

                currentBtn.addEventListener("click", function () {

                    let wishList = getWishListProducts();

                    let productId = Number(this.dataset.id);

                    // Find the clicked product
                    let selectedProduct = products.find(function (product) {
                        return product.id === productId;
                    });

                    // Check duplicate
                    let alreadyExists = wishList.find(function (item) {
                        return item.id === productId;
                    });

                    if (alreadyExists) {
                        Toastify({
                            text: "This item is already in your wishlist.",
                            duration: 2000,
                            gravity: "top",
                            position: "right",
                            style: {
                                background: "red",
                            }
                        }).showToast();

                        return;
                    }

                    // Save the product object
                    wishList.push(selectedProduct);
                    saveWishListProducts(wishList);

                    Toastify({
                        text: "Successfully added to wishlist.",
                        duration: 2000,
                        gravity: "top",
                        position: "right",
                        style: {
                            background: "blue",
                        }
                    }).showToast();
                });

            });
        }

        // JOB : save cart also check duplicate in cart if duplicate just increase quantity    
        function cartIcon() {
            let cartItembtn = document.querySelectorAll(".cartItembtn")

            cartItembtn.forEach(function (currentBtn) {

                currentBtn.addEventListener("click", function () {

                    let cartItems = getCartItems()
                    let productId = Number(this.dataset.id);

                    // Find the clicked product for add in cart
                    let selectedProductforCart = products.find(function (product) {
                        return product.id === productId;
                    });

                    // check if this item already exist in the cart
                    let checkedId = cartItems.find(function (cart) {
                        return cart.id === productId
                    })
                    if (checkedId) {
                        checkedId.quantity++;
                        // this creates a new obeject with new property name as quantity 
                    } else {
                        let newProduct = {
                            ...selectedProductforCart,
                            quantity: 1
                        };
                        cartItems.push(newProduct);
                    }
                    saveCartItemProducts(cartItems)
                    Toastify({
                        text: "Item saved - Check Your Cart ",
                        duration: 2000,
                        gravity: "top", // 'top' or 'bottom'
                        position: "right", // 'left', 'center' or 'right'
                        style: {
                            background: "blue",
                        }
                    }).showToast();

                }
                )
            })
        }

        //JOB:  same for filtering  we reset every thing when we reCall functions so it creates new buttons alos new cards for this  
        function reset() {
            let resetBtn = document.getElementById("reset")
            resetBtn.addEventListener("click", function () {
                renderProducts(products)
                viewDetailsofProduct(products)
            })
        }



        renderProducts(products)
        viewDetailsofProduct(products)
        wishListIcon()
        cartIcon()
        reset()
    }

}

initApp()


