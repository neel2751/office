import { createContext, useContext, useState, useRef } from "react";
import {
  cancelMultipartUploadAWS,
  getPresignedURLAWS,
  uploadAWSMultipartDocument,
  uploadAWSMultipartDocumentComplete,
} from "@/actions/documentUploadAction/documentUploadAction";
import axios from "axios";
import { toast } from "react-toastify";
import useAuthTag from "../lib/getAuthTag";

const UploadFileContext = createContext();
export const useUploadFileContext = () => useContext(UploadFileContext);
const UploadFileProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [isPaused, setIsPaused] = useState({});
  const [uploading, setUploading] = useState(false);
  const multipartUploads = useRef({}); // Stores multipart upload details for each file
  const handleUpload = () => {
    if (images.length === 0) return toast.error(" Please select a file");
    images.forEach((file) => {
      uploadFileToS3(file);
    });
  };

  const { res, id, iv, authTag } = useAuthTag();

  const uploadFileToS3 = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const { uploadId } = await uploadAWSMultipartDocument(formData);
      multipartUploads.current[file.name] = {
        uploadId,
        parts: [],
        file,
      };
      uploadFileParts(file, uploadId);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFileParts = async (file, uploadId) => {
    const partSize = 10 * 1024 * 1024; // 10MB
    const totalParts = Math.ceil(file.size / partSize);

    if (!multipartUploads.current[file.name]) {
      multipartUploads.current[file.name] = { parts: [] };
    }
    const parts = multipartUploads.current[file.name].parts;

    for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
      // Skip uploaded parts
      if (parts[partNumber - 1]?.ETag) continue;

      // Check for pause
      if (isPaused[file.name]) {
        console.log(`Upload paused for ${file.name}`);
        return;
      }

      const start = (partNumber - 1) * partSize;
      const end = Math.min(start + partSize, file.size);
      const blob = file.slice(start, end);

      try {
        const { url } = await getPresignedURLAWS(
          uploadId,
          partNumber,
          file.name
        );
        const response = await axios.put(url, blob, {
          headers: {
            "Content-Type": file.type,
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              ((start + progressEvent.loaded) / file.size) * 100
            );
            setUploadProgress((prev) => ({ ...prev, [file.name]: percent }));
          },
        });

        parts[partNumber - 1] = {
          ETag: response.headers.etag,
          PartNumber: partNumber,
        };

        if (partNumber === totalParts) {
          completeMultipartUpload(file);
        }
      } catch (error) {
        console.error(
          `Failed to upload part ${partNumber} of ${file.name}`,
          error
        );
        toast.error(`Failed to upload part ${partNumber} of ${file.name}`);
        break;
      }
    }
  };

  const completeMultipartUpload = async (file) => {
    try {
      const { uploadId, parts } = multipartUploads.current[file.name];
      const response = await uploadAWSMultipartDocumentComplete(
        uploadId,
        parts,
        file,
        { id, iv, authTag }
      );
      console.log(response);
      setUploadProgress((prev) => ({ ...prev, [file.name]: 100 }));
      // setUploadProgress((prev) => ({ ...prev, [file.name]: null }));
      toast.success(` File uploaded successfully ${file.name}`);
    } catch (error) {
      toast.error(`Failed to  upload file ${file.name}`);
      console.error(error);
    }
  };
  const cancelMultipartUpload = async (uploadId, fileName) => {
    try {
      await cancelMultipartUploadAWS(uploadId, fileName);
      toast.warn(`Upload cancelled for file ${fileName}`);
    } catch (error) {
      console.error(error);
    }
  };
  const pauseUpload = (fileName) => {
    setIsPaused((prev) => ({ ...prev, [fileName]: true }));
  };
  const resumeUpload = (fileName) => {
    setIsPaused((prev) => ({ ...prev, [fileName]: false }));
    const { uploadId, file } = multipartUploads.current[fileName];
    uploadFileParts(file, uploadId);
  };
  const cancelUpload = (fileName) => {
    setIsPaused((prev) => ({ ...prev, [fileName]: true }));
    const { uploadId } = multipartUploads.current[fileName];
    cancelMultipartUpload(uploadId, fileName); // Cancel on AWS
    // delete multipartUploads.current[fileName]; // Clean up local state
    setUploadProgress((prev) => ({ ...prev, [fileName]: null }));
    // toast.success(`Upload canceled for ${fileName}`);
  };

  return (
    <UploadFileContext.Provider
      value={{
        images,
        setImages,
        uploadProgress,
        setUploadProgress,
        isPaused,
        setIsPaused,
        uploading,
        setUploading,
        setIsPaused,
        handleUpload,
        pauseUpload,
        resumeUpload,
        cancelUpload,
        multipartUploads,
      }}
    >
      {children}
    </UploadFileContext.Provider>
  );
};
export { UploadFileProvider, UploadFileContext };
