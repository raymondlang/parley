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
  return (
    <>
      <WorkspaceNavBar />
      <div>{workspace.name}</div>
    </>
  );
};

export default Workspace;
