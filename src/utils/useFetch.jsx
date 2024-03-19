import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Couldn't connect");
        }
        return res.json();
      })
      .then((data) => {
        setError(null);
        setData(data);
        setIsPending(false);
      })
      .catch((e) => {
        setError("La ressource n'a pas pu être récupérée :(");
        setIsPending(false);
        setData([]);
      });
  }, [url]);
  return { error, isPending, data };
};

export default useFetch;
