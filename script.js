const firebaseConfig = {
  apiKey: "AIzaSyBPsEzSXJS4B-0qdI19FL8nmbCLBuzG8",
  authDomain: "my-private-chat-20bd4.firebaseapp.com",
  databaseURL: "https://my-private-chat-20bd4-default-rtdb.firebaseio.com",
  projectId: "my-private-chat-20bd4",
  storageBucket: "my-private-chat-20bd4.firebasestorage.app",
  messagingSenderId: "612872792070",
  appId: "1:612872792070:web:ce5d7b7a0c6eb2ed28fb87"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

const loginPage = document.getElementById("loginPage");
const chatPage = document.getElementById("chatPage");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const messageBox = document.getElementById("message");

const chatInput = document.getElementById("chatInput");
const messagesBox = document.getElementById("messages");


// SIGN UP
document.getElementById("signupBtn").addEventListener("click", function () {

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    messageBox.innerText = "Email এবং Password লিখুন।";
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)

    .then(function () {

      messageBox.innerText =
        "✅ Account তৈরি হয়েছে। এখন Log In করুন।";

    })

    .catch(function (error) {

      messageBox.innerText =
        "❌ " + error.message;

    });

});


// LOGIN
document.getElementById("loginBtn").addEventListener("click", function () {

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    messageBox.innerText = "Email এবং Password লিখুন।";
    return;
  }

  auth.signInWithEmailAndPassword(email, password)

    .then(function () {

      showChat();

    })

    .catch(function (error) {

      messageBox.innerText =
        "❌ " + error.message;

    });

});


// SHOW CHAT
function showChat() {

  loginPage.style.display = "none";
  chatPage.style.display = "block";

  loadMessages();

}


// LOGOUT
document.getElementById("logoutBtn").addEventListener("click", function () {

  auth.signOut();

});


// SEND MESSAGE
document.getElementById("sendBtn").addEventListener("click", function () {

  const text = chatInput.value.trim();

  if (!text) {
    return;
  }

  const user = auth.currentUser;

  if (!user) {
    return;
  }

  database.ref("messages").push({

    email: user.email,

    text: text,

    time: Date.now()

  });

  chatInput.value = "";

});


// LOAD MESSAGES
function loadMessages() {

  database.ref("messages").off();

  database.ref("messages").on("value", function (snapshot) {

    messagesBox.innerHTML = "";

    snapshot.forEach(function (child) {

      const data = child.val();

      const div = document.createElement("div");

      div.className = "message";

      div.innerText =
        data.email + ": " + data.text;

      messagesBox.appendChild(div);

    });

    messagesBox.scrollTop = messagesBox.scrollHeight;

  });

}


// LOGIN STATUS
auth.onAuthStateChanged(function (user) {

  if (user) {

    loginPage.style.display = "none";
    chatPage.style.display = "block";

    loadMessages();

  } else {

    loginPage.style.display = "block";
    chatPage.style.display = "none";

  }

});
