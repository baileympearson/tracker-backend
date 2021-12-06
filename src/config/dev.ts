import dotenv from 'dotenv';
import { Config } from './config.model';

dotenv.config()

const config: Config = {
    db: {
        port: 27015,
        host: "localhost",
    },
    app: {
        port: 3000
    },
    environment: 'dev'
}

export { config }