import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-1 h-full px-4 ">
      <div className="h-full max-w-[1050px] mx-auto ">{children}</div>
    </div>
  );
};

export default Container;
