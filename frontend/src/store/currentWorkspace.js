// export const RECEIVE_WORKSPACE = '/currentWorkspace/RECEIVE_WORKSPACE';

const currentWorkspaceReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_WORKSPACE:
      break;

    default:
      return state;
  }
};

export default currentWorkspaceReducer;