const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    saleId: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    saleAmount: {
        type: Number,
        required: true
    },
   
})

mongoose.model("SaleModel", saleSchema);