import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signUpApi({ fullName, email, password }),

    onSuccess: (data) => {
      console.log(data);
      toast.success(
        "The account created successfully, Please verify the new account from email address"
      );
    },
    onError: () => {
      toast.error("Error has been occured wihle creating the account");
    },
  });

  return { signUp, isLoading };
}
