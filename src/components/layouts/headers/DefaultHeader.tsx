import React, { useState, useEffect, useRef } from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
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
  const location = useLocation();

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
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState('option1');

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const navigate = useNavigate();
  const handleOptionClick = (option) => {
    console.log(`Selected: ${option}`);
    setDropdownVisible(false);

    if (option === "login") {
      navigate("/login");
    } else if (option === "lesson") {
      navigate("/lesson");
    }
  };

  return (
      <>
        <div className="header">
          <div className="header-top">
            <div></div>
            <div className="search-input"></div>
            <div className="d-flex justify-content-between align-items-center">
              <button
                  className="btn btn-search"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
              <span>
                <Icon icon="uil:search" />
              </span>
              </button>

              <div className="account-button-container">
                <button className="btn-account" onClick={toggleDropdown}>
                  <Icon icon="mage:user" width="24" height="24" />
                </button>

                {isDropdownVisible && (
                    <div className="dropdown" ref={dropdownRef}>
                      <div className="dropdown-options">
                        <div className="dropdown-option" onClick={() => handleOptionClick("login")}>
                          Login
                        </div>
                        <div className="dropdown-option" onClick={() => handleOptionClick("lesson")}>
                          Lesson
                        </div>
                      </div>
                    </div>
                )}
              </div>
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
          {location.pathname !== "/lesson" ? (
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
          ) : (
              <span className="lesson">Lesson</span>
          )}
        </div>
      </>
  );
};

export default DefaultHeader;
