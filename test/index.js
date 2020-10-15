const express = require('express');
const app = express();
const port = 8080;

app.use('/', express.static('test/static'));
app.use('/src', express.static('dist'));

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});