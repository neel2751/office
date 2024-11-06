"use client";

import React, { useState, useCallback, useMemo, useRef } from "react";
import { useDropzone } from "react-dropzone";
// import ReactDiffViewer from 'react-diff-viewer'
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Folder,
  File,
  Upload,
  X,
  History,
  RotateCcw,
  Share2,
  Users,
  Settings,
  Search,
  Filter,
  ImageDown,
  FileVideo,
  FileText,
  HardDrive,
  Inbox,
  Plus,
  UploadCloud,
  Star,
} from "lucide-react";
import { Label, TextFormInput } from "@/components/fromInput/FormInput";
import ImageUpload, { PhotoCard } from "@/components/ImageUpload/ImageUpload";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import prettyBytes from "pretty-bytes";
import mime from "mime";
import { toast } from "react-toastify";
import {
  getPresignedURLAWS,
  uploadAWSMultipartDocument,
  uploadAWSMultipartDocumentComplete,
} from "@/actions/documentUploadAction/documentUploadAction";

export default function DocumentRepository() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [compareVersions, setCompareVersions] = useState(null);
  const [images, setImages] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [logFilter, setLogFilter] = useState("all");
  const [teams, setTeams] = useState([
    { id: "1", name: "Engineering", members: [] },
    { id: "2", name: "Design", members: [] },
    { id: "3", name: "Management", members: [] },
  ]);
  const [users, setUsers] = useState([
    { id: "1", name: "John Doe", role: "admin" },
    { id: "2", name: "Jane Smith", role: "team_lead" },
    { id: "3", name: "Bob Johnson", role: "member" },
  ]);
  const [currentUser, setCurrentUser] = useState(users[0]);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibilityFilter, setVisibilityFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedFolderForUpload, setSelectedFolderForUpload] = useState(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  const onSubmitButton = () => {
    onDrop(images, currentFolder);
    setImages([]);
    setCurrentFolder(null);
  };

  const onDrop = useCallback(
    (acceptedFiles, folderId) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const fileContent = reader.result;
          const newFile = {
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            uploadedBy: currentUser.name,
            timestamp: new Date().toISOString(),
            currentVersion: "1.0",
            type: "file",
            versions: [
              {
                id: Math.random().toString(36).substr(2, 9),
                content: fileContent,
                timestamp: new Date().toISOString(),
                uploadedBy: currentUser.name,
                versionNumber: "1.0",
              },
            ],
            shareLinks: [],
            visibility: "private",
            parentId: folderId || currentFolder,
          };
          setFiles((prevFiles) => addFileToStructure(prevFiles, newFile));
          addActivityLog("upload", newFile.id);
        };
        reader.readAsText(file);
      });
    },
    [currentUser, currentFolder]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => onDrop(files, currentFolder),
  });

  const handleCreateFolder = () => {
    const folderName = prompt("Enter folder name:");
    if (folderName) {
      const newFolder = {
        id: Math.random().toString(36).substr(2, 9),
        name: folderName,
        uploadedBy: currentUser.name,
        timestamp: new Date().toISOString(),
        currentVersion: "1.0",
        type: "folder",
        versions: [],
        shareLinks: [],
        visibility: "private",
        parentId: currentFolder,
        children: [],
      };
      setFiles((prevFiles) => addFileToStructure(prevFiles, newFolder));
      addActivityLog("create_folder", newFolder.id);
    }
  };

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

  const handleDelete = (id) => {
    setFiles((prevFiles) => removeFileFromStructure(prevFiles, id));
  };

  const removeFileFromStructure = (files, id) => {
    return files
      .filter((file) => file.id !== id)
      .map((file) => {
        if (file.children) {
          return {
            ...file,
            children: removeFileFromStructure(file.children, id),
          };
        }
        return file;
      });
  };

  const handleUpdateFile = (file, newContent) => {
    const versionParts = file.currentVersion.split(".");
    const newMinorVersion = parseInt(versionParts[1]) + 1;
    const newVersionNumber = `${versionParts[0]}.${newMinorVersion}`;

    const updatedFile = {
      ...file,
      currentVersion: newVersionNumber,
      timestamp: new Date().toISOString(),
      versions: [
        ...file.versions,
        {
          id: Math.random().toString(36).substr(2, 9),
          content: newContent,
          timestamp: new Date().toISOString(),
          uploadedBy: currentUser.name,
          versionNumber: newVersionNumber,
        },
      ],
    };
    setFiles((prevFiles) => updateFileInStructure(prevFiles, updatedFile));
    addActivityLog("edit", file.id);
  };

  const updateFileInStructure = (files, updatedFile) => {
    return files.map((file) => {
      if (file.id === updatedFile.id) {
        return updatedFile;
      } else if (file.children) {
        return {
          ...file,
          children: updateFileInStructure(file.children, updatedFile),
        };
      }
      return file;
    });
  };

  const handleRevertVersion = (file, versionIndex) => {
    const versionParts = file.currentVersion.split(".");
    const newMajorVersion = parseInt(versionParts[0]) + 1;
    const newVersionNumber = `${newMajorVersion}.0`;

    const revertedFile = {
      ...file,
      currentVersion: newVersionNumber,
      timestamp: new Date().toISOString(),
      versions: [
        ...file.versions,
        {
          ...file.versions[versionIndex],
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date().toISOString(),
          versionNumber: newVersionNumber,
        },
      ],
    };
    setFiles((prevFiles) => updateFileInStructure(prevFiles, revertedFile));
    addActivityLog("edit", file.id);
  };

  const handleDownload = (file) => {
    // Simulating download
    console.log(`Downloading ${file.name}`);
    addActivityLog("download", file.id);
  };

  const handleShare = (file, permissions) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7); // Set expiration to 7 days from now
    const newShareLink = {
      id: Math.random().toString(36).substr(2, 9),
      url: `https://example.com/share/${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      expiration: expirationDate.toISOString(),
      permissions,
    };
    const updatedFile = {
      ...file,
      shareLinks: [...file.shareLinks, newShareLink],
    };
    setFiles((prevFiles) => updateFileInStructure(prevFiles, updatedFile));
    addActivityLog("share", file.id);
  };

  const handleChangeVisibility = (file, visibility, teamId) => {
    const updatedFile = {
      ...file,
      visibility,
      team: visibility === "team" ? teamId : undefined,
    };
    setFiles((prevFiles) => updateFileInStructure(prevFiles, updatedFile));
    addActivityLog(
      "change_visibility",
      file.id,
      `Changed to ${visibility}${teamId ? ` (Team: ${teamId})` : ""}`
    );
  };

  const handleChangePermissions = (userId, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
    addActivityLog("change_permissions", userId, `Changed role to ${newRole}`);
  };

  const addActivityLog = (action, fileId, details) => {
    const newLog = {
      id: Math.random().toString(36).substr(2, 9),
      userId: currentUser.id,
      action,
      fileId,
      timestamp: new Date().toISOString(),
      details,
    };
    setActivityLogs((prevLogs) => [...prevLogs, newLog]);
  };

  const filteredLogs = activityLogs.filter(
    (log) => logFilter === "all" || log.action === logFilter
  );

  const filteredFiles = useMemo(() => {
    const filterFile = (file) => {
      const matchesSearch = file.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesVisibility =
        visibilityFilter === "all" || file.visibility === visibilityFilter;
      const matchesType = typeFilter === "all" || file.type === typeFilter;
      return matchesSearch && matchesVisibility && matchesType;
    };

    const filterStructure = (files) => {
      return files.filter((file) => {
        if (filterFile(file)) {
          return true;
        }
        if (file.children) {
          const filteredChildren = filterStructure(file.children);
          if (filteredChildren.length > 0) {
            file.children = filteredChildren;
            return true;
          }
        }
        return false;
      });
    };

    return filterStructure(files);
  }, [files, searchTerm, visibilityFilter, typeFilter]);

  const handleFolderDoubleClick = (folderId) => {
    setSelectedFolderForUpload(folderId);
    setIsUploadDialogOpen(true);
  };

  const handleFileUploadToFolder = (acceptedFiles) => {
    onDrop(acceptedFiles, selectedFolderForUpload);
    setIsUploadDialogOpen(false);
    setSelectedFolderForUpload(null);
  };

  const renderFileTree = (files, depth = 0) => {
    return files.map((file) => (
      <React.Fragment key={file.id}>
        <TableRow>
          <TableCell className="font-medium">
            <div
              style={{ paddingLeft: `${depth * 20}px` }}
              className="flex items-center"
              onDoubleClick={() =>
                file.type === "folder" && handleFolderDoubleClick(file.id)
              }
            >
              {file.type === "folder" ? (
                <Folder
                  className="inline mr-2 cursor-pointer"
                  onClick={() => setCurrentFolder(file.id)}
                />
              ) : (
                <File className="inline mr-2" />
              )}
              {file.name}
            </div>
          </TableCell>
          <TableCell>{file.uploadedBy}</TableCell>
          <TableCell>{new Date(file.timestamp).toLocaleString()}</TableCell>
          <TableCell>{file.currentVersion}</TableCell>
          <TableCell>
            <div className="flex items-center space-x-2">
              {file.visibility === "public" && (
                <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                  Public
                </span>
              )}
              {file.visibility === "private" && (
                <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                  Private
                </span>
              )}
              {file.visibility === "team" && (
                <>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                    Team
                  </span>
                  {/* <Avatar className="w-6 h-6"> */}
                  {/* <AvatarFallback> */}
                  <div className="size-8 p-1 rounded-full bg-gray-200 text-black flex items-center justify-center font-semibold">
                    {teams
                      .find((t) => t.id === file.team)
                      ?.name.substring(0, 2)
                      .toUpperCase()}
                  </div>
                  {/* </AvatarFallback> */}
                  {/* </Avatar> */}
                </>
              )}
            </div>
          </TableCell>
          <TableCell>
            <div className="flex space-x-2">
              {file.type === "file" && (
                <>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <History className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Version History: {file.name}</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Version</TableHead>
                              <TableHead>Timestamp</TableHead>
                              <TableHead>Uploaded By</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {file.versions.map((version, index) => (
                              <TableRow key={version.id}>
                                <TableCell>{version.versionNumber}</TableCell>
                                <TableCell>
                                  {new Date(version.timestamp).toLocaleString()}
                                </TableCell>
                                <TableCell>{version.uploadedBy}</TableCell>
                                <TableCell>
                                  <div className="flex space-x-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        setCompareVersions({
                                          old: version.versionNumber,
                                          new: file.currentVersion,
                                        })
                                      }
                                    >
                                      Compare to Latest
                                    </Button>
                                    {index !== file.versions.length - 1 && (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                          handleRevertVersion(file, index)
                                        }
                                      >
                                        <RotateCcw className="h-4 w-4 mr-2" />
                                        Revert
                                      </Button>
                                    )}
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      {/* {compareVersions && (
                        <div className="mt-4">
                          <h3 className="text-lg font-semibold mb-2">Version Comparison</h3>
                          <ReactDiffViewer
                            oldValue={file.versions.find(v => v.versionNumber === compareVersions.old)?.content || ''}
                            newValue={file.versions.find(v => v.versionNumber === compareVersions.new)?.content || ''}
                            splitView={true}
                          />
                        </div>
                      )} */}
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDownload(file)}
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Share File: {file.name}</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">
                          Existing Share Links
                        </h3>
                        {file.shareLinks.map((link, index) => (
                          <div
                            key={link.id}
                            className="mb-2 p-2 border rounded"
                          >
                            <p>URL: {link.url}</p>
                            <p>
                              Expires:{" "}
                              {new Date(link.expiration).toLocaleString()}
                            </p>
                            <p>
                              Permissions:
                              {link.permissions.view ? " View" : ""}
                              {link.permissions.edit ? " Edit" : ""}
                              {link.permissions.download ? " Download" : ""}
                            </p>
                          </div>
                        ))}
                        <h3 className="text-lg font-semibold my-2">
                          Create New Share Link
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="view" />
                            <Label labelText={"View"} />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="edit" />
                            <Label labelText={"Edit"} />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="download" />
                            <Label labelText={"Download"} />
                          </div>
                        </div>
                        <Button
                          className="mt-4"
                          onClick={() => {
                            const permissions = {
                              view: document.getElementById("view").checked,
                              edit: document.getElementById("edit").checked,
                              download:
                                document.getElementById("download").checked,
                            };
                            handleShare(file, permissions);
                          }}
                        >
                          Generate Share Link
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </>
              )}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>File Settings: {file.name}</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Visibility</h3>
                    <RadioGroup
                      defaultValue={file.visibility}
                      onValueChange={(value) =>
                        handleChangeVisibility(file, value)
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="public" id="public" />
                        <Label labelText={"Public"} htmlFor="public">
                          Public
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="private" id="private" />
                        <Label labelText={"Private"} htmlFor="private">
                          Private
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="team" id="team" />
                        <Label labelText={"Team"} htmlFor="team">
                          Team
                        </Label>
                      </div>
                    </RadioGroup>
                    {file.visibility === "team" && (
                      <Select
                        onValueChange={(value) =>
                          handleChangeVisibility(file, "team", value)
                        }
                      >
                        <SelectTrigger className="w-[180px] mt-2">
                          <SelectValue placeholder="Select team" />
                        </SelectTrigger>
                        <SelectContent>
                          {teams.map((team) => (
                            <SelectItem key={team.id} value={team.id}>
                              {team.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(file.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
        {file.children && renderFileTree(file.children, depth + 1)}
      </React.Fragment>
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold text-neutral-700 my-4">
        Central File System
      </h2>
      <div className="grid grid-cols-4 mb-4 gap-4">
        <CardDesign
          title={"Image Files"}
          color={"rose"}
          value={20}
          item={1768}
          icon={<ImageDown className={`size-5 text-rose-600 mt-1`} />}
        />
        <CardDesign
          title={"Video Files"}
          color={"green"}
          value={40}
          item={167}
          icon={<FileVideo className={`size-5 text-green-600 mt-1`} />}
        />
        <CardDesign
          title={"Document Files"}
          color={"amber"}
          value={30}
          item={1274}
          icon={<FileText className={`size-5 text-amber-600 mt-1`} />}
        />
        <CardDesign
          title={"Other Files"}
          color={"blue"}
          value={10}
          item={1035}
          icon={<HardDrive className={`size-5 text-blue-600 mt-1`} />}
        />
      </div>
      <div className="my-10">
        <CreateWorkSpace />
      </div>
      <Tabs defaultValue="repository" className="space-y-4">
        <TabsList>
          <TabsTrigger value="repository">Document Repository</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
          <TabsTrigger value="teams">Team Management</TabsTrigger>
        </TabsList>
        <TabsContent value="repository" className="space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Document Repository</h1>
            <div className="flex items-center space-x-2">
              <span>Current User:</span>
              <Select
                value={currentUser.id}
                onValueChange={(value) =>
                  setCurrentUser(users.find((u) => u.id === value))
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name} ({user.role})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <TextFormInput
                type="text"
                placeholder="Search files and folders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select
              value={visibilityFilter}
              onValueChange={(value) => setVisibilityFilter(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Visibilities</SelectItem>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="team">Team</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={typeFilter}
              onValueChange={(value) => setTypeFilter(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="file">Files</SelectItem>
                <SelectItem value="folder">Folders</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ImageUpload setImages={setImages} images={images} />
          <Button onClick={onSubmitButton}>Submit</Button>
          {/* <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
              isDragActive ? "border-primary" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto mb-2" />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div> */}

          <div className="flex justify-between items-center">
            <Button onClick={handleCreateFolder}>Create Folder</Button>
            <TextFormInput
              type="file"
              className="max-w-xs"
              onChange={(e) => onDrop(Array.from(e.target.files || []))}
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Uploaded By</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{renderFileTree(filteredFiles)}</TableBody>
          </Table>
          <Dialog
            open={isUploadDialogOpen}
            onOpenChange={setIsUploadDialogOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Files to Folder</DialogTitle>
              </DialogHeader>
              <ImageUpload setImages={setImages} images={images} />
              <Button onClick={onSubmitButton}>Submit</Button>
              {/* <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
                  isDragActive ? "border-primary" : "border-gray-300"
                }`}
              >
                <input
                  {...getInputProps()}
                  onChange={(e) =>
                    handleFileUploadToFolder(Array.from(e.target.files || []))
                  }
                />
                <Upload className="mx-auto mb-2" />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div> */}
            </DialogContent>
          </Dialog>
        </TabsContent>
        <TabsContent value="activity">
          <h1 className="text-2xl font-bold mb-4">Activity Log</h1>
          <div className="mb-4">
            <Select onValueChange={(value) => setLogFilter(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="upload">Uploads</SelectItem>
                <SelectItem value="edit">Edits</SelectItem>
                <SelectItem value="download">Downloads</SelectItem>
                <SelectItem value="share">Shares</SelectItem>
                <SelectItem value="change_visibility">
                  Visibility Changes
                </SelectItem>
                <SelectItem value="change_permissions">
                  Permission Changes
                </SelectItem>
                <SelectItem value="create_folder">Folder Creation</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>File</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    {new Date(log.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {users.find((u) => u.id === log.userId)?.name || "Unknown"}
                  </TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>
                    {files.find((f) => f.id === log.fileId)?.name || "Unknown"}
                  </TableCell>
                  <TableCell>{log.details || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="teams">
          <h1 className="text-2xl font-bold mb-4">Team Management</h1>
          <div className="space-y-4">
            {teams.map((team) => (
              <div key={team.id} className="border p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">{team.name}</h2>
                <div className="space-y-2">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between"
                    >
                      <span>{user.name}</span>
                      <Select
                        defaultValue={user.role}
                        onValueChange={(value) =>
                          handleChangePermissions(user.id, value)
                        }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="team_lead">Team Lead</SelectItem>
                          <SelectItem value="member">Member</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const CardDesign = ({ color, title, item, value, icon }) => {
  return (
    <Card className="p-4 space-y-2">
      <div className="flex gap-2 mb-2 items-start">
        <div className="p-2 rounded-md bg-white shadow border-neutral-200 border">
          {icon || <ImageDown className={`size-5 text-rose-600 mt-1`} />}
        </div>
        <div>
          <span className="text-sm font-semibold text-neutral-700 mb-1">
            {title || "No  title"}
          </span>
          <p className="text-neutral-400 text-xs">{item || 0} items</p>
        </div>
      </div>
      <div className="pt-1">
        <Progress
          value={value}
          className="h-1.5"
          indicatorColor={`bg-${color}-600`}
        />
      </div>
      <div>
        <span className="text-neutral-500 text-sm tracking-tight pt-2">
          20 GB of 100 GB used
        </span>
      </div>
    </Card>
  );
};

//@ we have to implement the recatHookform here with Workspace Member and if the workspacename is not empty then we have to show the workspace member other wise it personal Workspace
// there types of workspace like Personal, Team , Organization, Enterprise, Community, Partner, Customer, Vendor, Supplier, Employee
const CreateWorkSpace = () => {
  const [workspaces, setWorkspaces] = useState([]); // shwoing workspace
  const [newWorkspace, setNewWorkspace] = useState(""); // for input change name
  const [newWorkspaceType, setNewWorkspaceType] = useState("");
  const [newWorkspaceMembers, setNewWorkspaceMembers] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [teams, setTeams] = useState([
    {
      id: 1,
      name: "Personal",
      icon: <ImageDown className={`size-5 text-rose-600 mt-1`} />,
      teamMember: [1, 2],
    },
    {
      id: 2,
      name: "Design Team",
      icon: <ImageDown className={`size-5 text-rose-600 mt-1`} />,
      teamMember: [3, 4, 5],
    },
  ]);
  const teamMember = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane.doe@example.com",
      role: "Member",
    },
    {
      id: 3,
      name: "Bob Smith",
      email: "bob.smith@example.com",
      role: "Member",
    },
    {
      id: 4,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      role: "Admin",
    },
    {
      id: 5,
      name: "Mike Brown",
      email: "mike.brown@example.com",
      role: "Member",
    },
  ];

  const onSubmit = async () => {
    const newWorkspaces = {
      name: newWorkspace,
      type: newWorkspaceType,
      members: newWorkspaceMembers,
    };
    setWorkspaces([...workspaces, newWorkspaces]);
  };

  const handleCheckboxChangeMember = (checked, id) => {
    if (checked) {
      // If checked, add the item to the selectedItems array
      setNewWorkspaceMembers((prev) => [...prev, id]);
    } else {
      // If unchecked, remove the item from the selectedItems array
      setNewWorkspaceMembers((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleCheckboxChange = (checked, id) => {
    if (checked) {
      // If checked, add the item to the selectedItems array
      setSelectedItems((prev) => [...prev, id]);
    } else {
      // If unchecked, remove the item from the selectedItems array
      setSelectedItems((prev) => prev.filter((item) => item !== id));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-neutral-700">Hey, Neel 👋</h2>

          {workspaces?.map((item, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold text-neutral-700">
                {item.name}
              </h3>
              {item?.members?.map((member) => (
                <div key={member}>
                  {teamMember
                    .filter((item) => item.id === member)
                    .map((item) => item.name)}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Inbox className="size-5 me-2" />
                Create Workspace
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Enter Workspace Details</DialogTitle>
                <DialogDescription>
                  Make changes to your workspace here.
                </DialogDescription>
              </DialogHeader>
              <TextFormInput
                id="workspace"
                placeholder=" Enter workspace name"
                labelText="Workspace"
                onChange={(e) => setNewWorkspace(e.target.value)}
                cls={"mt-1"}
              />
              {teams?.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(checked, item.id)
                    }
                    id={item?.name}
                  />
                  <Label labelText={item?.name} className="mb-0" />
                </div>
              ))}
              <DialogFooter>
                <Button onClick={onSubmit} type="submit">
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="size-5 me-2" />
                Create Your Team
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Enter Team Details</DialogTitle>
                <DialogDescription>
                  Make changes to your team here.
                </DialogDescription>
              </DialogHeader>
              <TextFormInput
                id="team"
                placeholder=" Enter team name"
                labelText="Team Name"
                onChange={(e) => setNewWorkspace(e.target.value)}
                cls={"mt-1"}
              />
              <div className="mt-2 space-y-1">
                {teamMember?.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      checked={newWorkspaceMembers.includes(item.id)}
                      onCheckedChange={(checked) =>
                        handleCheckboxChangeMember(checked, item.id)
                      }
                      id={item?.name}
                    />
                    <Label labelText={item?.name} className="mb-0" />
                  </div>
                ))}
              </div>
              <DialogFooter>
                <Button onClick={onSubmit} type="submit">
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Your Team</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-evenly">
            <div className="flex flex-col items-center space-y-1">
              <div className="bg-gray-200 border-amber-600 border py-0.5 px-2 size-10 flex items-center justify-center rounded-full text-sm">
                <Plus className="szie-6" />
              </div>
              <span>Create Team</span>
            </div>
            {teamMember.map((item) => (
              <div className="flex flex-col items-center space-y-1">
                <div className="bg-gray-200 border-green-600 border-2 py-0.5 px-2 size-10 flex items-center justify-center rounded-full text-sm">
                  {item.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("") || "NC"}
                </div>
                <span>{item.name.split(" ")[0]}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <CardTitle>Workspace</CardTitle>
      <div className="grid-cols-4 grid gap-4">
        {[1, 2, 3, 4].map((item) => (
          <Card key={item}>
            <CardHeader>
              <CardTitle>
                {" "}
                {item % 2 === 0 ? "📣" : "✌️"} Design Team-{item}
              </CardTitle>
              <CardDescription>
                Manage your team members and their roles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center -space-x-2">
                {teamMember.map((item) => (
                  <span className="bg-white border-neutral-300 shadows hover:z-10 hover:bg-cyan-600 group hover:border-white hover:text-white cursor-pointer border py-0.5 px-2 size-8 flex items-center justify-center rounded-full text-sm shrink-0 relative font-semibold text-neutral-800">
                    {item.id === 2 && (
                      <Star className="size-4 text-transparent absolute -top-2 -right-0 fill-cyan-600 group-hover:fill-cyan-800" />
                    )}
                    {item?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("") || "N/A"}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
          // <Card key={item}>
          //   <CardHeader>
          //     <CardTitle>
          //       {item % 2 === 0 ? "📣" : "✌️"} Design Team-{item}
          //     </CardTitle>
          //     <CardDescription>
          //       Manage your team members and their roles.
          //     </CardDescription>
          //   </CardHeader>
          //   <CardContent>
          //     <div className="flex items-center -space-x-2">
          //       {teamMember.map((item) => (
          //         <span className="bg-white border-neutral-200 border py-0.5 px-2 size-8 flex items-center justify-center rounded-full text-sm shrink-0">
          //           {item.name
          //             .split(" ")
          //             .map((n) => n[0])
          //             .join("") || "NC"}
          //         </span>
          //       ))}
          //     </div>
          //   </CardContent>
          // </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Assign Projects</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4 items-center overflow-scroll">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
            (item) => (
              <span className="py-0.5 px-2 rounded-md bg-cyan-200 text-cyan-800 text-sm whitespace-nowrap cursor-pointer">
                Project {item}
              </span>
            )
          )}
        </CardContent>
      </Card>
      <UploadDialog />
    </div>
  );
};

const UploadDialog = () => {
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const multipartUploads = useRef({});
  const [isPaused, setIsPaused] = useState({});

  const uploadDocument = async () => {
    if (images.length === 0)
      return toast.warn(" Please select at least one image");
    images.forEach((file) => {
      initialMultipartUpload(file);
    });
  };

  const initialMultipartUpload = async (file) => {
    try {
      const {
        data: { UploadId },
      } = await uploadAWSMultipartDocument(file, (id = 101010));
      multipartUploads.current[file.name] = {
        UploadId,
        parts: [],
        file,
      };
      uploadFilePart(file, UploadId);
    } catch (error) {
      console.error(error);
      toast.error("Failed to initiate upload for  file: " + file.name);
    }
  };

  const uploadFilePart = async (file, UploadId) => {
    const partSize = 5 * 1024 * 1024;
    const totalParts = Math.ceil(file.size / partSize);
    for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
      if (isPaused[file.name]) {
        console.log(" Upload paused  for file: " + file.name);
        return;
      }

      const start = (partNumber - 1) * partSize;
      const end = Math.min(start + partSize - 1, file.size - 1);
      const bolb = file.slice(start, end + 1);
      try {
        const {
          data: { url },
        } = await getPresignedURLAWS(UploadId, partNumber, file.name);
        const response = await uploadAWSFile(url, bolb);
        multipartUploads.current[file.name].parts.push({
          ETag: response.data.ETag,
          PartNumber: partNumber,
        });
        if (partNumber === totalParts) {
          uploadAWSMultipartDocumentComplete(file);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to upload part for file: " + file.name);
        break;
      }
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <UploadCloud className="size-5 me-2" />
            Upload
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share Your Work</DialogTitle>
            <DialogDescription>
              What do you want to share with the team?
            </DialogDescription>
          </DialogHeader>
          <ImageUpload images={images} setImages={setImages} />

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
