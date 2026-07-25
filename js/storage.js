// JOB : this function is saving products in localStorage
function saveProducts(products){
    let strings = JSON.stringify(products)
    localStorage.setItem("products" , strings)
}



// JOB : this function is only checking saved and getting products form localStorage
function getProducts(){
let products = localStorage.getItem("products");
    if (!products) {
        return null
    }else{
        let parseProducts = JSON.parse(products)
        return parseProducts
    }
}





// JOB : this function is save only clicked products in localStorage for (view details page)
function saveSelectedProduct(clickedProduct){
    let getClickedProducts = JSON.stringify(clickedProduct)
    localStorage.setItem("ClickedProducts" , getClickedProducts)
}



// JOB : Get the selected product from localStorage.
function getSelectedProduct(){
    let onlyOneProduct = localStorage.getItem("ClickedProducts")
    if (!onlyOneProduct) {
        return null
    }else{
        let parseObj = JSON.parse(onlyOneProduct)
        return parseObj
    }
}


// JOB : get the wishList items form localStorage for productDetails file also show all products in wishlish file.
function getWishListProducts(){
    let wishListProduct = localStorage.getItem("wishlist")
    if (!wishListProduct) {
        return []
    }else{
        let parsewishlist = JSON.parse(wishListProduct)
        return parsewishlist
    }
}


// JOB : save wishList items in localStorage from productDetails file and also render .
function saveWishListProducts(parsewishlist){
    let wishlistSavedItems = JSON.stringify(parsewishlist)
    localStorage.setItem("wishlist" , wishlistSavedItems)
}





// JOB : get the cart items form localStorage
function getCartItems (){
     let cartProduct = localStorage.getItem("cart")
    if (!cartProduct) {
        return []
    }else{
        let parseCart = JSON.parse(cartProduct)
        return parseCart
    }
}



// JOB : save cart items in localStorage .
function saveCartItemProducts(parseCart){
    let cartSavedItems = JSON.stringify(parseCart)
    localStorage.setItem("cart" , cartSavedItems)
}



// JOB : get the orderd items form localStorage
function getAllOrders (){
     let orders = localStorage.getItem("orders")
    if (!orders) {
        return []
    }else{
        let parseOrder = JSON.parse(orders)
        return parseOrder
    }
}



// JOB : save orders items in localStorage .
function saveOrders(parseOrder){
    let SavedOrders = JSON.stringify(parseOrder)
    localStorage.setItem("orders" , SavedOrders)
}

