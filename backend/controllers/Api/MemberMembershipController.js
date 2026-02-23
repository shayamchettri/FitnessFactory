import MembershipMember from '../../models/MembershipMember.js';
import User from '../../models/User.js';
import Membership from '../../models/Membership.js';

export const createMembershipMember = async (req, res) => {
  try {
    const { user_id, membership_id, start_date, pay_amount, discount } = req.body;
    const membership = await Membership.findByPk(membership_id);

    if (!membership) {
      return res.status(404).json({ message: 'Membership not found' });
    }

    const totalAmount = pay_amount + discount;

    const status = totalAmount <= membership.price ? 'pending' : 'paid';

    const durationInDays = membership.duration;
    const end_date = new Date(start_date);
    end_date.setDate(end_date.getDate() + durationInDays);

    const membershipMember = await MembershipMember.create({
      user_id,
      start_date,
      end_date,
      membership_id,
      pay_amount,
      discount,
      status
    });

    res.status(201).json({ message: 'Membership member created successfully', membershipMember });
  } catch (error) {
    console.error('Error creating membership member:', error);
    res.status(500).json({ message: 'Failed to create membership member' });
  }
};

export const updateMembershipMemberPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { pay_amount } = req.body;
    
    const membershipMember = await MembershipMember.findByPk(id);

    if (!membershipMember) {
      return res.status(404).json({ message: 'Membership member not found' });
    }

    const membership = await Membership.findByPk(membershipMember.membership_id);
    
    const oldPayAmount = membershipMember.pay_amount;
    const pay_new = parseFloat(oldPayAmount) + parseFloat(pay_amount)
    const totalAmount = pay_new + membershipMember.discount;
    const status = totalAmount <= membership.price ? 'pending' : 'paid';
    membershipMember.pay_amount = parseFloat(pay_new);
    membershipMember.status = status;
    
    await membershipMember.save();

    res.status(200).json({ 
      message: 'Membership member payment updated successfully', 
      oldPayAmount,
      membershipMember 
    });
  } catch (error) {
    console.error('Error updating membership member payment:', error);
    res.status(500).json({ message: 'Failed to update membership member payment' });
  }
};

export const getAllMembershipMembers = async (req, res) => {
  try {
    const membershipMembers = await MembershipMember.findAll({
      include: [
        { model: User, attributes: ['id', 'name','phone','memberId' ,'email'] },
        { model: Membership, attributes: ['id', 'name', 'price', 'duration'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(membershipMembers);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to fetch membership members" });
  }
};

export const getMembershipByUserId = async (req, res) => {
  const { user_id } = req.params;
  try {
    const memberships = await MembershipMember.findAll({
      where: { user_id },
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Membership, attributes: ['id', 'name', 'price', 'duration'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(memberships);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to fetch memberships for the user' });
  }
};

export const getMembershipMemberById = async (req, res) => {
  const { id } = req.params;
  try {
    const membershipMember = await MembershipMember.findByPk(id, {
      include: [User, Membership]
    });

    if (!membershipMember) {
      return res.status(404).json({ message: 'Membership member not found' });
    }

    res.json(membershipMember);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to fetch membership member' });
  }
};

export const updateMembershipMemberById = async (req, res) => {
  const { id } = req.params;
  const { pay_amount } = req.body;

  try {
    const membershipMember = await MembershipMember.findByPk(id);

    if (!membershipMember) {
      return res.status(404).json({ message: 'Membership member not found' });
    }

    const discount = membershipMember.Membership.price - pay_amount;
    const totalAmount = pay_amount + discount;
    const status = totalAmount <= membershipMember.Membership.price ? 'pending' : 'paid';

    await membershipMember.update({ pay_amount, discount, status });

    res.json({ message: 'Membership member updated successfully', membershipMember });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to update membership member' });
  }
};



export const deleteMembershipMemberById = async (req, res) => {
  const { id } = req.params;
  try {
    const membershipMember = await MembershipMember.findByPk(id);

    if (!membershipMember) {
      return res.status(404).json({ message: 'Membership member not found' });
    }

    await membershipMember.destroy();

    res.json({ message: 'Membership member deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to delete membership member' });
  }
};
