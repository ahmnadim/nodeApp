const express = require('express');
const exphbs = require('express-handlebars');
const members = require('./Members');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => res.render('home', {
	'title': 'Members App',
	members
} ));

app.use('/api/members', require('./routes/api/members'));



const port = process.env.port || 8080;
app.listen(port, () => console.log(`Server running on port: ${port}`));