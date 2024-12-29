import { UuidAdapter } from "../../config/uuid.adapter";
import { Ticket } from "../../domain/interfaces/ticket";
import { WssService } from "./wss.service";

export class TicketService {
  constructor(private readonly wssService = WssService.instance) {}

  public tickets: Ticket[] = [];

  private readonly workingOnTickets: Ticket[] = [];

  public get pendingTickets(): Ticket[] {
    return this.tickets.filter(
      (ticket) => !ticket.done && !ticket.handleAtDesk
    );
  }

  public get lastWorkingOnTickets(): Ticket[] {
    return this.workingOnTickets.slice(0, 4);
  }

  public get lastTicketNumber(): number {
    return this.tickets.length > 0 ? this.tickets.at(-1)!.number : 0;
  }

  public createTicket() {
    const ticket: Ticket = {
      id: UuidAdapter.v4(),
      number: this.lastTicketNumber + 1,
      createdAt: new Date(),
      done: false,
    };

    this.tickets.push(ticket);

    this.onTicketNumberChange();

    return ticket;
  }

  public drawTicket(desk: string) {
    const ticket = this.pendingTickets[0];

    if (!ticket) return { status: "error", message: "No pending ticket" };

    ticket.handleAtDesk = desk;
    ticket.handleAt = new Date();

    this.workingOnTickets.unshift({ ...ticket });

    this.onWorkingChange();
    this.onTicketNumberChange();

    return {
      status: "ok",
      ticket,
    };
  }

  public doneTicket = (ticketId: string) => {
    const ticket = this.tickets.find((ticket) => ticket.id === ticketId);
    if (!ticket) return { status: "error", message: "Ticket not found" };

    this.tickets = this.tickets.map((ticket) => {
      if (ticket.id === ticketId) {
        ticket.done = true;
      }

      return ticket;
    });

    return { status: "ok" };
  };

  private onTicketNumberChange() {
    this.wssService.sendMessage(
      "on-ticket-count-change",
      this.pendingTickets.length
    );
  }

  private onWorkingChange() {
    this.wssService.sendMessage("on-working-change", this.lastWorkingOnTickets);
  }
}