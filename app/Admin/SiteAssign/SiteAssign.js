"use client";
import { getAllEmployeesForSiteAssign } from "@/actions/employeAction/employeAction";
import {
  addSiteAssign,
  getSiteAssign,
} from "@/actions/siteAssignAction/siteAssignAction";
import { getAllProjects } from "@/actions/siteProject/siteProjectAction";
import { ComboboxDemo } from "@/components/ComboBox";
import { Searchbox } from "@/components/SearchBox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import SiteTabel from "./SiteTabel";
import { Button } from "@/components/ui/button";
import { chnageDateToISOString } from "@/actions/commonAction/commonAction";
import { SiteAssignContext } from "@/context/siteAssignContext";
import { TableAction, TableBody, TableData } from "@/components/Table";
import { Pencil } from "lucide-react";
import AssignAttendance from "./AssignAttendance";
import { getEmployeeAttendanceData } from "@/actions/attendanceAction/attendanceAction";

const SiteAssign = () => {
  const { employee } = FetchEmploye();
  const { site } = FetchSite();
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
    totalCount: 0,
    siteId: "",
    month: new Date().getMonth() + 1,
  }); // default filter
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [assignSite, setAssignSite] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState("");
  const [filterForEdit, setFilterForEdit] = useState({
    siteId: "",
    id: "",
    employes: [],
    aDate: chnageDateToISOString(new Date()),
  });
  // Filter out already assigned employees using memoization
  const alreadyAssignEmployee = useMemo(() => {
    const filterDate = assignSite.filter(
      (item) => item.date === filterForEdit.aDate
    );
    const assignedEmployeeIds = filterDate.flatMap((item) =>
      item.employeInfo.map(({ value }) => value)
    );

    let newData = employee.filter(
      (item) => !assignedEmployeeIds.includes(item.value)
    );
    if (filterForEdit.id) {
      const existingEmployees = employee.filter((item) =>
        filterForEdit.employes.includes(item.value)
      );
      newData = [...newData, ...existingEmployees];
    }
    return newData;
  }, [assignSite, filterForEdit, employee]);

  const alreadyAssignSite = useMemo(() => {
    const filterDate = assignSite.filter(
      (item) => item.date === filterForEdit.aDate
    );
    const assignedSiteIds = filterDate.map(({ siteInfo }) => siteInfo.value);

    let newData = site.filter((item) => !assignedSiteIds.includes(item.value));
    if (filterForEdit.id) {
      const existingSite = site.find(
        (item) => item.value === filterForEdit.siteId
      );
      if (existingSite) newData.push(existingSite);
    }
    return newData;
  }, [assignSite, filterForEdit, site]);

  const editInfo = (data) => {
    setFilterForEdit({
      id: data.id,
      siteId: data.siteInfo.value,
      aDate: data.date,
      employes: data.employeInfo.map((item) => item.value),
    });
    const siteVal = data.siteInfo.value;
    setSelectedProjects(siteVal);
    const val = data.employeInfo.map(({ value }) => value);
    setSelectedEmployees(val);
  };

  const fetchAssignedSites = async () => {
    try {
      const response = await getEmployeeAttendanceData(
        filter.page,
        filter.limit,
        filter.siteId,
        filter.month
      );
      const convert = JSON.parse(response?.data);
      setAssignSite(convert);
      console.log(convert);
      setFilter({ ...filter, totalCount: response?.totalCount });
    } catch (error) {
      console.error("Error fetching assigned sites:", error);
    }
  };
  useEffect(() => {
    fetchAssignedSites();
  }, [filter.page, filter.limit, filter.siteId, filter.month]); // Re-fetch when page/limit changes

  const handleReset = () => {
    setSelectedEmployees([]);
    setSelectedProjects("");
    setFilterForEdit({
      id: "",
      siteId: "",
      aDate: chnageDateToISOString(new Date()),
      employes: [],
    }); // reset filter
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // we have to put validation
    if (selectedEmployees.length === 0) {
      toast.error("Please select at least one employee");
      return;
    } else if (selectedProjects.length === 0) {
      toast.error("Please select a project");
      return;
    }
    const { id, aDate } = filterForEdit;
    try {
      const response = await addSiteAssign({
        assignTo: selectedEmployees,
        siteId: selectedProjects,
        assignDate: aDate,
        id,
      });
      if (response.status) {
        setSelectedEmployees([]); // empty the selected array
        setSelectedProjects(""); // empty the selected project
        setFilterForEdit({
          id: "",
          siteId: "",
          aDate: chnageDateToISOString(new Date()),
          employes: [],
        }); // reset
        fetchAssignedSites();
        return toast.success(response.message);
      }
      toast.error(response.message);
    } catch (error) {
      console.log(error);
      toast.error("Error while assigning site");
    }
  };
  return (
    <div className="p-4">
      <Card className="max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle>Assign Employe</CardTitle>
          <CardDescription>
            Assign project to Employee in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <div className="space-y-2">
                <span className="text-sm text-neutral-600 font-medium ms-1">
                  Site Project
                </span>
                <Searchbox
                  value={selectedProjects}
                  onChange={setSelectedProjects}
                  frameworks={alreadyAssignSite}
                  placeholder="Search Project"
                  noData="No Project Found"
                />
              </div>
              {selectedProjects && (
                <div className="space-y-2">
                  <span className="text-sm text-neutral-600 font-medium ms-1">
                    Employee
                  </span>
                  <ComboboxDemo
                    value={selectedEmployees}
                    onChange={setSelectedEmployees}
                    frameworks={alreadyAssignEmployee}
                    placeholder="Select Employee" // default placeholder
                    noData="No Employee Found" // default no data message
                  />
                </div>
              )}
              <AssignAttendance
                selectedEmployee={selectedEmployees}
                selectedProjects={selectedProjects}
                date={filterForEdit.aDate}
              />
              <div className="flex gap-4 mt-4">
                <Button>{filterForEdit.id ? "Edit" : "Submit"}</Button>
                {filterForEdit.id && (
                  <Button variant="outline" onClick={handleReset}>
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <SiteAssignContext.Provider
        value={{ assignSite, editInfo, filter, setFilter, site }}
      >
        <SiteTabel />
      </SiteAssignContext.Provider>
    </div>
  );
};

export default SiteAssign;

const FetchEmploye = () => {
  const [employee, setEmployee] = useState([]);
  const fetchData = async () => {
    const response = await getAllEmployeesForSiteAssign();
    // we need only name and id we have to convert json  to object
    const convert = JSON.parse(response.data);
    const data = convert.map((item) => {
      return {
        value: item._id,
        label: item.firstName + " " + item.lastName,
        payRate: item.payRate,
      };
    });
    setEmployee(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { employee };
};

const FetchSite = () => {
  const [site, setSite] = useState([]);
  const fetchData = async () => {
    const response = await getAllProjects();
    const convert = JSON.parse(response.data);
    const data = convert.map((item) => {
      return { value: item._id, label: item.siteName };
    });
    setSite(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { site };
};
