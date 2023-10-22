import { Router } from "express";
import { checkAuth } from "../middlewares/authJwt.js";
import ProductController from "../controllers/product.controllers.js";
const controller = new ProductController();

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getProductById);
router.post("/", checkAuth, controller.createProd);
router.put("/:id", checkAuth, controller.updateProd);
router.delete("/:id", checkAuth, controller.deleteProd);

export default router;
