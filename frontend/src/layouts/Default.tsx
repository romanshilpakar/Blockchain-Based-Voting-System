import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

type MenuLink = {
  name: string;
  link: string;
};

type DefaultProps = {
  menu: MenuLink[];
  children: JSX.Element;
};

const Default = (props: DefaultProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    document.getElementById("default-sidebar")?.classList.add("hide");
    document.getElementById("default-sidebar")?.classList.remove("display");

    const hideIfOutside = (e: any) => {
      const sidebar = document.getElementById("default-sidebar");
      const outsideHam = document.getElementById("outside-ham");

      if (!sidebar?.contains(e.target) && !outsideHam?.contains(e.target)) {
        if (!sidebar?.classList.contains("hide")) {
          sidebar?.classList.add("hide");
          sidebar?.classList.remove("display");
        }
      }
    };

    window.addEventListener("click", hideIfOutside);

    return () => {
      window.removeEventListener("click", hideIfOutside);
    };
  }, []);

  const toggleHandler = () => {
    document.getElementById("default-sidebar")?.classList.toggle("hide");
    document.getElementById("default-sidebar")?.classList.toggle("display");
  };

  return (
    <div className="default-container">
      <div className="default-sidebar-container">
        <div onClick={toggleHandler} id="outside-ham" className="hamburger">
          <i className="bi bi-list"></i>
        </div>

        <div id="default-sidebar" className="default-sidebar">
          <div onClick={toggleHandler} className="hamburger">
            <i className="bi bi-list"></i>
          </div>

          {props.menu.map(({ name, link }, index) => (
            <div
              key={index}
              onClick={() => {
                toggleHandler();
                navigate(link);
              }}
              className={`default-sidebar-link ${
                pathname == link ? "active" : ""
              }`}
            >
              {name}
            </div>
          ))}
        </div>
      </div>

      <div className="default-content">{props.children}</div>
    </div>
  );
};

export default Default;
