import { Sequelize } from 'sequelize';
import db from "../config/Database.js";
import Users from './User.js';
import Membership from './Membership.js';

const { DataTypes } = Sequelize;

const MembershipMember = db.define('membership_members', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  user_id: { 
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  membership_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  pay_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  discount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('pending', 'paid'),
    allowNull: false,
    defaultValue: 'pending'
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
  tableName: 'membership_members',
  timestamps: true,
  underscored: true
});

MembershipMember.belongsTo(Users, { foreignKey: 'user_id' });
MembershipMember.belongsTo(Membership, { foreignKey: 'membership_id' }); 

export default MembershipMember;
