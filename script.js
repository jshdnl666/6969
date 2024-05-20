document.addEventListener('DOMContentLoaded', () => {
    const cartSummaryTable = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price').querySelector('span');
    const checkoutForm = document.getElementById('checkout-form');
    const nameInput = document.getElementById('name');
    const addressInput = document.getElementById('address');
    const contactNumberInput = document.getElementById('contact-number');
    const amountTenderedInput = document.getElementById('amount-tendered');
    const addToCartButtons = document.getElementsByClassName('add-to-cart');
    const clearCartButton = document.getElementById('clear-cart');
    const checkoutButton = document.querySelector('button[type="submit"]');
    let cartItems = [];

    for (let button of addToCartButtons) {
        button.addEventListener('click', function() {
            const productName = this.parentElement.querySelector('.pname h3').innerText;
            const productPrice = parseFloat(this.parentElement.querySelector('.pname h5').innerText.replace('₱', '').replace(',', ''));
            addToCart(productName, productPrice);
        });
    }

    function addToCart(productName, productPrice) {
        const existingProductIndex = cartItems.findIndex(item => item.productName === productName);

        if (existingProductIndex !== -1) {
            cartItems[existingProductIndex].quantity++;
        } else {
            cartItems.push({ productName, quantity: 1, productPrice });
        }

        updateCartSummary();
    }

    function updateCartSummary() {
        let totalPrice = 0;
        let cartItemsHTML = '';

        cartItems.forEach(item => {
            let itemTotal = item.quantity * item.productPrice;
            cartItemsHTML += `<tr>
                                <td>${item.productName}</td>
                                <td>${item.quantity}</td>
                                <td>₱${item.productPrice.toFixed(2)}</td>
                                <td>₱${itemTotal.toFixed(2)}</td>
                            </tr>`;
            totalPrice += itemTotal;
        });

        cartSummaryTable.innerHTML = cartItemsHTML;
        totalPriceElement.textContent = `₱${totalPrice.toFixed(2)}`;
    }

    clearCartButton.addEventListener('click', () => {
        cartItems = [];
        updateCartSummary();
    });

    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = nameInput.value;
        const address = addressInput.value;
        const contactNumber = contactNumberInput.value;
        const amountTendered = parseFloat(amountTenderedInput.value);
        const totalPrice = parseFloat(totalPriceElement.textContent.replace('₱', '').replace(',', ''));

        if (!name || !address || !contactNumber || isNaN(amountTendered)) {
            alert('Please complete all the fields.');
            return;
        }

        if (amountTendered < totalPrice) {
            alert('The amount tendered is not enough to cover the total price.');
            return;
        }

        const change = amountTendered - totalPrice;

        alert(`Order Summary:
            Name: ${name}
            Address: ${address}
            Contact Number: ${contactNumber}
            Total Price: ₱${totalPrice.toFixed(2)}
            Amount Tendered: ₱${amountTendered.toFixed(2)}
            Change: ₱${change.toFixed(2)}`);

        checkoutButton.remove();
        clearCartButton.click(); 
    });
});
