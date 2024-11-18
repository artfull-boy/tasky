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

async function getData(){
    // Fetch data from your API here.
    return [
        {
          "id": 1,
          "project_name": "Website Redesign",
          "task_name":"Frontend",
          "status": "in_progress",
          "priority": "High",
          "created_date": "2024-10-01",
          "due_date": "2024-12-31",
        },
        {
            "id": 1,
            "project_name": "Website Redesign",
            "task_name":"Frontend",
            "status": "in_progress",
            "priority": "High",
            "created_date": "2024-10-01",
            "due_date": "2024-12-31",
          },
          {
            "id": 1,
            "project_name": "Website Redesign",
            "task_name":"Frontend",
            "status": "pending",
            "priority": "High",
            "created_date": "2024-10-01",
            "due_date": "2024-12-31",
          },
          {
            "id": 1,
            "project_name": "Website Redesign",
            "task_name":"Frontend",
            "status": "completed",
            "priority": "High",
            "created_date": "2024-10-01",
            "due_date": "2024-12-31",
          },
          {
            "id": 1,
            "project_name": "Website Redesign",
            "task_name":"Frontend",
            "status": "pending",
            "priority": "High",
            "created_date": "2024-10-01",
            "due_date": "2024-12-31",
          },

      ]
      
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
