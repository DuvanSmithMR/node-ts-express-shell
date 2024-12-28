const lblPending = document.querySelector("#lbl-pending");
const deskHeader = document.querySelector("h1");
const noMoreAlert = document.querySelector(".alert");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("Escritorio es requerido");
}

const deskNumber = searchParams.get("escritorio");
deskNumber.innerText = deskNumber;

function checkTicketCount(currentCount = 0) {
  if (currentCount==0) noMoreAlert.classList.remove("d-none");
  else noMoreAlert.classList.add("d-none");
  lblPending.innerText = currentCount;
}

async function loadInitialCount() {
  const pending = await fetch("api/tickets/pending").then((res) => res.json());
  checkTicketCount(pending.length);
}

function connectToWebSockets() {
  const socket = new WebSocket("ws://localhost:3000/ws");

  socket.onmessage = (event) => {
    const { type, payload } = JSON.parse(event.data);

    checkTicketCount(payload);
  };

  socket.onclose = (event) => {
    console.log("Connection closed");
    setTimeout(() => {
      console.log("retrying to connect");
      connectToWebSockets();
    }, 1500);
  };

  socket.onopen = (event) => {
    console.log("Connected");
  };
}

connectToWebSockets();
loadInitialCount();