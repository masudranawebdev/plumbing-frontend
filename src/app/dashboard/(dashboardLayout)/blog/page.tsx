import DashBoardBlog from "@/components/dashboard/ui/DashBoardBlog";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard-Blog",
  description: "Generated by Masud Rana",
};
const DashboardBlogPage = () => {
  return (
    <>
      <DashBoardBlog />
    </>
  );
};

export default DashboardBlogPage;
