import MembershipMember from '../../models/MembershipMember.js';
import User from '../../models/User.js';
import Membership from '../../models/Membership.js';
import { Op } from 'sequelize';

export const createMembershipMember = async (req, res) => {
  try {
    const { user_id, membership_id, start_date, pay_amount, discount } = req.body;
    const membership = await Membership.findByPk(membership_id);
    if (!membership) {
      return res.status(404).json({ message: 'Membership not found' });
    }
    const durationInDays = membership.duration;
    const end_date = new Date(start_date);
    end_date.setDate(end_date.getDate() + durationInDays);
    const membershipMember = await MembershipMember.create({
      user_id,
      start_date,
      end_date,
      membership_id,
      pay_amount,
      discount
    });
    res.status(201).json({ message: 'Membership member created successfully', membershipMember });
  } catch (error) {
    console.error('Error creating membership member:', error);
    res.status(500).json({ message: 'Failed to create membership member' });
  }
};

export const getTotalPendingAmount = async (req, res) => {
  try {
    const pendingMemberships = await MembershipMember.findAll({ where: { status: 'pending' } });
    const totalPendingAmount = pendingMemberships.reduce((total, membership) => {
      return total + (membership.pay_amount - membership.discount);
    }, 0);
    res.status(200).json({ totalPendingAmount });
  } catch (error) {
    console.error('Error calculating total pending amount:', error);
    res.status(500).json({ message: 'Failed to calculate total pending amount' });
  }
};

export const getPendingMembers = async (req, res) => {
    try {
      const membershipMembers = await MembershipMember.findAll({
        include: [
          { model: User, attributes: ['id', 'name', 'phone', 'memberId', 'email'] },
          { model: Membership, attributes: ['id', 'name', 'price', 'duration'] }
        ],
        where: { status: 'Pending' },
        order: [['createdAt', 'DESC']]
      });
  
      res.json(membershipMembers);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Failed to fetch membership members" });
    }
  };
  
  export const getPaidMembers = async (req, res) => {
    try {
      const membershipMembers = await MembershipMember.findAll({
        include: [
          { model: User, attributes: ['id', 'name', 'phone', 'memberId', 'email'] },
          { model: Membership, attributes: ['id', 'name', 'price', 'duration'] }
        ],
        where: { status: 'Paid' },
        order: [['createdAt', 'DESC']]
      });
  
      res.json(membershipMembers);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Failed to fetch membership members" });
    }
  };
  
      
  
  

export const getTotalEarnedAmount = async (req, res) => {
  try {
    const completedMemberships = await MembershipMember.findAll({ where: { status: 'paid' } });
    const totalEarnedAmount = completedMemberships.reduce((total, membership) => {
      return total + (membership.pay_amount - membership.discount);
    }, 0);
    res.status(200).json({ totalEarnedAmount });
  } catch (error) {
    console.error('Error calculating total earned amount:', error);
    res.status(500).json({ message: 'Failed to calculate total earned amount' });
  }
};

export const getExpiredMembersCount = async (req, res) => {
    try {
      const today = new Date();
      const expiredMembers = await MembershipMember.findAll({ where: { end_date: { [Op.lt]: today } } });
      const expiredMembersCount = expiredMembers.length;
      res.status(200).json({ expiredMembersCount });
    } catch (error) {
      console.error('Error retrieving expired members count:', error);
      res.status(500).json({ message: 'Failed to retrieve expired members count' });
    }
  };

  export const getExpiredMembers = async (req, res) => {
    try {
      const today = new Date();
  
      const membershipMembers = await MembershipMember.findAll({
        include: [
          { model: User, attributes: ['id', 'name', 'phone', 'memberId', 'email'] },
          { model: Membership, attributes: ['id', 'name', 'price', 'duration'] }
        ],
        where: {
          end_date: {
            [Op.lt]: today 
          }
        },
        order: [['createdAt', 'DESC']]
      });
  
      res.json(membershipMembers);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Failed to fetch membership members" });
    }
  };

  export const getExpiringMembers = async (req, res) => {
    try {
      const today = new Date();
      const fourDaysLater = new Date(today);
      fourDaysLater.setDate(fourDaysLater.getDate() + 4);
  
      const membershipMembers = await MembershipMember.findAll({
        include: [
          { model: User, attributes: ['id', 'name', 'phone', 'memberId', 'email'] },
          { model: Membership, attributes: ['id', 'name', 'price', 'duration'] }
        ],
        where: {
          end_date: {
            [Op.between]: [today, fourDaysLater]
          }
        },
        order: [['createdAt', 'DESC']]
      });
  
      res.json(membershipMembers);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Failed to fetch membership members" });
    }
}

  export const getExpiringMembersCount = async (req, res) => {
    try {
      const today = new Date();
      const fourDaysLater = new Date(today);
      fourDaysLater.setDate(fourDaysLater.getDate() + 4);
      const expiringMembers = await MembershipMember.findAll({ where: { end_date: { [Op.between]: [today, fourDaysLater] } } });
      const expiringMembersCount = expiringMembers.length;
      res.status(200).json({ expiringMembersCount });
    } catch (error) {
      console.error('Error retrieving expiring members count:', error);
      res.status(500).json({ message: 'Failed to retrieve expiring members count' });
    }
  };
  