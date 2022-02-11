// Listen for Submit
document.getElementById("loan-form").addEventListener("submit", function (e) {
  // Hide Results
  document.querySelector("#results").style.display = "none";

  // Show Loader
  document.querySelector("#loading").style.display = "block";

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

//   Calculate Results
function calculateResults(e) {
  // UI variables
  const amount = parseFloat(document.querySelector("#amount").value);

  const interest =
    parseFloat(document.querySelector("#interest").value) / 100 / 12;

  const years = parseFloat(document.querySelector("#years").value) * 12;

  const monthlyPayment = document.querySelector("#monthly-payment");
  const totalPayment = document.querySelector("#total-payment");
  const interestPayment = document.querySelector("#interest-paid");

  // Compute the payments
  const x = Math.pow(1 + interest, years);
  const monthly = (amount * x * interest) / (x - 1);

  if (isFinite(monthly)) {
    document.querySelector("#loading").style.display = "none";
    document.querySelector("#results").style.display = "block";
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * years).toFixed(2);
    interestPayment.value = (monthly * years - amount).toFixed(2);
  } else {
    showError("Please check your numbers");
  }
  e.preventDefault();
}

function showError(error) {
  document.querySelector("#loading").style.display = "none";
  document.querySelector("#results").style.display = "none";
  const errorDiv = document.createElement("div");

  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  errorDiv.className = "alert alert-danger";

  //   create text node and append
  errorDiv.appendChild(document.createTextNode(error));

  //   Insert Error Above HEadinf
  card.insertBefore(errorDiv, heading);

  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector(".alert").remove();
}
