import { LuSearch } from "react-icons/lu";
import { Table } from "antd";
import { ReactNode, useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import AppTableSkeleton from "./AppTableSkeleton";
import AppRenderReduxData from "./AppRenderReduxData";

type TTableProps = {
  headerText?: string;
  inputPlaceholder?: string;
  columns: any;
  button?: ReactNode;
  header?: boolean;
  infoQuery?: any;
  isLoading?: boolean;
  onInputChange?: (text: string) => void;
  setPage?: (value: number) => void;
  tabs?: ReactNode;
};

const AppTable = ({
  header,
  infoQuery,
  headerText,
  inputPlaceholder,
  button,
  columns,
  onInputChange,
  setPage,
  tabs
}: TTableProps) => {

  const [input, setInput] = useState("");
  const debounceInput = useDebounce(input, 500);

  useEffect(() => {
    if (onInputChange) {
      onInputChange(debounceInput);
    }
  }, [debounceInput, onInputChange]);

  return (
    <div className="rounded-2xl w-full  border border-[#E6E6E7] ">
      {/* Table header here  */}
      {!button && !headerText && !inputPlaceholder ? <></> :
        <div className="bg-[#F8F8F8] w-full flex gap-2 lg:gap-0 flex-col md:flex-row justify-between p-2 lg:p-3 rounded-t-2xl">
          <div className={`flex md:items-center justify-between ${inputPlaceholder ? "md:w-3/5" : "md:w-1/5"}`}>
            <h1 className="md:text-lg lg:text-xl font-medium">{headerText}</h1>
            {inputPlaceholder && (
              <div className={`bg-white w-1/2 lg:w-3/5 rounded-md px-1 md:px-2.5 py-1 md:py-1.5 lg:p-2.5 flex items-center`}>
                <LuSearch className="text-textDark text-lg" />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={inputPlaceholder}
                  className="w-full h-full outline-none border-none focus:border-none pl-1 text-sm md:text-base md:pl-2"
                />
              </div>
            )}
          </div>
          {tabs}
          {button &&
            <div className="lg:w-2/5 flex  items-center justify-end">
              {button}
            </div>
          }
        </div>
      }

      <div className='overflow-x-auto'>
        {infoQuery && (
          <AppRenderReduxData
            loadingComponent={
              <AppTableSkeleton />
            }
            queryData={infoQuery}
            showData={(data) => {
              console.warn(data);
              return (
                <Table
                  showHeader={header}
                  columns={columns}
                  dataSource={Array.isArray(data?.data) ? data?.data : [data?.data]}
                  rowKey="id"
                  pagination={setPage ? {
                    onChange: (value) => setPage(value),
                    pageSize: data?.meta?.limit,
                    total: data?.meta?.total,
                    current: data?.meta?.page,
                    showSizeChanger: false
                  } : false}
                />
              );
            }}
          />
        )}
      </div>

    </div>
  );
};

export default AppTable;
