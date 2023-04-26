import React, { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Btn({ btnName, btnTarget }) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);
  useState(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const ref = useRef(null);

  useEffect(() => {
    const btn = ref.current;
    btn.addEventListener("mousemove", (e) => {
      let rect = e.target.getBoundingClientRect();
      let x = e.clientX - rect.left;
      btn.style.setProperty("--x", x + "deg");
    });

    return () => {
      btn.removeEventListener("mousemove", (e) => {
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        btn.style.setProperty("--x", x + "deg");
      });
    };
  }, [ref]);
  return (
    <div className="btnContainer">
      <a
        ref={ref}
        onClick={btnTarget}
        className={`d-block  ${isMobile ? "mb-4 " : "mx-md-start"}`}
      >
        <>
          <i></i>
          <i></i>
          <span>{btnName}</span>
        </>
      </a>
    </div>
  );
}
