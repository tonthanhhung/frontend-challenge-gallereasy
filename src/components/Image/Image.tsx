import * as React from "react";
import Img from "react-image";
import classNames from "classnames";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

interface Props {
  url: string;
  isFavourite: boolean;
  toggleFavourite: () => void;
}
const Image: React.FC<Props> = ({ url, isFavourite, toggleFavourite }) => {
  const imageSize = "w-56 h-56 md:w-40 md:h-40";
  return (
    <div
      className={classNames(
        imageSize,
        "group m-3 flex justify-center items-center relative cursor-pointer"
      )}
      style={{
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <Img
        className={classNames(imageSize, "object-cover opacity-0")}
        src={url}
        loader={<LoadingSpinner />}
      />
      <div
        className={classNames("right-0 bottom-0 p-1 absolute opacity-0", {
          ["group-hover:opacity-50"]: !isFavourite,
          ["opacity-100"]: isFavourite
        })}
        onClick={toggleFavourite}
      >
        <svg
          className="fill-current text-red-500 w-8 h-8"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z" />
        </svg>
      </div>
    </div>
  );
};

export default Image;
