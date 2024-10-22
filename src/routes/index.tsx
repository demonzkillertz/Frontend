import DashboardLayout from "@/components/Layout/DashboardLayout";
import SettingLayout from "@/components/Layout/SettingLayout";
import TaskGroups from "@/pages/TaskGroup";
import TaskTemplate from "@/pages/TaskTemplate";
import CreateTaskTemplate from "@/pages/TaskTemplate/new";
import CreateUser from "@/pages/User/new";
import Worklog from "@/pages/Worklog";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Perimssion from "../pages/Permission";
import Project from "../pages/Project";
import Role from "../pages/Role";
import Task from "../pages/Task";
import User from "../pages/User";
import PrivateRoute from "./PrivateRoute";
import CreateProject from "@/pages/Project/new";
import EditProject from "@/pages/Project/edit";
import EditTaskTemplate from "@/pages/TaskTemplate/edit";
import EditTaskGroup from "@/pages/TaskGroup/edit";
import CreateTaskGroup from "@/pages/TaskGroup/new";

const Router = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <DashboardLayout>
        <PrivateRoute />
      </DashboardLayout>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/role",
        element: <Role />,
      },
      {
        path: "/permission",
        element: <Perimssion />,
      },
      {
        path: "/project",
        element: <Project />,
      },
      {
        path: "/project/new",
        element: <CreateProject />,
      },
      {
        path: "/project/edit/:id",
        element: <EditProject />,
      },
      {
        path: "/task",
        element: <Task />,
      },
      {
        path: "/task-group",
        element: <TaskGroups />,
      },
      {
        path: "/task-group/new",
        element: <CreateTaskGroup />,
      },
      {
        path: "/task-group/edit/:id",
        element: <EditTaskGroup />,
      },
      {
        path: "/worklog",
        element: <Worklog />,
      },
      {
        path: "/tasktemplate",
        element: <TaskTemplate />,
      },
      {
        path: "/task-template/new",
        element: <CreateTaskTemplate />,
      },
      {
        path: "/task-template/edit/:id",
        element: <EditTaskTemplate />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/user/new",
        element: <CreateUser />,
      },
      {
        path: "/user/edit/:id",
        element: <>Edit</>,
      },
      {
        path: "/settings",
        element: <>setting</>,
      },
    ],
  },
  {
    path: "/settings",
    element: (
      <SettingLayout>
        <PrivateRoute />
      </SettingLayout>
    ),
    children: [
      {
        path: "",
        element: <>setting</>,
      },
    ],
  },
];

export default Router;
