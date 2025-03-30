# Lab 2

## create a register form 
- `with the password hashed`
- `with the email verified`
-`with the email unique`
- `with the email required`
- `with the password required`
- ` with the password confirmation`
- `with the password confirmation required`
- `with the password confirmation equals to the password`
- `if so add the user to the database`


## create a login form
- compare the password with the hashed password
- compare the email with the email in the database


## create a profile page
- create a session for the user - role, username

## create dashboard page same for admin
### for admin
- add users list

## for user
- jjust display hello and username

## Contact us
- create a contact us form
- and send the message to the admin email
- and put the message in the database in the contact table with the 
## Errors
- Fetching error when fetching using prepared statements using mysqli object
 ``` // check the password
            $stmt->bind_result($db_username, $db_password, $db_role, $db_email, $db_profilepic);
            $stmt->fetch();```

```// Check if any rows were fetched
if (!empty($rows)) {
    // Loop through the rows and process the data
    foreach ($rows as $row) {
        echo "ID: " . $row["id"] . ", Username: " . $row["username"] . ", Email: " . $row["email"] . ", Role: " . $row["role"] . "<br>";
        // Do other processing here
    }
} else {
    echo "No users found.";
}```

- Length of the password field in php should be 200 in mySql database



  // Function to fetch user data from the API
        async function fetchUsers() {
            try {
                const response = await fetch('api/get_users.php'); // API endpoint URL

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                // Populate the table with user data
                const tableBody = document.querySelector('#usersTable tbody');
                if (data && Array.isArray(data)) {
                   data.forEach(user => {
                       const row = tableBody.insertRow();
                       row.insertCell().textContent = user.id;
                       row.insertCell().textContent = user.username;
                       row.insertCell().textContent = user.email;
                       row.insertCell().textContent = user.role;
                    });
                } else {
                    tableBody.innerHTML = '<tr><td colspan="4">No users found.</td></tr>';
                }


            } catch (error) {
                console.error('Error fetching users:', error);
                const tableBody = document.querySelector('#usersTable tbody');
                tableBody.innerHTML = '<tr><td colspan="4">Error loading users.</td></tr>';
            }
        }

        // Call the fetchUsers function when the page loads
        document.addEventListener('DOMContentLoaded', fetchUsers);
    </script>