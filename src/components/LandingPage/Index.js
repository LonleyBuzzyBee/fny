
import 'bootstrap/dist/css/bootstrap.min.css';
import slide1 from '../assets/imgs/blankDropper.jpg';
import slide2 from '../assets/imgs/blankDrooperMultiple.jpg';
import slide3 from '../assets/imgs/lotion.jpg';
import slide4 from '../assets/imgs/foamy.jpg';
import slide5 from '../assets/imgs/pinkMoistureStand.jpg'
import slide6 from '../assets/imgs/pinkMoisture.jpg'
import logoInt from '../assets/imgs/logoNoC.png'
import React, { useState } from 'react';
import Header from '../ReusableComponents/Header'
import LogosSection from '../ReusableComponents/LogosSection'
import Footer from '../ReusableComponents/Footer'
import PopularItems from '../ReusableComponents/PopularItems'
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';
import ProductCard from './ProductCard';

// Product cards data
const productCards = [
  {
    id: 1,
    title: 'CLEANSERS',
    description: 'ojudhnco dlocihn dcljh ndc khjbgk dcjhb gljkd ch j',
    image: slide5,
    route: '/Face'
  },
  {
    id: 2,
    title: 'SERUMS',
    description: 'lorem ipsume ifgjh iueois oo eohoighi ieuhkgrvjnolh Ikjnfvr flovjhljhnuvrf',
    image: slide1,
    route: '/Face'
  },
  {
    id: 3,
    title: 'KITS',
    description: 'Moiey iuchy sdiuch g kuijdy jduyo hj dkjdkjj foifolf fifdl',
    image: slide3,
    route: '/All'
  }
];

// Carousel items for mobile/tablet view
const carouselItems = productCards.map((card, index) => ({
  src: card.image,
  altText: card.title,
  width: "300px",
  height: "500px",
  caption: card.title,
  cardData: card
}));


const LandingPage = ({currentUser}) => {
  // Carousel state for mobile/tablet view
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Handlers for carousel
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === carouselItems.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? carouselItems.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = carouselItems.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <ProductCard
          title={item.cardData.title}
          description={item.cardData.description}
          image={item.cardData.image}
          buttonText="SHOP NOW"
          route={item.cardData.route}
        />
      </CarouselItem>
    );
  });


  return (
    <div className="full-width-container">
         <Header/>
      <main className="landingMain">
        <div className="introDiv-border">
          <div className="introDiv">
            <img className="intro" src={logoInt} alt="fny logo" />
            <h5 className="intro-p">Fresh New You</h5>
            <button id="coverButton"><a id="landingLink"href="/list">SHOP NOW</a></button>
          </div>
        </div>
      </main>

      <section className="products-section">
        <h2 className="products-section-heading">Discover different Products for your new routine</h2>
        
        {/* Desktop: Three cards side by side */}
        <div className="products-cards-container">
          {productCards.map((card) => (
            <ProductCard
              key={card.id}
              title={card.title}
              description={card.description}
              image={card.image}
              buttonText="SHOP NOW"
              route={card.route}
            />
          ))}
        </div>

        {/* Tablet/Mobile: Single carousel */}
        <div className="products-carousel-container">
          <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
          >
            <CarouselIndicators 
              className="carouselIndicators" 
              items={carouselItems} 
              activeIndex={activeIndex} 
              onClickHandler={goToIndex} 
            />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
          </Carousel>
        </div>
      </section>

      <PopularItems />

      <LogosSection />
      <Footer />
    </div>
    
  );
}

export default LandingPage;