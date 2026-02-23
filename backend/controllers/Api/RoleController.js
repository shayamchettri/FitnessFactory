import Role from "../../models/Role.js";

export const getRoles = async (req, res) => {
        try {
          const users = await Role.findAll({
            attributes: ["id", "name", "description"],
          });
          res.json(users);
        } catch (error) {
          console.log(error);
        }
      };

      