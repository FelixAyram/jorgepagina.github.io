// script.js
document.addEventListener("DOMContentLoaded", function() {
    fetchData();
});

function fetchData() {
    fetch("https://api2.bybit.com/fiat/otc/item/online", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Referer": "https://www.bybit.com/",
            "Origin": "https://www.bybit.com",
            "Accept": "application/json",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "en",
            "Cookie": "Tus cookies aquí",
        },
        body: JSON.stringify({
            userId: "",
            tokenId: "USDT",
            currencyId: "ARS",
            payment: ["129"], 
            side: "0", 
            size: "10",
            page: "1",
            amount: "40000",
            authMaker: false,
            canTrade: false
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        displayData(data.result.items);
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
}

function displayData(items) {
    const container = document.getElementById("items-container");
    container.innerHTML = "";

    items.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");

        const title = document.createElement("h2");
        title.textContent = item.nickName;
        itemDiv.appendChild(title);

        const paymentMethods = document.createElement("p");
        paymentMethods.classList.add("payment-methods");
        paymentMethods.textContent = "Métodos de pago: " + item.payments.join(", ");
        itemDiv.appendChild(paymentMethods);

        const minAmount = document.createElement("p");
        minAmount.textContent = "Cantidad mínima: " + item.minAmount;
        itemDiv.appendChild(minAmount);

        const maxAmount = document.createElement("p");
        maxAmount.textContent = "Cantidad máxima: " + item.maxAmount;
        itemDiv.appendChild(maxAmount);

        const price = document.createElement("p");
        price.textContent = "Precio: " + item.price;
        itemDiv.appendChild(price);

        container.appendChild(itemDiv);
    });
}
