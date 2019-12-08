import React from "react";
import MenuItem from "../MenuItem/MenuItem";

interface Props {
  menuItems: string[];
  currentMenu: string;
  onCurrentMenuChange: (menuItem: string) => void;
  favouriteImageCount: number;
}

const Menu: React.FC<Props> = ({
  menuItems,
  onCurrentMenuChange,
  currentMenu,
  favouriteImageCount
}) => {
  return (
    <div>
      {menuItems.map(menuItem => (
        <MenuItem
          menuItem={menuItem}
          onClick={() => onCurrentMenuChange(menuItem)}
          isActive={currentMenu === menuItem}
          extraInfo={
            menuItem === "Favourite"
              ? `(${favouriteImageCount.toString()})`
              : ""
          }
        />
      ))}
    </div>
  );
};

export default Menu;
