import  Workouts  from "../../models/WorkOut.js";

export const createWorkout = async (req, res) => {
    try {
      const { title, description } = req.body;
      const { file } = req;
  
      if (!file) {
        return res.status(400).json({ message: "Please upload an image for the workout" });
      }
  
      const workout = {
        title,
        description,
        workout_image: file.path,
      };
  
      const newWorkout = await Workouts.create(workout);
  
      res.status(201).json({ message: "Workout created successfully", workout: newWorkout });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Failed to create workout" });
    }
  };
  


export const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workouts.findAll();
    res.json(workouts);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to fetch workouts" });
  }
};

export const getWorkoutById = async (req, res) => {
  const { id } = req.params;
  try {
    const workout = await Workouts.findByPk(id);
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.json(workout);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to fetch workout" });
  }
};


export const updateWorkoutById = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount, updatedRows] = await Workouts.update(req.body, {
      where: { id },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.json({ message: "Workout updated successfully", workout: updatedRows[0] });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to update workout" });
  }
};


export const deleteWorkoutById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await Workouts.destroy({ where: { id } });
    if (deletedRowCount === 0) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.json({ message: "Workout deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to delete workout" });
  }
};
