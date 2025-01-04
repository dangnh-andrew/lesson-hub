import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

interface DefaultHeaderProps {
  tabName: string;
}

const DefaultHeader: React.FunctionComponent<DefaultHeaderProps> = ({ tabName }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const handleOptionClick = (option: string) => {
    setDropdownVisible(false);
    if (option === "login") {
      navigate("/login");
    } else if (option === "lesson") {
      navigate("/admin/lesson");
    }
  };

  const toggleDropdown = () => setDropdownVisible(!isDropdownVisible);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
      <header className="header">
        <div className="header-top">
          <h1 className="tab-name">
            <div className="back-button" onClick={() => window.history.back()}>
              <FaArrowLeft className="back-icon" />
            </div>
            <div className="tab-title">
              {tabName}
            </div>
          </h1>
          <div className="account-container">
            <button className="btn-account" onClick={toggleDropdown}>
              <Icon icon="mdi:account-circle" width="24" style={{ color: "#222222" }} />
            </button>
            {isDropdownVisible && (
                <div className="dropdown" ref={dropdownRef}>
                  <div
                      className="dropdown-option"
                      onClick={() => handleOptionClick("login")}
                  >
                    Login
                  </div>
                  <div
                      className="dropdown-option"
                      onClick={() => handleOptionClick("lesson")}
                  >
                    Lesson
                  </div>
                </div>
            )}
          </div>
        </div>
      </header>
  );
};

export default DefaultHeader;
