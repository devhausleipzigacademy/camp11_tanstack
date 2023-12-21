import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink
                className={({ isActive, isPending }) =>
                  isActive ? "activeNavLink" : ""
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive, isPending }) =>
                  isActive ? "activeNavLink" : ""
                }
                to="/blog"
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive, isPending }) =>
                  isActive ? "activeNavLink" : ""
                }
                to="/blog/create"
              >
                Create Blog
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
