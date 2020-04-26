/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import SearchResult from "views/SearchResult/SearchResult.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import schedulerView from "views/Canendal/Calendal.js";
import TodoListPage from "views/TodoList/TodoList";
import MyPage from "views/MyPage/MyPage.js";

// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";

const dashboardRoutes = [
  {
    path: "/dashboard/:idx",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/todoList/:idx",
    name: "Todo 리스트",
    icon: Dashboard,
    component: TodoListPage,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/referenceData/:idx",
    name: "참고자료",
    icon: "content_paste",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/notice/:idx",
    name: "공지사항",
    icon: "content_paste",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Typography",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin",
  },
  {
    path: "/myPage",
    name: "MyPage",
    icon: BubbleChart,
    component: MyPage,
    layout: "/admin",
  },
  {
    path: "/search/:search",
    name: "SearchResult",
    icon: LocationOn,
    component: SearchResult,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin",
  },
  {
    path: "/scheduler/:idx",
    name: "스케줄러",
    icon: Notifications,
    component: schedulerView,
    layout: "/admin",
  },
];

export default dashboardRoutes;
