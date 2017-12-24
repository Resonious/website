My portfolio site

# Here's how I convert stuff to webp:

``` bash
ffmpeg -i "Gray area preview.mp4" -vcodec libwebp -lossless 1 -q 60 -preset default -loop 0 -an -vsync 0 -threads 3 $WINHOME/Documents/Website/images/gray-area-preview.webp
```

# Video export options

Because OpenShot is a pain and doesn't let me save a custom profile (as far as I can tell), here are some settings I've used (for in case I need to re-export).

## DWTD

```
Factor: 0.85
Width:  612
Height: 435
Aspect: 720:512
Original Width: 720
Original Height: 512
```

## Gray Area

```
Factor: 0.8
Width:  640
Height: 400
Aspect: 8:5
Original Width: 800
Original Height: 500
```

## Breaker

```
Factor: ???
Width:  ???
Height: ???
Aspect: ???
Original Width: 800
Original Height: 600
```
