import Nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";

console.clear();

const stan = Nats.connect("ticketing", "abcd", {
  url: "htttp://localhost:4222",
});

stan.on("connect", async () => {
  console.log("Publisher connected");

  const publisher = new TicketCreatedPublisher(stan);

  await publisher.publish({
    id: "123",
    title: "concerts",
    price: "20",
  });
});
