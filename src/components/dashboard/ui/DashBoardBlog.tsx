"use client";
import Loading from "@/components/common/Loading";
import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { TrashIcon } from "@heroicons/react/20/solid";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";
import { useBlogsQuery, useDeleteBlogMutation } from "@/redux/api/blogApi";
import BreadCrumbs from "@/components/common/BreadCrumbs";

const items = [
  {
    label: "Dashboard",
    link: "/dashboard",
  },
  {
    label: "Blog",
    link: "",
  },
];

const DashBoardBlog = () => {
  const arg: any = {};
  const { data, isLoading } = useBlogsQuery({ ...arg });
  const [deleteBlog] = useDeleteBlogMutation();

  //this function for deleted
  const handleDelete = (id: string) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const res = deleteBlog(id);
          if (res.arg.track) {
            swalWithBootstrapButtons.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            );
          } else {
            swalWithBootstrapButtons.fire(
              "Not Deleted!",
              "Something is wrong!!!",
              "error"
            );
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="p-5">
      <BreadCrumbs items={items} />
      <div className="flex justify-between border-b-2 border-slate-300 pb-3">
        <h1 className="text-3xl font-bold">Blog List</h1>
        <Link
          href="/dashboard/blog/post"
          className="btn btn-sm btn-accent text-slate-50"
        >
          Blog Post
        </Link>
      </div>
      <div className="overflow-x-auto mt-5 rounded">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="text-left">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Thumbnail
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Title
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Publish Date
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Author
              </th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data?.blogs?.map((blog: any) => (
              <tr key={blog?.id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  <div className="avatar">
                    <div className="w-8 rounded">
                      <Image
                        alt={blog?.title}
                        src={blog?.thumbnail}
                        width={32}
                        height={32}
                      />
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {blog?.title}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {format(parseISO(blog?.createdAt), "PP")}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {blog?.author?.fullName}
                </td>
                <td className="whitespace-nowrap px-4 py-2 space-x-1 flex justify-center">
                  <Link
                    className="btn btn-sm btn-accent text-slate-50"
                    href={`/dashboard/blog/edit/${blog?.id}`}
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(blog?.id)}
                    className="btn btn-sm btn-error text-slate-50"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashBoardBlog;
