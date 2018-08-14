const model = require('./../model/messages');

exports.postMessage = async (ctx) => {
  try {
    await model.storeMessage(ctx.request.body);
    ctx.status = 201;
  } catch (err) {
    ctx.status = err.code;
  }
};

exports.getMessage = async (ctx) => {
  try {
    ctx.response.body = await model.getDatabase();
    ctx.status = 200;
  } catch (err) {
    ctx.status = err.code;
  }
};

