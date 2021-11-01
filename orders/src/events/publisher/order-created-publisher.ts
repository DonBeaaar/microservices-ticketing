import { Publisher, Subjects, OrderCreatedEvent } from '@fd3tickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
