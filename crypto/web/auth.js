 // TODO: Replace the following with your app's Firebase project configuration
 var firebaseConfig = {
  apiKey: "AIzaSyDgSjjUci5Af69yDuv8C-X7bxUYSNoA4l4",
  authDomain: "crypto-ccc9a.firebaseapp.com",
  projectId: "crypto-ccc9a",
  storageBucket: "crypto-ccc9a.appspot.com",
  messagingSenderId: "1087024277762",
  appId: "1:1087024277762:web:973cce4536dd8fdb65fa1b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get elements
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const forgotPassword = document.getElementById('forgot-password');

// Add login event
btnLogin.addEventListener('click', e => {
e.preventDefault(); // Prevent the form from being submitted
// Get email and password
const email = txtEmail.value;
const pass = txtPassword.value;
const auth = firebase.auth();

// Sign in
auth.signInWithEmailAndPassword(email, pass)
  .then((userCredential) => {
      if (userCredential.user.emailVerified) {
          // Store the email in session storage
          sessionStorage.setItem('email', email);
          window.location.href = 'main/main.html'; // Redirect to welcome page
      } else {
          alert('Please verify your email before logging in.');
      }
  })
  .catch((error) => {
      if (error.code === 'auth/wrong-password') {
          alert('Wrong password!');
      } else if (error.code === 'auth/user-not-found') {
          alert('User Not registered..! Please Register');
          window.location.href = 'register.html';
      } else {
          alert('Invalid Credentials..!');
      }
      console.log(error.message);
  });
});

// Add forgot password event
forgotPassword.addEventListener('click', (e) => {
  e.preventDefault();
  const auth = firebase.auth();
  const emailAddress = txtEmail.value;

  auth.sendPasswordResetEmail(emailAddress)
      .then(() => {
          alert('Password reset email sent!');
      })
      .catch((error) => {
          console.log(error.message);
      });
    });