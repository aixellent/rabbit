#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://user:bitnami@localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'hoellen-queue';
    var msg = 'Hello World!';

    ch.assertQueue(q, {durable: true});
    ch.sendToQueue(q, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
