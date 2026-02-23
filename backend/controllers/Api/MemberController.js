import MembershipMember from '../../models/MembershipMember.js';
import Users from "../../models/User.js";
import Membership from '../../models/Membership.js';
import bcrypt from "bcrypt";

export const CreateUser = async (req, res) => {
  try {
    const { name, email, password, confPassword, role_id, phone, memberId, date_of_birth, join_date } = req.body;
    const roleId = role_id || 2;
    const existingUser = await Users.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    if (password !== confPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let user = {
      name,
      email,
      password: hashedPassword,
      role_id: roleId,
      phone,
      memberId,
      date_of_birth,
      join_date,
      image: null,
    };

    if (req.file) {
      user.image = req.file.path;
    }
    const newUser = await Users.create(user);

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to create user" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params; 
    const user = await Users.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User retrieved successfully", user });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to get user" });
  }
};


export const updateUserById = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    password,
    confPassword,
    role_id,
    phone,
    memberId,
    date_of_birth,
    join_date,
  } = req.body;

  try {
    let user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.name = name;
    user.email = email;
    user.role_id = role_id || 2; 
    user.phone = phone;
    user.memberId = memberId;
    user.date_of_birth = date_of_birth;
    user.join_date = join_date;

    if (password && confPassword && password === confPassword) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    if (req.file) {
      user.image = req.file.path;
    }

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Failed to update user' });
  }
};


export const deleteUsersById = async (req, res) => {
  const { id } = req.params;
  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).json({ message: 'Invalid Users ID' });
  }

  try {
    const users = await Users.findByPk(id);
    if (!users) {
      return res.status(404).json({ message: 'Users not found' });
    }
    await users.destroy();
    return res.json({ message: 'Users deleted successfully' });
  } catch (error) {
    console.error('Failed to delete Users:', error);
    return res.status(500).json({ message: 'Failed to delete Users' });
  }
};


export const createUsersMembership = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const { membership_id, start_date, pay_amount ,discount } = req.body;

    if (!membership_id || !start_date || !pay_amount) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const membership = await Membership.findByPk(membership_id);
    if (!membership) {
      return res.status(404).json({ message: 'Membership not found' });
    }

    const totalAmount = membership.price - discount; 

    const status = pay_amount < totalAmount ? 'pending' : 'paid';

    const durationInDays = membership.duration;
    const end_date = new Date(start_date);
    end_date.setDate(end_date.getDate() + durationInDays);

    const membershipMember = await MembershipMember.create({
      user_id: userId,
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

