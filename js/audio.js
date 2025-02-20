class AudioPlayer {
  constructor(containerSelector, trackList) {
    this.musicPlayer = document.querySelector(containerSelector);
    this.togglePlayer = this.musicPlayer.querySelector(".toggle-player");
    this.trackInfo = this.musicPlayer.querySelector(".track-info");
    this.trackName = this.musicPlayer.querySelector(".track-name");
    this.trackArtist = this.musicPlayer.querySelector(".track-artist");
    this.trackNav = this.musicPlayer.querySelector(".track-nav");
    this.playPauseBtn = this.musicPlayer.querySelector(".playpause-track");
    this.nextBtn = this.musicPlayer.querySelector(".next-track");
    this.prevBtn = this.musicPlayer.querySelector(".prev-track");
    this.soundBars = this.musicPlayer.querySelector(".sound-bars");

    this.trackIndex = 0;
    this.isPlaying = false;
    this.isHidden = true; // Start hidden
    this.wasPlayingBeforeNext = false;
    this.currentTrack = document.createElement("audio");
    this.currentTrack.id = "audio-player";
    this.trackList = trackList; // Store the track list

    this.soundBarsLottie = bodymovin.loadAnimation({
      container: this.soundBars,
      renderer: "svg",
      loop: true,
      autoplay: false,
      path: "js/audio-ani.json", // Make sure this path is correct
    });

    // No event listeners here - handled in HTML
    this.loadTrack(this.trackIndex);

    // Make methods globally accessible (for onclick in HTML)
    window.playPauseTrack = () => this.playPauseTrack();
    window.nextTrack = () => this.nextTrack();
    window.prevTrack = () => this.prevTrack();
    window.openSpotify = () => this.openSpotify();

    this.togglePlayer.addEventListener("click", () =>
      this.togglePlayerVisibility()
    );
  }

  togglePlayerVisibility() {
    this.isHidden = !this.isHidden;
    if (this.isHidden) {
      this.musicPlayer.classList.add("hide"); // Hide the player
    } else {
      this.musicPlayer.classList.remove("hide"); // Show the player
    }
  }

  loadTrack(trackIndex) {
    this.currentTrack.src = this.trackList[trackIndex].path;
    this.currentTrack.load();
    this.trackName.textContent = this.trackList[trackIndex].name;
    this.trackArtist.textContent = this.trackList[trackIndex].artist;
  }

  playPauseTrack() {
    if (!this.isPlaying) {
      this.playTrack();
    } else {
      this.pauseTrack();
    }
  }

  playTrack() {
    this.currentTrack.play();
    this.isPlaying = true;
    this.playPauseBtn.querySelector("img").src = "images/pauseaudio.png";
    this.soundBarsLottie.playSegments([0, 30], true);
  }

  pauseTrack() {
    this.currentTrack.pause();
    this.isPlaying = false;
    this.playPauseBtn.querySelector("img").src = "images/playaudio.png";
    this.soundBarsLottie.stop();
  }

  nextTrack() {
    if (this.trackIndex < this.trackList.length - 1) {
      this.trackIndex += 1;
    } else {
      this.trackIndex = 0;
    }
    this.loadTrack(this.trackIndex);
    this.playTrack();
  }

  prevTrack() {
    if (this.trackIndex > 0) {
      this.trackIndex -= 1;
    } else {
      this.trackIndex = this.trackList.length - 1;
    }
    this.loadTrack(this.trackIndex);
    this.playTrack();
  }

  openSpotify() {
    window.open(
      "https://open.spotify.com/playlist/0ZZLX7n3iG6qFlkl5KKHsG?si=b9bc0f6c47ea4f03",
      "_blank"
    );
  }

  // Add methods for handling video state changes
  handleVideoStateChange(videoIsPlaying) {
    if (videoIsPlaying) {
      if (this.isPlaying) {
        this.wasPlayingBeforeVideoStart = true;
        this.pauseTrack();
      } else {
        this.wasPlayingBeforeVideoStart = false;
      }
    } else {
      if (this.wasPlayingBeforeVideoStart) {
        this.playTrack();
      }
    }
  }
}
