import { useRouter } from "next/router";
import React, { useState } from "react";
import { GoSearch } from "react-icons/go";

interface searchProps {
  id: String;
  label: String;
  value: string;
  onChange: () => void;
  type: string;
}

const SearchInput: React.FC<searchProps> = ({ label, id, value, type }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleSearchSubmit = (event: any) => {
    event.preventDefault();
    router.push(`/search/${searchTerm}`);
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input
          placeholder="search for a name or contact"
          id="search-input"
          label="Search Chats"
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="outline-none border-b-gray-400 border-x-0 border-t-0"
          autocomplete="on"
        />
      </form>
    </div>
  );
};

export default SearchInput;
