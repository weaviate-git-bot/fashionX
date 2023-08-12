"use client";
import React from "react";

export function Heropage() {
  return (
    <div
      class="container"
      style={{
        maxWidth: "100%",
        maxHeight: "80vh",
      }}
    >
      <div class="container__item landing-page-container">
        <div class="content__wrapper">
          <p class="coords">N 49° 16' 35.173" / W 0° 42' 11.30"</p>

          <div class="ellipses-container">
            <h2 class="greeting">FASHION-X</h2>

            <div class="ellipses ellipses__outer--thin">
              <div class="ellipses ellipses__orbit"></div>
            </div>

            <div class="ellipses ellipses__outer--thick"></div>
          </div>

          <div class="scroller">
            <p class="page-title">home</p>

            <div class="timeline">
              <span class="timeline__unit"></span>
              <span class="timeline__unit timeline__unit--active"></span>
              <span class="timeline__unit"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
