// https://www.youtube.com/watch?v=jcpLprT5F0I

import { motion } from "motion/react";
const AnimatedButton = () => {
  return (
    <motion.button
      initial={{ "--x": "100%", scale: 1 }}
      animate={{ "--x": "-100%" }}
      whileTap={{ scale: 0.8 }}
      transition={{
        repeat: Infinity,
        type: "spring",
        repeatType: "loop",
        repeatDelay: 1,
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
          type: "spring",
          stiffness: 10,
          damping: 5,
          mass: 0.1,
        },
      }}
      className="px-6 py-2 rounded-md relative radial-gradient"
    >
      <span className="text-neutral-100 tracking-wide font-light h-full w-full block relative linear-mask">
        albadrx
      </span>
      <span className="block absolute linear-overlay inset-0 rounded-md p-px " />
    </motion.button>
  );
};

export default AnimatedButton;
