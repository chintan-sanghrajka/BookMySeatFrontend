import React, { useEffect } from 'react'
import NewCarousel from './NewCarousel.jsx'
import { Container } from 'react-bootstrap'
import HomeDisplay from './HomeDisplay.jsx'
import icc_banner from './../../media/home/icc_banner.avif'
import stream_banner from './../../media/home/stream_banner.avif'
import { getHomeMovies, getHomeSports, getHomeEvents, getCategories } from '../store/home/homeActions.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])
    const categories = useSelector(state => state.home.categories)
    useEffect(() => {
        if (categories.length !== 0) {
            dispatch(getHomeMovies(categories[0]._id))
            dispatch(getHomeSports(categories[3]._id))
            dispatch(getHomeEvents(categories[2]._id))
        }
    }, [dispatch, categories])

    const moviesList = useSelector(state => state.home.moviesList)
    const sportsList = useSelector(state => state.home.sportsList)
    const eventsList = useSelector(state => state.home.eventsList)

    return (
        <>
            <NewCarousel />
            <div>
                <Container>
                    <div className='home_banner'>
                        <img src={icc_banner} alt="" className='w-100 h-100' />
                    </div>
                    <div className='home_sections'>
                        <div className='home_section_title_div'>
                            <h2 className='home_heading font_roboto'>Recommended Movies</h2>
                            <button className='home_see_all font_roboto' onClick={() => { navigate(`/events/cat/${categories[0]._id}`) }}>See All<i className="bi bi-chevron-right ms-2"></i></button>
                        </div>
                        <HomeDisplay props={{ eventList: moviesList, location: false }} />
                    </div>
                    <div className='home_banner'>
                        <img src={stream_banner} alt="" className='w-100 h-100' />
                    </div>
                    <div className='home_sections'>
                        <div className='home_section_title_div'>
                            <h2 className='home_heading font_roboto dark_text'>ICC MEN'S CWC & Other Sports</h2>
                            <button className='home_see_all font_roboto' onClick={() => { navigate(`/events/cat/${categories[3]._id}`) }}>See All<i className="bi bi-chevron-right ms-2"></i></button>
                        </div>
                        <HomeDisplay props={{ eventList: sportsList, location: true }} />
                    </div>
                    <div className='home_sections'>
                        <div className='home_section_title_div'>
                            <h2 className='home_heading font_roboto'>Live Events</h2>
                            <button className='home_see_all font_roboto' onClick={() => { navigate(`/events/cat/${categories[2]._id}`) }}>See All<i className="bi bi-chevron-right ms-2"></i></button>
                        </div>
                        <HomeDisplay props={{ eventList: eventsList, location: true }} />
                    </div>
                </Container>

            </div>
        </>
    )
}

export default Home