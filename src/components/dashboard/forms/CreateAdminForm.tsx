"use client";
import BreadCrumbs from "@/components/common/BreadCrumbs";
import LoadingButton from "@/components/common/LoadingButton";
import SmallSpinner from "@/components/common/SmallSpinner";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import SelectFormField, {
  SelectOptions,
} from "@/components/forms/SelectFormField";
import { useCreateAdminMutation } from "@/redux/api/adminApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const items = [
  {
    label: "Dashboard",
    link: "/dashboard",
  },
  {
    label: "Make Admin",
    link: "",
  },
];

const CreateAdminForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [createAdmin] = useCreateAdminMutation();
  const router = useRouter();
  const roles = [
    {
      label: "অ্যাডমিন",
      value: "admin",
    },
  ];

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      if (!image) {
        console.error("Please select an image.");
        return;
      }

      const formData = new FormData();
      formData.append("image", image);

      const url = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMBB_KEY}`;
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.data) {
          data.profileImg = responseData.data.display_url;
          //akhane api call hobe
          const res: any = await createAdmin(data);
          if (res.data as any) {
            router.push("/dashboard/users");
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Admin Created Successfully :)",
              showConfirmButton: false,
              timer: 1500,
            });
            setLoading(false);
          } else {
            toast.error("There was an error!");
            setLoading(false);
          }
        }
      } else {
        console.error("Image upload failed");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <BreadCrumbs items={items} />
      <h2 className="text-3xl font-medium leading-7 pb-2 my-3 border-b-2 border-slate-300">
        অ্যাডমিন তৈরী করুন
      </h2>
      <Form submitHandler={handleSubmit}>
        <div className="p-5 rounded bg-slate-50">
          <div className="">
            <p className="mt-1 text-sm leading-6 text-gray-600">
              আপনি অ্যাডমিন এর সকল তথ্য সঠিক ভাবে দিন ।
            </p>
            <div className="mt-5 border px-1 rounded py-2">
              <div className="col-span-2">
                <label htmlFor="image">প্রোফাইল ছবি</label>
                <div className="mt-2 flex lg:w-1/2 gap-5 items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <input
                    type="file"
                    accept="image/*"
                    id="image"
                    onChange={handleImageChange}
                    className="file-input file-input-bordered w-full"
                    required
                  />
                  {imagePreview && (
                    <div className="avatar">
                      <div className="w-24 rounded-xl">
                        <Image
                          width={100}
                          height={100}
                          alt="image"
                          src={imagePreview}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-5 border px-1 rounded py-2">
              <h2 className="text-base font-semibold leading-7 border-b border-slate-300">
                ব্যক্তিগত তথ্য
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <div className="mt-2">
                    <FormInput
                      type="text"
                      name="fullName"
                      placeholder="নাম লিখুন"
                      label="নাম"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <div className="mt-2">
                    <FormInput
                      name="email"
                      type="email"
                      label="ইমেইল"
                      placeholder="ইমেইল লিখুন"
                      className="block w-full rounded-md border-0 py-1.5 px-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="mt-2">
                    <FormInput
                      name="address"
                      label="ঠিকানা"
                      type="text"
                      placeholder="ঠিকানা লিখুন"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <div className="mt-2">
                    <FormInput
                      name="contactNo"
                      type="text"
                      label="নম্বর"
                      placeholder="নম্বর লিখুন"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <div className="mt-2">
                    <SelectFormField
                      name="role"
                      options={roles as SelectOptions[]}
                      placeholder="নির্বাচন করুন"
                      label="ভূমিকা"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <div className="mt-2">
                    <FormInput
                      name="password"
                      type="password"
                      placeholder="*****"
                      label="পাসওয়ার্ড"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-end gap-x-6">
            <LoadingButton type="submit">
              {loading ? <SmallSpinner /> : "তৈরী করুন"}
            </LoadingButton>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CreateAdminForm;
