import { storeWorkspace } from "@/actions/CentralFileShare/centralFileShare";
import React, { memo } from "react";
import CreateFormComponent from "./createFormComponent";
const CreateWorkSpace = memo(() => {
  const workspaceConfig = {
    nameLabel: "Workspace",
    nameField: "workspaceName",
    descriptionField: "workspaceDescription",
    selectedKey: "team",
    selectedLabel: "Teams",
    fields: [
      {
        name: "workspaceName",
        labelText: "Workspace Name",
        type: "text",
        size: true,
        placeholder: "Enter Workspace Name",
        validationOptions: {
          required: "Workspace name is required",
          minLength: {
            value: 3,
            message: "Minimum length should be 3 characters",
          },
          pattern: {
            value: /^(?! )[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*(?<! )$/,
            message: "Invalid workspace name format",
          },
        },
      },
      {
        name: "workspaceDescription",
        labelText: "Workspace Description",
        type: "textarea",
        size: true,
        isLast: true,
        placeholder: "Enter Workspace Description",
      },
    ],
    useCombobox: false,
  };
  return (
    <CreateFormComponent config={workspaceConfig} submitForm={storeWorkspace} />
  );
});

export default CreateWorkSpace;
