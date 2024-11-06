"use client";
import React, {
  createContext,
  useEffect,
  useContext,
  useCallback,
  useState,
  useMemo,
} from "react";
import { toast } from "react-toastify";
import {
  getOfficeMembers,
  getTeam,
  getTeamData,
  getWorkspaceData,
} from "@/actions/CentralFileShare/centralFileShare";

const WorkspaceAndTeamContext = createContext();

export const useWorkspaceAndTeamContext = () =>
  useContext(WorkspaceAndTeamContext);

export const WorkspaceAndTeamProvider = React.memo(({ children }) => {
  const [workspace, setWorkspace] = useState(null);
  const [teams, setTeams] = useState([]);
  const [teamsData, setTeamsData] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [session, setSession] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState();

  const fetchTeamMembers = useCallback(async () => {
    if (teamMembers.length > 0) return; // Prevent re-fetching
    try {
      const response = await getOfficeMembers();
      if (response.status) {
        const data = JSON.parse(response?.data);
        setTeamMembers(data);
      } else {
        toast.error(response?.message || "Failed to fetch team members");
      }
    } catch (error) {
      console.error("Error fetching team members", error);
      toast.error("Error fetching team members");
    }
  }, [teamMembers]);

  const fetchTeamData = useCallback(async () => {
    if (teamsData) return; // Prevent re-fetching
    try {
      const response = await getTeamData();
      if (response.status) {
        const data = JSON.parse(response?.data);
        setTeamsData(data);
        setSession(response?.userId);
      }
    } catch (error) {
      console.error("Error fetching team data", error);
      toast.error("Error fetching team data");
    }
  }, [teamsData]);

  const fetchWorkspaceData = useCallback(async () => {
    if (workspace) return; // Prevent re-fetching
    try {
      const response = await getWorkspaceData();
      if (response.status) {
        const data = JSON.parse(response?.data);
        setWorkspace(data);
        setSession(response?.userId);
      }
    } catch (error) {
      console.error("Error fetching workspace data", error);
      toast.error("Error fetching workspace data");
    }
  }, [workspace]);

  const fetchTeam = useCallback(async () => {
    if (teams.length > 0) return; // Prevent re-fetching
    try {
      const response = await getTeam();
      if (response.status) {
        const data = JSON.parse(response?.data);
        setTeams(data);
      } else {
        toast.error(response?.message || "Failed to fetch teams");
      }
    } catch (error) {
      console.error("Error fetching teams", error);
      toast.error("Error fetching teams");
    }
  }, [teams]);

  useEffect(() => {
    fetchTeamMembers();
    fetchTeamData();
    fetchTeam();
    fetchWorkspaceData();
  }, [fetchTeamMembers, fetchTeamData, fetchTeam, fetchWorkspaceData]);

  const memoizedValue = useMemo(
    () => ({
      workspace,
      teamsData,
      teamMembers,
      teams,
      session,
      selectedTeam,
      selectedMembers,
      setSelectedTeam,
      setSelectedMembers,
    }),
    [
      workspace,
      teamsData,
      teamMembers,
      teams,
      session,
      selectedTeam,
      selectedMembers,
    ]
  );

  return (
    <WorkspaceAndTeamContext.Provider value={memoizedValue}>
      {children}
    </WorkspaceAndTeamContext.Provider>
  );
});
