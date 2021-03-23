////////////////////////////////////////////////////////////////////////////////////////
// Game model definition
/////////////////////////////////////////////////////////////////////////////////////////
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define(
    'game',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      startsAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endsAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      underscored: true,
    }
  );

  return Game;
};
