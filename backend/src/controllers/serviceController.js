const Service = require('../models/Service');
const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
  try {
    const { search = '' } = req.query;
    const data = await Service.findAll({
      where: { name: { [Op.like]: `%${search}%` } }
    });
    res.json({ data });
  } catch (e) {
    res.status(500).json({ message: 'Error fetching data' });
  }
};

exports.create = async (req, res) => {
  try {
    const s = await Service.create(req.body);
    res.json(s);
  } catch (e) {
    res.status(400).json({ message: 'Create failed' });
  }
};

exports.update = async (req, res) => {
  try {
    await Service.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'Updated' });
  } catch (e) {
    res.status(400).json({ message: 'Update failed' });
  }
};

exports.remove = async (req, res) => {
  try {
    await Service.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ message: 'Delete failed' });
  }
};