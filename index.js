const { App } = require('@ionited/mesh');

const app = new App();

let clients = [];

app

.ws('/ws', {
  open: ws => clients.push(ws),
  message: (_, message) => {
    const data = JSON.parse(Buffer.from(message).toString());

    for (const c of clients) c.send(JSON.stringify(data));
  },
  close: ws => clients = clients.filter(c => c !== ws)
})

.listen(1000);
