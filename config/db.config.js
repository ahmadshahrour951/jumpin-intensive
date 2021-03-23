module.exports = {
  development: {
    user: process.env.USER,
    password: process.env.PASSWORD,
    db: process.env.DB,
    options: {
      host: process.env.HOST,
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      logging: false
    },
  },
  production: {
    user: process.env.USER,
    password: process.env.PASSWORD,
    db: process.env.DB,
    options: {
      host: process.env.HOST,
      dialect: 'postgres',
      ssl: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      logging: false
    },
  },
};
