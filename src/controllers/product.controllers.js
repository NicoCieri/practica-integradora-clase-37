import Controllers from "./class.controller.js";
import ProductService from "../services/product.services.js";
const productService = new ProductService();
import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();
import errors from "../utils/errors.dictionary.js";

export default class ProductController extends Controllers {
  constructor() {
    super(productService);
  }

  async createProd(req, res, next) {
    try {
      const user = req.user;

      if (!user || (user.role !== "admin" && user.role !== "premium")) {
        httpResponse.Forbidden(res, errors.PERMISSION_DENIED);
        return;
      }

      const newProd = await productService.createProd(req.body, user.email);

      return newProd
        ? httpResponse.Ok(res, newProd)
        : httpResponse.NotFound(res, errors.PROD_NOT_FOUND);
    } catch (error) {
      next(error.message);
    }
  }

  async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      return product
        ? httpResponse.Ok(res, product)
        : httpResponse.NotFound(res, errors.PROD_NOT_FOUND);
    } catch (error) {
      next(error.message);
    }
  }

  async updateProd(req, res, next) {
    try {
      const user = req.user;
      const { id } = req.params;
      const prod = req.body;

      const isAdmin = user?.role === "admin";
      const isPremium = user?.role === "premium";

      if (!user || (!isAdmin && !isPremium)) {
        httpResponse.Forbidden(res, errors.PERMISSION_DENIED);
        return;
      }

      const product = await productService.getProductById(id);

      if (!product) {
        httpResponse.NotFound(res, errors.PROD_NOT_FOUND);
      }

      if (product.owner !== user.email && !isAdmin) {
        httpResponse.Forbidden(res, errors.PERMISSION_DENIED);
        return;
      }

      const updatedProd = await productService.update(id, prod);

      return updatedProd
        ? httpResponse.Ok(res, updatedProd)
        : httpResponse.NotFound(res, errors.PROD_NOT_FOUND);
    } catch (error) {
      next(error.message);
    }
  }

  async deleteProd(req, res, next) {
    try {
      const user = req.user;
      const { id } = req.params;

      const isAdmin = user?.role === "admin";
      const isPremium = user?.role === "premium";

      if (!user || (!isAdmin && !isPremium)) {
        httpResponse.Forbidden(res, errors.PERMISSION_DENIED);
        return;
      }

      const product = await productService.getProductById(id);

      if (!product) {
        httpResponse.NotFound(res, errors.PROD_NOT_FOUND);
      }

      if (product.owner !== user.email && !isAdmin) {
        httpResponse.Forbidden(res, errors.PERMISSION_DENIED);
        return;
      }

      const deletedProd = await productService.delete(id);

      return deletedProd
        ? httpResponse.Ok(res, "Product deleted")
        : httpResponse.NotFound(res, errors.PROD_NOT_FOUND);
    } catch (error) {
      next(error.message);
    }
  }
}
