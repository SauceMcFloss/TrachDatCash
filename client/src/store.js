// Dependencies 
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

// Initialize state variables
const initialState = {};
const middleware = [thunk];

// Define state
const store = createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleware(...middleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f // Use React/Redux Dev Tools if available, but not as a requirement
	)
);

// Export state for use in app
export default store;