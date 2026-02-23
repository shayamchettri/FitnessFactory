import Notification from "../../models/Notification.js";

export const createNotification = async (req, res) => {
  try {
    const { title, description, announcementDate } = req.body;
    let image = null;

    const newNotification = await Notification.create({
      title,
      description,
      announcementDate,
      image,
    });

    res.status(201).json({ message: "Notification created successfully", notification: newNotification });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to create notification" });
  }
};

export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll();
    res.json(notifications);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};

export const deleteNotificationById = async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findByPk(id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    await notification.destroy();
    return res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Failed to delete notification:', error);
    return res.status(500).json({ message: 'Failed to delete notification' });
  }
};

export const updateNotificationById = async (req, res) => {
    const { id } = req.params;
    const { title, description, announcementDate } = req.body;
  
    try {
      let notification = await Notification.findByPk(id);
      if (!notification) {
        return res.status(404).json({ message: 'Notification not found' });
      }
  
      notification.title = title;
      notification.description = description;
      notification.announcementDate = announcementDate;
  
      await notification.save();
  
      return res.json({ message: 'Notification updated successfully', notification });
    } catch (error) {
      console.error('Failed to update notification:', error);
      return res.status(500).json({ message: 'Failed to update notification' });
    }
  };
  