import { useState, useEffect, useRef } from "react";
import { errorSearchMessage } from "../utils/errorSearchMessage";

export const useSearch = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }

    if (search === "") {
      setError(errorSearchMessage.noNull);
      return;
    }

    if (search.match(/^⧹d+$/)) {
      setError(errorSearchMessage.noNumber);
      return;
    }

    if (search.length < 3) {
      setError(errorSearchMessage.minLenght);
      return;
    }

    setError(null);
  }, [search]);

  return { search, setSearch, error };
};
