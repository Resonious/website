The goal here is "remote presence". I want to "be" somewhere that I'm not.
On the remote end, there's a camera with a "neck" that can look around. On
the local end, a VR headset. Put on the headset to see what the camera sees -
and you can turn your head.

<video controls type="video/webm" src="/videos/teleport-preview-full.webm"></video>

Very fast over my local network!
The video streaming is WebRTC, the VR part THREEjs. This combo works amazingly
well - WebRTC "just works" and makes it trivial to set up video streaming. THREE
makes it painfully simple to [pipe a WebRTC video into a texture](https://threejs.org/docs/index.html#api/en/textures/VideoTexture)
and render it in VR.

The camera "robot" is just a couple of servos hooked into a Raspberry Pi. The
servos are controlled via the [RPPAL Rust library](https://github.com/golemparts/rppal).
Right now, I'm doing the robot-side WebRTC also through the browser. This is
super easy but annoying for the following reasons:

* 👍 Easy camera access
* 👍 Easy WebRTC
* 👎 Firefox *requires* a display in order to access the camera
* 👎 Browser can't access GPIO, so I need to run a localhost server for controlling the servos

The first 👎 point sucks because I'd like the camera part to run headless. Requiring a display
means I need to power the pi *and the display*, and then the display doesn't show anything.

The second 👎 point hasn't caused any tangible problems, but it feels very bloated to have TCP
communication between receiving head orientation and sending it to the servos. It's the exact
same machine doing both things after all.

My next goal is to see if I can eliminate the 👎 points by doing the WebRTC stuff by hand.
This'll take some time so we'll see if I get to it.
