export default class ProductDTOResponse {
  constructor(product) {
    this.nombre = product.product_name;
    this.precio = product.product_price;
    this.descripcion = product.product_description;
    this.stock = product.product_stock;
    this.id = product._id;
    this.owner = product.product_owner;
  }
}
