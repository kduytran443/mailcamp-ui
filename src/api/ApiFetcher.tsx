import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";

interface ApiFetcherProps<T> {
  fetchData: () => Promise<AxiosResponse<T>>;
  children: (data: T, loading: boolean, error: Error | null) => React.ReactNode;
}

export default function ApiFetcher<T>({ fetchData, children }: ApiFetcherProps<T>) {
  const [data, setData] = useState<T>({} as T);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchData().then((res: AxiosResponse<T>) => {
      if (!res || !res.data) {
        throw new Error("No data received from API");
      }
      setData(res.data);
      setLoading(false);
    }).catch((err: Error) => {
      setError(err);
      setLoading(false);
    });
  }, [fetchData]);

  return <>{children(data, loading, error)}</>;
}
