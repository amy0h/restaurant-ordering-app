import { menuArray } from './data.js'

const menuContainer = document.getElementById('menu-container')

const renderMenu = () => {
    const menuHtml = menuArray.map((item) => {
        return `
            <div id="menu-item" class="menu-item">
                <img class="item-img" src=${item.img}>
                <h3 class="item-name">${item.name}</h3>
                <p class="item-ingredients">${item.ingredients}</p>
                <p class="item-price">$${item.price}</p>
                <button class="item-add" id="item-add">+</button>
            </div>`
    }).join('')

    return menuHtml
}

menuContainer.innerHTML = renderMenu()