const halloAsliTracklist = [
  {
    name: "Crockpot",
    artist: "Slothtrust",
    path: "audio/Crockpot.mp3",
  },
  {
    name: "Dog Song 2",
    artist: "Voxtrot",
    path: "audio/Dog_Song_2.mp3",
  },
  {
    name: "Dont Bother Me",
    artist: "Scott and Charl...",
    path: "audio/Dont_Bother_Me.mp3",
  },
];

const halloAsliPlayer = new AudioPlayer(
  ".music-player-container",
  halloAsliTracklist
);

window.handleVideoStateChange = function (videoIsPlaying) {
  halloAsliPlayer.handleVideoStateChange(videoIsPlaying);
};
