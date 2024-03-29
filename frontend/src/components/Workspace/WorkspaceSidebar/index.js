import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getChannels } from "../../../store/channels";
import "./WorkspaceSidebar.css";
import { HiOutlineHashtag } from "react-icons/hi";
import MessageableItem from "./MessageableItem";
import { getDirectMessages } from "../../../store/directMessages";

const WorkspaceSidebar = () => {
  const dispatch = useDispatch();
  const { workspaceId } = useParams();
  const workspace = useSelector((state) => state.userWorkspaces[workspaceId]);
  const channels = useSelector(getChannels);
  const directMessages = useSelector(getDirectMessages);
  const [showChannels, setShowChannels] = useState(true);
  const [showDirectMessages, setShowDirectMessages] = useState(true);

  return (
    <div className="workspace-sidebar">
      <header className="sidebar-header">
        <div className="sidebar-team-menu">
          <span className="sidebar-team-name">{workspace.name}</span>
          <span className="sidebar-team-menu-icon">
            <svg viewBox="0 0 20 20">
              <path
                fill="currentColor"
                d="M5.72 7.47a.75.75 0 0 1 1.06 0L10 10.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0L5.72 8.53a.75.75 0 0 1 0-1.06Z"
              ></path>
            </svg>
          </span>
        </div>
        <div className="new-message-button-container">
          <button className="new-message-button">
            <svg>
              <path
                fill="currentColor"
                d="M16.707 3.268a1 1 0 0 0-1.414 0l-.482.482 1.439 1.44.482-.483a1 1 0 0 0 0-1.414l-.025-.025ZM15.19 6.25l-1.44-1.44-5.068 5.069-.431 1.871 1.87-.431L15.19 6.25Zm-.957-4.043a2.5 2.5 0 0 1 3.536 0l.025.025a2.5 2.5 0 0 1 0 3.536L11.03 12.53a.75.75 0 0 1-.361.2l-3.25.75a.75.75 0 0 1-.9-.899l.75-3.25a.75.75 0 0 1 .2-.361l6.763-6.763ZM5.25 4A2.25 2.25 0 0 0 3 6.25v8.5A2.25 2.25 0 0 0 5.25 17h8.5A2.25 2.25 0 0 0 16 14.75v-4.5a.75.75 0 1 1 1.5 0v4.5a3.75 3.75 0 0 1-3.75 3.75h-8.5a3.75 3.75 0 0 1-3.75-3.75v-8.5A3.75 3.75 0 0 1 5.25 2.5h4.5a.75.75 0 0 1 0 1.5h-4.5Z"
              ></path>
            </svg>
          </button>
        </div>
      </header>
      <div id="sidebar-list">
        <MessageableItem messageableType={"Channels"} />
        {channels.map((channel) => (
          <div key={`c${channel.id}`} className="sidebar-list-item-container">
            <NavLink to={`/client/${user.id}/${workspace.id}/c${channel.id}`}>
              <div className="sidebar-list-item">
                <div className="sidebar-channel-icon">
                  <HiOutlineHashtag
                    className={channel.unreadMessages ? "bold" : ""}
                  />
                </div>
                <div className={channel.unreadMessages ? "bold" : ""}>
                  {channel.name}
                </div>
              </div>
            </NavLink>
          </div>
        ))}
        <MessageableItem messageableType={"Direct messages"} />
        {directMessages.map((directMessage) => (
          <div
            key={`d${directMessage.id}`}
            className="sidebar-list-item-container"
          >
            <NavLink
              to={`/client/${user.id}/${workspace.id}/dm${directMessage.id}`}
            >
              <div className="sidebar-direct-message">
                <div className="sidebar-list-item">
                  <div className="sidebar-direct-message-icon"></div>
                  <div
                    className={
                      directMessage.unreadMessageCount > 0
                        ? "bold dm-name"
                        : "dm-name"
                    }
                  >
                    {directMessage.name.join(", ")}
                  </div>
                </div>
                <div className="sidebar-unread-count">
                  <p>
                    {directMessage.unreadMessageCount > 0
                      ? directMessage.unreadMessageCount
                      : ""}
                  </p>
                </div>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkspaceSidebar;
