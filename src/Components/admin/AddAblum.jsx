import React, { useState } from "react";
//import toast from "react-hot-toast";
import Spinner from "../../helpers/Spinner";
import {doc,setDoc} from "firebase/firestore";
import { __DB } from "../../backend/firebaseconfig";


const AddAlbum = () => {

  let [album, setAlbum] = useState({
    albumTitle: "",
    albumPoster: null,
    albumreleaseDate: "",
    albumlanguage: "",
    albumdescription: "",
  });

  let initailSongData = {
    songName: "",
    songFile: null,
    songThumbnail: null,
    songSinger: "",
    songMood: "",
    songDirector: "",
  };
  let [songs, setSongs] = useState([initailSongData]);

  let {
    albumTitle,
    albumPoster,
    albumreleaseDate,
    albumlanguage,
    albumdescription,
  } = album;
  let [isloading, setIsLoading] = useState(false);
  let handleAlbumChange = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    setAlbum({ ...album, [key]: value });
  };
  let handleAlbumPosterChange = (e) => {
    let file = e.target.files[0];
    setAlbum({ ...album, albumPoster: file });
  };

  let addSong = () => {
    setSongs([...songs, {...initailSongData}]);
  };

  let removeSong = (ind) => {
    let newSongs = songs.filter((value, index) => index !== ind);
    setSongs(newSongs);
  };
  let handleSongChange = (e, index) => {
    let value = e.target.value;
    let key = e.target.name;
    let copy = [...songs];
    copy[index][key] = value;
    setSongs(copy);
  };

  let handleSongFileChange = (e, index) => {
    let file = e.target.files[0];
    let key = e.target.name;
    let copy = [...songs];
    copy[index][key] = file;
    setSongs(copy);
  };

  let handleAlbumSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let albumPosterData = new FormData();
      albumPosterData.append("file", albumPoster);
      albumPosterData.append("upload_preset", "innovators hub music");
      let posterResponse = await fetch(
        "https://api.cloudinary.com/v1_1/duco4w8im/image/upload",
        {
          method: "POST",
          body: albumPosterData,
        }
      );
      let posterResult = await posterResponse.json();
      console.log(posterResult);
      let albumResultUrl = posterResult.url;
      let albumid=posterResult.asset_id
      let albumData={
        albumid:albumid,
        albumTitle:albumTitle,
        albumPoster:albumResultUrl,
        albumreleaseDate:albumreleaseDate,
        albumlanguage:albumlanguage,
        albumdescription:albumdescription
      }
      console.log(albumData);
      let songData=[]  
   await Promise.all(songs.map(async (value) => {
    let songThumbnailData = new FormData();
    songThumbnailData.append("file", value.songThumbnail);
    songThumbnailData.append("upload_preset", "Innovators hub music");
    let songThumbnailResponse = await fetch(
      "https://api.cloudinary.com/v1_1/duco4w8im/image/upload",
      {
        method: "POST",
        body: songThumbnailData,
      }
    );

    let songThumbnailResult = await songThumbnailResponse.json();
    let songThumbnailUrl = songThumbnailResult.url;
    let songFileData = new FormData();
    songFileData.append("file", value.songFile);
    songFileData.append("upload_preset", "Innovators hub music");
    let songFileResponse = await fetch(
      "https://api.cloudinary.com/v1_1/duco4w8im/video/upload",
      {
        method: "POST",
        body: songFileData,
      }
    );
    let songFileResult = await songFileResponse.json();
    console.log(songFileResult);

    let songFileUrl = songFileResult.url;
    let songFormat = songFileResult.format;
    let songFlieBytes = songFileResult.bytes;
    let songfileId = songFileResult.asset_id;
    let songFileDuration = songFileResult.duration;

    let songPayLoad = {
      songId: songfileId,
      songName: value.songName,
      songURL: songFileUrl,
      songThumbnail: songThumbnailUrl,
      songFormat: songFormat,
      songFlieBytes: songFlieBytes,
      songFileDuration: songFileDuration,
      songSinger: value.songSinger,
      songMood: value.songMood,
      songDirector: value.songDirector,
    };
    songData.push(songPayLoad);
    console.log(songData);
    let payload = { ...albumData, songData };
    console.log(payload);

    let album_collection = doc(__DB, "album_collection", albumData.albumid);
    await setDoc(album_collection, payload);
  })); // Close map and Promise.all
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="h-[100%] w-[100%] bg-[#222222] flex p-6 justify-center">
      <article className="min-h-[800px] w-[75%] bg-[#181818] rounded-xl p-4 relative">
        <h2 className="text-center text-2xl">Add Albums</h2>
        <form className="mt-6 flex flex-col gap-4" onSubmit={handleAlbumSubmit}>
          <h3> Album details</h3>
          <article className="mt-3 flex gap-3 flex-wrap">
            <div className="flex gap-2 flex-col w-[48%]">
              <label
                className=" text-[18px] flex items-center gap-2"
                htmlFor="albumtitle"
              >
                Album title
              </label>
              <input
                type="text"
                id="albumtitle"
                placeholder="Enter album title"
                className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                onChange={handleAlbumChange}
                name="albumTitle"
                value={albumTitle}
              ></input>
            </div>
            <div className="flex gap-2 flex-col w-[48%]">
              <label
                className=" text-[18px] flex items-center gap-2"
                htmlFor="poster"
              >
                Album Poster
              </label>
              <input
                type="file"
                id="poster"
                placeholder="Enter album title"
                name="albumPoster"
                onChange={handleAlbumPosterChange}
                className="outline-none bg-white py-2 px-4 rounded-lg text-black file:bg-blue-200 file:rounded-lg  file:px-3 file:text-black file:border-none file:cursor-pointer"
              ></input>
            </div>
            <div className="flex gap-2 flex-col w-[48%]">
              <label
                className=" text-[18px] flex items-center gap-2"
                htmlFor="releasedate"
              >
                release date
              </label>
              <input
                type="date"
                id="releasedate"
                className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                onChange={handleAlbumChange}
                name="albumreleaseDate"
                value={albumreleaseDate}
              ></input>
            </div>
            <div className="flex gap-2 flex-col w-[48%]">
              <label
                className=" text-[18px] flex items-center gap-2"
                htmlFor="language"
              >
                language
              </label>
              <input
                type="text"
                id="language"
                placeholder="Enter language"
                className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                onChange={handleAlbumChange}
                name="albumlanguage"
                value={albumlanguage}
              ></input>
            </div>
            <div className="flex gap-2 flex-col w-[100%]">
              <label
                className=" text-[18px] flex items-center gap-2"
                htmlFor="description"
              >
                Album details
              </label>
              <textarea
                id="description"
                placeholder="Enter album description"
                className="outline-none bg-white py-2 px-4 rounded-lg text-black w-[98%] h-[100px]"
                onChange={handleAlbumChange}
                name="albumdescription"
                value={albumdescription}
              ></textarea>
            </div>

            {/*  part 2 */}
          </article>
          <h3 className="mt-3 text-xl">song details</h3>
          <article className="mt-3 flex gap-4 flex-col">
            {songs.map((value, index) => {
              return (
                <section key={index} className="bg-slate-800 rounded-lg p-4">
                  <h4 className="text-lg text-center"> song {index + 1}</h4>
                  <main className="flex gap-3 flex-wrap">
                    <div className="flex gap-2 flex-col w-[32%]">
                      <label
                        className=" text-[18px] flex items-center gap-2"
                        htmlFor="songname"
                      >
                        song name
                      </label>
                      <input
                        type="text"
                        id="Songname"
                        placeholder="Enter song name"
                        className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                        value={value.songName}
                        name="songName"
                        onChange={(e) => handleSongChange(e, index)}
                      ></input>
                    </div>
                    <div className="flex gap-2 flex-col w-[32%]">
                      <label
                        className=" text-[18px] flex items-center gap-2"
                        htmlFor="Song file"
                      >
                        song file
                      </label>
                      <input
                        type="file"
                        id="song file"
                        name="songFile"
                        onChange={(e) => handleSongFileChange(e, index)}
                        className="outline-none bg-white py-2 px-4 rounded-lg text-black file:bg-blue-200 file:rounded-lg  file:px-3 file:text-black file:border-none file:cursor-pointer"
                      ></input>
                    </div>
                    <div className="flex gap-2 flex-col w-[32%]">
                      <label
                        className=" text-[18px] flex items-center gap-2"
                        htmlFor="songthumbnail"
                      >
                        song thumbnail
                      </label>
                      <input
                        type="file"
                        id="songthumbnail"
                        name="songThumbnail"
                        onChange={(e) => handleSongFileChange(e, index)}
                        // do not pass value for file attribute
                        placeholder="Enter album title"
                        className="outline-none bg-white py-2 px-4 rounded-lg text-black file:bg-blue-200 file:rounded-lg  file:px-3 file:text-black file:border-none file:cursor-pointer"
                      ></input>
                    </div>
                    <div className="flex gap-2 flex-col w-[32%]">
                      <label
                        className=" text-[18px] flex items-center gap-2"
                        htmlFor="songsinger"
                      >
                        Singers
                      </label>
                      <input
                        type="text"
                        id="songsinger"
                        name="songSinger"
                        value={value.songSinger}
                        onChange={(e) => handleSongChange(e, index)}
                        placeholder="Enter singer name"
                        className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                      ></input>
                    </div>
                    <div className="flex gap-2 flex-col w-[32%]">
                      <label
                        className=" text-[18px] flex items-center gap-2"
                        htmlFor="mood"
                      >
                        mood
                      </label>
                      <input
                        type="text"
                        name="songMood"
                        value={value.songMood}
                        onChange={(e) => handleSongChange(e, index)}
                        id="mood"
                        placeholder="Enter mood/genre"
                        className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                      ></input>
                    </div>
                    <div className="flex gap-2 flex-col w-[32%]">
                      <label
                        className=" text-[18px] flex items-center gap-2"
                        htmlFor="director"
                      >
                        director
                      </label>
                      <input
                        type="text"
                        id="director"
                        name="songDirector"
                        value={value.songDirector}
                        onChange={(e) => handleSongChange(e, index)}
                        placeholder="Enter director name"
                        className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                      ></input>
                    </div>
                    <div className="flex justify-between w-[100%]">
                      <div>
                        {songs.length - 1 === index && (
                          <input
                            type="button"
                            value="Add song"
                            className="py-2 px-4 bg-green-400 rounded-lg cursor-pointer"
                            onClick={addSong}
                          />
                        )}
                      </div>

                      <div>
                        {songs.length > 1 && (
                          <input
                            type="button"
                            value="remove song"
                            className="py-2 px-4 bg-red-400 rounded-lg cursor-pointer"
                            onClick={() => removeSong(index)}
                          />
                        )}
                      </div>
                    </div>
                  </main>
                </section>
              );
            })}
          </article>
          <button className="py-2 w-[98%] rounded-lg cursor-pointer hover:bg-blue-500 bg-[#ff0a8d] mt-4">
            upload album
          </button>
        </form>
      </article>
      {isloading && <Spinner />}
    </section>
  );
};

export default AddAlbum;
