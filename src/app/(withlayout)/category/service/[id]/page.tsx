import Banner from "@/components/ui/Banner";
import CategoryService from "@/components/ui/CategoryService";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Service",
  description: "Generated by Masud Rana",
};
const CategoryServicePage = ({ params }: { params: any }) => {
  const { id } = params;
  const options = [
    {
      label: "Home",
      link: "/",
      active: "home"
    },
    {
      label: "All Service",
      link: "/service",
      active: "service"
    },
    {
      label: "Category Service",
      link: "#",
      active: ""
    },
  ];
  return (
    <>
      <Banner menu={options} title="Category Service Page" />
      <CategoryService id={id} />
    </>
  );
};

export default CategoryServicePage;