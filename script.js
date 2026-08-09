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

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();


// SIGN UP
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
        "Sign Up সফল হয়েছে! এখন Log In করুন।";
    })
    .catch((error) => {
      document.getElementById("message").innerText =
        "সমস্যা: " + error.message;
    });
}


// LOGIN
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
      document.querySelector(".container").innerHTML = `
        <h1>My Private Chat</h1>

        <p>✅ Log In সফল হয়েছে</p>

        <div id="chatBox"
          style="
          height:300px;
          overflow-y:auto;
          border:1px solid #ccc;
          padding:10px;
          margin-bottom:10px;
          background:#f5f5f5;">
        </div>

        <input
          type="text"
          id="chatMessage"
          placeholder="মেসেজ লিখুন..."
          style="width:70%; padding:10px;"
        >

        <button onclick="sendMessage()">
          Send
        </button>

        <br><br>

        <button onclick="logout()">
          Log Out
        </button>
      `;

      loadMessages();
    })
    .catch((error) => {
      document.getElementById("message").innerText =
        "Log In হয়নি: " + error.message;
    });
}


// SEND MESSAGE
function sendMessage() {
  const input = document.getElementById("chatMessage");
  const text = input.value.trim();

  if (!text) return;

  database.ref("messages").push({
    text: text,
    email: auth.currentUser.email,
    time: Date.now()
  });

  input.value = "";
}


// SHOW MESSAGES
function loadMessages() {
  database.ref("messages").on("value", (snapshot) => {

    const chatBox = document.getElementById("chatBox");

    if (!chatBox) return;

    chatBox.innerHTML = "";

    snapshot.forEach((child) => {

      const data = child.val();

      const message = document.createElement("p");

      message.innerHTML =
        "<b>" + data.email + ":</b> " +
        data.text;

      chatBox.appendChild(message);
    });

    chatBox.scrollTop = chatBox.scrollHeight;
  });
}


// LOG OUT
function logout() {
  auth.signOut().then(() => {
    location.reload();
  });
}alvalr !preTeTeP
