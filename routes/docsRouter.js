import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../docs/swagger.json";

const docsRouter = express.Router();

docsRouter.use("/api-docs", swaggerUi.serve);
docsRouter.get("/api-docs", swaggerUi.setup(swaggerDocument));
