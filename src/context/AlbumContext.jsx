import { collection, getDocs } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { __DB } from "../backend/firebaseconfig";

// eslint-disable-next-line react-refresh/only-export-components
export const AlbumContextAPI = createContext();
let AlbumProvider = (props) => {
  let [albums, setAlbum] = useState([]);
  let [Isloading, setIsLoading] = useState(false);

  const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);

  useEffect(() => {
    let fetchAlbums = async () => {
      try {
        setIsLoading(true);

        let album_collection = collection(__DB, "album_collection");
        let albumSnapshot = await getDocs(album_collection);
        let albumList = albumSnapshot.docs.map((doc) => doc.data());
        console.log(albumList);
        setAlbum(albumList);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  return (
    <AlbumContextAPI.Provider
      value={{
        albums,
        Isloading,
        songs,
        setSongs,
        isPlaying,
        setIsPlaying,
        currentSongIndex,
        setCurrentSongIndex
      }}
    >
      {props.children}
    </AlbumContextAPI.Provider>
  );
};

export default AlbumProvider;
