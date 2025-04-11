import React, { useContext } from 'react'
import { AlbumContextAPI } from '../../context/AlbumContext'
import Spinner from '../../helpers/Spinner'
import { NavLink } from 'react-router-dom'

const Dashboard = () => {
    const { Isloading, albums } = useContext(AlbumContextAPI)

    return (
        <div className='p-8 w-[80%] bg-gradient-to-r from-blue-950 to-pink-900  '>
            <h2 className='text-4xl font-bold font-serif text-white'> ALBUMS</h2>

            <section className='mt-6 flex gap-6 overflow-x-auto scrollbar-hide p-2'>
                {albums.map((album) => (
                    <NavLink
                        to="/album-details"
                        state={{ album }}
                        key={album.albumId}
                        className='p-4 w-[200px] bg-white rounded-xl shadow-lg flex flex-col items-center shrink-0 transform transition-transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100'
                    >
                        <img
                            src={album.albumPoster}
                            alt='Album Poster'
                            className='w-[160px] h-[210px] rounded-lg object-cover shadow-md'
                        />
                        <h3 className='mt-3 text-md text-center font-semibold text-lg text-gray-800'>
                            {album.albumTitle}
                        </h3>
                    </NavLink>
                ))}
            </section>

            {Isloading && <Spinner />}
        </div>
    )
}

export default Dashboard
