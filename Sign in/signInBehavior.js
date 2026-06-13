document.getElementById("signInForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const formData = new URLSearchParams();
    formData.append("email", email);
    formData.append("password", password);

    fetch("signInDatabase.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData.toString()
    })
        .then(response => response.text())
        .then(data => {
            alert(data);

            if (data == "Sign in successfully!") {
                window.location.href = "../Customer page/customerPage.html";
            } else if (data == "Sign in successfully as an admin or a gym management staff member") {
                window.location.href = "../Customer page/customerPage.html";
            }
        })
        .catch(error => {
            alert("Something went wrong when check sign in is correct", error);
        });
});
