import dynamic from "next/dynamic";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blog post",
  description: "Generated by Masud Rana",
};
const BlogPostPage = () => {
  const BlogPostForm = dynamic(
    () => import("@/components/dashboard/forms/BlogPostForm"),
    {
      ssr: false,
    }
  );

  return <BlogPostForm />;
};

export default BlogPostPage;
