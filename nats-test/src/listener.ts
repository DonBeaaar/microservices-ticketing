import { randomBytes } from "crypto";
import Nats, { Message } from "node-nats-streaming";

console.clear();

const stan = Nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "htttp://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("NATS connection closed");
    process.exit();
  });

  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName("accounts-srv");

  const subscription = stan.subscribe(
    "ticket:created",
    "listener-queue-group",
    options
  );

  subscription.on("message", (msg: Message) => {
    const data = msg.getData();
    if (typeof data === "string") {
      console.log(`Received event #${msg.getSequence()} with data: ${data}`);
    }
    msg.ack();
  });
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
