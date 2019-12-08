import * as React from "react";
import { useEffect, useState } from "react";
import Image from "./Image/Image";
import { ImageType } from "../types";
import { getSearchImages } from "../api";
import Button from "./Button/Button";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";
import SearchInput from "./SearchInput/SearchInput";
import Menu from "./Menu/Menu";

export const App = () => {
  const [currentMenu, setCurrentMenu] = useState("Search");
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [foundImages, setFoundImages] = useState<ImageType[]>([]);
  const [searchText, setSearchText] = useState("cat");
  const [favouriteImages, setFavouriteImages] = useState<ImageType[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const menuItems = ["Search", "Favourite"];

  const searchLimit = 8;
  const onGetSearchImages = () => {
    setIsLoading(true);
    return getSearchImages(searchText, searchLimit, offset)
      .then(images => {
        setIsLoading(false);
        setErrorMessage("");
        return images;
      })
      .catch(error => {
        if (!error.response) {
          setErrorMessage("Network Error!");
          setIsLoading(false);
        }
        return [];
      });
  };

  const onkeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      onGetSearchImages().then(setFoundImages);
    }
  };

  useEffect(() => {
    setOffset(0);
    onGetSearchImages().then(setFoundImages);
  }, [searchText]);

  useEffect(() => {
    onGetSearchImages().then((data: ImageType[]) => {
      if (offset !== 0) {
        setFoundImages([...foundImages, ...data]);
      } else {
        setFoundImages(data);
      }
    });
  }, [offset]);

  const toggleFavourite: (image: ImageType) => void = image => {
    const isImageExist = favouriteImages.find(({ id }) => id === image.id);
    if (isImageExist) {
      setFavouriteImages(favouriteImages.filter(({ id }) => id !== image.id));
    } else {
      setFavouriteImages([...favouriteImages, image]);
    }
  };

  const displayImages =
    currentMenu === "Search" ? foundImages : favouriteImages;
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-col flex-1 p-8">
        <div className="app__header flex items-center">
          <span className="text-lg border-r-2 pr-2">
            <h2>
              Galler<strong>easy</strong>
            </h2>
          </span>
          <Menu
            currentMenu={currentMenu}
            favouriteImageCount={favouriteImages.length}
            menuItems={menuItems}
            onCurrentMenuChange={setCurrentMenu}
          />
        </div>
        <div className="flex-1 p-2 flex-grow">
          <SearchInput
            value={searchText}
            onChange={({ currentTarget }) => setSearchText(currentTarget.value)}
            onKeyDown={onkeydown}
          />
          {displayImages.length ? (
            <div>
              <div className="flex flex-wrap pt-6 justify-center md:justify-start">
                {displayImages.map(image => (
                  <Image
                    key={image.id}
                    toggleFavourite={() => toggleFavourite(image)}
                    url={image.images["480w_still"].url}
                    isFavourite={
                      !!favouriteImages.find(({ id }) => id === image.id)
                    }
                  />
                ))}
              </div>
              <Button onClick={() => setOffset(offset + 1)}>
                Fetch More
                {isLoading && <LoadingSpinner />}
              </Button>
              {errorMessage && (
                <span className="text-red-500 border-l-2 border-red-600 pl-2">
                  {errorMessage}
                </span>
              )}
            </div>
          ) : (
            searchText && <p>No result found!</p>
          )}
        </div>
      </div>
    </div>
  );
};
