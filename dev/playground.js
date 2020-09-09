const compose2 = (f, g) => x => f(g(x));

const add1 = x => x + 1;
const double = x => x * 2;
const negate = x => -x;

const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);

console.log(compose(negate, add1, double)(5));

const add = a => b => a + b;

const inc = add(1);
const inc10 = a => add(a)(10);
const incx = a => x => add(a)(x);

console.log(add(4)(5));

console.log(inc(5));
console.log(inc10(5));
console.log(incx(5)(10));
const a = [1, 2, 3];

const amqp = require('amqplib/callback_api');
amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    const global = 'global';
    const transactions = 'transactions';

    channel.assertExchange('global', 'fanout', { durable: false });
    if (error1) {
      throw error1;
    }

    channel.assertQueue(events, {
      durable: false,
    });

    channel.bindQueue(events, global, '');

    channel.consume(
      events,
      function(msg) {
        console.log(' events - Received %s', msg.content.toString());
      },
      {
        noAck: true,
      }
    );

    let i = 0;
    setInterval(() => {
      let msg = `Hello world ${i++}`;
      channel.publish('global', '', Buffer.from(msg));
      channel.publish('global', eventsWithTopic, Buffer.from(msg));
      // channel.sendToQueue(queue, Buffer.from(msg));
    }, 1000);
  });
});
