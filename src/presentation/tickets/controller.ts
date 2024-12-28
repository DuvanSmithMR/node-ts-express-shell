export class TicketController {
  constructor() {}

  public getTickets = async (req: any, res: any) => {
    res.json({ message: "GET /tickets" });
  };

  public getLastTicketNumber = async (req: any, res: any) => {
    res.json({ message: "GET /lastTicketNumber" });
  };

  public pendingTickets = async (req: any, res: any) => {
    res.json({ message: "GET /pendingTickets" });
  };

  public createTicket = async (req: any, res: any) => {
    res.json({ message: "POST /tickets" });
  };

  public drawTicket = async (req: any, res: any) => {
    res.json({ message: "GET /drawTicket" });
  };

  public doneTicket = async (req: any, res: any) => {
    res.json({ message: "PUT /doneTicket" });
  };

  public workingOnTickets = async (req: any, res: any) => {
    res.json({ message: "GET /workingOnTickets" });
  };
}