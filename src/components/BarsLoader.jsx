import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const BarsLoader = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);
  const [bars, setBars] = useState([40, 80, 55, 100, 70, 50, 90, 60]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBars((prev) => prev.map(() => Math.floor(Math.random() * 120) + 30)); // range set to 30-149
    }, 180);

    const timeout = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 600);
    }, 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-zinc-900 fixed inset-0 flex flex-col justify-center items-center"
        >
          {/* Heading */}
          <motion.h1 className="text-white text-2xl md:text-5xl tracking-wide">
            Initializing Algorithms...
          </motion.h1>
          {/* Bar Container */}
          <div className="flex items-end gap-3 h-40 mt-20 mb-10">
            {/* Bars */}
            {bars.map((height, idx) => (
              <motion.div
                key={idx}
                animate={{ height }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                }}
                className="w-5 bg-teal-500 rounded-full shadow-[0_0_10px_1px_rgba(20,184,166,0.8)]"
              ></motion.div>
            ))}
          </div>

          {/* Text
          <motion.p
          className="text-white text-lg md:text-2xl tracking-wider"
          >Sorting...</motion.p> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BarsLoader;
