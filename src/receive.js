#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://user:bitnami@localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'hoellen-queue';

    ch.assertQueue(q, {durable: true});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {
      console.log(" [x] Received %s", msg.content.toString());
    }, {noAck: true});
  });
});
