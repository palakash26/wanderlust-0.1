import React from "react";

function PageTitle({ title }: { title: string }) {
  return <div className="text-xl text-teal-500 font-bold">{title}</div>;
}

export default PageTitle;
