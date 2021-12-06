import { Server } from "http";
import app from "../src/app";

let server: Server

export function setupServer() {
    if (!server) {
        server = app.listen(3000);
    }
}