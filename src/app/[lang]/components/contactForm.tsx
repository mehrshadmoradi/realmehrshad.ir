"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import confetti from "canvas-confetti";
import { getDictionary } from "lib/dictionary";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { resetForm, updateForm } from "../../../redux/slices/formSlice";
import { FormState, FormTexts } from "../types/types";

const ContactForm = ({
  params,
  direction,
}: {
  params: { lang: "en" | "fa" };
  direction: string;
}) => {
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  const [formTexts, setFormTexts] = useState<FormTexts>({
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
    placeHolder: {
      fullName: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
    submit: {
      submit: "",
      sending: "",
    },
    messages: {
      success: "",
      error: "",
    },
    errors: {
      fullName: "",
      email: {
        required: "",
        invalidEmail: "",
      },
      phoneNumber: {
        required: "",
        invalidNumber: "",
      },
      message: {
        required: "",
        minLength: "",
      },
    },
  });

  const handleConfetti = () => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 9999,
    };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  useEffect(() => {
    const fetchDictionary = async () => {
      const dictionary = await getDictionary(params.lang);
      setFormTexts(dictionary.form);
    };

    fetchDictionary();
  }, [params.lang]);

  const validationSchema = yup.object().shape({
    fullName: yup.string().required(formTexts.errors.fullName),
    email: yup
      .string()
      .email(formTexts.errors.email.invalidEmail)
      .required(formTexts.errors.email.required),
    phoneNumber: yup
      .string()
      .required(formTexts.errors.phoneNumber.required)
      .matches(/^[0-9]{11,14}$/, formTexts.errors.phoneNumber.invalidNumber),
    message: yup
      .string()
      .required(formTexts.errors.message.required)
      .min(10, formTexts.errors.message.minLength),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormState>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormState) => {
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        dispatch(updateForm(data));
        toast.success(formTexts.messages.success);
        handleConfetti();
        reset();
        dispatch(resetForm());
      } else {
        toast.error(formTexts.messages.error);
      }
    } catch (error) {
      console.log(error);
      toast.error(formTexts.messages.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto space-y-4 p-4 border rounded-md shadow"
        dir={direction}
      >
        <div>
          <label>{formTexts.fullName}</label>
          <input
            {...register("fullName")}
            className="w-full p-2 border rounded"
            placeholder={formTexts.placeHolder.fullName}
            style={{ textAlign: locale === "fa" ? "right" : "left" }}
          />
          {errors.fullName && (
            <p className="text-red-500">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label>{formTexts.email}</label>
          <input
            {...register("email")}
            className="w-full p-2 border rounded"
            placeholder={formTexts.placeHolder.email}
            style={{ textAlign: locale === "fa" ? "right" : "left" }}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label>{formTexts.phoneNumber}</label>
          <input
            {...register("phoneNumber")}
            className="w-full p-2 border rounded"
            placeholder={formTexts.placeHolder.phoneNumber}
            style={{ textAlign: locale === "fa" ? "right" : "left" }}
          />
          {errors.phoneNumber && (
            <p className="text-red-500">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div>
          <label>{formTexts.message}</label>
          <textarea
            {...register("message")}
            className="w-full p-2 border rounded"
            placeholder={formTexts.placeHolder.message}
            style={{ textAlign: locale === "fa" ? "right" : "left" }}
          />
          {errors.message && (
            <p className="text-red-500">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid || loading}
          className={`w-full p-2 text-white rounded ${
            !isValid || loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500"
          }`}
        >
          {loading ? formTexts.submit.sending : formTexts.submit.submit}
        </button>
      </form>
      <Toaster position="bottom-right" />
    </>
  );
};

export default ContactForm;
