import  Users  from "../../models/User.js";
import  Role  from "../../models/Role.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsersCountWithRole2 = async (req, res) => {
  try {
    const usersCount = await Users.count({ where: { role_id: 2 } });
    res.json({ count: usersCount });
  } catch (error) {
    console.error('Error fetching Users count:', error);
    res.status(500).json({ message: 'Failed to fetch Users count' });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({ where: { role_id: 2 } });
    const usersWithRole = await Promise.all(users.map(async user => {
      const role = await Role.findByPk(user.role_id);
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        memberId: user.memberId,
        image: user.image,
        role_id: user.role_id,
        role_name: role ? role.name : null
      };
    }));
    res.json(usersWithRole);
  } catch (error) {
    console.error('Error fetching Users:', error);
    res.status(500).json({ message: 'Failed to fetch Users' });
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });
    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    const roleId = user[0].role_id;
    const accessToken = jwt.sign(
      { userId, name, email , roleId },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const refreshToken = jwt.sign(
      { userId, name, email,roleId },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.cookie("userId", userId, { maxAge: 24 * 60 * 60 * 1000 });
    res.json({ accessToken ,roleId ,userId});
  } catch (error) {
    res.status(404).json({ msg: "Email not found" });
  }
};

