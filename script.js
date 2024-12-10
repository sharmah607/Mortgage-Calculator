document.getElementById("calculateBtn").addEventListener("click", function () {
    const amount = parseFloat(document.getElementById("amount").value);
    const term = parseFloat(document.getElementById("term").value);
    const rate = parseFloat(document.getElementById("rate").value) / 100; // Convert percentage to decimal
    const type = document.querySelector('input[name="type"]:checked').value;

    // Check if any of the imput field is empty
    if (isNaN(amount) || isNaN(term) || isNaN(rate)) {
        document.getElementById("result").textContent = "Please enter valid inputs!";
        return;
    }

    const months = term * 12; // Convert years to months
    let monthlyPayment;

    if (type === "repayment") {
        // Repayment formula
        const monthlyRate = rate / 12; // Monthly interest rate
        monthlyPayment =
            (amount * monthlyRate) /
            (1 - Math.pow(1 + monthlyRate, -months));
    } else if (type === "interestOnly") {
        // Interest-only formula
        monthlyPayment = (amount * rate) / 12; // Only interest is paid
    }

    const totalPayment = monthlyPayment * months;

    document.getElementById("result").innerHTML = `
      Monthly Payment: ₹${monthlyPayment.toFixed(2)}<br>
      Total Payment Over ${term} Years: ₹${totalPayment.toFixed(2)}
    `;
});

// Clear all fields
document.getElementById("clearBtn").addEventListener("click", function () {
    
    document.getElementById("amount").value = "";
    document.getElementById("term").value = "";
    document.getElementById("rate").value = "";

    // Reset radio buttons to default (Repayment selected)
    document.getElementById("repayment").checked = true;

    // Clear the result section
    document.getElementById("result").textContent = "";
});