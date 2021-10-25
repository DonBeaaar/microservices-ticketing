import { Publisher, Subjects, TicketUpdatedEvent } from '@fd3tickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
