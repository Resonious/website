This project was my attempt at making a game without using a full blown game engine.
The only third party libraries used were:

* [SDL2](https://www.libsdl.org/index.php) for rendering and raw input/audio,
* [stb\_image](https://github.com/nothings/stb/blob/master/stb_image.h) for decoding PNG files,
* [stb\_vorbis](https://github.com/nothings/stb/blob/master/stb_vorbis.c) for decoding OGG files,
* [MRuby](https://github.com/mruby/mruby) for scripting, and
* [PCG](http://www.pcg-random.org/) for random number generation, because I could.

The collision detection is based on
[the physics in old Sonic the Hedgehog games for Sega Genesis](http://info.sonicretro.org/Sonic_Physics_Guide). 
Basically, every collidable shape is a 32x32-pixel tile represented as four 32-byte "height" maps.
That's one height map for "top-to-bottom", one for "bottom-to-top", one for "left-to-right", and
one for "right-to-left". Then, the character has a handful of one-pixel sensors. If any sensor
overlaps with a collidable tile, it first checks which direction it's moving, and then indexes
into the tile's appropriate height map to see if and where the player should be stopped.
This gives us pixel perfect collision with only 128 bytes per collidable shape!

The game includes online multiplayer using a TCP-based lock step-like system. Clients each have
a big array holding their last several frames of input. They send their input buffers to
the server, and then the server sends back every other input buffer. The nitty-gritty of
this gets a tad crazy, as the server keeps track of every client's position in every _other_
client's input buffer, and if a client is too far behind in running through a remote client's
buffer, it will actually play back at twice the speed until sufficiently caught up.

One of the goals with this project was to try and make the compiled result a single dependenciless
executable. To achieve that, there's a fairly complicated pre-build script in which tilemaps
and collision height maps get turned into C arrays and tossed into a generated `assets.h` file.
All other assets get crammed into a single binary blob, and a bunch of constants with sizes and offsets
get added to `assets.h`. Then on build it uses platform specific features
("resources" for Windows, `ld -r -b binary` for Linux, and `sectcreate` for macOS)
to embed the binary asset blob into the executable on compilation. Unfortunately I was never able to
make the Windows build run without installing the Visual C++ redistributable, but other than
that, it was dependenciless!
