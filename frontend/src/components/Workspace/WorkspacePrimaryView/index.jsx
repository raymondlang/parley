import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom/";
import { useDispatch, useSelector } from "react-redux";
import {
  createMessage,
  receiveMessage,
  fetchMessages,
  removeMessage,
} from "../../../store/messages";
import { HiOutlineHashtag } from "react-icons/hi";
import { MdSend } from "react-icons/md";
import "./WorkspacePrimaryView.css";
import { getWorkspaceUsers } from "../../../store/workspaceUsers";
import DirectMessageTopDetails from "./DirectMessageTopDetails";
import ChannelTopDetails from "./ChannelTopDetails";
import consumer from "../../../consumer";
import { fetchCurrentWorkspace } from "../../../store/currentWorkspace";
import MessagesView from "./MessagesView";
import MessageContentInput from "./MessagesView/MessageContentInput";
import { getMessages } from "../../../store/messages";

const WorkspacePrimaryView = ({ workspaceId }) => {
  const messages = useSelector(getMessages);
  const { messageableCode } = useParams();
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();
  const messageableType = messageableCode.includes("c")
    ? "channel"
    : "directMessage";
  const messageableId =
    messageableType === "channel"
      ? messageableCode.slice(1, 100) * 1
      : messageableCode.slice(2, 100) * 1;
  const messageName = useSelector((state) => {
    // debugger
    if (messageableType === "channel") {
      return state.channels[messageableId].name;
    } else {
      const userNameArr = state.directMessages[messageableId].name;
      return userNameArr;
    }
  });

  const scrollToBottom = () => {
    console.log("scrolling");
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  let messageDetailsName;
  if (messageableType === "channel") {
    messageDetailsName = messageName;
  } else if (messageName.length > 3) {
    let name = messageName.slice(0, 2).join(", ");
    name = name + ", " + (messageName.length - 2).toString() + " others";
    messageDetailsName = name;
  } else {
    messageDetailsName = messageName.join(", ");
  }

  const messageMembersArr = useSelector((state) => {
    if (messageableType === "channel") {
      return state.channels[messageableId].workspaceUsers;
    } else {
      return state.directMessages[messageableId].workspaceUsers;
    }
  });

  useEffect(() => {
    dispatch(fetchMessages(messageableId, messageableType));
    dispatch(fetchCurrentWorkspace(workspaceId));
    const subscriptionChannel =
      messageableType === "channel"
        ? "ChannelsChannel"
        : "DirectMessagesChannel";

    const subscription = consumer.subscriptions.create(
      { channel: subscriptionChannel, id: messageableId },
      {
        received: (message) => {
          dispatch(receiveMessage(message));
        },
      }
    );
    scrollToBottom();
    return () => subscription?.unsubscribe();
  }, [dispatch, messageableId, messageableType]);

  useEffect(() => {
    dispatch(fetchMessages(messageableId, messageableType));
    const subscriptionChannel =
      messageableType === "channel"
        ? "ChannelsChannel"
        : "DirectMessagesChannel";

    const subscription = consumer.subscriptions.create(
      { channel: subscriptionChannel, id: messageableId },
      {
        received: (message) => {
          dispatch(receiveMessage(message));
        },
      }
    );
    scrollToBottom();
    return () => subscription?.unsubscribe();
  }, []);

  return (
    <div className="workspace-primary-view">
      <div className="primary-header-container">
        <header className="primary-header-name">
          {messageableType === "channel" ? <HiOutlineHashtag /> : <></>}
          {messageDetailsName}
          <span className="sidebar-team-menu-icon">
            <svg viewBox="0 0 20 20">
              <path
                fill="currentColor"
                d="M5.72 7.47a.75.75 0 0 1 1.06 0L10 10.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0L5.72 8.53a.75.75 0 0 1 0-1.06Z"
              ></path>
            </svg>
          </span>
        </header>
        <div className="primary-header-users">
          <span>{messageMembersArr.length}</span>
        </div>
      </div>
      <div className="workspace-body-container">
        <div className="message-scroll-container">
          <div className="messageable-details">
            {messageableType === "channel" ? (
              <ChannelTopDetails messageableId={messageableId} />
            ) : (
              <DirectMessageTopDetails
                messageMembersArr={messageMembersArr}
                messageableId={messageableId}
              />
            )}
          </div>
          {Object.values(messages).length === 0 ? (
            <></>
          ) : (
            <MessagesView
              messageableId={messageableId}
              messageableType={messageableType}
            />
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="create-message-footer">
          <MessageContentInput
            messageableId={messageableId}
            messageableType={messageableType}
            messageMembersArr={messageMembersArr}
            defaultVal={
              messageableType === "channel"
                ? "Message #" + messageName
                : "Message " + messageName.join(", ")
            }
            content={""}
            isCreate={true}
            message={{}}
            setShowEditContent={{}}
          />
          <div className="notifications-footer"></div>
        </div>
      </div>
    </div>
  );
};
export default WorkspacePrimaryView;
