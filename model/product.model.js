const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    avt: {
      type: String,
    },

    discount: {
      type: Number,
      default: 0, // discount percentage or amount
      min: 0,
    },
    count_sale: {
      type: Number,
      default: 0,
      min: 0,
    },
    category_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "category",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('product', productSchema);