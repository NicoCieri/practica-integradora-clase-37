export default class Services {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = async () => {
    try {
      const items = await this.dao.getAll();
      return items ? items : false;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getById = async (id) => {
    try {
      const item = await this.dao.getById(id);
      return item ? item : false;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  create = async (obj) => {
    try {
      const newItem = await this.dao.create(obj);
      return newItem ? newItem : false;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  update = async (id, obj) => {
    console.log(id, obj);
    try {
      let item = await this.dao.getById(id);
      console.log(item);
      return item ? await this.dao.update(id, obj) : false;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  delete = async (id) => {
    try {
      return (await this.dao.delete(id)) ? true : false;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
