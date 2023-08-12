"use client";
import { Button } from "@mantine/core";
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
            <div
              class="greeting"
              style={{
                top: 0,
                left: 0,
                display: "flex",
                height: "100%",
                width: "100%",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-evenly",
                zIndex: 10,
              }}
            >
              <h2 style={{ textAlign: "center" }}>FASHION-X</h2>
              <h3 style={{ textAlign: "center" }}>
                THE AI OF FASHION
              </h3>
              <Button
                variant="primary"
                style={{
                  fontSize: "2.875rem",
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                GET STARTED
              </Button>
            </div>

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
