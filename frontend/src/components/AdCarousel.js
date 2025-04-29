import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const ads = [
  {
    img: 'https://furiagg.fbitsstatic.net/img/p/camiseta-oficial-furia-adidas-preta-150265/337491-1.jpg?w=360&h=360',
    alt: 'Camisa Oficial',
    text: 'Promoção Camisa Oficial',
    link: 'https://www.furia.gg/produto/camiseta-oficial-furia-adidas-preta-150265'
  },
  {
    img: 'https://furiagg.fbitsstatic.net/img/p/moletom-my-hero-academia-x-furia-bakugo-preto-150232/337269-1.jpg?w=360&h=360',
    alt: 'Moletom My Hero Academia x Furia Bakugo Preto',
    text: 'Moletom My Hero Academia x Furia Bakugo Preto',
    link: 'https://www.furia.gg/produto/moletom-my-hero-academia-x-furia-bakugo-preto-150232'
  },
  {
    img: 'https://furiagg.fbitsstatic.net/img/p/cropped-furia-clutch-branco-150196/337008-1.jpg?w=360&h=360',
    alt: 'Cropped Furia Clutch Branco',
    text: 'Cropped Furia Clutch Branco',
    link: 'https://www.furia.gg/produto/cropped-furia-clutch-branco-150196'
  }
];

const AdCarousel = () => {
  return (
    <div className="ad-item">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 4000 }}
        loop
        spaceBetween={10}
        slidesPerView={1}
        >
        {ads.map((ad, idx) => (
            <SwiperSlide key={idx}>
            <a href={ad.link} target="_blank" rel="noopener noreferrer">
              <img
                src={ad.img}
                alt={ad.alt}
                />
              <p style={{ color: 'white' }}>{ad.text}</p>
            </a>
          </SwiperSlide>
        ))}
        </Swiper>
    </div>
  );
}

export default AdCarousel;