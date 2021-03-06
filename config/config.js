module.exports = {
  development: {
    username: 'db',
    password: 'dev',
    database: 'db',
    host: 'db',
    dialect: 'postgres',
    operatorsAliases: false,
  },
  test: {
    username: 'database_test',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
  },
};
