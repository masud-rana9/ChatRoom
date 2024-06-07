type Props = {
  error?: string;
};

const AppErrorComponent = (props: Props) => {
  return (
    <div className="flex min-h-[50dvh] text-center justify-center items-center text-red font-semibold text-xl">
      <span>{props?.error || "Something went wrong"}</span>
    </div>
  );
};

export default AppErrorComponent;
