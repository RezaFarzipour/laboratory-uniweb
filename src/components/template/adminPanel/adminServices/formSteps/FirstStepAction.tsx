"use client";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Button } from "@heroui/button";
import { IoTrashBinOutline } from "react-icons/io5";
import {
  CreateServiceFormData,
  createServiceSchema,
} from "@/schemas/createServiceSchema";
import ServiceDetailsForm from "@/components/module/controller/ServiceDetailsForm";
import { showToast } from "@/store/useToastSlice";
import FileInput from "@/components/element/FileInput";
import { imageUrlToFile } from "@/utils/formatter/fileFormatter";
import { serviceDataEditType } from "@/types";
import { BtnLoader } from "@/components/element/Loader";
import PrimaryButton from "@/components/element/Button";
import { useCreateService } from "../hooks/useCreateService";
import { useEditService } from "../hooks/useEditService";

interface ServicesActionProps {
  serviceDataEdit?: Partial<serviceDataEditType>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setCreatedServiceId?: (id: string) => void; // اضافه شده برای پاس دادن id به استپ دوم
}

const FirstStepAction: React.FC<ServicesActionProps> = ({
  serviceDataEdit = {},
  setStep,
  setCreatedServiceId,
}) => {
  const { id: editId } = serviceDataEdit;
  const isEditSession = Boolean(editId);

  const {
    service_name,
    description,
    price,
    cover_image: prevCoverImageUrl,
  } = serviceDataEdit;

  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(
    prevCoverImageUrl || null
  );

  const { createService, isCreating } = useCreateService();
  const { editService, isEditing } = useEditService();

  const parsedPrice =
    price !== undefined
      ? typeof price === "string"
        ? Number.isNaN(parseInt(price))
          ? undefined
          : parseInt(price)
        : price
      : undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<CreateServiceFormData>({
    mode: "onTouched",
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      service_name: service_name || "",
      description: description || "",
      price: parsedPrice,
      cover_image: null,
    },
  });

  useEffect(() => {
    if (prevCoverImageUrl && isEditSession) {
      async function fetchImage() {
        const file = await imageUrlToFile(prevCoverImageUrl);
        setValue("cover_image", file);
        setCoverImageUrl(URL.createObjectURL(file));
      }
      fetchImage();
    }
  }, [editId, prevCoverImageUrl, isEditSession, setValue]);

  const onSubmit = async (data: CreateServiceFormData) => {
    const formData = new FormData();
    formData.append("service_name", data.service_name);
    formData.append("description", data.description);
    formData.append("price", String(data.price));
    if (data.cover_image) {
      formData.append("cover_image", data.cover_image);
    }

    if (isEditSession && editId) {
      editService(
        { id: String(editId), data: formData },
        {
          onSuccess: () => {
            showToast("سرویس با موفقیت ویرایش شد", "success");
            setStep(2);
            reset();
          },
          onError: () => {
            showToast("ویرایش سرویس با خطا مواجه شد", "error");
          },
        }
      );
    } else {
      createService(formData, {
        onSuccess: (response: any) => {
          showToast("سرویس با موفقیت ساخته شد", "success");
          const newServiceId = response?.id;
          if (newServiceId) {
            setCreatedServiceId?.(newServiceId); // آیدی رو برای استپ دوم ذخیره میکنیم
            setStep(2); // میریم مرحله بعد
          } else {
            showToast("خطا در دریافت اطلاعات سرویس", "error");
          }
        },
        onError: () => {
          showToast("ساخت سرویس با خطا مواجه شد", "error");
        },
      });
    }
  };

  return (
    <div className=" flex items-center justify-center p-8 text-default-700">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-8 bg-white p-4 rounded-xl w-full max-w-lg"
      >
        <ServiceDetailsForm register={register} errors={errors} />

        <Controller
          name="cover_image"
          control={control}
          render={({ field: { value, onChange, ...rest } }) => (
            <FileInput
              multiple={false}
              label="انتخاب کاور محصول"
              errors={errors}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const file = event.target.files?.[0];
                if (file) {
                  onChange(file);
                  setCoverImageUrl(URL.createObjectURL(file));
                }
              }}
              {...rest}
            />
          )}
        />

        {coverImageUrl && (
          <div className="relative aspect-[2/1] overflow-hidden rounded-md">
            <Image
              fill
              alt="cover-image"
              src={coverImageUrl}
              className="object-cover object-center"
            />
            <Button
              type="button"
              onPress={() => {
                setCoverImageUrl(null);
                setValue("cover_image", null);
              }}
              isIconOnly
              className="w-8 h-8 absolute left-1 top-2 bg-red-100"
            >
              <IoTrashBinOutline size={20} color="red" />
            </Button>
          </div>
        )}

        <PrimaryButton type="submit" disabled={isCreating || isEditing}>
          {isCreating || isEditing ? <BtnLoader /> : "تایید"}
        </PrimaryButton>
      </form>
    </div>
  );
};

export default FirstStepAction;
