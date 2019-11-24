import { Router } from "express";

import CensoController from "./app/controllers/CensoController";
import GeoController from "./app/controllers/GeoController";
import UserController from "./app/controllers/UserController";
import SchoolController from "./app/controllers/SchoolController";
import SchoolCategoryController from "./app/controllers/SchoolCategoryController";
import SchoolFoodTypeController from "./app/controllers/SchoolFoodTypeController";
import SchoolInfraestructureController from "./app/controllers/SchoolInfraestructureController";
import SchoolExtraActivityController from "./app/controllers/SchoolExtraActivityController";
import SchoolTypeController from "./app/controllers/SchoolTypeController";
import SchoolAccessibilityController from "./app/controllers/SchoolAccessibilityController";
import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

/** Private routes (only with Auth) */
// routes.use(authMiddleware);

// Rotas de Categorias de escolas
routes.get("/school-categories", SchoolCategoryController.index);
routes.post("/school-categories", SchoolCategoryController.store);
routes.put("/school-categories/:id", SchoolCategoryController.update);
routes.delete("/school-categories/:id", SchoolCategoryController.delete);

// Rotas de Alimentação  de escolas
routes.get("/school-foods", SchoolFoodTypeController.index);
routes.post("/school-foods", SchoolFoodTypeController.store);

// Rotas para filtros de estruturas das escolas
routes.get("/school-infraestructures", SchoolInfraestructureController.index);
routes.post("/school-infraestructures", SchoolInfraestructureController.store);

// Rotas para filtros de atividades extras
routes.get("/school-extra-activities", SchoolExtraActivityController.index);
routes.post("/school-extra-activities", SchoolExtraActivityController.store);

// Rotas para os tipos de escola
routes.get("/school-types", SchoolTypeController.index);
routes.post("/school-types", SchoolTypeController.store);

// Upload de arquivo
routes.get("/censo", CensoController.index);
routes.get("/censoLat", CensoController.index);

// Rotas para pesquisa de distância
routes.get("/geo-lat", GeoController.index);
routes.get("/geo-address", GeoController.index_address);

// Rotas para pesquisa de usuários
routes.get("/users", UserController.index);

// Rotas para pesquisa de atendimento para pessoas com necessidades especiais.
routes.get("/school-accessibilities", SchoolAccessibilityController.index);
routes.post("/school-accessibilities", SchoolAccessibilityController.store);

// Rotas para pesquisa de escolas
routes.get("/schools", SchoolController.index);
routes.post("/schools", SchoolController.store);

export default routes;
