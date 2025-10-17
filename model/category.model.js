const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    avt: {
      type: String,
      required: true,
    }, 
    //createdAt, updatedAt fields will be automatically managed by Mongoose
  },
  {
    timestamps: true,
    versionKey: false, // Disable the __v field
  },
);

module.exports = mongoose.model('category', categorySchema);