[![Netlify Status](https://api.netlify.com/api/v1/badges/9851dca3-1042-4553-8a88-bfcc7731df17/deploy-status)](https://app.netlify.com/sites/nigelbaillie/deploys)

My portfolio site. Very simple static website using pug.

https://nigelbaillie.me (maybe https://baillie.dev?)

Build it by running `node index.js`. That'll generate a `build` directory which contains the whole website.

# TODO

(shared/head.pug) get a hash of style.css for style-src

# NOTES TO MYSELF:

## Slicing and gray overlay all with ffmpeg!

``` bash
# -ss = start time
# -t  = duration
# -an = no audio
ffmpeg -i corgi-fishing-demo-1.mov -ss 00:05 -t 4 -threads 3 -an \
  -filter_complex 'color=color=gray@.4:size=990x800 [over]; [0:v][over] overlay' \
  $WINHOME/Documents/Website/images/corgi-preview.webm
```

## Here's how I convert stuff to webp:

``` bash
ffmpeg -i wrecked-preview.mp4 -vcodec libwebp -lossless 1 -q 60 -preset default -loop 0 -an -vsync 0 -threads 3 $WINHOME/Documents/Website/images/wrecked-preview.webp
```

## And to webm:

``` bash
ffmpeg -i dwtd-good-fixed.mp4 -c:v libvpx -crf 10 -b:v 1M -c:a libvorbis dwtd-good-fixed.webm
```

## And to apng:

(Use FFMPEG 3.4+ for this)

``` bash
ffmpeg -i breaker-preview.mp4 -plays 0 -threads 3 $WINHOME/Documents/Website/images/breaker-preview.apng
```

## Video export options

Because OpenShot is a pain and doesn't let me save a custom profile (as far as I can tell), here are some settings I've used (for in case I need to re-export).

### DWTD

```
Factor: 0.85
Width:  612
Height: 435
Aspect: 720:512
Original Width: 720
Original Height: 512
```

### Gray Area

```
Factor: 0.8
Width:  640
Height: 400
Aspect: 8:5
Original Width: 800
Original Height: 500
```

### Breaker

```
Factor: ???
Width:  ???
Height: ???
Aspect: ???
Original Width: 800
Original Height: 600
```
