const mongoose = require('mongoose');

const upcyclerSchema = new mongoose.Schema({
  name:{
  fullName: String,
  firstName: String,
  lastName: String
  },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  email:    { type: String, required: true },
  companyName: String,
  address: {
    street: String,
    city: String,
    country: String
  },
  imageUrl: {type:String, default: 'profile-placeholder.png'},
  description: String,
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