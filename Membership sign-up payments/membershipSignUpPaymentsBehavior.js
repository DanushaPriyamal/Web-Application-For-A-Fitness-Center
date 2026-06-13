document.getElementById("membership-sign-up-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value;
    const membershipOption = document.getElementById("membership-option").value;
    const paymentMonth = document.getElementById("payment-month").value;
    const paymentYear = document.getElementById("payment-year").value;
    const uploadBankSlip = document.getElementById("upload-bank-slip").files[0];

    const fullNameValid = /^[a-zA-Z\s'-]+$/;
    const emailValid = /^[^@]+@[^@]+\.[^@]+$/;

    if (name.length < 3) {
        alert("Full Name must contain more than 2 characters");
    } else if (!fullNameValid.test(name)) {
        alert("Enter a valid Full Name");
    } else if (!emailValid.test(email)) {
        alert("Enter a valid email");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("membership-option", membershipOption);
    formData.append("payment-month", paymentMonth);
    formData.append("payment-year", paymentYear);
    formData.append("upload-bank-slip", uploadBankSlip);

    fetch("membershipSignUpPaymentsDatabase.php", {
        method: "POST",
        body: formData
    })
        .then(response => response.text())
        .then(data => {
            alert(data);

            if (data == "Membership sign-up is successful") {
                window.location.href = "../Customer page/customerPage.html";
            }
        })
        .catch(error => {
            alert("Something went wrong while submitting the form.", error);
        });

})