import { Publisher, Subjects, TicketCreatedEvent } from '@fd3tickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
