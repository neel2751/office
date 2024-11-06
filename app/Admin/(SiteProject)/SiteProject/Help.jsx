import Search from "@/components/Search/search";
import { Button } from "@/components/ui/button";
import { CardContent, CardTitle } from "@/components/ui/card";
import {
  ChevronLast,
  CircleUser,
  EarthLock,
  Headphones,
  MoveLeft,
  Package2,
  PanelRight,
  PanelTopDashed,
  Plus,
  TentTree,
  Trash,
  Workflow,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Help = () => {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      <div className="py-2 pl-2 space-y-1">
        <h1 className="text-neutral-900 font-medium text-2xl">
          General Tutorials
        </h1>
        <p className="text-neutral-500 text-sm">
          Browse through our tutorials to learn more about our platform and our
          wide range of general tutorials across a wide range of topic on video.
        </p>
      </div>
      <div className="grid-cols-3 grid gap-4">
        <MainHelpCard
          bg={"cyan"}
          name={"dashboard"}
          title={"Get  started with your dashboard"}
          icon={<PanelTopDashed className="size-4 text-blue-600" />}
          img={"/images/Dashboard.png"}
        />
        <MainHelpCard
          bg={"amber"}
          name={"Media storage"}
          title={"Store and manage your media files"}
          icon={<Package2 className="size-4 text-blue-600" />}
        />
        <MainHelpCard
          bg={"green"}
          name={"integration"}
          title={"Integrate with other services"}
          icon={<Workflow className="size-4 text-blue-600" />}
        />
        <MainHelpCard
          bg={"rose"}
          name={"account"}
          title={"Manage your account"}
          icon={<CircleUser className="size-4 text-blue-600" />}
        />
        <MainHelpCard
          bg={"purple"}
          name={"site management"}
          title={"Manage with your project site"}
          icon={<TentTree className="size-4 text-blue-600" />}
        />
        <MainHelpCard
          bg={"teal"}
          name={"security"}
          title={"Manage your project security"}
          icon={<EarthLock className="size-4 text-blue-600" />}
        />
      </div>
      <div className="mt-4 flex justify-center items-center">
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          <PanelRight className="size-4 me-2 text-neutral-700" />
          <span className="text-neutral-700 text-sm tracking-tight">
            More Tutorials
          </span>
        </Button>
      </div>
      <div className="mt-8 ms-1 flex items-center gap-2 ">
        <p className="text-sm tracking-tight text-neutral-600 ">
          Can't find what you need?
        </p>
        <Button
          variant="outline"
          className="text-neutral-700 text-xs font-medium"
        >
          <Headphones className="size-4 text-blue-600 me-1.5" />
          Ask Our Support Assistant
        </Button>
      </div>
      <div
        className={`fixed w-full sm:max-w-sm shadow-2xl overflow-scroll py-2 duration-300 transition-all bg-[#FCFCFC] border flex-col z-[80] end-0 right-4 px-2 rounded-xl bottom-4 top-4 ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        <div className="p-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-600">Help</h2>
          <XCircle
            onClick={() => setIsOpen(false)}
            className="size-5 text-gray-600 cursor-pointer hover:text-gray-900"
          />
        </div>
        {open ? (
          <OpenDetails isOpen={open} setOpen={setOpen} />
        ) : (
          <div>
            {/* <CardHeader>
          <CardTitle>How to use this app</CardTitle>
          <CardDescription>
            This app is designed to help you manage your tasks and projects.
          </CardDescription>
        </CardHeader> */}
            <div className="p-4">
              <Search className="w-full" placeholder=" Search for help" />
            </div>
            <div className="space-y-4 p-4 flex flex-col items-center justify-center">
              <CardHelp
                title={"Getting Started"}
                description={"Manage Employee, Attendance, Site Projects, ..."}
                src={
                  "https://notioly.com/wp-content/uploads/2023/03/215.-File.png"
                }
                onClick={() => router.push("/")}
              />
              <CardHelp
                title={"Site Assign"}
                description={"Assign Site to Employee , Employee to Site, ..."}
                src={
                  "https://notioly.com/wp-content/uploads/2024/08/429.Leafleting.png"
                }
                onClick={() => router.push("/Admin/SiteAssign")}
              />
              <CardHelp
                title={"Site Overview"}
                description={" View Site Overview, Employee Overview, ..."}
                src={
                  "https://notioly.com/wp-content/uploads/2024/07/417.Touch-Screen.png"
                }
                onClick={() => router.push("/Admin/SiteProject")}
              />
              <CardHelp
                title={"Site Report"}
                description={
                  " View Site Report, Employee Report, Expense Report ..."
                }
                src={
                  "https://notioly.com/wp-content/uploads/2024/03/364.Projecting.png"
                }
                onClick={() => setOpen(true)}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Help;

const CardHelp = ({ title, description, src, onClick }) => {
  return (
    <>
      <div
        onClick={onClick}
        className="bg-white rounded-xl shadow-sm border border-gray-900/10 p-3 w-full cursor-pointer group hover:ring-1 hover:ring-cyan-600"
      >
        <div className="flex gap-4">
          <Image
            src={src ?? "/images/placeholder.svg"}
            alt=" placeholder"
            width={100}
            height={100}
            className="rounded-md border border-gray-100 group-hover:scale-110 overflow-clip  transform-gpu transition-all duration-700 aspect-square"
          />
          <div className=" max-w-max flex flex-col justify-around">
            <p className="text-sm text-gray-600 tracking-tight group-hover:text-cyan-800">
              <strong>{title ?? "Title"}</strong>
            </p>
            <p className="text-xs text-neutral-500 group-hover:text-neutral-800">
              {description ?? "placeholder"}
            </p>
            <ChevronLast className="size-4 text-gray-500 group-hover:text-neutral-700" />
          </div>
        </div>
      </div>
    </>
  );
};

const OpenDetails = ({ setOpen }) => {
  return (
    <div className="p-3">
      <div className="flex items-center gap-4 p-4 rounded-md bg-white shadow border border-gray-100">
        <div onClick={() => setOpen(false)}>
          <MoveLeft className="size-5 text-gray-500" />
        </div>
        <CardTitle onClick={() => setOpen(false)} className="text-neutral-600">
          Task Details
        </CardTitle>
      </div>
      <div className="space-y-4 mt-6 px-4">
        <ul className="space-y-4 text-base tracking-tight text-gray-600 list-decimal">
          <li>
            <div className="flex gap-x-1 items-center">
              Click on the
              <span>
                <Plus className="size-4 text-blue-600" />
              </span>
              button to add a new task
            </div>
          </li>
          <li>
            <div className="flex gap-x-1 items-center">
              Click on the
              <span>
                <Trash className="size-4 text-rose-600" />
              </span>
              button to delete a task
            </div>
          </li>
          <li>
            <div className="flex">
              <p>
                Click on the{"  "}
                <Button className="text-xs p-1.5" variant={"outline"}>
                  view
                </Button>{" "}
                button to view the task details to scroll through the task
              </p>
            </div>
          </li>
          <li>
            <p>
              After clicking on the view button, you can scroll through the task
              details and under the subtask you can click on the{" "}
              <Button className="text-xs p-1.5">Add Subtask</Button> button to
              add new the subtask
            </p>
          </li>
          <li>
            Everytime you change the task status, it will be saved in the log
            section you can view it there
          </li>
          <li>
            In Subtask after clicking on Checkmark button it will be marked as
            completed and after you can not chnage the status of this subtask
          </li>
        </ul>
      </div>
      <div className="absolute bottom-4 w-full pr-10">
        <div
          onClick={() => {}}
          className="bg-white rounded-xl shadow-sm border border-gray-900/10 p-3 w-full cursor-pointer group hover:ring-1 hover:ring-cyan-600"
        >
          <div className="flex gap-4">
            <Image
              src={
                "https://notioly.com/wp-content/uploads/2024/07/423.Making-Work.png"
              }
              alt=" placeholder"
              width={60}
              height={40}
              className="rounded-md border border-gray-100 group-hover:scale-110 overflow-clip  transform-gpu transition-all duration-700 aspect-square"
            />
            <div className=" max-w-max flex flex-col justify-evenly">
              <p className="text-sm text-gray-600 tracking-tight group-hover:text-cyan-800">
                <strong>Still have questions?</strong>
              </p>
              <p className="text-xs text-neutral-500 group-hover:text-neutral-800">
                Contact us at{" "}
                <a
                  href="mailto:neel@cdc.construction"
                  className="text-cyan-600"
                >
                  support@cdc.construction
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MainHelpCard = ({ bg, name, icon, title, img }) => {
  return (
    <div className="w-full rounded-xl border border-neutral-300 p-3 space-y-3 bg-white">
      <div className={`bg-${bg}-600 px-8 pt-5 rounded-lg`}>
        <Image
          className="w-full rounded-t-lg object-cover"
          src={img ?? "/images/img6.jpg"}
          alt="placeholder"
          width={308}
          height={112}
        />
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-700 tracking-tight">
          {title ?? "  Get started with dashboard"}
        </h2>
        <p className="text-sm text-gray-500 mt-1 tracking-tight">
          Learn how to use the dashboard and get the most out of it and discover
          new features and tools.
        </p>
      </div>
      <div className="flex gap-2 items-center">
        {icon ?? <PanelTopDashed className="size-4 text-blue-600" />}
        <span className="text-xs text-neutral-500 uppercase">{name}</span>
      </div>
    </div>
  );
};
