import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function HighlightSection() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const containerRef = useRef(null);

  // Track scroll relative to this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Map scroll progress to Y offset of the image
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);

  return (
    <section
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 mt-20 pb-16"
    >
      {/* Image */}
      <div className="relative h-80 md:h-[400px] w-full overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1597057252791-0bb34d9842c8?q=80&w=749&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Man with dog"
          style={{ y }}
          className="absolute top-0 left-0 w-full h-auto"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col justify-center items-start p-8 bg-orange-400 text-white space-y-4">
        <h3 className="text-2xl font-bold">
          {t("highlight_title")}
        </h3>
        <p className="text-md md:text-lg font-light">
          {t("highlight_text")}
        </p>
        <button
          onClick={() => navigate("/products")}
          className="mt-4 bg-white text-orange-500 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
        >
          {t("highlight_button")}
        </button>
      </div>
    </section>
  );
}

export default HighlightSection;
