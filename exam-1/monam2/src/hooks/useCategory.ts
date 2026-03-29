import { useState, useEffect } from "react";
import { useRouteParams } from "@/hooks";

export default function useCategory() {
  const { updateQuery, currentQuery } = useRouteParams();

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    () => currentQuery.categories?.split(",").filter(Boolean) ?? [],
  );

  useEffect(() => {
    setSelectedCategories(
      currentQuery.categories?.split(",").filter(Boolean) ?? [],
    );
  }, [currentQuery.categories]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const nextCategories = checked
      ? [...new Set([...selectedCategories, value])]
      : selectedCategories.filter((category) => category !== value);

    setSelectedCategories(nextCategories);

    updateQuery({
      categories: nextCategories.join(","),
    });
  };

  return {
    selectedCategories,
    onChange,
  };
}
