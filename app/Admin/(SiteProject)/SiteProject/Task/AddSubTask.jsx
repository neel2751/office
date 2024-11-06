import { SUBTASKFIELD } from "@/allFormField/field";
import { ReactHookForm } from "@/components/ModelForm/FormModel";
import { useTaskAssignContext } from "@/context/taskContext";
import React, { memo } from "react";
import Model from "./Model";
import { Label } from "@/components/fromInput/FormInput";
import { ComboboxDemo } from "@/components/ComboBox";

const AddSubTask = memo(() => {
  const {
    tasks,
    initialValues,
    addSubTask,
    setResetFlag,
    selectedTask,
    assigneesSub,
    setAssigneesSub,
    isOpenSub,
    setIsOpenSub,
  } = useTaskAssignContext();
  return (
    <Model
      isOpen={isOpenSub}
      setIsOpen={setIsOpenSub}
      cls={`max-w-xl ${isOpenSub ? "overflow-visible h-auto" : ""}`}
    >
      <div className={`space-y-4 px-4`}>
        <div className="px-2 sm:px-4 sm:pt-2 flex items-center gap-3">
          <img className="h-10 w-10" src="/images/Logo.svg" />
          <span className="text-gray-800 font-semibold sm:text-lg text-sm">
            {tasks[1]?.siteId?.siteName || "Creative Design & Construction"}
          </span>
        </div>
        <div></div>
        <ReactHookForm
          fields={SUBTASKFIELD}
          initialValues={initialValues}
          onSubmit={addSubTask}
          setResetFlag={setResetFlag}
          btnName={"Add Subtask"}
        >
          <div className="space-y-2 mt-4">
            <Label labelText={"Assignees"} />
            <ComboboxDemo
              value={assigneesSub}
              onChange={setAssigneesSub}
              frameworks={selectedTask?.assignedTo}
              placeholder={"Select Employee"}
            />
          </div>
        </ReactHookForm>
      </div>
    </Model>
  );
});

export default AddSubTask;
