import { motion } from "framer-motion";

function FlyToCartAnimation({ imageSrc, destX, destY, onAnimationComplete }) {
  return (
    <motion.img
      src={imageSrc}
      initial={{
        position: "fixed",
        top: "50%",
        left: "50%",
        width: "100px",
        height: "100px",
        zIndex: 50,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        top: destY,
        left: destX,
        width: "30px",
        height: "30px",
        opacity: 0,
        translateX: 0,
        translateY: 0,
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      onAnimationComplete={onAnimationComplete}
    />
  );
}

export default FlyToCartAnimation;
