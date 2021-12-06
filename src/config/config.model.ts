export interface Config {
    db: {
        port: number,
        host: string
    },
    app: {
        port: number
    },
    environment: 'dev' | 'test' | 'automated test' | 'prod'
}
