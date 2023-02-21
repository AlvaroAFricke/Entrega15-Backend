import log4js from "log4js";

log4js.configure({
    appenders: {
        console: {type: 'console'},
        archivoWarn: {type: 'file', filename: './log/warn.log'},
        archivoError: {type: 'file', filename: './log/error.log'},

        loggerConsola: {
            type: 'logLevelFilter',
            appender: 'console',
            level: 'info'
        },

        loggerArchivoWarn: {
            type: 'logLevelFilter',
            appender: 'archivoWarn',
            level: 'warn'
        },

        loggerArchivoError: {
            type: 'logLevelFilter',
            appender: 'archivoError',
            level: 'error'
        }
    },

    categories: {
        default: {
            appenders: ['loggerConsola'],
            level: 'all'
        },
        prod: {
            appenders: ['loggerArchivoWarn', 'loggerArchivoError'],
            level: 'all'
        }
    }

})

let logger = log4js.getLogger()
if (process.env.NODE_ENV == 'prod') {
    logger = log4js.getLogger('prod')
}

export default logger  