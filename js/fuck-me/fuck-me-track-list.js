const fuckMeTracklist = [
  {
    name: "Boxing Day",
    artist: "Car Seat Headrest",
    path: "audio/Boxing_Day.mp3",
  },
  {
    name: "Spoiled",
    artist: "Folk Implosion",
    path: "audio/Spoiled.mp3",
  },
  {
    name: "Drunk Drivers/Kill...",
    artist: "Car Seat Headrest",
    path: "audio/Drunk_Drivers.mp3",
  },
  {
    name: "Something Soon",
    artist: "Car Seat Headrest",
    path: "audio/something_soon.mp3",
  },
];

const fuckMePlayer = new AudioPlayer(
  ".music-player-container",
  fuckMeTracklist
);

window.handleVideoStateChange = function (videoIsPlaying) {
  fuckMePlayer.handleVideoStateChange(videoIsPlaying);
};
