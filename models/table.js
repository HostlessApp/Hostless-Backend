const mongoose = require('../db/connection');

const TableSchema = new mongoose.Schema(
    {
        number: {
            type: Number,
            required: true,
        },
        seats: {
            type: Number,
            required: true,
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model('Table', TableSchema);

