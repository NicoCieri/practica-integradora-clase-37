import Services from "./class.services.js";
import factory from "../persistence/daos/factory.js";
import ProductRepository from "../persistence/repository/product.repository.js";

const { productDao } = factory;
const prodRepository = new ProductRepository();

export default class ProductService extends Services {
  constructor() {
    super(productDao);
  }

  async createProd(prod, owner) {
    try {
      const newProd = await prodRepository.createProd(prod, owner);
      return newProd ? newProd : false;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProductById(id) {
    try {
      const prod = await prodRepository.getProductById(id);
      return prod ? prod : false;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
