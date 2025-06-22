const { Table, Order } = require("../models");
const { Op } = require("sequelize");
const createHttpError = require("http-errors");

const addTable = async (req, res, next) => {
  try {
    const { tableNo, seats } = req.body;
    if (!tableNo) {
      const error = createHttpError(400, "Please provide table No!");
      return next(error);
    }
    const isTablePresent = await Table.findOne({ where: { tableNo } });

    if (isTablePresent) {
      const error = createHttpError(400, "Table already exist!");
      return next(error);
    }

    const newTable = await Table.create({ tableNo, seats });
    res
      .status(201)
      .json({ success: true, message: "Table added!", data: newTable });
  } catch (error) {
    next(error);
  }
};

const getTables = async (req, res, next) => {
  try {
    const tables = await Table.findAll({
      include: [{
        model: Order,
        as: 'orders',
        attributes: ['id', 'customerDetails', 'orderStatus'],
        required: false
      }]
    });
    res.status(200).json({ success: true, data: tables });
  } catch (error) {
    next(error);
  }
};

const updateTable = async (req, res, next) => {
  try {
    const { status, orderId } = req.body;
    const { id } = req.params;

    const table = await Table.findByPk(id);
    if (!table) {
      const error = createHttpError(404, "Table not found!");
      return next(error);
    }

    await table.update({ status, currentOrderId: orderId });

    res.status(200).json({success: true, message: "Table updated!", data: table});

  } catch (error) {
    next(error);
  }
};

module.exports = { addTable, getTables, updateTable };
