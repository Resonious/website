document.addEventListener('DOMContentLoaded', function() {
  for (var element of document.getElementsByClassName('video-block')) {
    element.addEventListener('mouseenter', playVideo);
    element.addEventListener('mouseleave', pauseVideo);
  }
});



function playVideo(event) {
  for (var video of event.target.getElementsByTagName('video'))
    video.play();
}

function pauseVideo(event) {
  for (var video of event.target.getElementsByTagName('video'))
    video.pause();
}
