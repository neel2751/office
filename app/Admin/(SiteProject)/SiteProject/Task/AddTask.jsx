import React, { memo, useMemo } from "react";
import Model from "./Model";
import { TASKFIELD } from "@/allFormField/field";
import { useTaskAssignContext } from "@/context/taskContext";
import { ReactHookForm } from "@/components/ModelForm/FormModel";
import { Label, TextFormInput } from "@/components/fromInput/FormInput";
import { Searchbox } from "@/components/SearchBox";
import { LoaderPinwheel, Minus, Plus, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComboboxDemo } from "@/components/ComboBox";

const AddTask = memo(() => {
  const {
    tasks,
    isOpen,
    setIsOpen,
    initialValues,
    addTask,
    setResetFlag,
    category,
    setCategory,
    categories,
    isAdd,
    setIsAdd,
    newCategory,
    setNewCategory,
    assignees,
    setAssignees,
    employeess,
    addCategory,
    isLoading,
  } = useTaskAssignContext();
  return (
    <>
      <Model isOpen={isOpen} setIsOpen={setIsOpen} cls={"max-w-xl relative"}>
        {isLoading && (
          <div className="h-full flex items-center w-full z-20 justify-center absolute">
            <LoaderPinwheel className="animate-spin size-10" />
          </div>
        )}
        <div
          className={`space-y-4 px-4 ${
            isLoading && "pointer-events-none blur-sm"
          }`}
        >
          <div className="px-2 sm:px-4 sm:pt-2 flex items-center gap-3">
            <img className="h-10 w-10" src="/images/Logo.svg" />
            <span className="text-gray-800 font-semibold sm:text-lg text-sm">
              {tasks[1]?.siteId?.siteName || "Creative Design & Construction"}
            </span>
          </div>
          <ReactHookForm
            fields={TASKFIELD}
            initialValues={initialValues}
            onSubmit={addTask}
            setResetFlag={setResetFlag}
            btnName={"Add Task"}
          >
            <div className="space-y-2 mt-4">
              <Label labelText="Category" />
              <div className="flex items-center gap-2">
                <Searchbox
                  value={category}
                  onChange={setCategory}
                  frameworks={categories}
                  placeholder={"Select category..."}
                  noData={"No categories"}
                />
                <button
                  type="button"
                  onClick={() => setIsAdd(!isAdd)}
                  className="border-gray-200 border bg-white p-2 rounded-md hover:bg-gray-50 text-neutral-800 transition duration-300 cursor-pointer shadow-sm"
                >
                  {isAdd ? (
                    <Minus className="size-4 stroke-2" />
                  ) : (
                    <div className="flex gap-1 items-center">
                      <Plus className="size-4 stroke-2" />
                      <span className="text-sm text-neutral-700 font-medium">
                        Add
                      </span>
                    </div>
                  )}
                </button>
              </div>
              {isAdd && (
                <div className="absloute max-w-80">
                  <div className="flex items-center gap-2 ">
                    <TextFormInput
                      placeholder="New Category"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <Button type="button" onClick={addCategory}>
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Category
                    </Button>
                  </div>
                </div>
              )}
              <Label labelText={"Assignees"} />
              <ComboboxDemo
                value={assignees}
                onChange={setAssignees}
                frameworks={employeess}
                placeholder={"Select Employee"}
              />
            </div>
          </ReactHookForm>
        </div>
      </Model>
    </>
  );
});

export default AddTask;
