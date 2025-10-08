import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading: isLogin, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      toast.success("Login Successfully");
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log(err);
      toast.error("Provided Email or Password are incorrect");
    },
  });

  return { isLogin, login };
}
