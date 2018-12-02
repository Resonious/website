var slideshow = remark.create({
  slideNumberFormat: '%current%'
});


// Play media on number key press
document.addEventListener('keypress', (event) => {
  var num = parseInt(event.key);

  if (num == 0) {
    var iframe = document.getElementsByTagName("iframe")[0];
    if (iframe == null)
      return;

    var vimeo = new Vimeo.Player(iframe);
    vimeo.getPaused().then(paused => {
      if (paused)
        vimeo.play();
      else
        vimeo.pause();
    })
  }
  else if (num > 0 && num <= 9) {
    var audios = document.querySelectorAll('.remark-visible audio');
    var audio = audios[num-1];

    if (audio != null)
      if (audio.paused)
        audio.play();
      else
        audio.pause();
  }
});
