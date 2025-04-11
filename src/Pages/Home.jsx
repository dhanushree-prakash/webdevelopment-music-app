import React, { useContext } from 'react'
// import { AlbumContextAPI } from '../context/AlbumContext'

import { Outlet } from 'react-router-dom';
import { AlbumContextAPI } from '../context/AlbumContext';
import CustomAudioPlayer from 'react-pro-audio-player';
import SideBar from '../Components/Home/SideBar';

const Home = () => {
  // let {albums}=useContext(AlbumContextAPI)
  // console.log(albums);
      let {songs,isPlaying,setIsPlaying,currentSongIndex,setCurrentSongIndex}=useContext(AlbumContextAPI)
  return (
    <>
  <div className='flex bg-slate-900 min-h-[calc(100vh-70px)]'>
    <SideBar/>
    

     <Outlet/>
 
  </div>
  {currentSongIndex !== null && (
    <div className='fixed bottom-0 left-0 w-full bg-[#0e0e0e] p-4 shadow-lg '>
        <CustomAudioPlayer
          songs={songs}
          isPlaying={isPlaying}
          currentSongIndex={currentSongIndex}
          onPlayPauseChange={setIsPlaying}
          onSongChange={setCurrentSongIndex}
          songUrlKey="songURL"
          songNameKey="songName"
          songThumbnailKey="songThumbnail" 
          songSingerKey="songSingers"
        />
    </div>
      )}
  </>

  )
}

export default Home