import {
  CreateTasksPage,
  TaskListPage,
  AdminPage,
  AttendancePage,
  NotesPage,
  NotesListPage,
} from "../pages";
import { PATHS } from "./paths";

export const routesMap = [
  {
    id: "task-list",
    isProtected: true,
    path: PATHS.taskList,
    Element: TaskListPage,
  },
  {
    id: "create-tasks",
    isProtected: true,
    path: PATHS.createTasks,
    Element: CreateTasksPage,
  },
  {
    id: "admin-page",
    isProtected: true,
    path: PATHS.adminPage,
    Element: AdminPage,
  },
  {
    id: "create-notes",
    isProtected: true,
    path: PATHS.notes,
    Element: NotesPage,
  },
  {
    id: "notes-list",
    isProtected: true,
    path: PATHS.notesList,
    Element: NotesListPage,
  },
  {
    id: "notes-list",
    isProtected: true,
    path: PATHS.adminPage + PATHS.taskList,
    Element: TaskListPage,
  },
  {
    id: "attendance",
    isProtected: true,
    path: PATHS.attendance,
    Element: AttendancePage,
  },
];
