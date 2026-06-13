/* Membership sign-ups display table */

document.addEventListener('DOMContentLoaded', () => {
    fetch('membershipSignUpDisplayDatabase.php')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#membershipSignUpTable tbody');
            data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
          <td>${user.ID}</td>
          <td>${user.Full_Name}</td>
          <td>${user.Email}</td>
          <td>${user.Membership_option}</td>
          <td>${user.Payment_month}</td>
          <td>${user.Payment_year}</td>
          <td><img src="../Membership sign-up payments/msup_Images/${user.Upload_bank_slip}" alt="Bank Slip" style="max-width:500px; height:300px;">

</td>

        `;
                tbody.appendChild(row);
            });
        })
        .catch(error => {
            alert("Something went wrong while fetching the data to the mambership sign-ups table", error);
        });
});

/* Group class registrations display table */

document.addEventListener('DOMContentLoaded', () => {
    fetch('groupClassRegistrationsDisplayDatabase.php')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#groupClassesRegistrationTable tbody');
            data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
          <td>${user.ID}</td>
          <td>${user.Full_Name}</td>
          <td>${user.Email}</td>
          <td>${user.Class_catogery}</td>
          <td>${user.Payment_month}</td>
          <td>${user.Payment_year}</td>
          <td><img src="../Group classes registration/gcr_Images/${user.Upload_bank_slip}" alt="Bank Slip" style="max-width:500px; height:300px;">

</td>

        `;
                tbody.appendChild(row);
            });
        })
        .catch(error => {
            alert("Something went wrong while fetching the data to the Group class registrations table", error);
        });
});

/* Queries display table */

document.addEventListener('DOMContentLoaded', () => {
    fetch('queriesDisplayDatabase.php')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#replyQueriesTable tbody');
            data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
          <td>${user.ID}</td>
          <td>${user.Full_Name}</td>
          <td>${user.Email}</td>
          <td>${user.Queries}</td>
          <td>${user.Reply}</td>

        `;
                tbody.appendChild(row);
            });
        })
        .catch(error => {
            alert("Something went wrong while fetching the data to the quries table", error);
        });
});

/* Reply for queries */

document.getElementById("replyForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("queryID").value;
    const reply = document.getElementById("reply").value;

    const numericID = Number(id);

    if (!Number.isInteger(numericID)) {
        alert("Enter integer value for ID");
    }

    const formData = new FormData();
    formData.append("queryID", id);
    formData.append("reply", reply);

    fetch("queriesReplyDatabase.php", {
        method: "POST",
        body: formData
    })
        .then(response => response.text())
        .then(data => {
            alert(data);
        })
        .catch(error => {
            alert("Something went wrong while submitting the reply.", error);
        });
})