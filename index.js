import chalk from 'chalk';
import cors from 'cors';
import express from 'express';
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    const data = {
        path: req.path,
        method: req.method,
        query: req.query,
        body: req.body,
        time: new Date().toLocaleString()
    };
    console.log('\n', chalk.blue(data.time), chalk.green(data.method), chalk.yellow(data.path));
    console.log(data.body && data.body.return ? data.body.return : {
        ...data.query,
        ...data.body,
    });
    res.json(data.body && data.body.return ? data.body.return : data);
    return;
});

app.listen(port, console.log(`Mock server is running on port ${port}`));