const esl = require('modesl');

const { logger } = require('./logger');

let connection = null;

const Event = {
  Connection: {
    READY: 'esl::ready',
    CLOSED: 'esl::end',
    ERROR: 'error',
  },
  RECEIVED: 'esl::event::*::*',
};

const { FREESWITCH_HOST, FREESWITCH_PORT } = process.env;

async function connect() {
  return new Promise((resolve, reject) => {
    if (connection !== null && connection.connected()) {
      resolve(connection);
    } else {
      logger.info('Opening new FreeSWITCH event socket connection...');
      connection = new esl.Connection(
        FREESWITCH_HOST,
        FREESWITCH_PORT,
        'ClueCon',
      );
      connection.on(Event.Connection.ERROR, error => {
        console.log(error);
        logger.error('Error connecting to FreeSWITCH!');
        reject('Connection error');
      });
      connection.on(Event.Connection.CLOSED, () => {
        logger.info('Connection to FreeSWITCH closed!');
        reject('Connection closed');
      });

      connection.on(Event.Connection.READY, () => {
        logger.info(
          `Connected to FreeSWITCH: ${FREESWITCH_HOST}:${FREESWITCH_PORT}`,
        );
        resolve(connection);
      });
    }
  }).catch(error => {
    console.log(error);
  });
}

async function command(command) {
  logger.info(`command: ${command}`);
  return new Promise((resolve, reject) => {
    connection.api(command, res => {
      logger.info(res.getBody());
      resolve(res.getBody());
    });
  });
}
module.exports = {
  connect,
  command,
};
