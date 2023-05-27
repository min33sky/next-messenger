"use client";

import useConversation from "@/hooks/useConversation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { CldUploadButton } from "next-cloudinary";
import axios from "axios";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "@/app/conversations/[conversationId]/components/MessageInput";

export default function Form() {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });

    console.log("data: ", data, conversationId);

    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

  const handleUpload = (result: any) => {
    // TODO: 이미지 업로드
    console.log("이미지 업로드", result.info.secure_url);
    axios.post("/api/messages", {
      image: result.info.secure_url,
      conversationId,
    });
  };

  return (
    <div className="flex w-full items-center gap-2 border-t bg-white px-4 py-4 lg:gap-4 ">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="tmkt1ddt"
      >
        <HiPhoto size={30} className="text-sky-500" />
      </CldUploadButton>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full items-center gap-2 lg:gap-4"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />
        <button
          type="submit"
          className="cursor-pointer rounded-full bg-sky-500 p-2 transition hover:bg-sky-600"
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
}
