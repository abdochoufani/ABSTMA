const mongoose = require('mongoose');

const upcyclerSchema = new mongoose.Schema({
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
  website: String,
  createdAt: {type: Date, default: Date.now},
  //one upcycler can produce many products
  product: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
});

const Upcycler = mongoose.model('Upcycler', upcyclerSchema);

module.exports = Upcycler;