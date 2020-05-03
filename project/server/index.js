const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */




app.get('/homepage', routes.getHomepage);
//app.get('/homepage/second/', routes.getHomepageSecond);

app.get('/homepage/second',routes.getRecs);




/* ---- Q2 (Recommendations) ---- */
app.get('/recommendations', routes.need);











app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});
