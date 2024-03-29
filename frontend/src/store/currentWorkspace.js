export const RECEIVE_CURRENT_WORKSPACE = "/RECEIVE_CURRENT_WORKSPACE";

export const REMOVE_CURRENT_WORKSPACE = "/REMOVE_CURRENT_WORKSPACE";

export const receiveCurrentWorkspace = (payload) => ({
  type: RECEIVE_CURRENT_WORKSPACE,
  payload,
});

export const removeCurrentWorkspace = () => ({
  type: REMOVE_CURRENT_WORKSPACE,
});

export const getCurrentWorkspaceProfile = (state) => {
  return state.currentWorkspace.workspaceSubscriptionId
    ? state.workspaceUsers[state.currentWorkspace.workspaceSubscriptionId]
    : null;
};

export const fetchCurrentWorkspace = (workspaceId) => async (dispatch) => {
  const res = await fetch(`/api/workspaces/${workspaceId}`);

  if (res.ok) {
    const payload = await res.json();
    dispatch(receiveCurrentWorkspace(payload));
  }
};

const currentWorkspaceReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_WORKSPACE:
      return { ...state, ...action.payload.currentWorkspace };

    case REMOVE_CURRENT_WORKSPACE:
      return {};

    default:
      return state;
  }
};

export default currentWorkspaceReducer;
