import Sequelize from 'sequelize';
import db from "../config/Database.js";

const PersonalTrainerAppointment = db.define('personaltrainerappointment', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: { 
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    first_name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
            isEmail: true 
        }
    },
    appointment_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    appointment_time: {
        type: Sequelize.TIME,
        allowNull: false
    },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
  tableName: 'PersonalTrainerAppointment',
  timestamps: true,
  underscored: true
});

export default PersonalTrainerAppointment;
