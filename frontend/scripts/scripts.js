// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Get references to the forms and the toggle links
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');
    const showSignup = document.getElementById('show-signup');
    const showSignin = document.getElementById('show-signin');

    // --- 1. Form Toggling Logic ---

    // Add click event listener to the "Sign up" link
    showSignup.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent the link from navigating
        signinForm.classList.add('hidden'); // Hide the sign-in form
        signupForm.classList.remove('hidden'); // Show the sign-up form
    });

    // Add click event listener to the "Sign in" link
    showSignin.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent the link from navigating
        signupForm.classList.add('hidden'); // Hide the sign-up form
        signinForm.classList.remove('hidden'); // Show the sign-in form
    });


    // --- 2. OTP Auto-Tab Logic ---

    const otpInputs = document.querySelectorAll('#otp-inputs input');

    otpInputs.forEach((input, index) => {
        input.addEventListener('keyup', (e) => {
            const currentInput = input;
            const nextInput = input.nextElementSibling;
            const prevInput = input.previousElementSibling;

            // If the value has a length of 1, move to the next input
            if (currentInput.value.length === 1 && nextInput) {
                nextInput.focus();
            }

            // If "Backspace" is pressed and the current input is empty, move to the previous input
            if (e.key === 'Backspace' && !currentInput.value && prevInput) {
                prevInput.focus();
            }
        });
    });
});