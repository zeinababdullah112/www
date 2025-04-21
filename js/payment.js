function processPayment() {
    let cardNumber = document.getElementById("cardNumber").value;
    let expiryMonth = document.getElementById("expiryMonth").value;
    let expiryYear = document.getElementById("expiryYear").value;
    let cvv = document.getElementById("cvv").value;
    let message = document.getElementById("message");

    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
        message.style.color = "red";
        message.innerText = "Invalid card number";
        return;
    }
    if (expiryMonth === "" || expiryYear === "") {
        message.style.color = "red";
        message.innerText = "Invalid expiry date";
        return;
    }
    if (cvv.length !== 3 || isNaN(cvv)) {
        message.style.color = "red";
        message.innerText = "Invalid CVV";
        return;
    }

    message.style.color = "green";
    message.innerText = "Payment Successful!";
}
