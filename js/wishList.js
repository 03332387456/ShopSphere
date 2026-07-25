function initApp(){
    console.log("Application Start")

    // JOB : show all wishlist products in card form   
    let ShowEmptyMessage = document.getElementById("ShowEmptyMessage")
    function showAllProducts(){
        let getWishList = getWishListProducts()
        let showProductsInTable = document.getElementById("showProductsInTable")
        showProductsInTable.innerHTML = ""
        if (getWishList.length === 0) {
            ShowEmptyMessage.innerHTML = ""
            ShowEmptyMessage.innerHTML = "wishlist is empty - Go and Add Products"
        }else{
            ShowEmptyMessage.innerHTML = ""
            getWishList.forEach(function(currentProduct){
                showProductsInTable.innerHTML += `
                       <tr>
                            <th scope="row">1</th>
                            <td><img class="productImage"
                                    src="${currentProduct.image}" alt="${currentProduct.title}"></td>
                            <td>${currentProduct.title}</td>
                            <td>${currentProduct.price}</td>
                            
                            <td class="text-nowrap"><button data-id="${currentProduct.id}" class="AddtoCartIcon">Add to cart <span class="px-2"><i
                            class="fa-solid fa-cart-arrow-down cart"></i></span></button></td>
                            <td><button data-id="${currentProduct.id}" class="removeBtn"><i class="fa-solid fa-trash trashIcon"></i></button></td>
                        </tr>
                `
            })
        }

    }

// JOB : Remove item onclick of remove icon  
    function removeProduct(){
        let getWishList = getWishListProducts()
        let removeBtn = document.querySelectorAll(".removeBtn")
        removeBtn.forEach(function(remove){
            remove.addEventListener("click" , function(){
                let RemoveProductId = Number(this.dataset.id)
                let removeItems = getWishList.filter(function(remove){
                    return remove.id !== RemoveProductId
                })
                saveWishListProducts(removeItems)
                showAllProducts()
                removeProduct()
                 Toastify({
                        text: "Item removed Successfully",
                        duration: 2000,
                        gravity: "top", // 'top' or 'bottom'
                        position: "right", // 'left', 'center' or 'right'
                        style: {
                            background: "blue",
                        }
                    }).showToast()
            })
        })
    }

    // JOB : save cart also check duplicate in cart if duplicate just increase quantity    
        function cartIcon() {
              let getWishList = getWishListProducts()
            let AddtoCartIcon = document.querySelectorAll(".AddtoCartIcon")

            AddtoCartIcon.forEach(function (currentBtn) {

                currentBtn.addEventListener("click", function () {

                    let cartItems = getCartItems()

                    let productId = Number(this.dataset.id);

                    // Find the clicked product for add in cart
                    let selectedProductforCart = getWishList.find(function (product) {
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


        showAllProducts()
        removeProduct()
        cartIcon()



}
initApp()

