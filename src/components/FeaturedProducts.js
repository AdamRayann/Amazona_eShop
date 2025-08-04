import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./FeaturedProducts.css"; // Import the CSS file
import products from "../data/featuredProducts";

function FeaturedProducts() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="px-4 mt-10 pb-20">
      <div className="text-center px-4 py-20">
        <h2 className="text-3xl font-bold text-orange-400 mb-2">
          {t("unique_title")}
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto text-lg md:text-2xl font-light tracking-wide">
          {t("unique_subtitle")}
        </p>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        centeredSlides={true}
        loop={true}
        navigation
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 1.5 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        slideActiveClass="swiper-slide-active"
        slidePrevClass="adjacent-slide"
        slideNextClass="adjacent-slide"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div
              className="
                slide-content
                cursor-pointer
                transition-transform duration-300
                rounded-lg w-[350px] h-[230px] mx-auto shadow-md
                flex items-center justify-center
              "
onClick={() =>
  navigate(
    `/products?type=${product.type}${
      ["dog", "cat"].includes(product.type) ? "&category=food" : ""
    }`
  )
}




            >
              <img
                src={product.image}
                alt={product.name}
                className="max-w-full max-h-full object-contain rounded"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default FeaturedProducts;
