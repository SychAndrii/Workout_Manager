"use client";
import React, { useEffect, useRef } from "react";
import SearchIcon from "@/src/ui/icons/SearchIcon";
import Fuse from "fuse.js";

//https://www.fusejs.io/examples.html

const SearchBar = ({
  collectionState,
  setCurrentCollection,
  keys,
  placeholder,
}) => {
  const options = {
    findAllMatches: true,
    keys,
    useExtendedSearch: true,
    distance: 2,
  };
  const initialCollectionRef = useRef(collectionState);

  useEffect(() => {
    if(initialCollectionRef.current && initialCollectionRef.current.length == 0) {
      initialCollectionRef.current = collectionState;
    }
  }, [collectionState]);

  return (
    <form className="w-full">
      <div className="relative ">
        <div className="absolute inset-y-0 text-main-gray left--11 flex items-center pl-3.5 pointer-events-none">
          <SearchIcon />
        </div>
        <input
          type="text"
          onChange={handleInputChange}
          className="border-y-2 border-secondary-gray text-main-gray text-sm focus:outline-none block w-full pl-10 p-2.5"
          placeholder={placeholder}
        />
      </div>
    </form>
  );

  function handleInputChange(e) {
    const inputValue = e.target.value.trim();
    if (inputValue == "") {
      setCurrentCollection(initialCollectionRef.current);
    } else {
      const words = inputValue.split(" ").join("|");
      const fuse = new Fuse(collectionState, options);
      const resultingArray = fuse
        .search(words)
        .map((searchResult) => searchResult.item);

      setCurrentCollection(resultingArray);
    }
  }
};

export default SearchBar;