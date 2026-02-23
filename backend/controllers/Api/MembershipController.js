import Membership from "../../models/Membership.js";

export const createMembership = async (req, res) => {
  try {
    const { name, description, duration, price } = req.body;
    let image = null;

    if (req.file) {
      image = req.file.path;
    }

    const newMembership = await Membership.create({
      name,
      description,
      duration,
      price,
      image,
    });

    res.status(201).json({ message: "Membership created successfully", membership: newMembership });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to create membership" });
  }
};

export const getMemberships = async (req, res) => {
  try {
    const memberships = await Membership.findAll();
    res.json(memberships);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to fetch memberships" });
  }
};

export const deleteMembershipById = async (req, res) => {
  const { id } = req.params;
  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).json({ message: 'Invalid membership ID' });
  }

  try {
    const membership = await Membership.findByPk(id);
    if (!membership) {
      return res.status(404).json({ message: 'Membership not found' });
    }

    await membership.destroy();
    return res.json({ message: 'Membership deleted successfully' });
  } catch (error) {
    console.error('Failed to delete membership:', error);
    return res.status(500).json({ message: 'Failed to delete membership' });
  }
};
export const getMembershipById = async (req, res) => {
  const { membershipId } = req.params;

  try {
    const membership = await Membership.findByPk(membershipId);

    if (!membership) {
      return res.status(404).json({ message: 'Membership not found' });
    }

    res.status(200).json({ membership });
  } catch (error) {
    console.error('Error fetching membership:', error);
    res.status(500).json({ message: 'Failed to fetch membership' });
  }
};
