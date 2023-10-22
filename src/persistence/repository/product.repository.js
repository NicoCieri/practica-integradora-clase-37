import factory from "../daos/factory.js";
const { productDao } = factory;
import ProductDTORegister from "../dtos/product.dto.register.js";
import ProductDTOResponse from "../dtos/product.dto.response.js";

export default class ProductRepository {
  constructor() {
    this.dao = productDao;
  }

  async createProd(prod, owner) {
    try {
      const prodDTO = new ProductDTORegister(prod, owner);
      return await this.dao.create(prodDTO);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProductById(id) {
    try {
      const product = await this.dao.getById(id);
      return new ProductDTOResponse(product);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
