import pino from 'pino';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const transports = pino.transport({
  target: 'pino/file',
  options: { destination: './psifibot.log', mkdir: true }
})

export const logger = pino(transports);