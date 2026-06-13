/* Query form */

document.getElementById("queriesForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value;
    const queries = document.getElementById("queries").value;

    const fullNameValid = /^[a-zA-Z\s'-]+$/;
    const emailValid = /^[^@]+@[^@]+\.[^@]+$/;

    if (name.length < 3) {
        alert("Full Name must contain more than 2 characters");
    } else if (!fullNameValid.test(name)) {
        alert("Enter a valid Full Name");
    } else if (!emailValid.test(email)) {
        alert("Enter a valid email");
    }

    const formData = new URLSearchParams();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("queries", queries);

    fetch("customerPageDatabase.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData.toString()
    })
        .then(response => response.text())
        .then(data => {
            alert(data);
        })
        .catch(error => {
            alert("Something went wrong while submitting the form.", error);
        });
})

/* Search */

document.getElementById("searchForm").addEventListener("submit", function (e) {

    const search = document.getElementById("search").value.toLowerCase();

    if (search == "personalized trainning sessions") {
        window.location.href = "../Personalized trainning sessions/personalizedTrainningSessions.html";
        e.preventDefault();
    } else if (search == "group classes") {
        window.location.href = "../Group classes/groupClasses.html";
        e.preventDefault();

    } else if (search == "query replies") {
        window.location.href = "../User display query replies/userDisplayQueriesReplies.html";
        e.preventDefault();
    } else if (search == "admin and gms") {
        window.location.href = "../Sign in Admin and GMS/signInAdminAndGMS.html";
        e.preventDefault();
    } else if (search == "membership sign up" || search == "membership sign-up") {
        window.location.href = "../Membership sign-up/membershipSignUp.html";
        e.preventDefault();
    } else if (search == "enter queries" || search == "queries enter") {
        window.location.href = "#queries-header";
        e.preventDefault();
    } else if (search == "blog posts") {
        window.location.href = "#blog-post-section";
        e.preventDefault();
    } else {
        alert("Search result not found");
        e.preventDefault();
    }
})