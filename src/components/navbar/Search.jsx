import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEventListSearch } from '../store/search/searchAction.js';
import { useDispatch, useSelector } from 'react-redux'

const Search = () => {
    const [userSearch, setUserSearch] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [openResult, setOpenResult] = useState(false)

    const onCHangeHandler = (event) => {
        setUserSearch(event.target.value)
        setOpenResult(true)
    }

    useEffect(() => {
        dispatch(getEventListSearch(userSearch))
    }, [userSearch])

    const searchList = useSelector(state => state.search.searchList)
    const onSubmitHandler = async () => {
        navigate(`/events/keys/${userSearch}`)
        setUserSearch("")
    }
    return (
        <>
            <div className='w-100'>
                <div className='search_outer_div'>
                    <div className='search_div'>
                        <input type="text" className='search_box' onChange={onCHangeHandler} value={userSearch} placeholder='Search Movies...' />
                        <button className='search_button' onClick={onSubmitHandler}><i className="bi bi-search"></i></button>
                    </div>
                    {openResult && userSearch !== '' && <div className='search_result_div'>
                        {searchList.map((event, index) => {
                            return <div className='search_result' key={index} onClick={() => { setUserSearch(''); navigate(`/event-page/${event._id}`) }}>{event.name}</div>
                        })}
                    </div>}
                </div>

            </div>
        </>
    );
}

export default Search;