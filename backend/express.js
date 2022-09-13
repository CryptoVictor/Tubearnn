const bodyParser = require('body-parser');
const express = require('express');
const request = require('request');
const path = require('path');
const index = require('./index');

const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

const app = express();
app.use(bodyParser.json());

app.get('/back/getProvider', (req, res) => {

    res.json(index.getProvider);
    console.log(index.getProvider);
});

app.get('/back/user_tokens', (req, res) => {

    res.json(index.user_tokens);
    console.log(index.user_tokens);
});

app.get('/back/tokens_unc', (req, res) => {

    res.json(index.tokens_unc);
    console.log(index.tokens_unc);
});

app.get('/back/connectUser', (req, res) => {

    res.json(index.connectUser);
    console.log(index.connectUser);

});

app.get('/back/withdrawRewards', (req, res) => {

    res.json(index.withdrawRewards);
    console.log(index.withdrawRewards);

});

const PORT = DEFAULT_PORT;

app.listen(PORT, () => {

    console.log(`listening at localhost: ${PORT}`);

    if(PORT !== DEFAULT_PORT) {
    syncWithRootState();
    }

});