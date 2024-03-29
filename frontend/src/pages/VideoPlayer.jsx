import React, { useEffect, useState } from 'react';
import Hls from 'hls.js';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
//import './Player.css';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useParams } from 'react-router-dom';
import { Audio } from 'react-loader-spinner';
const VideoPlayer = () => {
  const [loading, setLoading] = useState(true); // State to manage loading
  const userdata = useContext(UserContext);
  const params = useParams();
 
  const index = Number(params.index);
  useEffect(() => {

    // document.getElementById('backButton').addEventListener('click', function() {
    //     // Example: navigate back
    //     window.history.back();
        
    //     // Or, for custom behavior, replace the above with your own logic
    // });
    let tier = 3;
    if(userdata.subscription==="premium"){
      tier=2;
    } else if (userdata.subscription==="diamond"){
      tier =1;
    }
    const video = document.getElementById('player');
    let source;
    if(tier===3){
      source = `https://firebasestorage.googleapis.com/v0/b/opensoft-mflix.appspot.com/o/samplevideo${index+5}%2Fmaster_free.m3u8?alt=media`
    } else {
      source =
      `https://firebasestorage.googleapis.com/v0/b/opensoft-mflix.appspot.com/o/samplevideo${index}%2Fmaster_tier${tier}.m3u8?alt=media`;
    }
     
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(source);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        setLoading(false);
        const availableQualities = hls.levels.map(level => level.height);
        // const player = new Plyr('#player');

        const defaultOptions = {
          controls: [
            'play-large',
            'restart',
            'rewind',
            'play',
            'fast-forward',
            'progress',
            'current-time',
            'duration',
            'mute',
            'volume',
            'captions',
            'settings',
            'pip',
            'airplay',
            'fullscreen',
          ],
          quality: {
            default: availableQualities[0],
            options: availableQualities,
            forced: true,
            onChange: (newQuality) => updateQuality(newQuality, hls),
          },
        };

        new Plyr(video, defaultOptions);
      });
      hls.attachMedia(video);
      window.hls = hls;
    }

    function updateQuality(newQuality, hlsInstance) {
      hlsInstance.levels.forEach((level, levelIndex) => {
        if (level.height === newQuality) {
          hlsInstance.currentLevel = levelIndex;
        }
      });
    }
  }, []);

  return (
    <div style={{ height: '100vh' }}>
    {loading && ( // Display loader when loading state is true
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Audio
          type="ThreeDots"
          color="#00BFFF"
          height={80}
          width={80}
          timeout={0} // Remove the timeout
        />
      </div>
    )}
    <video
      id="player"
      controls
      style={{ visibility: loading ? 'hidden' : 'visible', height:"100vh"}} // Hide video while loading
    ></video>
  </div>
  );
};

export default VideoPlayer;
