
import 'bootstrap/dist/css/bootstrap.min.css';
import slide1 from '../assets/imgs/blankDropper.jpg';
import slide2 from '../assets/imgs/blankDrooperMultiple.jpg';
import slide3 from '../assets/imgs/lotion.jpg';
import slide4 from '../assets/imgs/foamy.jpg';
import slide5 from '../assets/imgs/pinkMoistureStand.jpg'
import slide6 from '../assets/imgs/pinkMoisture.jpg'
import logoInt from '../assets/imgs/logoNoC.png'
import vegan from '../assets/imgs/vegan.png'
import sulfate from '../assets/imgs/sulfate.png'
import derm from '../assets/imgs/derm.png'
import cruelty from '../assets/imgs/cruelty.png'
import React, { useState } from 'react';
import Header from '../ReusableComponents/Header'
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';

const items = [
  {
    src: `${ slide1 }`,
    altText: 'Slide 1',
    width: "300px",
    height: "500px",
    caption: 'SERUMS'
  },
  {
    src: `${ slide2 }`,
    altText: 'SERUMS',
    width: "300px",
    height: "500px",
    caption: 'SERUMS'
  },
];
const items2 = [
  {
    src: `${ slide3 }`,
    altText: 'Slide 1',
    width: "300px",
    height: "500px",
    caption: 'SKINCARE KITS'
  },
  {
    src: `${ slide4 }`,
    altText: 'Slide 2',
    width: "300px",
    height: "500px",
    caption: 'SKINCARE KITS'
  },

];
const items3 = [
  {
    src: `${ slide5 }`,
    altText: 'Slide 1',
    width: "300px",
    height: "500px",
    caption: 'CLEANSERS'
  },
  {
    src: `${ slide6 }`,
    altText: 'Slide 2',
    width: "300px",
    height: "500px",
    caption: 'CLEANSERS'
  },
];


const LandingPage = ({currentUser}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} width={item.width} height={item.height}/>
        <CarouselCaption style={{color:"black"}} captionHeader={item.caption} captionText="" />
      </CarouselItem>
    );
  });
  const slides2 = items2.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} width={item.width} height={item.height}/>
        <CarouselCaption captionHeader={item.caption} captionText="" />
      </CarouselItem>
    );
  });
  const slides3 = items3.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} width={item.width} height={item.height}/>
        <CarouselCaption captionHeader={item.caption} captionText="" />
      </CarouselItem>
    );
  });


  return (
    <div>
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

      <section className="caroselSection">
        <Carousel className="caro"
          activeIndex={activeIndex}
          next={next}
          previous={previous}
          >
          <CarouselIndicators className="carouselIndicators" items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
        
        <Carousel className="caro"
          activeIndex={activeIndex}
          next={next}
          previous={previous}
          >
          <CarouselIndicators className="carouselIndicators" items={items2} activeIndex={activeIndex} onClickHandler={goToIndex} />
          {slides2}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
   

        <Carousel className="caro"
          activeIndex={activeIndex}
          next={next}
          previous={previous}
          >
          <CarouselIndicators className="carouselIndicators" items={items3} activeIndex={activeIndex} onClickHandler={goToIndex} />
          {slides3}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
      </section>

      <div className="caroButtonSection">
        <button className="caroButton b1">SHOP NOW</button>
        <button className="caroButton b2">SHOP NOW</button>
        <button className="caroButton">SHOP NOW</button>
      </div>

      <section className="logos-section">
        <img className="crueltyFreeLogos" src={vegan} alt="crulty free logos" />
        <img className="crueltyFreeLogos" src={sulfate} alt="crulty free logos" />
        <img className="crueltyFreeLogos" src={cruelty} alt="crulty free logos" />
        <img className="crueltyFreeLogos" src={derm} alt="crulty free logos" />
        
      </section>
    {/* </Layout> */}
    </div>
    
  );
}

export default LandingPage;