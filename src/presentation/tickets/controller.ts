import { TicketService } from "../services/ticket.service";

export class TicketController {
  constructor(
    private readonly ticketService = new TicketService(),
  ) {}

  public getTickets = async (req: any, res: any) => {
    res.json(this.ticketService.tickets);
  };

  public getLastTicketNumber = async (req: any, res: any) => {
    res.json(this.ticketService.lastTicketNumber);
  };

  public pendingTickets = async (req: any, res: any) => {
    res.status(201).json(this.ticketService.pendingTickets);
  };

  public createTicket = async (req: any, res: any) => {
    res.json(this.ticketService.createTicket());
  };

  public drawTicket = async (req: any, res: any) => {
    const { desk } = req.params;
    res.json(this.ticketService.drawTicket(desk));
  };

  public doneTicket = async (req: any, res: any) => {
    const { ticketId } = req.params;
    res.json(this.ticketService.doneTicket(ticketId));
  };

  public workingOnTickets = async (req: any, res: any) => {
    res.json(this.ticketService.lastWorkingOnTickets);
  };
}