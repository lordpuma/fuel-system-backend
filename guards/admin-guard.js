module.exports = async function(context) {
  if (!!context.user) {
    let roles = await context.user.getRoles();
    return !!roles.find(role => role.name === 'admin');
  } else {
    return false;
  }
};
