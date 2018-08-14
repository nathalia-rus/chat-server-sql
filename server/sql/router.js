const Router = require('koa-router');
const controller = require('./controller/messages');
const router = new Router();

router.post('/', controller.postMessage);
router.get('/message', controller.getMessage);

module.exports = router;