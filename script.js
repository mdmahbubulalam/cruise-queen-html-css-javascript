//Handle increase and decrease ticket count.
function handleTicketCategory(ticketCategory, isIncrease) {
    const countNumber = getInputValue(ticketCategory);

    let ticketCount = 0;
    if (isIncrease == true) {
        ticketCount = countNumber + 1;
    } else if (isIncrease == false && countNumber > 0) {
        ticketCount = countNumber - 1;
    }

    document.getElementById(ticketCategory + 'Ticket').value = ticketCount;
    totalOutput();
}

//Showing output of total price, vat and grand total.
function totalOutput() {
    const totalPrice = calculateTotalPrice();
    document.getElementById('subtotal').innerText = '$' + totalPrice;

    const vatAmount = calculateTotalVat();
    document.getElementById('vat').innerText = '$' + vatAmount;

    const grandTotal = calculateGrandTotal();
    document.getElementById('total').innerText = '$' + grandTotal;
}

//Calculate and return the total price.
function calculateTotalPrice() {
    const firstClassCount = getInputValue('firstClass');
    const economyCount = getInputValue('economy');
    const totalPrice = firstClassCount * 150 + economyCount * 100;
    return totalPrice;
}

//Calculate and return the vat amount.
function calculateTotalVat() {
    const totalPrice = calculateTotalPrice();
    const vatAmount = totalPrice * 0.1;
    return vatAmount;
}

//Calculate and return the grand total.
function calculateGrandTotal() {
    const totalPrice = calculateTotalPrice();
    const vatAmount = calculateTotalVat();
    const grandTotal = totalPrice + vatAmount;
    return grandTotal;
}

//Get values as a parameter, convert and return these values.  
function getInputValue(ticketCategory) {
    const ticketInput = document.getElementById(ticketCategory + 'Ticket').value;
    const countNumber = parseInt(ticketInput);
    return countNumber;
}

//Handle Book Now button and through a message after clicking on it.
function handleBookNowBtn() {
    const firstClassCount = getInputValue('firstClass');
    const economyCount = getInputValue('economy');
    const totalPrice = calculateTotalPrice();
    const vatAmount = calculateTotalVat();
    const grandTotal = calculateGrandTotal();

    let message = document.getElementById('putMessage');
    if ((firstClassCount < 0 || economyCount < 0) || (firstClassCount == '' || economyCount == '')) {
        message.innerText = "Seat quantity cannot be negative or blank.";
        message.style.color = 'goldenrod';
    }
    if (firstClassCount == 0 && economyCount == 0) {
        message.innerText = "Please select seat quantity.";
        message.style.color = 'red';
        totalOutput();
    }
    if (firstClassCount > 0 || economyCount > 0) {
        message.innerText = "Thanks for the booking.\n You have booked " + firstClassCount +
            " first class and " + economyCount + " economy class ticket.\n Total Price - $" + totalPrice +
            ".\n Charge 10% VAT - $" + vatAmount + ".\n Grand Total - $" + grandTotal + '.';
        message.style.color = 'green';
        totalOutput();
    }
}