const currentTicketLbl = document.querySelector("span");
const createTicketBtn = document.querySelector("button");

async function getLasTicket() {
  const response = await fetch("/api/tickets/last");
  const data = await response.json();
  currentTicketLbl.innerText = data;
}

async function createTicket() {
  const response = await fetch("/api/tickets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  currentTicketLbl.innerText = data.number;
}

createTicketBtn.addEventListener("click", createTicket);

getLasTicket();