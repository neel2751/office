"use server";
import EmployeDocumentModel from "@/models/employeDocumentModel";
import axios from "axios";
import AWS from "aws-sdk";
import { getServerSideProps } from "../CentralFileShare/centralFileShare";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY,
  region: process.env.AWS_REGION,
  // signatureVersion: "v4",
  // sslEnabled: true,
  // s3ForcePathStyle: true,
  // endpoint: process.env.AWS_ENDPOINT
});

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

export const uploadAWSMultipartDocument = async (document) => {
  const doc = document.get("file");
  if (!document) return { success: false, message: "Document not found" };
  const { props } = await getServerSideProps();
  const employeId = props?.session?.user?._id;
  if (!employeId) return { success: false, message: "EmployeId not  found" };
  try {
    const param = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${employeId}/${doc.name}`,
      ContentType: doc.type,
    };
    const { UploadId } = await s3.createMultipartUpload(param).promise();
    return { uploadId: UploadId };
  } catch (error) {
    console.log(error);
  }
};

export const getPresignedURLAWS = async (uploadId, partNumber, fileName) => {
  if (!fileName) return { success: false, message: "Document not found" };
  if (!uploadId) return { success: false, message: "EmployeId not found" };
  if (!partNumber) return { success: false, message: "PartNumber not  found" };
  const { props } = await getServerSideProps();
  const employeId = props?.session?.user?._id;
  if (!employeId) return { success: false, message: "EmployeId not  found" };
  try {
    const param = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${employeId}/${fileName}`,
      PartNumber: partNumber,
      UploadId: uploadId,
    };
    const SignedURL = await s3.getSignedUrlPromise("uploadPart", param);
    return { url: SignedURL };
  } catch (error) {
    console.log(error);
  }
};

export const uploadAWSMultipartDocumentComplete = async (
  uploadId,
  parts,
  fileName
) => {
  if (!uploadId) return { success: false, message: "UploadId not  found" };
  if (!fileName) return { success: false, message: "Document not found" };
  if (!parts) return { success: false, message: "Parts not  found" };
  const { props } = await getServerSideProps();
  const employeId = props?.session?.user?._id;
  if (!employeId) return { success: false, message: "EmployeId not found" };
  try {
    const param = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${employeId}/${fileName}`,
      UploadId: uploadId,
      MultipartUpload: {
        Parts: parts,
        // Parts: document.parts.map((part, index) => ({
        //   ETag: part.etag,
        //   PartNumber: index + 1,
        // })),
      },
    };
    const { Location } = await s3.completeMultipartUpload(param).promise();
    console.log(Location);
    return Location;
  } catch (error) {
    console.log(error);
  }
};

export const cancelMultipartUploadAWS = async (uploadId, fileName) => {
  if (!uploadId) return { success: false, message: "UploadId not found" };
  if (!fileName) return { success: false, message: "Document not found" };
  // if (!employeId) return { success: false, message: "EmployeId not found" };

  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME, // Make sure this is set correctly in your environment
      Key: fileName, // This is the S3 object key (file path/name)
      UploadId: uploadId,
    };

    await s3.abortMultipartUpload(params).promise();

    return { success: true, message: "Upload cancelled successfully" };
  } catch (error) {
    console.error("Error canceling multipart upload:", error);
    return { success: false, message: "Failed to cancel upload", error };
  }
};
