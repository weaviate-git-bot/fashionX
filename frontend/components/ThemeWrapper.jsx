"use client";
import React from "react";

const ThemeWrapper = ({ children }) => {
  return (
    <div>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div id="title">{children}</div>
    </div>
  );
};

export default ThemeWrapper;
