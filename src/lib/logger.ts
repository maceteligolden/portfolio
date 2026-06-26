import { env } from "@/lib/env";
import pino, { type Logger } from "pino";

const isDevelopment = process.env.NODE_ENV === "development";

/**
 * Server-side structured logger. Import only from Server Components,
 * Route Handlers, or other Node.js runtime code.
 */
export const logger: Logger = pino({
  level: env.logLevel,
  ...(isDevelopment && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:standard",
        ignore: "pid,hostname",
      },
    },
  }),
});

export const createChildLogger = (moduleName: string): Logger =>
  logger.child({ module: moduleName });
