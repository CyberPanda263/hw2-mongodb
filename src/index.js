import { setupServer } from "./server.js";
import { initMongoConnection } from "./utils/initMongoConnection.js";

const bootstrap = async () => {
    await initMongoConnection();
    setupServer();
};

bootstrap();