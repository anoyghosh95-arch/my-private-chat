const firebaseConfig = {
  apiKey: "AIzaSyBPsEzSXJS4B-0-qdI19FLn8mnjCLBuzG8",
  authDomain: "my-private-chat-20bd4.firebaseapp.com",
  databaseURL: "https://my-private-chat-20bd4-default-rtdb.firebaseio.com",
  projectId: "my-private-chat-20bd4",
  storageBucket: "my-private-chat-20bd4.firebasestorage.app",
  messagingSenderId: "612872792070",
  appId: "1:612872792070:web:ce5d7b7a0c6eb2ed28fb87"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

function signUp() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  if (!email || !password) {
    message.innerText = "Email এবং Password লিখুন।";
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      message.innerText = "✅ Sign Up সফল হয়েছে!";
    })
    .catch((error) => {
      message.innerText = "❌ " + error.message;
    });
}

function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  if (!email || !password) {
    message.innerText = "Email এবং Password লিখুন।";
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
    showChat();
    })
    .catch((error) => {
      message.innerText = "❌ " + error.message;
    });
}
function showChat() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("chatPage").style.display = "block";
}
