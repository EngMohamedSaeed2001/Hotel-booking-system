import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, isFetching } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading && !isFetching) navigate("/login");
  }, [isAuthenticated, isLoading, navigate, isFetching]);

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoutes;
