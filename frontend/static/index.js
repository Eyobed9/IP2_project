// function to fetch user data
async function fetchUsers() {
    try {
        const response = await fetch('api/../../../backend/users.php');
        const data = await response.json();

        // add the data to the table
        const tb = document.querySelector("#users_tableb");
        let tab = '';

        if (data && Array.isArray(data)) {
            data.forEach((user) => {
                console.log(user.username);
                tab += `<tr>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                        <td>${user.role}</td>`
            })
        }
        tb.innerHTML = tab;
    }
    catch (error) {
        console.log(error)
        document.querySelector('#users_table').innerHTML = 'Error loading users'
    }
}

document.addEventListener('DOMContentLoaded', fetchUsers);
