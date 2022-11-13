import { menuArray } from './data.js'

document.addEventListener("click", function(e) {
    if (e.target.dataset.add) {
        pushToCheckout(e.target.dataset.add)
        render()
    } else if (e.target.id === 'submit-btn') {
        document.getElementById('modal').style.display = 'inline'
        document.body.classList.add('modal-display')
    } else if (e.target.dataset.remove) {
        deleteItemFromCheckout(e.target.dataset.remove)
        render()
    } else if (e.target.id === 'close-modal') {
        document.getElementById('modal').style.display = "none";    
    }
})

document.getElementById("form").addEventListener("submit", function(e) {

   

    const modal = document.getElementById('modal')
    document.getElementById('submit-btn').disabled = true
    document.getElementById('feed').style.display = 'none'
    
    const formData = new FormData(document.getElementById('form'))
    const name = formData.get('name')

    modal.innerHTML = `
        <div class="modal-inner-full">
            <p>Thank you ${name}, one moment...</p>
        </div>`
            

    setTimeout(() => {
        modal.style.display = 'none'   
        document.getElementById('checkout').innerHTML = `
            <div class="container">
                <div class="checkout-confirmed">
                    <p>Thanks ${name}, your order is on its way!</p>
                </div>
            </div>`
    }, 4000)

    e.preventDefault()
})



const itemBasket = [] // Left outside so it doesn't reset every time pushToCheckout is called // 

function pushToCheckout(item) {
    const targetObj = menuArray.filter(function(product){
        return item === product.name
    })[0]

    if (!itemBasket.includes(targetObj)) {
        itemBasket.push(targetObj)
    }
    return itemBasket
}

function deleteItemFromCheckout(item) {
    const index = itemBasket.findIndex(element => {
    if (element.name === item) {
        return true;
    }
    return false;
    })
    itemBasket.splice(index,1);   
}

function getTotalCost() {

    let sum = 0

    itemBasket.forEach(function(item) {
        sum += item.price
    })

    return sum

}

function getCheckoutHtml() {
    let htmlString = ''

        itemBasket.forEach(function(item) {
            htmlString += `
                <div class="checkout-list-items">
                    <p class="bold">${item.name} <i class="fa-sharp fa-solid fa-trash" data-remove=${item.name}></i></p>
                    <p class="bold">$${item.price}</p> 
                </div>`
        })

    return htmlString

}

function getHtml() {
    let htmlString = ''
    menuArray.forEach(function(item) {
    htmlString += `
        <div class="container">
            <div class="item-outer" id="item-outer">
                <div class='item-inner'>
                    <span class="item-emoji">${item.emoji}</span>
                    <div class='item-detail'>
                        <span id="item-name" class="item-name">${item.name}</span>
                        <span id="item-ingred" class="item-ingred">${item.ingredients}</span>
                        <span id="item-price" class="item-price">$${item.price}</span>
                    </div>
                </div>
                    <i class="fa-solid fa-plus" id="add-${item.name}" data-add=${item.name}></i>
            </div>
        </div>
        `
    })
    return htmlString
}

function renderCheckout() {

    if (itemBasket.length === 0) {

        document.getElementById('checkout').innerHTML = `
            <div class="container">
                <div class="hidden">
                </div>
            </div>`

    } else if (itemBasket.length > 0) {

        document.getElementById('checkout').innerHTML = `
            <div class="container">
                <div class="checkout-items">
                    <h2>Your Order</h2>
                    ${getCheckoutHtml()}
                </div>
                <div class="checkout-items">
                <div class="checkout-list-items total">
                        <p class="bold">Total</p>
                        <p class="bold">$${getTotalCost()}</p>
                    </div>
                <button id="submit-btn" class="submit-btn">Place order</button>
                </div>
            </div>`

    }        

}

function render() {
    document.getElementById('feed').innerHTML = getHtml()
    renderCheckout()
       
}


render()


