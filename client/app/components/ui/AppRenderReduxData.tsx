import React from "react";
import { Empty } from "antd";
import AppErrorComponent from "./AppErrorComponent";
import AppLoading from "./AppLoading";

type Props = {
  queryData: any;
  showData: (data: any) => React.ReactNode;
  renderErrorComponent?: (error: any) => React.ReactNode;
  loadingComponent?: React.ReactNode;
  notAllowIsFetching?: boolean;
  isEmptyComponentHave?: boolean;
};

const AppRenderReduxData = ({
  queryData,
  showData,
  renderErrorComponent,
  loadingComponent,
  notAllowIsFetching,
  isEmptyComponentHave
}: Props) => {
  const { data, isFetching, isLoading, isError, error } = queryData;

  let content;

  const shouldFetch = notAllowIsFetching === true ? false : isFetching;

  if (shouldFetch || isLoading) {
    content = loadingComponent || <AppLoading />;
  } else if (isError) {
    content = renderErrorComponent ? (
      renderErrorComponent(error)
    ) : (
      <AppErrorComponent />
    );

  } else if ((data as any)?.data && isEmptyComponentHave) {
    content = showData(data?.data);
  } else if ((data as any)?.data?.length > 0) {
    content = showData(data);
  } else {
    content = (
      <Empty description="No Data Found" className="min-h-[70dvh] flex flex-col text-xl font-medium gap-4 items-center justify-center" />
    );
  }
  return <>{content}</>;
};

export default AppRenderReduxData;
