/* eslint-disable no-unused-vars */
import React from "react";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AlbumContextAPI } from "../../context/AlbumContext";
import { BsMusicNoteList } from "react-icons/bs";
const AlbumDetails = () => {
  let data = useLocation();
  let {
    state: { album },
  } = data;

  let {
    songs,
    setSongs,
    isPlaying,
    setIsPlaying,
    currentSongIndex,
    setCurrentSongIndex} = useContext(AlbumContextAPI);

    let handleClick=(index)=>{
        setSongs(album.songData)
        setCurrentSongIndex(index)
       if (currentSongIndex === index) {
         setIsPlaying(!isPlaying);
       }else {
            setIsPlaying(true);
        }
    

    }

  return (
    <section className="p-5">
      <article className="flex gap-8">
        <aside className="shrink-0">
          <img
            src={album.albumPoster}
            alt=""
            className="h-[370px] w-[310px] rounded-lg border-4 border-pink-500 shadow-lg"
          />
        </aside>
        <aside className="pt-2 gap-4">
          <h2 className="text-4xl font-serif font-bold ">{album.albumTitle}</h2>
          <ul className="mt-4 flex flex-col gap-3 text-lg">
            <li className="flex">
              <span className="w-[160px] font-semibold">Title :</span>
              <span>{album.albumTitle}</span>
            </li>
            <li className="flex">
              <span className="w-[160px] font-semibold">
                Number of Tracks :
              </span>
              <span>{album.songData.length}</span>
            </li>
            <li className="flex">
              <span className="w-[160px] font-semibold">Release Date :</span>
              <span>{album.albumreleaseDate}</span>
            </li>
            <li className="flex">
              <span className="w-[160px] font-semibold">Language :</span>
              <span>{album.albumlanguage}</span>
            </li>
            <li className="flex">
              <span className="w-[160px] font-semibold shrink-0">
                Description :
              </span>
              <span>{album.albumdescription}</span>
            </li>
          </ul>
        </aside>
      </article>
      <main className={`p-2 mt-4 bg-[slate-800] rounded-lg ${ currentSongIndex !== null && "mb-[120px]"}`}>

      <div className="flex gap-2"> 
  <h1 className="p-4 text-2xl font-bold flex"> 
    <BsMusicNoteList className="mt-1" />
    Song Details
  </h1>
</div>


        <table className="w-full mt-4 text-left overflow-hidden rounded-lg">
          <thead className="bg-pink-500 text-black uppercase">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-2 py-3">Tracks</th>
              <th className="px-2 py-3">Song Name</th>
              <th className="px-2 py-3">Singers</th>
              <th className="px-2 py-3">Directors</th>
              <th className="px-2 py-3">Mood</th>
              <th className="px-2 py-3">Duration</th>
            </tr>
          </thead>
          <tbody className="w-full text-pink-300 ">
            {album.songData.map((songData, index) => (
              <tr
                key={index}
                onClick={() => handleClick(index)}
                className="border-b border-pink-500 hover:bg-pink-700 hover:text-white cursor-pointer transition duration-300"
              >
                <td className="py-2 text-center">{index + 1}</td>
                <td className="py-2 text-center">
                  <img
                    src={songData.songThumbnail}
                    className="h-10 w-[70px] rounded-lg border-2 border-pink-400"
                    alt=""
                  />
                </td>
                <td className="py-2">{songData.songName}</td>
                <td className="py-2">{songData.songSinger}</td>
                <td className="py-2">{songData.songDirector}</td>
                <td className="py-2">{songData.songMood}</td>
                <td className="py-2 text-center">
                  {Math.floor(songData.songFileDuration / 60)}:
                  {Math.floor(songData.songFileDuration % 60)
                    .toString()
                    .padStart(2, "0")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </section>
  );
};

export default AlbumDetails;
