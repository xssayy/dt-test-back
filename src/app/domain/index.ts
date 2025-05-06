import Recepies from "./recepies/Recepies";

type RecepiesController = typeof Recepies;

const controllers = <RecepiesController[]>[Recepies];

export { controllers };
