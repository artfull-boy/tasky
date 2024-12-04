import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../../components/ui/card";
import {
  CircleDashed,
  Scroll,
  CheckCheck,
  ArrowBigUp,
  LoaderCircle,
} from "lucide-react";
import { DataTable } from "./data-table";
import { columns } from "./columns";


async function getData() {
  const tasksResponse = await fetch("http://localhost:8001/api/tasks");
  const projectsResponse = await fetch("http://localhost:8000/api/projects");

  if (!tasksResponse.ok || !projectsResponse.ok) {
    throw new Error("Failed to fetch data from APIs");
  }

  const tasksData = await tasksResponse.json();
  const projectsData = await projectsResponse.json();

  // Map project IDs to names for quick lookup
  const projectMap = {};
  projectsData.data.forEach((project) => {
    projectMap[project.id] = project.name;
  });

  // Combine tasks with project names and limit to 5 tasks
  const combinedData = tasksData.data.slice(0, 5).map((task) => ({
    id: task.id,
    task_name: task.name,
    project_name: projectMap[task.project_id] || "Unknown Project",
    status: task.status,
    priority: task.priority,
    due_date: task.due_date,
  }));
  console.log(tasksData)
  return combinedData;
}


export default async function page() {
    const data = await getData()

  return (
    <div className="flex flex-col gap-9 mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8 py-[40px]">
      <p className="text-[30px] font-semibold">Welcome Ilias</p>
      <div className="flex gap-x-[16px] items-center w-full">
        <Card className="flex-1 flex flex-col gap-[12px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm`}>Total Tasks</CardTitle>
            <Scroll className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex flex-col gap-[4px]">
            <div className="text-2xl font-bold leading-[24px] tracking-[-0.36px]">
              256
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1 flex flex-col gap-[12px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm`}>Pending Tasks</CardTitle>
            <CircleDashed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex flex-col gap-[4px]">
            <div className="text-2xl font-bold leading-[24px] tracking-[-0.36px]">
              415
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1 flex flex-col gap-[12px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm`}>In Progress Tasks</CardTitle>
            <LoaderCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex flex-col gap-[4px]">
            <div className="text-2xl font-bold leading-[24px] tracking-[-0.36px]">
              20
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1 flex flex-col gap-[12px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm`}>Completed Tasks</CardTitle>
            <CheckCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex flex-col gap-[4px]">
            <div className="text-2xl font-bold leading-[24px] tracking-[-0.36px]">
              415
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col w-full gap-[12px]">
      <p className="text-sm font-semibold">My Assigned Tasks</p>
      <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
