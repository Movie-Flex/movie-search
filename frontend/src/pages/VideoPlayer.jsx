import React, { useEffect } from 'react';
import Hls from 'hls.js';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import './Player.css';

const VideoPlayer = () => {
  useEffect(() => {

    // document.getElementById('backButton').addEventListener('click', function() {
    //     // Example: navigate back
    //     window.history.back();
        
    //     // Or, for custom behavior, replace the above with your own logic
    // });

    const video = document.getElementById('player');
    const source = "https://firebasestorage.googleapis.com/v0/b/opensoft-mflix.appspot.com/o/samplevideo1%2Fmaster_tier2.m3u8?alt=media";

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(source);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        const availableQualities = hls.levels.map(level => level.height);
        // const player = new Plyr('#player');

        const defaultOptions = {
          controls: [
            'play-large', 'restart', 'rewind', 'play', 'fast-forward', 'progress',
            'current-time', 'duration', 'mute', 'volume', 'captions', 'settings',
            'pip', 'airplay', 'fullscreen'
          ],
          quality: {
            default: availableQualities[0],
            options: availableQualities,
            forced: true,
            onChange: (newQuality) => updateQuality(newQuality, hls)
          }
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
      <video id="player" style={{height:'100vh'}} controls></video>
      {/* <button id="backButton" class="back-button">Back</button> */}
    </div>
  );
};

export default VideoPlayer;

// import React, { useEffect, useRef } from 'react';
// import Hls from 'hls.js';
// import Plyr from 'plyr';
// import 'plyr/dist/plyr.css';

// const VideoPlayer = () => {
//     const videoRef = useRef(null);

//     useEffect(() => {
//         const video = videoRef.current; // Ensuring video ref is current DOM element
//         let hls; // Define hls at a higher scope to be accessible in the cleanup function

//         if (Hls.isSupported()) {
//             hls = new Hls(); // Initialize hls
//             hls.loadSource("https://firebasestorage.googleapis.com/v0/b/opensoft-mflix.appspot.com/o/samplevideo1%2Fmaster.m3u8?alt=media");
//             hls.attachMedia(video);
//             hls.on(Hls.Events.MANIFEST_PARSED, () => {
//                 new Plyr(video, {
//                     controls: [
//                         'play-large', 'restart', 'rewind', 'play', 'fast-forward', 'progress',
//                         'current-time', 'duration', 'mute', 'volume', 'captions', 'settings',
//                         'pip', 'airplay', 'fullscreen',
//                     ],
//                 });
//             });

//             // Example of error handling for HLS.js
//             hls.on(Hls.Events.ERROR, function (event, data) {
//                 if (data.fatal) {
//                     switch (data.type) {
//                         case Hls.ErrorTypes.NETWORK_ERROR:
//                             // Try to recover network error
//                             console.error("Network error encountered", data);
//                             hls.startLoad();
//                             break;
//                         case Hls.ErrorTypes.MEDIA_ERROR:
//                             console.error("Media error encountered", data);
//                             hls.recoverMediaError();
//                             break;
//                         default:
//                             // Cannot recover
//                             hls.destroy();
//                             break;
//                     }
//                 }
//             });
//         } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
//             video.src = "https://firebasestorage.googleapis.com/v0/b/opensoft-mflix.appspot.com/o/samplevideo1%2Fmaster.m3u8?alt=media";
//             video.addEventListener('loadedmetadata', () => {
//                 new Plyr(video, {
//                     controls: [
//                         'play-large', 'restart', 'rewind', 'play', 'fast-forward', 'progress',
//                         'current-time', 'duration', 'mute', 'volume', 'captions', 'settings',
//                         'pip', 'airplay', 'fullscreen',
//                     ],
//                     quality: {
//                         default: availableQualities[0],
//                         options: availableQualities,
//                         forced: true,
//                         onChange: (newQuality) => updateQuality(newQuality, hls)
//                     }
//                 });
//             });
//         }

//         // Cleanup function to run when the component unmounts
//         return () => {
//             if (hls) {
//                 hls.destroy();
//             }
//         };
//     }, []);

//     return (
//         <div style={{ height: '400px' }}>
//             <video ref={videoRef} controls></video>
//         </div>
//     );
// };

// export default VideoPlayer;


