import { useEffect, useState } from "react";

function useScreen() {
  const [IsTablet, setIsTablet] = useState<null | boolean>(null); // Initial state is null
  const [isLarge, setIsLarge] = useState<null | boolean>(null); // Same for large screens
  const [isMobile, setIsMobile] = useState<null | boolean>(null); // Same for

  useEffect(() => {
    // This code will only run in the browser (after the component mounts)
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth > 640);
      setIsLarge(window.innerWidth > 800);
    };

    // Set initial screen size
    updateScreenSize();

    // Listen for resize events
    window.addEventListener("resize", updateScreenSize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  return { IsTablet, isLarge, isMobile };
}

export default useScreen;
