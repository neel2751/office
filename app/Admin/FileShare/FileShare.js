"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle,
  UserPlus,
  Upload,
  Lock,
  Globe,
  Users,
  FileText,
} from "lucide-react";
import { Label, TextFormInput } from "@/components/fromInput/FormInput";

export default function EnhancedTeamCollaboration() {
  const [teamMembers, setTeamMembers] = useState([
    {
      id: "1",
      name: "Team Leader",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]);
  const [newMemberName, setNewMemberName] = useState("");
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileVisibility, setFileVisibility] = useState("private");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const addTeamMember = () => {
    if (newMemberName) {
      setTeamMembers([
        ...teamMembers,
        {
          id: (teamMembers.length + 1).toString(),
          name: newMemberName,
          avatar: "/placeholder.svg?height=32&width=32",
        },
      ]);
      setNewMemberName("");
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        const newFile = {
          id: (files.length + 1).toString(),
          name: file.name,
          uploadedBy: "Team Leader",
          sharedWith: [],
          visibility: "private",
          content: content,
        };
        setFiles([...files, newFile]);
        setSelectedFile(newFile);
      };
      reader.readAsText(file);
    }
  };

  const updateFileVisibility = () => {
    if (selectedFile) {
      const updatedFiles = files.map((file) =>
        file.id === selectedFile.id
          ? {
              ...file,
              visibility: fileVisibility,
              sharedWith: fileVisibility === "team" ? selectedMembers : [],
            }
          : file
      );
      setFiles(updatedFiles);
      setSelectedFile({
        ...selectedFile,
        visibility: fileVisibility,
        sharedWith: fileVisibility === "team" ? selectedMembers : [],
      });
    }
  };

  const getAccessibleMembers = (file) => {
    if (file.visibility === "public") {
      return teamMembers;
    } else if (file.visibility === "team") {
      return teamMembers.filter((member) =>
        file.sharedWith.includes(member.id)
      );
    } else {
      return teamMembers.filter((member) => member.id === "1"); // Only Team Leader for private files
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Team Members</h2>
        <div className="flex flex-wrap gap-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex items-center space-x-2">
              <span>{member.name}</span>
              {member.id === "1" && <div>Leader</div>}
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <TextFormInput
            placeholder="New member name"
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.target.value)}
          />
          <Button onClick={addTeamMember}>
            <UserPlus className="mr-2 h-4 w-4" /> Add Member
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">File Management</h2>
        <div className="flex space-x-2">
          <TextFormInput type="file" onChange={handleFileUpload} />
          <Button>
            <Upload className="mr-2 h-4 w-4" /> Upload File
          </Button>
        </div>
        {selectedFile && (
          <Card>
            <CardHeader>
              <CardTitle>Selected File: {selectedFile.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={fileVisibility}
                onValueChange={(value) => setFileVisibility(value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private" />
                  <Label labelText="private" />
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" />
                  <Label labelText="public" />
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="team" id="team" />
                  <Label labelText="team" />
                </div>
              </RadioGroup>
              {fileVisibility === "team" && (
                <div className="space-y-2">
                  <Label labelText={"Select Team Members:"} />
                  {teamMembers.slice(1).map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        id={`member-${member.id}`}
                        checked={selectedMembers.includes(member.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedMembers([...selectedMembers, member.id]);
                          } else {
                            setSelectedMembers(
                              selectedMembers.filter((id) => id !== member.id)
                            );
                          }
                        }}
                      />
                      <Label
                        labelText={member.name}
                        htmlFor={`member-${member.id}`}
                      />
                    </div>
                  ))}
                </div>
              )}
              <Button onClick={updateFileVisibility}>
                <CheckCircle className="mr-2 h-4 w-4" /> Update File Visibility
              </Button>
              <div>
                <h4 className="font-semibold mb-2">File Preview:</h4>
                <pre className="bg-muted p-2 rounded-md overflow-x-auto">
                  {selectedFile.content.slice(0, 200)}...
                </pre>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Accessible to:</h4>
                <div className="flex flex-wrap gap-2">
                  {getAccessibleMembers(selectedFile).map((member) => (
                    <div key={member.id} variant="secondary">
                      {member.name}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Uploaded Files</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {files.map((file) => (
            <Card
              key={file.id}
              className="cursor-pointer"
              onClick={() => setSelectedFile(file)}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="truncate">{file.name}</span>
                  {file.visibility === "private" && (
                    <Lock className="h-4 w-4" />
                  )}
                  {file.visibility === "public" && (
                    <Globe className="h-4 w-4" />
                  )}
                  {file.visibility === "team" && <Users className="h-4 w-4" />}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm text-muted-foreground">
                    {file.content.length} characters
                  </span>
                </div>
                <div className="mt-2">
                  <span className="text-sm font-semibold">Shared with:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {getAccessibleMembers(file).map((member) => (
                      <div key={member.id} variant="outline">
                        {member.name}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
