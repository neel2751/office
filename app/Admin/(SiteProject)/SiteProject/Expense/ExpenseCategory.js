import { getAllExpenseCategories } from "@/actions/siteExpenseAction/siteExpenseAction";
import { useCallback, useEffect, useState } from "react";

export const FetchExpenseCategory = () => {
  const [category, setCategory] = useState([]);
  const fetchData = useCallback(async () => {
    const response = await getAllExpenseCategories();
    if (response.status) {
      setCategory(JSON.parse(response?.data));
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, []);
  return { category };
};
