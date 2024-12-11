const express = require('express');
const router = express.Router();
const ContactForm = require('../models/contactform');

// Krijimi i një formulari kontakti të ri
const createContactForm = async (req, res) => {
  try {
    const { emri, email, mesazhi } = req.body;

    if (!emri || !email || !mesazhi) {
      return res.status(400).json({ message: 'Të gjitha fushat janë të kërkuara.' });
    }

    const newContactForm = await ContactForm.create({
      emri,
      email,
      mesazhi,
    });

    res.status(201).json({ message: 'Mesazhi është dërguar me sukses.', data: newContactForm });
  } catch (err) {
    res.status(500).json({ message: 'Gabim gjatë dërgimit të mesazhit.', error: err });
  }
};

// Marrja e të gjitha mesazheve nga formulari i kontaktit
const getContactForms = async (req, res) => {
  try {
    const contactForms = await ContactForm.findAll();
    res.status(200).json(contactForms);
  } catch (err) {
    res.status(400).json({ message: 'Gabim në marrjen e mesazheve', error: err });
  }
};

// Përditësimi i statusit të një formulari kontakti
const updateContactFormStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { statusi } = req.body;

    const [updated] = await ContactForm.update({ statusi }, { where: { id } });

    if (updated) {
      const updatedForm = await ContactForm.findByPk(id);
      res.status(200).json({ message: 'Statusi u përditësua me sukses.', form: updatedForm });
    } else {
      res.status(404).json({ message: 'Formulari i kontaktit nuk u gjet.' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Gabim në përditësimin e statusit', error: err });
  }
};

// Fshirja e një formulari kontakti
const deleteContactForm = async (req, res) => {
  try {
    const { id } = req.params;

    const contactForm = await ContactForm.findByPk(id);
    if (!contactForm) {
      return res.status(404).json({ message: 'Formulari i kontaktit nuk u gjet.' });
    }

    await contactForm.destroy();
    res.status(200).json({ message: 'Formulari i kontaktit u fshi me sukses.' });
  } catch (err) {
    res.status(400).json({ message: 'Gabim në fshirjen e formularit të kontaktit', error: err });
  }
};

module.exports = { createContactForm, getContactForms, updateContactFormStatus, deleteContactForm };
