document.addEventListener('DOMContentLoaded', function() {
    const cartContent = document.querySelector('.cart_content');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Function to display cart items
    function displayCartItems() {
        if (cartContent) {
            cartContent.innerHTML = '';
            if (cartItems.length === 0) {
                cartContent.innerHTML = '<p>Your cart is empty.</p>';
            } else {
                cartItems.forEach((item, index) => {
                    const cartItem = document.createElement('div');
                    cartItem.classList.add('cart-card');
                    cartItem.innerHTML = `
                        <div class="card" style="width: 18rem;">
                            <img src="${item.photo}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title"><b>${item.name}</b></h5>
                                <h5 class="card-text">${item.price}</h5>
                                <a href="#" class="btn btn-primary remove-from-cart" data-index="${index}">Remove</a>
                            </div>
                        </div>
                    `;
                    cartContent.appendChild(cartItem);
                });
            }
        }
    }
    // console.log(item.price);
    // Display cart items on page load
    displayCartItems();

    // Event listener for removing items from the cart
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            cartItems.splice(index, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            location.reload(); // Reload the page to update the cart content
        });
    });

    // Event listener for adding items to the cart
    document.querySelectorAll('.cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const product = this.parentElement;
            const name = product.querySelector('h3').textContent;
            const photo = product.querySelector('img').src;
            const price = product.querySelector('.price').textContent;

            addToCart(name, photo, price);
        });
    });
    let amount=0;
    let noItems=0
    // Function to add documentitems to the cart
    function addToCart(name, photo, price) {
        const item = { name, photo, price };
        cartItems.push(item);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        amount=amount+parseFloat(item.price.slice(1));
        noItems=noItems+1;
    }
    const billVar=document.getElementsByClassName("Bill");
    itemsVar=billVar.querySelector(".noof_items")

    console.log(noItems)
});
