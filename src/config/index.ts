import { Config } from "./config.model";

let exportedConfig: Config

if (process.env.ENV === 'dev') {
    const { config } = require('./dev');
    exportedConfig = config
}

export default exportedConfig