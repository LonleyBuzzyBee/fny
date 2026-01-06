import React, {useState} from 'react'
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

const ImageSlider = ({slides}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const length = slides.length

  const nextSlide = () => {
    setCurrentIndex(currentIndex === length - 3 ? 0 : currentIndex + 1);
  }

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? length - 3 : currentIndex - 1);
  }

  console.log(currentIndex)

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className="slider">
      <FaArrowAltCircleLeft className="left-arrow" onClick={ prevSlide}/>
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide}/>
    </section>

  )
}

export default ImageSlider
