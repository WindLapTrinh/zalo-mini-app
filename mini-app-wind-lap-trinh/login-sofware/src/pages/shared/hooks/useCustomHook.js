import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useCustomHook = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    // Add your effect logic here
    console.log("Location changed:", location);
  }, [location]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return {
    state,
    setState,
    ref,
    handleNavigation,
  };
};

export default useCustomHook;
