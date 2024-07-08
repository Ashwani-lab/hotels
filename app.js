const express = require('express')
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body

app.get('/', function (req, res) {
    res.send('Welcome to Hotel API , How can i help you ?')
});

// Import the Router Files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuItemRoutes');

//Use the Routers
app.use('/person', personRoutes);
app.use('/MenuItem', menuRoutes);

app.listen(3000, () => {
    console.log('listening to the port 3000');
});
