//----------------------------------------------------------------------------------
// Migration commentaire
//----------------------------------------------------------------------------------
"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Commentaires", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      texte: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      messageId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Messages",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Commentaires");
  },
};
