import { storeTeam } from "@/actions/CentralFileShare/centralFileShare";
import CreateFormComponent from "./createFormComponent";
import { memo } from "react";

const CreateTeam = memo(() => {
  const teamConfig = {
    nameLabel: "Team",
    nameField: "teamName",
    descriptionField: "teamDescription",
    selectedKey: "members",
    selectedLabel: "Members",
    fields: [
      {
        name: "teamName",
        labelText: "Team Name",
        type: "text",
        size: true,
        placeholder: "Enter Team Name",
        validationOptions: {
          required: "Team name is required",
          minLength: {
            value: 3,
            message: "Minimum length should be 3 characters",
          },
          pattern: {
            value: /^(?! )[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*(?<! )$/,
            message: "Invalid team name format",
          },
        },
      },
      {
        name: "teamDescription",
        labelText: "Team Description",
        type: "textarea",
        size: true,
        isLast: true,
        placeholder: "Enter Team Description",
      },
    ],
    useCombobox: true,
  };
  return <CreateFormComponent config={teamConfig} submitForm={storeTeam} />;
});

export default CreateTeam;
