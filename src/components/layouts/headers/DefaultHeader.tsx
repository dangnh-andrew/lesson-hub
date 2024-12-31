import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Select from "react-select/base";

const DefaultHeader: React.FunctionComponent = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const colourOptions: any[] = [];

  const [selectedOption, setSelectedOption] = useState<any>(null); // Trạng thái lưu giá trị đã chọn

  // Hàm xử lý sự kiện khi chọn giá trị
  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="header">
        <div className="header-top">
          <div></div>
          <div></div>
          <div className="d-flex justify-content-between align-items-center">
            <button
              className="btn btn-search"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <span>
                <Icon icon="uil:search" />
              </span>
            </button>
            <button className="btn-account">
              <Icon icon="mage:user" width="24" height="24" />
            </button>
          </div>
        </div>
        {isSearchOpen && (
          <div className="search-box" ref={searchRef}>
            <div className="row">
              <div className="col-12">
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isDisabled={false}
                  isLoading={false}
                  isClearable={true}
                  isSearchable={true}
                  name="color"
                  options={colourOptions}
                  value={selectedOption}
                  onChange={handleChange}
                  inputValue=""
                  onInputChange={(inputValue) => console.log(inputValue)}
                  onMenuOpen={() => console.log("Menu Opened")}
                  onMenuClose={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              </div>
            </div>
          </div>
        )}
        <div className="header-menu">
          <ul>
            <li>
              <Link to={""}>Home</Link>
            </li>
            <li>
              <Link to={"/geogebra"}>GeoGebra</Link>
            </li>
            <li>
              <Link to={"/post"}>Post</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DefaultHeader;
