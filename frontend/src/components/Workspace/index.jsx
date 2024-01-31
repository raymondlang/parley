import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getWorkspaceUsers } from "../../store/workspaceUsers";
import { fetchWorkspaceUsers } from "../../store/workspaceUsers";
import WorkspaceNavBar from "./WorkspaceNavBar";
import { useEffect } from "react";
import { getUserWorkspaces } from "../../store/workspaceUserSubscriptions";

const Workspace = () => {
  const { workspaceId } = useParams();
  const dispatch = useDispatch();
  // const workspaceUsers = useSelector(getWorkspaceUsers);
  const workspaceUsers = useSelector(getWorkspaceUsers);
  const workspace = useSelector((state) => state.userWorkspaces[workspaceId]);
  const userWorkspaces = useSelector(getUserWorkspaces);

  useEffect(() => {
    if (Object.values(workspaceUsers).length === 0) {
      dispatch(fetchWorkspaceUsers(workspaceId));
    }
  });

  return userWorkspaces.length ? (
    <div id="workspace-layout">
      <WorkspaceNavBar />
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
        </header>
      </div>
      <div className="workspace-primary-view"></div>
    </div>
  ) : null;
};

export default Workspace;
