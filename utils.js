const db = require('./models');

exports.getUserFromContext = async (context) => {
  const token = await db['token'].findOne({where: {token: context.headers.token}});
  return await token.getUser();
};