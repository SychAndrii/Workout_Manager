'use client';
import { useEffect, useState } from "react";
import useIdToken from "./useIdToken";

const useJSONRequest = (url) => {
  const token = useIdToken();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url, {
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      });
      const data = await res.json();
      console.log(data);
      setData(data);
    }

    if (token) fetchData();
  }, [token]);

  return data;
};

export default useJSONRequest;
