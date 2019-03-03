const mongoose = require('mongoose');

const recyclerSchema = new mongoose.Schema({
  fullName: String,
  firstName: String,
  lastName: String,
  userName: String,
  companyName: String,
  address: {
    street: String,
    city: String,
    country: String
  },
  imageUrl: String,
  createdAt: {type: Date, default: Date.now},
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }
});

const Recycler = mongoose.model('Recycler', recyclerSchema);

module.exports = Recycler;