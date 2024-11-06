import React, { useCallback } from "react";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import prettyBytes from "pretty-bytes";
import mime from "mime";
import { X } from "lucide-react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { useUploadFileContext } from "./Context/uploadFileContext";

const FileUpload = () => {
  const { images, setImages, setUploading, uploadProgress } =
    useUploadFileContext();

  const onDrop = useCallback((acceptedFiles) => {
    onChangeImages(acceptedFiles);
  }, []);

  const addFileToStructure = (files, newFile) => {
    if (!newFile.parentId) {
      return [...files, newFile];
    }

    return files.map((file) => {
      if (file.id === newFile.parentId) {
        return {
          ...file,
          children: [...(file.children || []), newFile],
        };
      } else if (file.children) {
        return {
          ...file,
          children: addFileToStructure(file.children, newFile),
        };
      }
      return file;
    });
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
      "application/pdf": [],
      "video/*": [],
    },
    maxFiles: 5,
    maxSize: 1024 * 1024 * 100, // 100MB
    onDropRejected: (files) => onRejectionHandled(files),
    onDrop: (files) => onDrop(files),
  });

  const onRejectionHandled = (files) => {
    const expression = / \d+ /;
    const displayedErrors = new Set();
    files.map(({ errors }) =>
      errors.map((e) => {
        if (displayedErrors.has(e.code)) {
          return;
        }
        if (e.code === "file-too-large") {
          const size = e.message.match(expression);
          const sizeString = size
            ? prettyBytes(Number(size[0]))
            : "unknown size";
          toast.error(`File is larger than ${sizeString}`);
          displayedErrors.add(e.code);
        }
        if (e.code === "too-many-files") {
          toast.error(`You can only upload ${5} files at a time`);
          displayedErrors.add(e.code);
        }
        toast.error(e.message);
      })
    );
  };

  const onChangeImages = async (files) => {
    try {
      setUploading(true);
      setImages((prev) => [...files, ...prev]);
    } catch (e) {
      toast.error("Something went wrong"); // error toast
      console.log(e);
    } finally {
      setUploading(false);
    }
  };
  async function handleDeleteImage(index) {
    const newFiles = images.filter((_, i) => i != index);
    setImages(newFiles);
  }

  const renderPreview = (file) => {
    const fileType = file.type;

    if (fileType.startsWith("image/")) {
      // Image file preview
      return (
        <Image
          src={URL.createObjectURL(file)}
          alt={file.name}
          height={80}
          width={80}
          className="rounded-md border border-gray-200 size-16 object-cover"
        />
      );
    }

    if (fileType.startsWith("video/")) {
      // Video file preview
      return (
        <video controls className="rounded-md border border-gray-200 size-16">
          <source src={URL.createObjectURL(file)} type={fileType} />
          Your browser does not support the video tag.
        </video>
      );
    }

    if (fileType === "application/pdf") {
      // PDF file preview
      return (
        <embed
          src={URL.createObjectURL(file)}
          type="application/pdf"
          className="rounded-md border border-gray-200 size-16"
        />
      );
    }

    if (fileType.startsWith("text/")) {
      // Text file preview
      return (
        <iframe
          src={URL.createObjectURL(file)}
          title={file.name}
          className="rounded-md border border-gray-200 size-16"
        />
      );
    }

    // Fallback for other file types
    return (
      <div className="size-16 flex items-center justify-center bg-gray-200">
        {file.name}
      </div>
    );
  };

  return (
    <>
      <div className="w-full mx-auto p-4 pt-6">
        {/* <!-- Media Card --> */}
        <div className="flex shadow-sm rounded-xl overflow-hidden flex-col bg-white border-neutral-200 border">
          {/* <!-- Body --> */}
          <div className="p-5">
            <input type="hidden" name="employeId" value="123456789" />
            {/* <!-- Drag 'n Drop --> */}
            <div {...getRootProps()} className="space-y-4">
              <span className="hidden font-medium text-sm mb-2 text-neutral-600">
                Upload images
              </span>
              <div
                className={`space-y-2 p-12 ${
                  isDragActive
                    ? "border-cyan-600 bg-cyan-50 animate-pulse"
                    : "border-neutral-300 bg-white"
                } border-dashed border rounded-xl justify-center h-56 flex`}
              >
                <div className="text-center">
                  <svg
                    className="text-white w-16 mx-auto"
                    width="70"
                    height="46"
                    viewBox="0 0 70 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.05172 9.36853L17.2131 7.5083V41.3608L12.3018 42.3947C9.01306 43.0871 5.79705 40.9434 5.17081 37.6414L1.14319 16.4049C0.515988 13.0978 2.73148 9.92191 6.05172 9.36853Z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="stroke-neutral-400"
                    ></path>
                    <path
                      d="M63.9483 9.36853L52.7869 7.5083V41.3608L57.6982 42.3947C60.9869 43.0871 64.203 40.9434 64.8292 37.6414L68.8568 16.4049C69.484 13.0978 67.2685 9.92191 63.9483 9.36853Z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="stroke-neutral-400"
                    ></path>
                    <rect
                      x="17.0656"
                      y="1.62305"
                      width="35.8689"
                      height="42.7541"
                      rx="5"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="2"
                      className=" stroke-neutral-400"
                    ></rect>
                    <path
                      d="M47.9344 44.3772H22.0655C19.3041 44.3772 17.0656 42.1386 17.0656 39.3772L17.0656 35.9161L29.4724 22.7682L38.9825 33.7121C39.7832 34.6335 41.2154 34.629 42.0102 33.7025L47.2456 27.5996L52.9344 33.7209V39.3772C52.9344 42.1386 50.6958 44.3772 47.9344 44.3772Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="stroke-neutral-400"
                    ></path>
                    <circle
                      cx="39.5902"
                      cy="14.9672"
                      r="4.16393"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="stroke-neutral-400"
                    ></circle>
                  </svg>

                  <div className="text-neutral-800 leading-6 text-sm justify-center mt-4 flex flex-wrap">
                    {isDragActive ? (
                      <span className="text-cyan-900  font-medium pe-1">
                        Drop your files here or
                      </span>
                    ) : (
                      <span className="text-neutral-900 font-medium pe-1">
                        Drag 'n' drop some files here, or click to select files
                      </span>
                    )}
                    <label
                      htmlFor="image"
                      className=" decoration-2 font-semibold bg-white text-cyan-600 rounded-lg relative cursor-pointer"
                    >
                      {!isDragActive && <span>browse</span>}
                      <input
                        {...getInputProps()}
                        id="image"
                        type="file"
                        className="sr-only"
                        name="image"
                        multiple
                        // onChange={onChangeImages}
                        // all file type
                        accept=".jpg, .jpeg, .png, .gif, .bmp, .tiff, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt, .zip, .rar, .7z, .mp4"
                        // accept=".pdf"
                      />
                    </label>
                  </div>

                  <p className="text-neutral-700 text-xs mt-1">
                    only files are allowed
                  </p>
                </div>
              </div>
            </div>
            {/* <!-- End Drag 'n Drop --> */}
            <p className="space-y-4 text-neutral-500 text-xs pt-2">
              Add up to 5 documents .Each file should be no larger than 5MB. You
              can drag and drop files into this area.
            </p>
          </div>

          {/* <!-- End Body --> */}
        </div>
        {/* <!-- End Media Card --> */}
        {images?.map((image, index) => (
          <div
            key={index}
            className="p-2 rounded-md bg-white shadow border border-gray-200 space-y-2 mt-4"
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-4">
                {renderPreview(image)}
                <div className="flex gap-4 justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-gray-800 truncate overflow-hidden max-w-max w-48">
                      {image?.name || "Test"}
                    </span>
                    <div className="flex w-full gap-2 items-center ">
                      <span className="text-sm text-gray-500">
                        {prettyBytes(image?.size || 0)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {mime.getExtension(image?.type || "png")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                onClick={() => handleDeleteImage(index)}
                className="p-0.5 rounded-full bg-gray-200 cursor-pointer hover:bg-red-700 hover:text-white"
              >
                <X className="size-3.5" />
              </div>
            </div>
            {uploadProgress[image.name] !== undefined && (
              <div className="text-end">
                <p className="text-neutral-500 text-xs mb-0.5">
                  {uploadProgress[image.name]}%
                </p>
                <Progress
                  value={uploadProgress[image.name]}
                  indicatorColor={"bg-indigo-600"}
                  className="h-1.5"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
export default FileUpload;

const UploadPreview = () => {
  return (
    <div
      key={index}
      className="p-2 rounded-md bg-white shadow border border-gray-200 space-y-2 mt-4"
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-4">
          {renderPreview(image)}
          <div className="flex gap-4 justify-between items-center">
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-800 truncate overflow-hidden max-w-max w-48">
                {image?.name || "Test"}
              </span>
              <div className="flex w-full gap-2 items-center ">
                <span className="text-sm text-gray-500">
                  {prettyBytes(image?.size || 0)}
                </span>
                <span className="text-sm text-gray-500">
                  {mime.getExtension(image?.type || "png")}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => handleDeleteImage(index)}
          className="p-0.5 rounded-full bg-gray-200 cursor-pointer hover:bg-red-700 hover:text-white"
        >
          <X className="size-3.5" />
        </div>
      </div>
      <div className="text-end">
        <p className="text-neutral-500 text-xs mb-0.5">40%</p>
        <Progress
          value={40}
          indicatorColor={"bg-indigo-600"}
          className="h-1.5"
        />
      </div>
    </div>
  );
};
