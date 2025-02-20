// Define the track list for this page
const loveMeTracklist = [
  {
    name: "Beach Life-In-Death",
    artist: "Car Seat Headrest",
    path: "audio/Car+Seat+Headrest+-+_Beach+Life-In-Death_+(Official+Audio).mp3",
  },
  {
    name: "Missing Pieces",
    artist: "Voxtrot",
    path: "audio/MissingPiecesVoxtrot.mp3",
  },
];

const player1 = new AudioPlayer(".music-player-container", loveMeTracklist);

window.handleVideoStateChange = function (videoIsPlaying) {
  player1.handleVideoStateChange(videoIsPlaying);
};
