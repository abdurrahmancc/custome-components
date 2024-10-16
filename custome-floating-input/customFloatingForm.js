document.addEventListener('DOMContentLoaded', function () {
    let countryCode;
    const themeName = 'blue'; // Always light mode

    const custom_login_EmailDocument = document.getElementById('custom_login_Email');
    const custom_login_PasswordDocument = document.getElementById('custom_login_Password');
    const signInform = document.getElementById('signIn_form');
    const custom_login_btn_submit = document.getElementById('custom_login_btn_submit');
    const custom_loginIn_loading = document.getElementById('custom_loginIn_loading');
    let isSignupSubmitLoading = false;

    // Debounced validation functions
    const debouncedValidateEmail = debounce(() => validateInput(custom_login_EmailDocument, 'Email is required.', isValidEmail), 500);
    const debouncedValidatePassword = debounce(() => validateInput(custom_login_PasswordDocument, 'Password is required.'), 500);

    // Attach input event listeners with debounced functions
    custom_login_EmailDocument.addEventListener('input', debouncedValidateEmail);
    custom_login_PasswordDocument.addEventListener('input', debouncedValidatePassword);

    // Handle loading state during form submission
    function handleSignInLoading() {
        custom_loginIn_loading.style.display = isSignupSubmitLoading ? 'inline' : 'none';
        custom_login_btn_submit.style.display = isSignupSubmitLoading ? 'none' : 'inline';
    }
    handleSignInLoading();

    // Form submit event listener
    signInform.addEventListener('submit', function (event) {
        event.preventDefault();
        isSignupSubmitLoading = true;
        handleSignInLoading();

        let hasErrors = false;
        hasErrors |= validateInput(custom_login_EmailDocument, 'Email is required.', isValidEmail);
        hasErrors |= validateInput(custom_login_PasswordDocument, 'Password is required.');

        if (hasErrors) {
            isSignupSubmitLoading = false;
            handleSignInLoading();
            return;
        }

        const inputData = {
            Email: custom_login_EmailDocument.value.trim(),
            IsMobile: false,
            Password: custom_login_PasswordDocument.value.trim(),
        };

        fetch(`${$("#appDomain").val()}/api/Login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputData)
        })
        .then(res => res.json())
        .then(result => {
            if (result === 0) {
                alert('Invalid credentials, please try again!');
            } else {
                // Handle successful login (e.g., redirect or show a success message)
                alert('Login successful! Redirecting...');
                // Redirect or update UI here as necessary
            }
            isSignupSubmitLoading = false;
            handleSignInLoading();
        })
        .catch(error => {
            console.error('Login error:', error);
            alert('Something went wrong, Please try again!');
            isSignupSubmitLoading = false;
            handleSignInLoading();
        });
    });

    // Debounce function
    function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    // Function to validate individual input fields
    function validateInput(inputElement, errorMessage, validationFunction = () => true) {
        clearError(inputElement);
        if (inputElement.value.trim() === '' || !validationFunction(inputElement.value.trim())) {
            setError(inputElement, errorMessage);
            return true;
        }
        return false;
    }

    // Function to set error message
    function setError(element, message) {
        const parentElement = element.parentElement;
        let errorElement = parentElement.querySelector('.floating_custom_error_message');

        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'floating_custom_error_message';
            parentElement.appendChild(errorElement);
        }
        errorElement.innerText = message;
        element.classList.add('floating_custom_error');
    }

    // Function to clear error message
    function clearError(element) {
        const errorElement = element.parentElement.querySelector('.floating_custom_error_message');
        if (errorElement) {
            errorElement.remove();
        }
        element.classList.remove('floating_custom_error');
    }

    // Function to validate email format
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
});
