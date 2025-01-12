const { House } = require('../models');

const createHouse = async (req, res) => {
    try {
        const { name } = req.body;
        const newHouse = await House.create({ name, user_id: req.user.id });
        res.status(201).json(newHouse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getHouses = async (req, res) => {
    try {
        const houses = await House.findAll({ where: { user_id: req.user.id } });
        res.status(200).json(houses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getHouseById = async (req, res) => {
    try {
        const house = await House.findOne({ where: { id: req.params.id, user_id: req.user.id } });
        if (!house) return res.status(404).json({ error: 'House not found' });
        res.status(200).json(house);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateHouse = async (req, res) => {
    try {
        const { name } = req.body;
        const house = await House.findOne({ where: { id: req.params.id, user_id: req.user.id } });
        if (!house) return res.status(404).json({ error: 'House not found' });
        house.name = name;
        await house.save();
        res.status(200).json(house);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteHouse = async (req, res) => {
    try {
        const house = await House.findOne({ where: { id: req.params.id, user_id: req.user.id } });
        if (!house) return res.status(404).json({ error: 'House not found' });
        await house.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createHouse, getHouses, getHouseById, updateHouse, deleteHouse };