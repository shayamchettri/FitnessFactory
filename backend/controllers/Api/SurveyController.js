
import Survey from '../../models/Survey.js';

export const createSurvey = async (req, res) => {
  try {
    const { title, description, url } = req.body;
    const newSurvey = await Survey.create({ title, description, url });
    res.status(201).json(newSurvey);
  } catch (error) {
    console.error('Error creating survey:', error);
    res.status(500).json({ error: 'Failed to create survey' });
  }
};
export const getAllSurveys = async (req, res) => {
  try {
    const surveys = await Survey.findAll();
    res.json(surveys);
  } catch (error) {
    console.error('Error fetching surveys:', error);
    res.status(500).json({ error: 'Failed to fetch surveys' });
  }
};

export const getSurveyById = async (req, res) => {
  const { id } = req.params;
  try {
    const survey = await Survey.findByPk(id);
    if (!survey) {
      return res.status(404).json({ error: 'Survey not found' });
    }
    res.json(survey);
  } catch (error) {
    console.error('Error fetching survey by ID:', error);
    res.status(500).json({ error: 'Failed to fetch survey' });
  }
};

export const updateSurveyById = async (req, res) => {
  const { id } = req.params;
  const { title, description, url } = req.body;
  try {
    let survey = await Survey.findByPk(id);
    if (!survey) {
      return res.status(404).json({ error: 'Survey not found' });
    }
    survey.title = title;
    survey.description = description;
    survey.url = url;
    await survey.save();
    res.json(survey);
  } catch (error) {
    console.error('Error updating survey by ID:', error);
    res.status(500).json({ error: 'Failed to update survey' });
  }
};

export const deleteSurveyById = async (req, res) => {
  const { id } = req.params;
  try {
    const survey = await Survey.findByPk(id);
    if (!survey) {
      return res.status(404).json({ error: 'Survey not found' });
    }
    await survey.destroy();
    res.json({ message: 'Survey deleted successfully' });
  } catch (error) {
    console.error('Error deleting survey by ID:', error);
    res.status(500).json({ error: 'Failed to delete survey' });
  }
};
