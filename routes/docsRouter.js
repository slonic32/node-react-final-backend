import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../docs/swagger.json";

const docsRouter = express.Router();

docsRouter.use("/", swaggerUi.serve);
docsRouter.get("/", swaggerUi.setup(swaggerDocument));
