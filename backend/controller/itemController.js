const Item = require('../models/item');

// Krijimi i një objekti të ri
const createItem = async (req, res) => {
  try {
    const { name, description, address } = req.body;
    const newItem = await Item.create({ name, description, address });
    res.status(201).json({ message: 'Itemi u krijua me sukses', item: newItem });
  } catch (err) {
    res.status(400).json({ message: 'Gabim në krijimin e itemit', error: err });
  }
};

// Marrja e të gjithë objekteve
const getItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.status(200).json(items);
  } catch (err) {
    res.status(400).json({ message: 'Gabim në marrjen e objekteve', error: err });
  }
};

// Përditësimi i një objekti ekzistues
const updateItem = async (req, res) => {
  try {
    const { name, description, address } = req.body;
    const [updated] = await Item.update(
      { name, description, address },
      { where: { id: req.params.id } }
    );

    if (updated) {
      const updatedItem = await Item.findByPk(req.params.id);
      res.status(200).json({ message: 'Itemi u përditësua me sukses', item: updatedItem });
    } else {
      res.status(404).json({ message: 'Itemi nuk u gjet' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Gabim në përditësimin e itemit', error: err });
  }
};

// Fshirja e një objekti
const deleteItem = async (req, res) => {
  try {
    console.log('Marrja e kërkesës DELETE për itemin me ID:', req.params.id); // Shtimi i log-ut për debugging

    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Itemi nuk u gjet' });
    }
    await item.destroy();
    res.status(200).json({ message: 'Itemi u fshi me sukses', item: item });
  } catch (err) {
    res.status(400).json({ message: 'Gabim në fshirjen e itemit', error: err });
  }
};

// Eksportimi i funksioneve
module.exports = { createItem, getItems, updateItem, deleteItem };
