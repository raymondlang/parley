import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import userWorkspacesReducer from "./userWorkspaces";
import workspaceUsersReducer from "./workspaceUsers";
import currentWorkspaceReducer from "./currentWorkspace";
import channelsReducer from "./channels";

const rootReducer = combineReducers({
  session: sessionReducer,
  userWorkspaces: userWorkspacesReducer,
  workspaceUsers: workspaceUsersReducer,
  currentWorkspace: currentWorkspaceReducer,
  channelsReducer: channelsReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
