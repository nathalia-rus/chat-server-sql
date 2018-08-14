const Koa = require('koa');
const router = require('./router');
const bodyParser = require('koa-bodyparser');
const server = require('koa-static');
const cors = require('koa-cors');
const app = new Koa();
const PORT = 3000;

app.use(cors()); 
app.use(bodyParser());  
app.use(server(__dirname + '/../../client'));
app.use(router.routes());

app.listen(PORT, () => console.log("CONNECTED TO PORT 3001"));

