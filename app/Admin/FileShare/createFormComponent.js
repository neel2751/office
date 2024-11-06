import React, { memo, useState } from "react";
import { ReactHookForm } from "@/components/ModelForm/FormModel";
import { ComboboxDemo } from "@/components/ComboBox";
import { Searchbox } from "@/components/SearchBox";
import { toast } from "react-toastify";
import { useWorkspaceAndTeamContext } from "./Context/workspaceTeamContext";
import WorkspaceAndTeamComponent from "./WorkspaceAndTeamComponent";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const CreateFormComponent = memo(({ config, submitForm }) => {
  const [initialValues, setInitialValues] = useState(null);
  const [resetFlag, setResetFlag] = useState(false);

  const {
    selectedMembers,
    setSelectedMembers,
    teamMembers,
    selectedTeam,
    setSelectedTeam,
    teams,
    session,
    teamsData,
    workspace,
  } = useWorkspaceAndTeamContext();

  const onSubmit = async (formData) => {
    const formPayload = {
      name: formData[config.nameField].trim(),
      description: formData[config.descriptionField],
      [config.selectedKey]:
        config.selectedKey === "members" ? selectedMembers : selectedTeam,
    };

    if (!formPayload.name)
      return toast.warn(`Please enter ${config.nameLabel}`);
    if (config.selectedKey === "members" && selectedMembers.length === 0)
      return toast.warn(`Please select at least one member`);
    const response = await submitForm(formPayload);
    if (!response?.status) return toast.error(response?.message);
    toast.success(`${config.nameLabel} created successfully`);
  };

  return (
    <>
      <WorkspaceAndTeamComponent
        config={config}
        data={config.selectedLabel === "Members" ? teamsData : workspace}
        session={session}
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Plus className="size-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Enter {config.nameLabel} Details</DialogTitle>
              <DialogDescription>
                Please enter the details for the new {config.nameLabel}
              </DialogDescription>
            </DialogHeader>
            <ReactHookForm
              fields={config.fields}
              resetFlag={resetFlag}
              setResetFlag={setResetFlag}
              setInitialValues={setInitialValues}
              initialValues={initialValues}
              onSubmit={onSubmit}
              isLast={false}
            >
              <div className="mb-4 -mt-4">
                <label className="block text-[14px] text-neutral-700 font-medium">
                  {config.selectedLabel}
                </label>
                <div className="mt-0.5">
                  {config.useCombobox ? (
                    <ComboboxDemo
                      value={selectedMembers}
                      onChange={setSelectedMembers}
                      frameworks={teamMembers}
                      placeholder={" Select your member"}
                      noData={"No memebr`s found"}
                    />
                  ) : (
                    <Searchbox
                      value={selectedTeam}
                      onChange={setSelectedTeam}
                      frameworks={teams}
                      placeholder={" Select your Team"}
                      noData={"No team found"}
                    />
                  )}
                </div>
              </div>
            </ReactHookForm>
          </DialogContent>
        </Dialog>
      </WorkspaceAndTeamComponent>
    </>
  );
});

export default CreateFormComponent;
