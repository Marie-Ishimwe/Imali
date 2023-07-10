// Get user input
let priceInput = document.querySelector('#price');
let paymentInput = document.querySelector('#payment');
let interestInput = document.querySelector('#interest');
let durationInput = document.querySelector('#duration');

// Error message elements
let priceError = document.querySelector('#price-error');
let paymentError = document.querySelector('#payment-error');
let interestError = document.querySelector('#interest-error');
let durationError = document.querySelector('#duration-error');

// Submit button
const btn = document.querySelector('#submit-btn');

const monPayment = document.querySelector('#monthly-payment');
const totalAmount = document.querySelector('.total-payment');
const totalInterest = document.querySelector('.total-interest');

let principal, monthlyRate, totalPayments;

window.onload = function () {
  priceInput.focus();
  monPayment.innerHTML = "0.00 RWF";
  totalAmount.innerHTML = "0.00 RWF";
  totalInterest.innerHTML = "0.00 RWF";
};

const calculateMortgage = () => {
  // Calculate mortgage monthly payment
  let monthlyPayment = (principal * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -totalPayments));
  return monthlyPayment;
};

const updateData = (monthlyPayment) => {
  const formattedMonthlyPayment = Math.round(monthlyPayment).toLocaleString("en-US");
  monPayment.innerHTML = formattedMonthlyPayment + " RWF";

  let totalPayment = Math.round(monthlyPayment * totalPayments);
  const formattedTotalPayment = totalPayment.toLocaleString("en-US");
  totalAmount.innerHTML = formattedTotalPayment + " RWF";

  let totalInterestPayable = Math.round(totalPayment - principal);
  const formattedTotalInterestPayable = totalInterestPayable.toLocaleString("en-US");
  totalInterest.innerHTML = formattedTotalInterestPayable + " RWF";
};

const validateInput = (input, errorElement, errorMessage) => {
  if (isNaN(input.value) || parseFloat(input.value) < 0) {
    input.style.borderColor = "red";
    errorElement.innerHTML = errorMessage;
    errorElement.style.color = "red";
    return false;
  } 
};

const calculateAndDisplay = () => {
  // Get user input values
  let price = parseFloat(priceInput.value);
  let payment = parseFloat(paymentInput.value);
  let interest = parseFloat(interestInput.value);
  let duration = parseFloat(durationInput.value);

  // Validate input values
  let isValid = true;
  isValid = validateInput(priceInput, priceError, "Please enter a valid price.") && isValid;
  isValid = validateInput(paymentInput, paymentError, "Please enter a valid payment.") && isValid;
  isValid = validateInput(interestInput, interestError, "Please enter a valid interest.") && isValid;
  isValid = validateInput(durationInput, durationError, "Please enter a valid duration.") && isValid;

  // Perform calculations if all input values are valid
  if (isValid) {
    principal = price - payment;
    monthlyRate = interest / 100 / 12;
    totalPayments = duration * 12;

    let monthlyPayment = calculateMortgage();
    updateData(monthlyPayment);

    document.querySelector('#mortgage-form').reset();
  }
};

const init = () => {
  calculateAndDisplay();
};

init();

btn.addEventListener('click', calculateAndDisplay);
