const rabbot = require("rabbot");

const connection = {
    user: "user",
    pass: "bitnami",
    host: "localhost",
    port: 5672,
    timeout: 2000,
    vhost: "%2f",
    heartbeat: 10
};
const exchanges = [{ name: "my.exchange" }];
const queues = [{ name: "my.queue", subscribe: true }];
const bindings = [
    { exchange: "my.exchange", target: "my.queue", keys: "my.key" }
];

const settings = {
    bindings,
    connection,
    exchanges,
    queues
};

const handler = rabbot.handle({ queue: "my.queue" }, message => {
    try {
        console.log(message);
        message.ack();
    } catch (e) {
        console.error(e);
        message.nack();
    }
});

rabbot.configure(settings).done(() => {
    console.log("connected");
    rabbot.publish("my.exchange", {
        routingKey: "my.key",
        contentType: "application/json",
        body: { hello: "world" }
    });
});
