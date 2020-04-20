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




/* ---- (Dashboard) ---- */
// The route localhost:8081/genres is registered to the function
// routes.getAllGenres, specified in routes.js.
app.get('/homepage', routes.getHomepage);







/* ---- Q2 (Recommendations) ---- */
app.get('/recommendations/', routes.getRecs);







/* ---- Q3b (Best Genre) ---- */
app.get('/trending',routes.bestGenresPerDecade);







app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});
