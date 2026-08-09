// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPsEzSXJS4B-0-qdI19FLn8mnjCLBuzG8",
  authDomain: "my-private-chat-20bd4.firebaseapp.com",
  databaseURL: "https://my-private-chat-20bd4-default-rtdb.firebaseio.com",
  projectId: "my-private-chat-20bd4",
  storageBucket: "my-private-chat-20bd4.firebasestorage.app",
  messagingSenderId: "612872792070",
  appId: "1:612872792070:web:ce5d7b7a0c6eb2ed28fb87"
};

// Start Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

// Sign Up
function signUp() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    document.getElementById("message").innerText =
      "Email এবং Password লিখুন।";
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById("message").innerText =
        "Sign Up সফল হয়েছে! এখন Log In করতে পারো।";
    })
    .catch((error) => {
      document.getElementById("message").innerText =
        "সমস্যা: " + error.message;
    });
}

// Log In
function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    document.getElementById("message").innerText =
      "Email এবং Password লিখুন।";
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById("message").innerText =
        "Log In সফল হয়েছে!";
    })
    .catch((error) => {
      document.getElementById("message").innerText =
        "Log In হয়নি: " + error.message;
    });
}
