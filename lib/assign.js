"use client";
import { getAllEmployeesForSiteAssign } from "@/actions/employeAction/employeAction";
import { fetchCategoryAction } from "@/actions/tasksAction/taskAction";
import { useState, useEffect } from "react";

export const FetchEmploye = () => {
  const [employeess, setEmployee] = useState([]);
  const fetchData = async () => {
    const response = await getAllEmployeesForSiteAssign();
    // we need only name and id we have to convert json  to object
    const convert = JSON.parse(response);
    setEmployee(convert);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { employeess };
};

export const FetchCategory = () => {
  const [categorys, setCategorys] = useState([]);
  const fetchData = async () => {
    const response = await fetchCategoryAction();
    // we need only name and id we have to convert json  to object
    const convert = JSON.parse(response);
    setCategorys(convert);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { categorys };
};
