import { useParams, Redirect, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import WorkspaceNavBar from "./WorkspaceNavBar";
import { useEffect } from "react";
import { getUserWorkspaces } from "../../store/workspaceUserSubscriptions";
import {
  fetchWorkspaceUsers,
  getWorkspaceUsers,
} from "../../store/workspaceUsers";
import "./Workspace.css";
import WorkspaceSidebar from "./WorkspaceSidebar";
import { getChannels } from "../../store/channels";
import WorkspacePrimaryView from "./WorkspacePrimaryView";

const Workspace = () => {
  const { workspaceId } = useParams();
  const { messageableId } = useParams();
  const dispatch = useDispatch();
  // const workspaceUsers = useSelector(getWorkspaceUsers);
  const workspaceUsers = useSelector(getWorkspaceUsers);
  const workspace = useSelector((state) => state.userWorkspaces[workspaceId]);
  const userWorkspaces = useSelector(getUserWorkspaces);
  const channels = useSelector(getChannels);

  useEffect(() => {
    if (channels.length === 0) {
      dispatch(fetchWorkspaceUsers(workspaceId));
    }
  });

  return userWorkspaces.length ? (
    <div id="workspace-layout">
      <WorkspaceNavBar />
      <WorkspaceSidebar />
      {messageableId ? (
        <WorkspacePrimaryView />
      ) : (
        <h1 className="workspace-primary-view h1-only">
          Please select a channel or direct message.
          <br></br>
          Happy Parleying!
        </h1>
      )}
    </div>
  ) : null;
};

export default Workspace;
