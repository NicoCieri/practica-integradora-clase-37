import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();
import errors from "../utils/errors.dictionary.js";

export default class Controllers {
  constructor(service) {
    this.service = service;
  }
  getAll = async (req, res, next) => {
    try {
      const items = await this.service.getAll();
      return httpResponse.Ok(res, items);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await this.service.getById(id);

      return item
        ? httpResponse.Ok(res, item)
        : httpResponse.NotFound(res, errors.PROD_NOT_FOUND);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const newItem = await this.service.create(req.body);

      return newItem
        ? httpResponse.Ok(res, newItem)
        : httpResponse.NotFound(res, "Validation error!");
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      let item = await this.service.getById(id);
      return item
        ? httpResponse.Ok(res, await this.service.update(id, req.body))
        : httpResponse.NotFound(res, "Item not found!");
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await this.service.getById(id);
      return item
        ? (await this.service.delete(id), httpResponse.Ok(res, "item deleted"))
        : httpResponse.NotFound(res, "Item not found!");
    } catch (error) {
      next(error);
    }
  };
}
