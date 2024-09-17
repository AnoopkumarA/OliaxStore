// Function to register a new user
function registerUser() {
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    const errorElem = document.getElementById("registration-error");

    // Check if all fields are filled
    if (!firstName || !lastName || !email || !phone || !password) {
        errorElem.textContent = "Please fill in all fields.";
        return;
    }

    // Check if the user is already registered
    if (localStorage.getItem(email)) {
        errorElem.textContent = "An account with this email already exists.";
        return;
    }

    // Create user object
    const user = {
        firstName,
        lastName,
        email,
        phone,
        password
    };

    // Save the user data to localStorage
    localStorage.setItem(email, JSON.stringify(user));

    alert("Registration successful! You can now sign in.");
    clearFields(); // Clear form fields after registration
    closeModal('registration-modal'); // Close the registration modal
}

// Function to sign in the user
function signInUser() {
    const email = document.getElementById("signin-email").value;
    const password = document.getElementById("signin-password").value;

    const errorElem = document.getElementById("signin-error");

    // Retrieve the user from localStorage
    const storedUser = localStorage.getItem(email);

    if (!storedUser) {
        errorElem.textContent = "Account not found. Please register.";
        return;
    }

    const user = JSON.parse(storedUser);

    // Check if password matches
    if (user.password !== password) {
        errorElem.textContent = "Incorrect password. Please try again.";
        return;
    }

   
    displayUserProfile(user); // Display the user's profile
    clearFields(); // Clear form fields after login
    closeModal('signin-modal'); // Close the sign-in modal
}

// Function to display the user's profile in the header
function displayUserProfile(user) {
    document.querySelector('.user-actions').style.display = 'none'; // Hide the sign-in/create account buttons
    const userProfile = document.getElementById('user-profile');
    document.getElementById('user-name').textContent = `${user.firstName} ${user.lastName}`;
    userProfile.style.display = 'flex'; // Show the user profile
}

// Function to logout the user
function logoutUser() {
    document.querySelector('.user-actions').style.display = 'flex'; // Show the sign-in/create account buttons
    const userProfile = document.getElementById('user-profile');
    userProfile.style.display = 'none'; // Hide the user profile
}

// Function to clear form fields after registration or login
function clearFields() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.value = '');
}

// Function to open modal
function openModal(modalId) {
    document.getElementById(`${modalId}-modal`).style.display = 'flex';
}

// Function to close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}
