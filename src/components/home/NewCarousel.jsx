import React, { useState } from 'react';
import carouselImage1 from './../../media/home/carousel-image1.webp';
import carouselImage2 from './../../media/home/carousel-image2.webp';
import carouselImage3 from './../../media/home/carousel-image3.jpeg';
import carouselImage4 from './../../media/home/carousel-image4.jpg';

const NewCarousel = () => {
    const [selectedNavIndex, setSelectedNavIndex] = useState(0);
    const images = [
        {
            url: carouselImage1
        },
        {
            url: carouselImage2
        },
        {
            url: carouselImage3
        },
        {
            url: carouselImage4
        }
    ]
    const [index, setIndex] = useState(0);

    const prevImage = () => {
        if (index === 0) {
            setIndex(images.length - 1);
            setSelectedNavIndex(images.length - 1)
        }
        else {
            setIndex(index - 1);
            setSelectedNavIndex(index - 1)
        }
    }
    const nextImage = () => {
        if (index === images.length - 1) {
            setIndex(0);
            setSelectedNavIndex(0)
        }
        else {
            setIndex(index + 1);
            setSelectedNavIndex(index + 1);
        }
    }

    const navControlImage = (index) => {
        setSelectedNavIndex(index)
        setIndex(index)
    }
    const slideStyles = {
        transform: `translateX(-${index * 100}%)`,
        transition: 'transform 0.5s ease'
    }

    return (
        <>
            <div className='carousel_outer_div'>
                <div className='carousel_slides' style={slideStyles}>
                    {images.map((element, index) => (
                        <img key={index} src={element.url} alt="" className='carousel_slide' />
                    ))}
                </div>
                <div className='carousel_control_div carousel_left transition_effect' onClick={prevImage}>
                    <i className="bi bi-chevron-left"></i>
                </div>
                <div className='carousel_control_div carousel_right transition_effect' onClick={nextImage}>
                    <i className="bi bi-chevron-right"></i>
                </div>
                <div className='carousel_nav_div'>
                    {
                        images.map((element, index) => {
                            return <div className={`carousel_navs ${selectedNavIndex === index ? 'carousel_nav_active' : ''}`} onClick={() => navControlImage(index)} key={index}></div>
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default NewCarousel;