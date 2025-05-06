import { App } from "app/infra/App";
import dotenv from "dotenv";
dotenv.config();

const app = new App();

app.init();
