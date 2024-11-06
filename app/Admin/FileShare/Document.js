"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useDropzone } from "react-dropzone";
// import ReactDiffViewer from "react-diff-viewer";
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
import {
  Folder,
  File,
  Upload,
  X,
  History,
  RotateCcw,
  Share2,
  Settings,
  Edit,
  Eye,
  Download,
  ImageDown,
  FileVideo,
  FileText,
  Inbox,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Label,
  Textarea,
  TextFormInput,
} from "@/components/fromInput/FormInput";
import { Progress } from "@/components/ui/progress";
import FileUploadShow from "./fileUploadShow";

export default function Document() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [compareVersions, setCompareVersions] = useState(null);
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
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedFolderForUpload, setSelectedFolderForUpload] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [userStorage, setUserStorage] = useState({});

  const calculateUserStorage = useCallback(() => {
    const newUserStorage = {};

    const calculateStorageRecursive = (file, userId) => {
      if (!newUserStorage[userId]) {
        newUserStorage[userId] = {
          totalStorage: 0,
          fileCount: 0,
          folderCount: 0,
        };
      }

      if (file.type === "file") {
        newUserStorage[userId].totalStorage += file.size;
        newUserStorage[userId].fileCount += 1;
      } else {
        newUserStorage[userId].folderCount += 1;
        file.children?.forEach((child) =>
          calculateStorageRecursive(child, userId)
        );
      }
    };

    files.forEach((file) => calculateStorageRecursive(file, file.uploadedBy));

    setUserStorage(newUserStorage);
  }, [files]);

  useEffect(() => {
    calculateUserStorage();
  }, [files, calculateUserStorage]);

  const onDrop = useCallback(
    (acceptedFiles, folderId) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const fileContent = reader.result;
          const newFile = {
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            uploadedBy: currentUser.id,
            timestamp: new Date().toISOString(),
            currentVersion: "1.0",
            type: "file",
            versions: [
              {
                id: Math.random().toString(36).substr(2, 9),
                content: fileContent,
                timestamp: new Date().toISOString(),
                contributorId: currentUser.id,
                contributorName: currentUser.name,
                versionNumber: "1.0",
                size: file.size,
              },
            ],
            shareLinks: [],
            visibility: "private",
            parentId: folderId || currentFolder,
            size: file.size,
            viewCount: 0,
            downloadCount: 0,
            lastAccessed: new Date().toISOString(),
            accessControl: [
              {
                userId: currentUser.id,
                permissions: { view: true, edit: true, download: true },
              },
            ],
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
        uploadedBy: currentUser.id,
        timestamp: new Date().toISOString(),
        currentVersion: "1.0",
        type: "folder",
        versions: [],
        shareLinks: [],
        visibility: "private",
        parentId: currentFolder,
        children: [],
        size: 0,
        viewCount: 0,
        downloadCount: 0,
        lastAccessed: new Date().toISOString(),
        accessControl: [
          {
            userId: currentUser.id,
            permissions: { view: true, edit: true, download: true },
          },
        ],
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
    if (hasPermission(id, "edit")) {
      setFiles((prevFiles) => removeFileFromStructure(prevFiles, id));
    } else {
      alert("You don't have permission to delete this file.");
    }
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
    if (hasPermission(file.id, "edit")) {
      const versionParts = file.currentVersion.split(".");
      const newMinorVersion = parseInt(versionParts[1]) + 1;
      const newVersionNumber = `${versionParts[0]}.${newMinorVersion}`;

      const newVersion = {
        id: Math.random().toString(36).substr(2, 9),
        content: newContent,
        timestamp: new Date().toISOString(),
        contributorId: currentUser.id,
        contributorName: currentUser.name,
        versionNumber: newVersionNumber,
        size: new Blob([newContent]).size,
      };

      const updatedFile = {
        ...file,
        currentVersion: newVersionNumber,
        timestamp: new Date().toISOString(),
        versions: [...file.versions, newVersion],
        size: newVersion.size,
        lastAccessed: new Date().toISOString(),
      };
      setFiles((prevFiles) => updateFileInStructure(prevFiles, updatedFile));
      addActivityLog("edit", file.id);
    } else {
      alert("You don't have permission to edit this file.");
    }
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
    if (hasPermission(file.id, "edit")) {
      const versionParts = file.currentVersion.split(".");
      const newMajorVersion = parseInt(versionParts[0]) + 1;
      const newVersionNumber = `${newMajorVersion}.0`;

      const revertedVersion = {
        ...file.versions[versionIndex],
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString(),
        contributorId: currentUser.id,
        contributorName: currentUser.name,
        versionNumber: newVersionNumber,
      };

      const revertedFile = {
        ...file,
        currentVersion: newVersionNumber,
        timestamp: new Date().toISOString(),
        versions: [...file.versions, revertedVersion],
        size: revertedVersion.size,
        lastAccessed: new Date().toISOString(),
      };
      setFiles((prevFiles) => updateFileInStructure(prevFiles, revertedFile));
      addActivityLog("edit", file.id);
    } else {
      alert("You don't have permission to revert this file.");
    }
  };

  const handleDownload = (file) => {
    if (hasPermission(file.id, "download")) {
      // Simulating download
      console.log(`Downloading ${file.name}`);
      const updatedFile = {
        ...file,
        downloadCount: file.downloadCount + 1,
        lastAccessed: new Date().toISOString(),
      };
      setFiles((prevFiles) => updateFileInStructure(prevFiles, updatedFile));
      addActivityLog("download", file.id);
    } else {
      alert("You don't have permission to download this file.");
    }
  };

  const handleView = (file) => {
    if (hasPermission(file.id, "view")) {
      const updatedFile = {
        ...file,
        viewCount: file.viewCount + 1,
        lastAccessed: new Date().toISOString(),
      };
      setFiles((prevFiles) => updateFileInStructure(prevFiles, updatedFile));
      addActivityLog("view", file.id);
    } else {
      alert("You don't have permission to view this file.");
    }
  };

  const handleShare = (file, permissions) => {
    if (hasPermission(file.id, "edit")) {
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
    } else {
      alert("You don't have permission to share this file.");
    }
  };

  const handleChangeVisibility = (file, visibility, teamId) => {
    if (hasPermission(file.id, "edit")) {
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
    } else {
      alert("You don't have permission to change the visibility of this file.");
    }
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

  const handleEditFile = (file) => {
    if (hasPermission(file.id, "edit")) {
      setSelectedFile(file);
      setEditContent(file.versions[file.versions.length - 1].content);
      setIsEditDialogOpen(true);
    } else {
      alert("You don't have permission to edit this file.");
    }
  };

  const handleSaveEdit = () => {
    if (selectedFile) {
      handleUpdateFile(selectedFile, editContent);
      setIsEditDialogOpen(false);
      setSelectedFile(null);
      setEditContent("");
    }
  };

  const hasPermission = (fileId, action) => {
    const file = files.find((f) => f.id === fileId);
    if (!file) return false;

    const userAccess = file.accessControl.find(
      (ac) => ac.userId === currentUser.id
    );
    if (userAccess) {
      return userAccess.permissions[action];
    }

    // If no specific permissions are set, use visibility
    if (file.visibility === "public") return true;
    if (file.visibility === "team") {
      const fileTeam = teams.find((t) => t.id === file.team);
      return fileTeam?.members.some((m) => m.id === currentUser.id) || false;
    }
    return false;
  };

  const generateUsageReport = () => {
    const report = users.map((user) => {
      const userFiles = files.filter((file) => file.uploadedBy === user.id);
      const totalViews = userFiles.reduce(
        (sum, file) => sum + file.viewCount,
        0
      );
      const totalDownloads = userFiles.reduce(
        (sum, file) => sum + file.downloadCount,
        0
      );
      const storage = userStorage[user.id] || {
        totalStorage: 0,
        fileCount: 0,
        folderCount: 0,
      };

      return {
        name: user.name,
        fileCount: storage.fileCount,
        folderCount: storage.folderCount,
        totalStorage: (storage.totalStorage / 1024 / 1024).toFixed(2),
        totalViews,
        totalDownloads,
      };
    });

    return report;
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
          <TableCell>
            {users.find((u) => u.id === file.uploadedBy)?.name || "Unknown"}
          </TableCell>
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
                  <div className="size-6 rounded-full bg-white border border-gray-200">
                    {teams
                      .find((t) => t.id === file.team)
                      ?.name.substring(0, 2)
                      .toUpperCase()}
                  </div>
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
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleView(file)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>View File: {file.name}</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        <pre className="whitespace-pre-wrap">
                          {file.versions[file.versions.length - 1].content}
                        </pre>
                      </div>
                    </DialogContent>
                  </Dialog>
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
                              <TableHead>Contributor</TableHead>
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
                                <TableCell>{version.contributorName}</TableCell>
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
                      {compareVersions && (
                        <div className="mt-4">
                          <h3 className="text-lg font-semibold mb-2">
                            Version Comparison
                          </h3>
                          <ReactDiffViewer
                            oldValue={
                              file.versions.find(
                                (v) => v.versionNumber === compareVersions.old
                              )?.content || ""
                            }
                            newValue={
                              file.versions.find(
                                (v) => v.versionNumber === compareVersions.new
                              )?.content || ""
                            }
                            splitView={true}
                          />
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDownload(file)}
                  >
                    <Download className="h-4 w-4" />
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
                            <Label htmlFor="view">View</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="edit" />
                            <Label htmlFor="edit">Edit</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="download" />
                            <Label htmlFor="download">Download</Label>
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
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEditFile(file)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
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
                        <Label labelText={"Public"}>Public</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="private" id="private" />
                        <Label labelText={"Private"} />
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="team" id="team" />
                        <Label labelText={"Team"} />
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
      <FileUploadShow />
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
          icon={<Inbox className={`size-5 text-blue-600 mt-1`} />}
        />
      </div>
      <Tabs defaultValue="repository" className="space-y-4">
        <TabsList>
          <TabsTrigger value="repository">Document Repository</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
          <TabsTrigger value="teams">Team Management</TabsTrigger>
          <TabsTrigger value="storage">Storage Usage</TabsTrigger>
          <TabsTrigger value="usage">Usage Reports</TabsTrigger>
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

          <div
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
          </div>

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
              <div
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
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit File: {selectedFile?.name}</DialogTitle>
              </DialogHeader>
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={10}
                className="w-full mt-4"
              />
              <Button onClick={handleSaveEdit} className="mt-4">
                Save Changes
              </Button>
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
                <SelectItem value="view">Views</SelectItem>
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
        <TabsContent value="storage">
          <h1 className="text-2xl font-bold mb-4">Storage Usage</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => {
              const storage = userStorage[user.id] || {
                totalStorage: 0,
                fileCount: 0,
                folderCount: 0,
              };
              return (
                <Card key={user.id}>
                  <CardHeader>
                    <CardTitle>{user.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Total Storage:</span>
                        <span>
                          {(storage.totalStorage / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Files:</span>
                        <span>{storage.fileCount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Folders:</span>
                        <span>{storage.folderCount}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
        <TabsContent value="usage">
          <h1 className="text-2xl font-bold mb-4">Usage Reports</h1>
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Files</TableHead>
                  <TableHead>Folders</TableHead>
                  <TableHead>Total Storage (MB)</TableHead>
                  <TableHead>Total Views</TableHead>
                  <TableHead>Total Downloads</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {generateUsageReport().map((report) => (
                  <TableRow key={report.name}>
                    <TableCell>{report.name}</TableCell>
                    <TableCell>{report.fileCount}</TableCell>
                    <TableCell>{report.folderCount}</TableCell>
                    <TableCell>{report.totalStorage}</TableCell>
                    <TableCell>{report.totalViews}</TableCell>
                    <TableCell>{report.totalDownloads}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Card>
              <CardHeader>
                <CardTitle>Usage Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={generateUsageReport()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="totalViews"
                      fill="#8884d8"
                      name="Total Views"
                    />
                    <Bar
                      dataKey="totalDownloads"
                      fill="#82ca9d"
                      name="Total Downloads"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
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
