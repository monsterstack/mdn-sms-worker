'use strict';
const config = require('config');
const Worker = require('core-worker').Worker;


const main = () => {
  console.log('Starting Sms Worker');
  let announcement = require('./announcement.json');

  let worker = new Worker("SmsWorker", announcement, {
    queue: "sms",
    redis: {
      host: config.redis.host,
      port: config.redis.port
    },
    discoveryHost: config.discovery.host,
    discoveryPort: config.discovery.port,
    typeQuery: ["TenantService"]
  });

  worker.init().then(() => {
    // Announce
    worker.announce();

    worker.listen().then(() => {
      worker.on('message', (workLoad) => {
        console.log(workLoad);
      });

      worker.on('error', (err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  }).catch((err) => {
    console.log(err);
  });
}


if(require.main === module) {
  main();
}
