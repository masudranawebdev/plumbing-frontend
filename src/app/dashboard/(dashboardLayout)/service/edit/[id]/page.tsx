import ServiceEditForm from "@/components/dashboard/forms/ServiceEditForm";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Service-edit",
  description: "Generated by Masud Rana",
};
const ServiceEditPage = ({ params }: { params: any }) => {
  const { id } = params;
  return (
    <>
      <ServiceEditForm id={id} />
    </>
  );
};

export default ServiceEditPage;
