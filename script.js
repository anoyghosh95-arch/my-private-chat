const firebaseConfig = {
  apiKey: "AIzaSyBPsEzSXJS4B-0qdI19FLn8mnjCLBuzG8",
  authDomain: "my-private-chat-20bd4.firebaseapp.com",
  databaseURL: "https://my-private-chat-20bd4-default-rtdb.firebaseio.com",
  projectId: "my-private-chat-20bd4",
  storageBucket: "my-private-chat-20bd4.firebasestorage.app",
  messagingSenderId: "612872792070",
  appId: "1:612872792070:web:ce5d7b7a0c6eb2ed28fb87"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

function showMessage(text) {
  document.getElementById("message").innerText = text;
}

function signUp() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    showMessage("Email এবং Password লিখুন।");
    return;
  }

  showMessage("Sign Up হচ্ছে...");

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      showMessage("✅ Sign Up সফল হয়েছে!");
    })
    .catch((error) => {
      showMessage("❌ " + error.message);
    });
}

function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    showMessage("Email এবং Password লিখুন।");
    return;
  }

  showMessage("Log In হচ্ছে...");

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      showMessage("✅ Log In সফল হয়েছে!");
    })
    .catch((error) => {
      showMessage("❌ " + error.message);
    });
}
          
