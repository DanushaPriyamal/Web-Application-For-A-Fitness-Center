document.getElementById("signup-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value;
    const mobileNumber = document.getElementById("mobileNumber").value;
    const dateOfBirth = document.getElementById("dateOfBirth").value;
    const placeOfResidence = document.getElementById("placeOfResidence").value;
    const address = document.getElementById("address").value;
    const gender = document.getElementById("gender").value;
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirm-password").value;

    const fullNameValid = /^[a-zA-Z\s'-]+$/;
    const emailValid = /^[^@]+@[^@]+\.[^@]+$/;
    const mobileValid = /^\d{9}$/;
    const passwordValid = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,}$/;

    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    if (name.length < 3) {
        alert("Full Name must contain more than 2 characters");
    } else if (!fullNameValid.test(name)) {
        alert("Enter a valid Full Name");
    } else if (!emailValid.test(email)) {
        alert("Enter a valid email");
    } else if (!mobileValid.test(mobileNumber)) {
        alert("Enter a valid mobile number");
    } else if (birthDate > today) {
        alert("Birth date can't be in the future");
    } else if ((today.getFullYear() - birthDate.getFullYear()) > 100) {
        alert("Date of birth can't exceed the age more than 100");
    } else if ((today.getFullYear() - birthDate.getFullYear()) < 18) {
        alert("Date of birth can't calculate an age less than 18 for today")
    } else if (!passwordValid.test(password)) {
        alert("Password must be at least 8 characters long and include at least a uppercase, a lowercase, a number, and a special character")
    } else if (password !== confirm_password) {
        alert("Password and confirm password don't match");
    }

    const formData = new URLSearchParams();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobileNumber", mobileNumber);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("placeOfResidence", placeOfResidence);
    formData.append("address", address);
    formData.append("gender", gender);
    formData.append("password", password);
    formData.append("confirm-password", confirm_password);

    fetch("signUpDatabase.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData.toString()
    })
        .then(response => response.text())
        .then(data => {
            alert(data);

            if (data == "User Account created successfully!") {
                window.location.href = "../Sign in/signIn.html";
            }
        })
        .catch(error => {
            alert("Something went wrong while submitting the form.", error);
        });

})