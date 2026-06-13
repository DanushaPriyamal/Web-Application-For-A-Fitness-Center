document.addEventListener('DOMContentLoaded', () => {
    fetch('userDisplayQueriesRepliesDatabase.php')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#userReplyQueriesTable tbody');
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
            alert("Something went wrong while fetching the data to the query replies table", error);
        });
});
