import { OrderCancelledEvent, Publisher, Subjects } from "@fd3tickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
