// import chalk from 'chalk';
import cors from 'cors';
import express from 'express';
const app = express();

import http from 'http';
import { Server } from "socket.io";
const server = http.createServer(app);
const io = new Server(server);

const log = [];
const blacklist = ['/favicon.ico', '/robots.txt', '/log', '/'];

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/', express.static('public'));

app.get('/log', (req, res) => {
    res.json(log);
});

io.on('connection', (socket) => {
    socket.emit('log-all', log);
});

app.use((req, res, next) => {
    const data = {
        path: req.path,
        method: req.method,
        query: req.query,
        body: req.body,
        time: Date.now()
    };

    if(!blacklist.includes(req.path)) {


        console.log(data);

        log.push(data);
        if(log.length > 100) {
            log.shift();
        }
        io.emit('log-new', data);
    }


    res.json({
        status: 'ok',
        data
    })
    return;
});

server.listen(port, () => {
    console.log(`Mock server is running on port ${port}`)
});