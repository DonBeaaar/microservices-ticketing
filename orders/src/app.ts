import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@fd3tickets/common";
import indexOrderRoute from "./routes/index";
import deleteOrderRoute from "./routes/delete";
import showOrderRoute from "./routes/show";
import newOrderRoute from "./routes/new";
import updateOrderRoute from "./routes/update";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);

app.use(indexOrderRoute);
app.use(deleteOrderRoute);
app.use(showOrderRoute);
app.use(newOrderRoute);
app.use(updateOrderRoute);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
