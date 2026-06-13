document.getElementById("adminAndGMSSignInForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email == "ffc@gmail.com" && password == "123") {
        alert("Sign in successfully as an admin or a gym management staff member")
        window.location.href = "../Admin_Gym_Management_Staff/adminAndGymManagementStaff.html";
    } else if (!email == "ffc@gmail.com") {
        alert("Enter correct admin and group management staff email");
    } else {
        alert("Enter correct admin and group management staff password");
    }
})