import { ProductsActions } from "../redusers/products";

//Gather all actions in one place
const ActionCreators = {
  ...ProductsActions
};

export default ActionCreators;
