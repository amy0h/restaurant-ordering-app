import { menuArray } from './data.js'

const menuContainer = document.getElementById('menu-container')
const orderContainer = document.getElementById('order-container')
const paymentForm = document.getElementById('payment-form')
const resetOrder = document.getElementById('order-container').innerHTML
let cartArray = []

document.addEventListener('click', function(e){
    if (e.target.dataset.add){
        addToCart(e.target.dataset.add)
    }
    else if (e.target.dataset.remove){
        removeFromcart(e.target.dataset.remove)
    }
    else if (e.target.id === 'order-btn'){
        handleOrder()
    }
})

paymentForm.addEventListener('submit', function(e){
    e.preventDefault()
    handlePayment()
})

function handleOrder(){
    document.getElementById('payment-form').style.display = 'flex'
}

function handlePayment(){
    document.getElementById('payment-form').style.display = 'none'
    const userName = document.getElementById('form-name').value
    console.log(userName)
    orderContainer.innerHTML = `
        <div class=payment-message-container>
            <p>
                Thanks, ${userName}! Your order is on its way!
            </p>
        </div>
        `
}

function addToCart(itemId){
    const targetItem = menuArray.find(item => item.id === parseInt(itemId))

    if (targetItem) {
        const existingCartItem = cartArray.find(cartItem => cartItem.id === targetItem.id)
        if (existingCartItem) {
            existingCartItem.itemCount++
        } else {
            const { id, name, price } = targetItem;
            cartArray.push({ id, name, price, itemCount: 1 })
        }
        updateOrder()
    }
}

function updateOrder(){
    cartArray.length !== 0 ? orderContainer.innerHTML = renderOrder() : orderContainer.innerHTML = resetOrder
}

function removeFromcart(itemId){
    const targetItem = cartArray.find(item => item.id === parseInt(itemId))
    
    targetItem.itemCount >= 2
        ? targetItem.itemCount--
        : (cartArray = cartArray.filter(cartItem => cartItem.id != targetItem.id))

    updateOrder()
}

const renderMenu = () => {
    const menuHtml = menuArray.map((menuItem) => {
        return `
            <div id="menu-item" class="menu-item">
                <img class="menu-item-img" src=${menuItem.imgPath}>
                <p class="menu-item-name item-name">${menuItem.name}</p>
                <p class="menu-item-ingredients">${menuItem.ingredients}</p>
                <p class="menu-item-price item-price">$${menuItem.price}</p>
                <button class="menu-item-add" id="${menuItem.id}" data-add="${menuItem.id}">+</button>
            </div>`
    }).join('')

    return menuHtml
}

const renderOrder = () => {
    const cartHtml = cartArray.map(cartItem => {          
        const itemCount = cartItem.itemCount
        const itemName = cartItem.name
        const itemPrice = cartItem.price * itemCount

        return `
            <div class="order-item">
                <span class="order-item-name item-name">${itemName}</span>
                <span class="order-item-count">(${itemCount})</span>
                <span class="order-item-remove" data-remove="${cartItem.id}">remove</span>
                <span class="order-item-price item-price">$${itemPrice}</span>
            </div>`;
    }).join('');

    const orderTotal = cartArray.reduce((total, item) => total + item.price * item.itemCount, 0)
    const orderHtml = `
        <div class="order-container" id="order-container">
            <h3 class="order-title center-text">Your order</h3>
            ${cartHtml}
            <div class="order-total">Total price: <span class="total-price item-price">$${orderTotal}</span></div>
            <button class="order-btn" id="order-btn">Complete order</button>
        </div>`
    
    return orderHtml
}

menuContainer.innerHTML = renderMenu()
