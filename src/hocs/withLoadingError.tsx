import CircularLoading from "components/CircularLoading";
import React from "react";

interface WithLoadingErrorProps {
  loading: boolean;
  error: Error | null;
}

const withLoadingError = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return ({ loading, error, ...props }: P & WithLoadingErrorProps) => {
    if (loading) {
      return <CircularLoading />;
    }

    if (error) return <div>Lỗi xảy ra. Không thể tải dữ liệu.</div>;
    
    return <WrappedComponent {...(props as P)} />;
  };
};

export default withLoadingError;
