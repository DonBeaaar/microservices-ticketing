import Nats from 'node-nats-streaming';

console.clear();

const stan = Nats.connect('ticketing', 'abcd', {
    url: 'htttp://localhost:4222'
});

stan.on('connect', () => {
    console.log('Publisher connected');

    const data = JSON.stringify({
        id: 123,
        title: 'concerts',
        price: 20
    });

    stan.publish('ticket:created', data, () => {
        console.log('Event published')
    });
});