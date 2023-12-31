import Banner from "@/components/ui/Banner";
import LatestNews from "@/components/ui/LatestNews";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blog",
  description: "Generated by Masud Rana",
};
const BlogPage = () => {
  const options = [
    {
      label: "Home",
      link: "/",
      active: "home"
    },
    {
      label: "Blog",
      link: "",
      active: ""
    },
  ];
  return (
    <>
      <Banner menu={options} title="Blog Page" />
      <LatestNews />
    </>
  );
};

export default BlogPage;
