import { createApp } from "../../src/app";
import { ExampleApp } from "./exampleApp";

const { app, canvas } = createApp(ExampleApp);
document.body.appendChild(canvas);
app.render();
