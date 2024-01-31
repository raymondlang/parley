export const RECEIVE_MESSAGES = "/api/RECEIVE_MESSAGES";
export const REMOVE_CURRENT_WORKSPACE = "/REMOVE_CURRENT_WORKSPACE";
export const receiveMessages = (messages) => ({
  type: RECEIVE_MESSAGES,
  messages,
});
export const removeCurrentWorkspace = () => ({
  type: REMOVE_CURRENT_WORKSPACE,
});
export const getMessages = (state) => {
  return state.messages ? Object.values(state.messages) : [];
};

export const fetchMessages =
  (messageableId, messageableType) => async (dispatch) => {
    let start;
    if (messageableType === "channel") {
      start = 1;
    } else {
      messageableType = "direct_message";
      start = 2;
    }

    messageableId = messageableId.slice(start, 100) * 1;

    const res = await fetch(`/api/${messageableType}s/${messageableId}`);

    if (res.ok) {
      const messages = await res.json();
      dispatch(receiveMessages(messages));
    }
  };
const messagesReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_MESSAGES:
      return { ...action.messages };
    case REMOVE_CURRENT_WORKSPACE:
      return {};
    default:
      return state;
  }
};
export default messagesReducer;
