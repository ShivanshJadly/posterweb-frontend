import React, { useEffect, useState } from "react";
import { BackgroundLines } from "../components/ui/background-lines";
import { motion } from "framer-motion";

export function Error() {
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation only when the page is loaded
    setIsPageLoaded(true);
  }, []);

  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 -z-10">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={isPageLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 1.3 }}
        className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight"
      >
        "{404}" <br /> <p>ERROR!!</p>
      </motion.h2>
    </BackgroundLines>
  );
}
