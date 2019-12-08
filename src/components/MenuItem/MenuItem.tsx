import * as React from "react";
import classNames from "classnames";

interface Props {
  onClick: () => void;
  isActive: boolean;
  menuItem: string;
  extraInfo: string;
}
const MenuItem: React.FC<Props> = ({
  onClick,
  isActive,
  menuItem,
  extraInfo
}) => {
  return (
    <span
      onClick={onClick}
      className={classNames(
        "ml-2 md:ml-4 cursor-pointer hover:text-gray-800",
        { "text-gray-600": !isActive },
        {
          "text-black font-semibold": isActive
        }
      )}
    >
      {menuItem}&nbsp;{extraInfo && extraInfo}
    </span>
  );
};

export default MenuItem;
