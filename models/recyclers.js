const mongoose = require('mongoose');

const recyclerSchema = new mongoose.Schema({
  fullName :String,
  firstName: String,
  lastName: String,
  userName:String,
  googleId:String,
  companyName: String,
  address: {
    street: {type:String, default:"Not set"},
    city: {type:String,lowercase: true, trim: true , default:"Not set"},
    country: {type:String,lowercase: true, trim: true, default:"Not set"}
  },
  gender:String,
  imageUrl: String,
  createdAt: {type: Date, default: Date.now},
  //one user (recycler) can buy many products
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
});

const Recycler = mongoose.model('Recycler', recyclerSchema);

module.exports = Recycler;