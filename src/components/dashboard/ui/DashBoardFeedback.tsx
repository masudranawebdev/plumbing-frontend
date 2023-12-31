"use client";
import Loading from "@/components/common/Loading";
import { format, parseISO } from "date-fns";
import { TrashIcon } from "@heroicons/react/20/solid";
import { EyeIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";
import {
  useDeleteFeedbackMutation,
  useFeedbacksQuery,
} from "@/redux/api/feedbackApi";
import Link from "next/link";
import BreadCrumbs from "@/components/common/BreadCrumbs";
const items = [
  {
    label: "Dashboard",
    link: "/dashboard",
  },
  {
    label: "Feedback",
    link: "",
  },
];
const DashboardFeedback = () => {
  const arg: any = {};
  const { data, isLoading } = useFeedbacksQuery({ ...arg });
  const [deleteFeedback] = useDeleteFeedbackMutation();

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
          const res = deleteFeedback(id);
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
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
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
      <div className="border-b-2 border-slate-300 pb-2 mb-3">
        <h1 className="text-3xl font-medium">Feedback List</h1>
      </div>
      <div className="overflow-x-auto mt-5 rounded">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="text-left">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                User
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Service
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Publish Date
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Comments
              </th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data?.feedbacks?.map((feedback: any) => (
              <tr key={feedback?.id}>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {feedback?.user?.fullName}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {feedback?.service?.title}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {format(parseISO(feedback?.createdAt), "PP")}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-primary">
                  {feedback?.comments}
                </td>
                <td className="whitespace-nowrap px-4 py-2 space-x-1 flex justify-center">
                  <Link
                    className="btn btn-sm btn-accent text-slate-50"
                    href={`/dashboard/feedback/${feedback?.id}`}
                  >
                    <EyeIcon className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(feedback?.id)}
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

export default DashboardFeedback;
