const mongoose = require('../db/connection');

const TableSchema = new mongoose.Schema(
    {
        identifier: {
            type: String,
            required: true,
        },
        seats: {
            type: Number,
            required: true,
        }
    },
    {timestamps: true}
);

const Table = mongoose.model('Table', TableSchema);

module.exports = Table;

