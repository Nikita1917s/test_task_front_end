import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import ActionCreators from "../store/actions-creators/actions-creators";
import { AppDispatch, RootState } from "../store/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


//use instead of direct call of dispatch
export const useAction = () => {
  const dispatch = useDispatch<AppDispatch>();
  return bindActionCreators(ActionCreators, dispatch);
};
