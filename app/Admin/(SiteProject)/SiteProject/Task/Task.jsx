import * as React from "react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Label,
  Textarea,
  TextFormInput,
} from "@/components/fromInput/FormInput";
import { ComboboxDemo } from "@/components/ComboBox";
import { Searchbox } from "@/components/SearchBox";
import { ImagePlus, Minus, PictureInPicture, Plus } from "lucide-react";

const employees = [
  {
    value: "1",
    label: "James Collins",
  },
  {
    value: "2",
    label: "Amanda Harvey",
  },
  {
    value: "3",
    label: "Ols Schols",
  },
  { value: "4", label: "Bob Hills" },
  {
    value: "5",
    label: "Daniel Hobbs",
  },
  {
    value: "6",
    label: "Liza Harrison",
  },
  {
    value: "7",
    label: "Anna Richard",
  },
];

const category = [
  {
    value: "1",
    label: "Surveyor",
  },
  {
    value: "2",
    label: "Building",
  },
  {
    value: "3",
    label: "Architect",
  },
  {
    value: "4",
    label: "Carpenter",
  },
  {
    value: "5",
    label: "Inspector",
  },
  {
    value: "6",
    label: "Plumber",
  },
  {
    value: "7",
    label: "Bricklayer",
  },
  {
    value: "8",
    label: "Painter",
  },
  {
    value: "9",
    label: "Electrician",
  },
  {
    value: "10",
    label: "Estimator",
  },
  {
    value: "11",
    label: "Quantity Surveyor",
  },
  {
    value: "12",
    label: "Fire protection",
  },
  {
    value: "13",
    label: "Carpeting",
  },
  {
    value: "14",
    label: "Roofing",
  },
  {
    value: "15",
    label: "Plastering",
  },
  {
    value: "16",
    label: "Tiling",
  },
  {
    value: "17",
    label: "Safety Manager",
  },
];

function Component() {
  const [title, setTitle] = useState("");
  const [categoryText, setCategoryText] = useState("");
  const [categories, setCategories] = useState(category);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalHours, setTotalHours] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [status, setStatus] = useState("No status");
  const [isAdd, setIsAdd] = useState(false);
  const [assignees, setAssignees] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const submitCategory = () => {
    const newCategory = { value: categoryText, label: categoryText };
    setCategories([...categories, newCategory]);
    setIsAdd(!isAdd);
  };

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalHours(diffHours);
      setTotalDays(diffDays);
    }
  }, [startDate, endDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, startDate, endDate, totalHours, status, assignees });
  };

  return (
    <div className="p-4">
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>
            New Task {totalDays}
            {totalHours}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label labelText="Title" />
              <TextFormInput
                id="title"
                placeholder="Untitled"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <div>
                <Label labelText="Start Date" />
                <TextFormInput
                  id="start-date"
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <Label labelText="End Date" />
                <TextFormInput
                  id="end-date"
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label labelText="Status" />
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="No status">No status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="On hold">On hold 🤚</SelectItem>
                  <SelectItem value="Review">Review</SelectItem>
                  <SelectItem value="Completed">Completed 👏</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label labelText="Category" />
              <div className="flex items-center gap-2">
                <Searchbox
                  value={selectedCategory}
                  onChange={setSelectedCategory}
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
                      placeholder={"Add Category"}
                      value={categoryText}
                      onChange={(e) => setCategoryText(e.target.value)}
                    />
                    <Button
                      onClick={() => submitCategory()}
                      className="h-10 mb-2"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label labelText={"Assignees"} />
              <ComboboxDemo
                value={assignees}
                onChange={setAssignees}
                frameworks={employees}
                placeholder={"Select Employee"}
              />
            </div>
            <div className="space-y-2">
              <Label labelText={"Task"} />
              <Textarea
                rows={3}
                placeholder={"Tell us Little bit about the task..."}
              />
            </div>
            <div>
              <span className="text-neutral-700 text-sm font-medium">
                Add a photo or video
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                <label
                  htmlFor="file"
                  type="button"
                  className="text-neutral-400 border-neutral-400 border-dotted border-2 rounded-lg justify-center shrink-0 size-16 flex items-center group hover:border-cyan-800 hover:text-cyan-600 cursor-pointer"
                >
                  {/* input file */}
                  <input
                    name="file"
                    id="file"
                    type="file"
                    className="sr-only"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <ImagePlus className="size-5 shrink-0" />
                </label>

                <button
                  type="button"
                  className="text-neutral-400 border-neutral-400 border-dotted border-2 rounded-lg justify-center shrink-0 size-16 flex items-center"
                >
                  <PictureInPicture className="size-5 shrink-0" />
                </button>
              </div>

              <div className="mt-3">
                <p className="text-neutral-400 text-xs">
                  Employee find images and videos more helpful than text alone.
                </p>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Assign Task
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

const Task = ({ id }) => {
  return <ConstructionTaskManager siteId={id} />;
};

export default Task;
import { toast } from "react-toastify";
import {
  addCategoryAction,
  addSubTaskAction,
  addTaskAction,
  fetchCategoryAction,
  getAllTaskAction,
  getSiteCategory,
  getTaskChartAction,
  toggleSubtaskCompletionAction,
  updateChatAction,
  updateStatusAction,
  updateSubStatusAction,
} from "@/actions/tasksAction/taskAction";
import { FetchEmploye } from "@/lib/assign";
import { useSession } from "next-auth/react";
import TaskTabel from "./TaskTable";
import { TaskAssignContext } from "@/context/taskContext";
import AddTask from "./AddTask";
import SelectedTask from "./SelectedTask";
import { BarChartStatus, PieChartPriority, PieChartStatus } from "./TaskChart";
import AddSubTask from "./AddSubTask";
import {
  chnageDateToISOString,
  countDays,
} from "@/actions/commonAction/commonAction";

const taskStatuses = [
  "Not Started",
  "In Progress",
  "Review",
  "Completed",
  "On Hold",
];
const taskPriorities = ["Low", "Medium", "High"];

export const ConstructionTaskManager = React.memo(
  function ConstructionTaskManager({ siteId }) {
    const { data: session } = useSession(); // for user
    const { employeess } = FetchEmploye(); // all employee
    const [tasks, setTasks] = useState([]); // All Task
    const [chartData, setChartData] = useState(null); // Chart Data
    const [assignees, setAssignees] = useState([]); // Assignees
    const [isAdd, setIsAdd] = useState(false); // Add Category show and  hide
    const [category, setCategory] = useState(""); // Select one category
    const [categories, setCategories] = useState([]); //  All Category
    const [selectedTask, setSelectedTask] = useState(null); // Select one task
    const [chatMessage, setChatMessage] = useState(""); // Chat Message input type
    const [metions, setMentions] = useState([]); // Mention user
    const [initialValues, setInitialValues] = useState({}); // Initial Values
    const [newCategory, setNewCategory] = useState(""); // New Category input
    const [mentionOpen, setMentionOpen] = useState(false); //  Mention user show and hide
    const [mentionSearch, setMentionSearch] = useState(""); //   Mention user search
    const [resetFlag, setResetFlag] = useState(false); //  Reset Flag
    const [isTypingMention, setIsTypingMention] = useState(false); //  Typing Mention
    const [isOpen, setIsOpen] = useState(false); // Task From Open
    const [isOpenSub, setIsOpenSub] = useState(false); // Task From Open
    const [assigneesSub, setAssigneesSub] = useState([]); // Assignees
    const [isLoading, setIsLoading] = useState(false); // Loading
    const [siteCategory, setSiteCategory] = useState([]); // Site Category
    const [filter, setFilter] = useState({
      page: 1,
      limit: 10,
      search: "",
      category: "",
      status: "",
      priority: "",
      sort: "asc",
      totalCount: "",
    });
    const chatInputRef = React.useRef(null);

    const fetchCategories = async () => {
      try {
        const response = await fetchCategoryAction();
        setCategories(JSON.parse(response) || []); // Ensure it is an array
      } catch (error) {
        toast.error("Error fetching categories");
      }
    };

    const fetchTask = React.useCallback(async () => {
      try {
        const response = await getAllTaskAction(siteId, filter);
        setTasks(JSON.parse(response?.taskData));
        setFilter((prevFilter) => ({
          ...prevFilter,
          totalCount: response?.totalCount,
        }));
      } catch (error) {
        toast.error("Error fetching tasks");
      }
    }, [filter]);

    const fetchSiteCategory = React.useCallback(async () => {
      try {
        const response = await getSiteCategory(siteId);
        setSiteCategory(JSON.parse(response));
      } catch (error) {
        toast.error("Error fetching site category");
      }
    });

    const fetchChartData = React.useCallback(async () => {
      try {
        const response = await getTaskChartAction(siteId);
        setChartData(JSON.parse(response?.chartData));
      } catch (error) {
        toast.error("Error fetching chart data");
      }
    }, [selectedTask]);

    const addTask = async (formData) => {
      // setIsLoading(true);
      const now = new Date().toISOString();
      if (!category) return toast.error("Please  select a category");
      if (assignees.length === 0)
        return toast.error("Please select at least one assignee");
      const countDay = countDays(formData?.dueDate, formData?.startDate);
      if (countDay < 0)
        return toast.error("start date must be before due date");
      const task = {
        title: formData.title,
        description: formData.description,
        siteId: siteId,
        status: formData.status,
        startDate: formData.startDate,
        dueDate: formData.dueDate,
        priority: formData.priority,
        category: category,
        assignedTo: assignees,
        chat: [],
        log: [
          {
            timestamp: now,
            action: "Task created",
            userId: session?.user?._id,
            user: session?.user?.name,
            userType:
              session?.user?.role === "superAdmin"
                ? "OfficeEmploye"
                : "Employe",
          },
        ],
        images: [],
      };
      try {
        const response = await addTaskAction(task);
        if (response.status) {
          setTasks([...tasks, task]);
          setIsOpen(false);
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("Error creating task");
      } finally {
        setIsLoading(false);
      }
    };

    const addSubTask = async (formData) => {
      setIsLoading(true);
      const now = new Date().toISOString();

      // Check for assignees before proceeding
      if (assigneesSub.length === 0) {
        setIsLoading(false);
        return toast.error("Please select at least one assignee");
      }
      const countDay = countDays(formData?.endDate, formData?.startDate);
      if (countDay < 0)
        return toast.error("start date must be before end date");

      // Set progress based on task status
      let progress = 0;
      switch (formData.status) {
        case "Not Started":
          progress = 0;
          break;
        case "In Progress":
          progress = 30;
          break;
        case "Review":
          progress = 60;
          break;
        case "On Hold":
          progress = 90;
          break;
        case "Completed":
          progress = 100;
          break;
        default:
          progress = 0;
      }

      const task = {
        title: formData.title,
        status: formData.status,
        startDate: chnageDateToISOString(new Date(formData.startDate)),
        endDate: chnageDateToISOString(new Date(formData.endDate)),
        assignedTo: assigneesSub,
        progress,
      };

      const log = {
        timestamp: now,
        action: "Sub Task created",
        userId: session?.user?._id,
        user: session?.user?.name,
        userType:
          session?.user?.role === "superAdmin" ? "OfficeEmploye" : "Employe",
      };

      try {
        const response = await addSubTaskAction(task, log, selectedTask?._id);

        if (response.status) {
          const updatedTasks = JSON.parse(response?.data);

          // Create new references for `subtasks` and `log` to trigger re-render
          const updatedSelectedTask = {
            ...selectedTask,
            subtasks: [...updatedTasks.subtasks], // New reference for subtasks
            log: [...updatedTasks.log], // New reference for log
          };

          // Update the selected task state with the new reference
          setSelectedTask(updatedSelectedTask);

          // Update the `tasks` array by replacing the updated task
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task._id === selectedTask?._id
                ? {
                    ...task,
                    subtasks: [...updatedTasks.subtasks], // Ensure new reference
                    log: [...updatedTasks.log], // Ensure new reference
                  }
                : task
            )
          );

          // Close subtask form and show success message
          setIsOpenSub(false);
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("Error creating task");
      } finally {
        setIsLoading(false);
      }
    };

    const updateSubTaskStatus = async (status, subId, oldStatus, title) => {
      try {
        const userId = session?.user?._id;
        const userName = session?.user?.name;
        const userType =
          session?.user?.role === "superAdmin" ? "OfficeEmploye" : "Employe";
        const now = new Date().toISOString();
        let progress = 0;
        switch (status) {
          case "Not Started":
            progress = 0;
            break;
          case "In Progress":
            progress = 30;
            break;
          case "Review":
            progress = 60;
            break;
          case "On Hold":
            progress = 90;
            break;
          case "Completed":
            progress = 100;
            break;
        }
        const logUpdate = {
          timestamp: now,
          action: `Sub Task (${title}) status updated from ${oldStatus} to ${status}`,
          userId,
          user: userName,
          userType,
        };

        // Perform the update
        const updateStatus = await updateSubStatusAction(
          selectedTask?._id,
          subId,
          status,
          progress,
          logUpdate
        );
        if (updateStatus.status) {
          const update = JSON.parse(updateStatus?.data);

          // Update the tasks list
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task._id === selectedTask?._id
                ? {
                    ...task,
                    subtasks: task?.subtasks.map((sub) =>
                      sub._id === subId
                        ? {
                            ...sub,
                            status,
                            progress,
                            completed: status === "Completed" ? true : false,
                          }
                        : sub
                    ),
                    log: update.log,
                  }
                : task
            )
          );
          const updatedTask = {
            ...selectedTask,
            subtasks: selectedTask?.subtasks.map((sub) =>
              sub._id === subId
                ? {
                    ...sub,
                    status,
                    progress,
                    completed: status === "Completed" ? true : false,
                  }
                : sub
            ),
            log: update.log,
          };
          setSelectedTask(updatedTask);
          toast.success(updateStatus.message);
          fetchChartData();
        } else {
          toast.error(updateStatus.message);
        }
      } catch (error) {
        toast.error("Error updating task status");
      }
    };

    const updateTaskStatus = async (
      status,
      taskId = selectedTask?._id,
      oldStatus
    ) => {
      if (!taskId) {
        toast.error("No task selected for status update");
        return;
      }

      try {
        const userId = session?.user?._id;
        const userName = session?.user?.name;
        const userType =
          session?.user?.role === "superAdmin" ? "OfficeEmploye" : "Employe";
        const now = new Date().toISOString();

        const logUpdate = {
          timestamp: now,
          action: `Task status updated from ${
            oldStatus || selectedTask?.status
          } to ${status}`,
          userId,
          user: userName,
          userType,
        };

        // Perform the update
        const updateStatus = await updateStatusAction(
          taskId,
          status,
          logUpdate
        );
        const update = JSON.parse(updateStatus);

        // Update the tasks list
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId
              ? {
                  ...task,
                  status: update.status,
                  updatedAt: now,
                  log: update.log,
                }
              : task
          )
        );

        // Update the selected task if it's the one being updated
        if (taskId === selectedTask?._id) {
          const updatedTask = {
            ...selectedTask,
            status: update.status,
            updatedAt: now,
            log: update.log,
          };
          setSelectedTask(updatedTask);
        }

        toast.success("Task status updated successfully");
        fetchChartData();
      } catch (error) {
        toast.error("Error updating task status");
      }
    };

    const updateTaskPriority = (priority) => {
      if (selectedTask) {
        const now = new Date().toISOString();
        const updatedTask = {
          ...selectedTask,
          priority,
          updatedAt: now,
          log: [
            ...selectedTask.log,
            {
              timestamp: now,
              action: `Priority changed to ${priority}`,
              userId: session?.user?._id,
              user: session?.user?.name,
              userType:
                session?.user?.role === "superAdmin"
                  ? "OfficeEmploye"
                  : "Employe",
            },
          ],
        };
        setTasks(
          tasks.map((t) => (t.id === selectedTask.id ? updatedTask : t))
        );
        setSelectedTask(updatedTask);
      }
    };

    const addChatMessage = async () => {
      if (selectedTask && chatMessage) {
        const now = new Date().toISOString();
        // const mentions =
        //   chatMessage.match(/@(\w+)/g)?.map((m) => m.slice(1)) || [];
        const dbChat = {
          userId: session?.user?._id,
          user: session?.user?.name,
          userType:
            session?.user?.role === "superAdmin" ? "OfficeEmploye" : "Employe",
          message: chatMessage,
          timestamp: now,
          mentions: metions,
        };
        const response = await updateChatAction(selectedTask._id, dbChat);
        const newChat = JSON.parse(response);
        const updatedTask = {
          ...selectedTask,
          chat: newChat.chat,
          updatedAt: now,
        };

        setTasks(
          tasks.map((t) => (t.id === selectedTask.id ? updatedTask : t))
        );
        setSelectedTask(updatedTask);
        setChatMessage("");
      }
    };

    const addLogEntry = (action) => {
      if (selectedTask) {
        const now = new Date().toISOString();
        const updatedTask = {
          ...selectedTask,
          log: [
            ...selectedTask.log,
            {
              timestamp: now,
              action,
              userId: session?.user?._id,
              user: session?.user?.name,
              userType:
                session?.user?.role === "superAdmin"
                  ? "OfficeEmploye"
                  : "Employe",
            },
          ],
          updatedAt: now,
        };
        setTasks(
          tasks.map((t) => (t.id === selectedTask.id ? updatedTask : t))
        );
        setSelectedTask(updatedTask);
      }
    };

    const uploadImage = (event) => {
      const file = event.target.files?.[0];
      if (file && selectedTask) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const now = new Date().toISOString();
          const newImage = {
            url: reader.result,
            uploaderId: session?.user?._id,
            uploader: session?.user?.name,
            uploaderType:
              session?.user?.role === "superAdmin"
                ? "OfficeEmploye"
                : "Employe",
            uploadTime: now,
          };
          const updatedTask = {
            ...selectedTask,
            images: [...selectedTask.images, newImage],
            updatedAt: now,
            log: [
              ...selectedTask.log,
              {
                timestamp: now,
                action: `Image uploaded: ${file.name}`,
                userId: session?.user?._id,
                user: session?.user?.name,
                userType:
                  session?.user?.role === "superAdmin"
                    ? "OfficeEmploye"
                    : "Employe",
              },
            ],
          };
          setTasks(
            tasks.map((t) => (t.id === selectedTask.id ? updatedTask : t))
          );
          setSelectedTask(updatedTask);
        };
        reader.readAsDataURL(file);
      }
    };
    useEffect(() => {
      fetchTask();
    }, [
      filter.page,
      filter.limit,
      filter.search,
      filter.category,
      filter.status,
      filter.priority,
      filter.sort,
    ]);

    useEffect(() => {
      fetchCategories();
      // fetchTask();
      fetchSiteCategory();
      fetchChartData();
    }, []); // Only run on mount

    useEffect(() => {
      if (categories.length > 0) {
        setCategory(categories[categories.length - 1].value);
      }
    }, [categories]);

    const addCategory = async () => {
      if (!newCategory.trim()) return toast.warn("Please enter category name");

      const already = categories.filter(
        ({ label }) => label.toLowerCase() === newCategory.toLowerCase()
      );

      if (already.length > 0) return toast.warn("Category already exists");

      if (newCategory) {
        const response = await addCategoryAction(newCategory);

        if (response.status) {
          const updatedCategories = [...categories, JSON.parse(response?.data)]; // Add new category to state directly
          setCategories(updatedCategories);
          setNewCategory("");
          setIsAdd(false);
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      } else {
        toast.warn("Please enter category name");
      }
    };

    const handleMention = (employee) => {
      setMentions([employee]);
      const names = selectedTask?.assignedTo.map((item) => {
        if (item.value === employee) return item.label;
      });
      if (chatInputRef.current) {
        const cursorPosition = chatInputRef.current.selectionStart;
        const textBeforeCursor = chatMessage.slice(0, cursorPosition);
        const textAfterCursor = chatMessage.slice(cursorPosition);
        const lastAtSymbolIndex = textBeforeCursor.lastIndexOf("@");
        if (lastAtSymbolIndex !== -1) {
          const newText =
            textBeforeCursor.slice(0, lastAtSymbolIndex) +
            `@${names} ` +
            textAfterCursor;
          setChatMessage(newText);
          setMentionOpen(false);
          setMentions([]);
          chatInputRef.current.focus();
        }
      }
    };
    const toggleSubtaskCompletion = async (taskId, subtaskId) => {
      try {
        const response = await toggleSubtaskCompletionAction(taskId, subtaskId);
        if (response.status) {
          const updatedSubtasks = tasks.map((task) =>
            task?._id === taskId
              ? {
                  ...task,
                  subtasks: task.subtasks.map((subtask) =>
                    subtask?._id === subtaskId
                      ? {
                          ...subtask,
                          status: "Completed",
                          completed: !subtask.completed,
                          progress: 100,
                        }
                      : subtask
                  ),
                }
              : task
          );
          const updateSelectedTask = {
            ...selectedTask,
            subtasks: tasks
              .find((task) => task._id === taskId)
              .subtasks.map((subtask) =>
                subtask._id === subtaskId
                  ? {
                      ...subtask,
                      status: "Completed",
                      completed: !subtask.completed,
                      progress: 100,
                    }
                  : subtask
              ),
          };
          setSelectedTask(updateSelectedTask);
          setTasks(updatedSubtasks);
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      } catch (error) {}
    };

    const handleOpenImageModel = (url) => {
      console.log(url);
    };

    const handleInputChange = (e) => {
      const value = e.target.value;
      setChatMessage(value);

      const lastAtSymbolIndex = value.lastIndexOf("@");

      if (isTypingMention) {
        // If we're typing a mention and there is text after "@", continue showing popover
        const mentionText = value.slice(lastAtSymbolIndex + 1);
        setMentionSearch(mentionText);
        setMentionOpen(false); // Only show popover if there is text after "@"
      } else if (lastAtSymbolIndex !== -1) {
        // If the user starts typing "@" (and wasn't already typing a mention), start mention process
        setIsTypingMention(true);
        const mentionText = value.slice(lastAtSymbolIndex + 1);
        setMentionSearch(mentionText);
        setMentionOpen(true);
      } else {
        // For normal typing, don't open the popover
        setMentionOpen(false);
        setIsTypingMention(false); // Ensure we're not tracking mention typing anymore
      }
    };

    return (
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <PieChartStatus chartData={chartData} />
          <BarChartStatus chartData={chartData} />
          <PieChartPriority chartData={chartData} />
        </div>
        <TaskAssignContext.Provider
          value={{
            tasks,
            taskPriorities,
            taskStatuses,
            isOpen,
            category,
            categories,
            isAdd,
            newCategory,
            assignees,
            employeess,
            initialValues,
            selectedTask,
            mentionOpen,
            chatMessage,
            mentionSearch,
            isLoading,
            filter,
            siteCategory,
            isOpenSub,
            assigneesSub,
            updateSubTaskStatus,
            toggleSubtaskCompletion,
            addSubTask,
            setAssigneesSub,
            setIsOpenSub,
            setFilter,
            updateTaskPriority,
            updateTaskStatus,
            setSelectedTask,
            addTask,
            setIsOpen,
            setCategory,
            setIsAdd,
            setAssignees,
            addTask,
            setResetFlag,
            addCategory,
            setMentionOpen,
            handleInputChange,
            handleMention,
            addChatMessage,
            uploadImage,
          }}
        >
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"> */}
          <AddTask />
          {/* </div> */}
          <TaskTabel />
          {selectedTask && <SelectedTask />}
          <AddSubTask />
        </TaskAssignContext.Provider>
      </div>
    );
  }
);
