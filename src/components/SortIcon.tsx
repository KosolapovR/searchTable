import React from "react";

const SortIcon = (props: { status: any }) => {
  const renderedIcon =
    typeof props.status !== "object" ? (
      props.status ? (
        <i className="fas fa-sort-amount-down-alt" />
      ) : (
        <i className="fas fa-sort-amount-up" />
      )
    ) : (
      <i className="fas fa-sort-amount-down-alt" style={{ color: "#999" }} />
    );

  return <>{renderedIcon}</>;
};

export default SortIcon;
