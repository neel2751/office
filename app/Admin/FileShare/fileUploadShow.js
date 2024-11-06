import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CloudUpload, Loader2, X } from "lucide-react";
import React, { memo } from "react";
import FileUpload from "./FileUpload";
import { useUploadFileContext } from "./Context/uploadFileContext";
import prettyBytes from "pretty-bytes";
import mime from "mime";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

const FileUploadShow = memo(() => {
  const { handleUpload, images, uploadProgress } = useUploadFileContext();

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button>
            <CloudUpload /> Upload
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle> Upload File</DialogTitle>
            <DialogDescription>Upload a file to the server</DialogDescription>
          </DialogHeader>
          <FileUpload />
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={
                images?.length <= 0 &&
                uploadProgress[images.map(({ name }) => name)] !== 100
              }
              onClick={handleUpload}
            >
              {uploadProgress[images.map(({ name }) => name)] !== 100 ? (
                "Upload"
              ) : (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Uploading
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <FileShowProgressSide />
    </div>
  );
});

export default FileUploadShow;

const FileShowProgressSide = memo(() => {
  const { images, setImages, uploadProgress } = useUploadFileContext();

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
    <div className="fixed bottom-4 right-4 w-60">
      {images?.map((image, index) => (
        <div
          key={index}
          className="p-2 rounded-md bg-white shadow border border-gray-200 space-y-2 mt-4 relative group transition duration-600 ease-in-out"
        >
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-4">
              {renderPreview(image)}
              <div className="flex gap-4 justify-between items-center">
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-gray-800 truncate overflow-hidden w-28">
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
            {/* {uploadProgress[image.name] !== 100 &&
              uploadProgress[image.name] !== undefined && (
                <div className="group-hover:flex hidden absolute w-full h-full z-50 items-center bg-white/60 justify-center gap-8">
                  {multipartUploads[image?.name] === true ? (
                    <div
                      onClick={() => pauseUpload(image?.name)}
                      className="p-0.5 rounded-full bg-gray-300 cursor-pointer hover:bg-amber-700 hover:text-white"
                    >
                      <Pause className="size-3.5" />
                    </div>
                  ) : (
                    <div
                      onClick={() => resumeUpload(image?.name)}
                      className="p-0.5 rounded-full bg-gray-300 cursor-pointer hover:bg-amber-700 hover:text-white"
                    >
                      <Play className="size-3.5" />
                    </div>
                  )}
                  <div
                    onClick={() => cancelUpload(image?.name)}
                    className="p-0.5 rounded-full bg-neutral-300 cursor-pointer hover:bg-red-700 hover:text-white"
                  >
                    <X className="size-3.5" />
                  </div>
                </div>
              )} */}
            <div
              onClick={() => {
                const img = images.filter((file) => file.name !== image?.name);
                setImages(img);
              }}
              className="p-0.5 rounded-full bg-neutral-300 cursor-pointer hover:bg-red-700 hover:text-white"
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
  );
});
