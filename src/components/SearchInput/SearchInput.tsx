import React from "react";

const SearchInput = (props: React.HTMLProps<HTMLInputElement>) => {
  return (
    <input
      className="max-w-xl bg-white focus:outline-none border-b-2 border-gray-300 py-2 px-4 block w-full appearance-none leading-normal"
      type="text"
      placeholder="Please type to search an image"
      {...props}
    />
  );
};

export default SearchInput;
