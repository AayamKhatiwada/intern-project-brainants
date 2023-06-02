import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SuccessNoty = (message: string, time: number) => {
  return toast.success(message, {
    autoClose: time,
  });
};

export const ErrorNoty = (message: string, time: number) => {
  return toast.error(message, {
    autoClose: time,
  });
};
