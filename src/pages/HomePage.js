import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import products from "../data/products";
import FeaturedProducts from "../components/FeaturedProducts";
import HighlightSection from "../components/HighlightSection";
import { useEffect } from "react";


const animals = [
  {
    id: "dog",
    titleKey: "dogs_products",
    image:
      "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=600&q=60",
  },
  {
    id: "cat",
    titleKey: "cats_products",
    image:
      "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=600&q=60",
  },
  {
    id: "bird",
    titleKey: "birds_products",
    image:
      "https://images.unsplash.com/photo-1480044965905-02098d419e96?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "rodent",
    titleKey: "rodents_products",
    image:
      "https://images.unsplash.com/photo-1676918555382-fcd06a483e25?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function HomePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const heroImageUrl = "/myheroimage.png"; // Make sure it's in /public
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <div className="flex flex-col space-y-16 ">
      {/* Hero Image Full Width */}
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="
        relative
        w-[100vw]
        left-1/2
        right-1/2
        -ml-[50vw]
        -mr-[50vw]
        mt-10  md:mt-10
      "
    >
      <img
        src={heroImageUrl}
        alt={t('hero_alt')}
        className="w-full object-cover"
      />

      {/* Footprints image positioned to the right */}

</motion.div>





      {/* Wrapped content with margin to prevent overlap */}
      <div className="flex flex-col space-y-16 mt-12 md:mt-0">
        {/* Company Explanation */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 px-4"
        >
          <h1 className="text-4xl font-extrabold text-orange-400">
            {t("home_title")}
          </h1>
          <p className="max-w-2xl mx-auto text-gray-700">
            {t("home_subtitle")}
          </p>
        </motion.section>

        {/* Cards Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-0">
          {animals.map((animal, index) => (
            <motion.div
              key={animal.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="cursor-pointer group relative rounded-lg overflow-hidden shadow-lg"
              onClick={() => navigate(`/products?type=${animal.id}`)}
            >
              <img
                src={animal.image}
                alt={t(animal.titleKey)}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <h2 className="text-white text-2xl font-bold">
                  {t(animal.titleKey)}
                </h2>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Featured Products */}
        <FeaturedProducts />

        <HighlightSection />




      </div>
    </div>
  );
}

export default HomePage;
