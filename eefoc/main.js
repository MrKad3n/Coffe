let cart = [];

function formatCost(cost) {
    return `$${cost.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('#buy .CheckItem');

    items.forEach(item => {
        const button = item.querySelector('button');
        button.addEventListener('click', function () {
            const figure = item.querySelector('figure');
            const img = figure.querySelector('img').getAttribute('src');
            const caption = figure.querySelector('figcaption').textContent;

            const nameMatch = caption.match(/^(.+?)\s*Cost:/);
            const costMatch = caption.match(/Cost:\$([\d.]+)/);

            const name = nameMatch ? nameMatch[1].trim() : 'Unknown';
            const cost = costMatch ? parseFloat(costMatch[1]) : 0;

            cart.push({ name, cost, img });
            updateCheckout();
        });
    });

    // Clear cart button
    const clearBtn = document.querySelector('#checkout button:last-of-type');
    clearBtn.addEventListener('click', function () {
        cart = [];
        updateCheckout();
    });

    updateCheckout();
});

function updateCheckout() {
    const checkoutSection = document.querySelector('#checkout');
    const priceDisplay = checkoutSection.querySelector('p');
    const itemsDiv = checkoutSection.querySelector('.items');

    if (!itemsDiv) {
        const newItemsDiv = document.createElement('div');
        newItemsDiv.className = 'items';
        checkoutSection.insertBefore(newItemsDiv, priceDisplay);
    }

    const itemsContainer = checkoutSection.querySelector('.items');
    itemsContainer.innerHTML = '<h2>Items:</h2>';

    let total = 0;

    cart.forEach((item, idx) => {
        total += item.cost;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'checkout-item';
        itemDiv.innerHTML = `
            <img src="${item.img}" alt="${item.name}" style="height:40px;vertical-align:middle;">
            <span><b>${item.name}</b> - ${formatCost(item.cost)}</span>
            <button type="button" data-idx="${idx}" style="margin-left:10px;">Remove</button>
        `;

        itemDiv.querySelector('button').addEventListener('click', function () {
            cart.splice(idx, 1);
            updateCheckout();
        });

        itemsContainer.appendChild(itemDiv);
    });

    priceDisplay.textContent = `Price: ${formatCost(total)}`;
}
