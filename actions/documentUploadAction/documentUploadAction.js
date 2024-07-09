"use server";
import EmployeDocumentModel from "@/models/employeDocumentModel";
import axios from "axios";

export const handleRequestDocument = async (document, employeId) => {
  if (!document) return { success: false, message: "Document not found" };
  if (!employeId) return { success: false, message: "EmployeId not found" };
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${employeId}`,
      },
    };
    const response = await axios.post(
      `https://cdcgrouplimited.com/nodejs/employe/uploadDocument`,
      //   "http://localhost:4000/employe/uploadDocument",
      document,
      config
    );
    if (response.status === 200) {
      const documentResponse = await EmployeDocumentModel({
        employeeId: employeId,
        documents: response.data,
      });
      const storeDB = await documentResponse.save(); // TODO: save to DB
      console.log(storeDB);
      return {
        success: true,
        message: "Document uploaded successfully",
        data: storeDB,
      };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error uploading document" };
    // return {success:false, message:"Error uploading document",data:error};
  }
};
