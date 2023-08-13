"use client";
import { Button } from "@mantine/core";
import React, { useEffect } from "react";
import axios from "axios";

export function Heropage() {
  useEffect(() => {
    axios
      .get("http://localhost:8080/frontpage/3")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div
      className="container"
      style={{
        maxWidth: "100%",
        maxHeight: "80vh",
      }}
    >
      <div className="container__item landing-page-container">
        <div className="content__wrapper">
          <p className="coords">
            N 49° 16' 35.173" / W 0° 42' 11.30"
          </p>

          <div className="ellipses-container">
            <div
              className="greeting"
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

            <div className="ellipses ellipses__outer--thin">
              <div className="ellipses ellipses__orbit"></div>
            </div>

            <div className="ellipses ellipses__outer--thick"></div>
          </div>

          <div className="scroller">
            <p className="page-title">home</p>

            <div className="timeline">
              <span className="timeline__unit"></span>
              <span className="timeline__unit timeline__unit--active"></span>
              <span className="timeline__unit"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
