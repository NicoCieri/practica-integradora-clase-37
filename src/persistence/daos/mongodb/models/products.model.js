import mongoose from "mongoose";

export const productsCollection = "products";

export const productsSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  product_description: { type: String, required: true },
  product_price: { type: Number, required: true },
  product_stock: { type: Number, required: true },
  product_owner: {
    type: String,
    required: true,
    default: "admin",
    validate: {
      validator: function (v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v) || v === "admin";
      },
      message: (props) =>
        `${props.value} no es un correo electrónico válido ni 'admin'`,
    },
  },
});

export const ProductModel = mongoose.model(productsCollection, productsSchema);
