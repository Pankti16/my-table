import React from "react";
//Get the device type based on screen size as well as rendering platform (based on UA)
export const useDeviceType = () => {
  //Check if width is for mobile devices
  const checkForDevice = () => window?.innerWidth <= 576;
  //Get window's orientation
  const getOrientation = () => window?.screen?.orientation?.type;
  //State variable to hold device type
  const [isDeviceMobile, setIsDeviceMobile] = React.useState(false);
  //State variable to hold device width limit
  const [isDeviceSmall, setIsDeviceSmall] = React.useState(checkForDevice());
  //State variable to hold orientation
  const [orientation, setOrientation] = React.useState(getOrientation());

  //Check for device type
  React.useEffect(() => {
    //Local variable to hold whether device is touchable or not
    let hasTouchScreen = false;
    //If there are maxTouchPoints
    if ("maxTouchPoints" in navigator) {
      hasTouchScreen = navigator.maxTouchPoints > 0;
      //Else if there are msMaxTouchPoints
    } else if ("msMaxTouchPoints" in navigator) {
      hasTouchScreen = navigator.msMaxTouchPoints > 0;
      //Else
    } else {
      //If media match pointer:coarse or not
      const mQ = window.matchMedia && matchMedia("(pointer:coarse)");
      if (mQ && mQ.media === "(pointer:coarse)") {
        hasTouchScreen = !!mQ.matches;
        //Else if orientation is present
      } else if ("orientation" in window) {
        hasTouchScreen = true; // deprecated, but good fallback
        //Else old school check with UA
      } else {
        // Only as a last resort, fall back to user agent sniffing
        var UA = navigator.userAgent;
        hasTouchScreen =
          /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
          /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
      }
    }
    //Check if hasTouchScreen or device width is of mobile
    //(remove second condition if want to keep completely based on UA)
    if (hasTouchScreen) {
      setIsDeviceMobile(true);
    } else {
      setIsDeviceMobile(false);
    }
    setIsDeviceSmall(checkForDevice());
    //Handler method when page/window size is changed
    //(remove these as well if want to keep completely based on UA)
    const handlePageResized = () => {
      setIsDeviceMobile(hasTouchScreen);
      setIsDeviceSmall(checkForDevice());
    };
    //Handler method when page/window orientation is changed
    //(remove these as well if want to keep completely based on UA)
    const handleOrientationChange = () => {
      setIsDeviceMobile(hasTouchScreen);
      setIsDeviceSmall(checkForDevice());
      setOrientation(getOrientation());
    };
    //Add listeners for page/window size change
    //(remove these as well if want to keep completely based on UA)
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handlePageResized);
      window.addEventListener("orientationchange", handleOrientationChange);
      window.addEventListener("load", handlePageResized);
      window.addEventListener("reload", handlePageResized);
    }

    return () => {
      //Remove listeners when unmount
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handlePageResized);
        window.removeEventListener(
          "orientationchange",
          handleOrientationChange
        );
        window.removeEventListener("load", handlePageResized);
        window.removeEventListener("reload", handlePageResized);
      }
    };
  }, []);
  //return whether the device is mobile or not
  return {
    isMobile: isDeviceMobile,
    isSmallScreen: isDeviceSmall,
    orientation,
  };
};
