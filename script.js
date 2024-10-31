const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("convertedAmount");

// Define 10 currencies
const currencies = [
    { code: "USD", symbol: "$", name: "United States Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "AUD", symbol: "A$", name: "Australian Dollar" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
    { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
    { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
    { code: "SGD", symbol: "S$", name: "Singapore Dollar" }
];

// Populate currency dropdowns
currencies.forEach(currency => {
    const optionFrom = document.createElement("option");
    const optionTo = document.createElement("option");

    optionFrom.value = currency.code;
    optionFrom.text = `${currency.name} (${currency.symbol})`;
    optionTo.value = currency.code;
    optionTo.text = `${currency.name} (${currency.symbol})`;

    fromCurrency.appendChild(optionFrom);
    toCurrency.appendChild(optionTo);
});

function convertCurrency() {
    const amount = amountInput.value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (amount && from && to) {
        fetch(`https://v6.exchangerate-api.com/v6/2b8ad6211677c0509e5bf336/pair/${from}/${to}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.conversion_rate;
                const convertedAmount = (amount * rate).toFixed(2);
                result.innerText = `${convertedAmount} ${to}`;
            })
            .catch(error => console.log('Error fetching conversion:', error));
    } else {
        result.innerText = "Please fill in all fields.";
    }
}
