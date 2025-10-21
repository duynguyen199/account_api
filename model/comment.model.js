const { default: mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    star: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
    images: [
      {
        type: String,
        maxlength: 255,
      },
    ],
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("comment", commentSchema);
