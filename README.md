My portfolio site. Very simple static website using pug.

https://nigelbaillie.me

Build it by running `node index.js`. That'll generate a `build` directory which contains the whole website.

# NOTES TO MYSELF:

## Here's how I convert stuff to webp:

``` bash
ffmpeg -i wrecked-preview.mp4 -vcodec libwebp -lossless 1 -q 60 -preset default -loop 0 -an -vsync 0 -threads 3 $WINHOME/Documents/Website/images/wrecked-preview.webp
```

## And to webm:

``` bash
ffmpeg -i dwtd-good-fixed.mp4 -c:v libvpx -crf 10 -b:v 1M -c:a libvorbis dwtd-good-fixed.webm
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
