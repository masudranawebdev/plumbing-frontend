import DashboardUsers from "@/components/dashboard/ui/DashBoardUsers";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard-users",
  description: "Generated by Masud Rana",
};
const UsersPage = () => {
  return <DashboardUsers />;
};

export default UsersPage;
