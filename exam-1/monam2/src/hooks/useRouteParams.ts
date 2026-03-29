import { useSearchParams, useNavigate } from "react-router-dom";

export default function useRouteParams() {
  const router = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentQuery = Object.fromEntries(searchParams.entries());

  const updateQuery = (queries: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(queries).forEach(([key, value]) => {
      if (!value) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });

    setSearchParams(newParams);
  };

  const resetQuery = () => {
    setSearchParams(new URLSearchParams());
  };

  return {
    router,
    searchParams,
    currentQuery,
    updateQuery,
    resetQuery,
  };
}
