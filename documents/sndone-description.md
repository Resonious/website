This is not so different from requestbin or [webhook.site](https://webhook.site).
The main difference is that [hook.snd.one](https://hook.snd.one) is much simpler.
In addition, you can also listen from CURL. Just curl any URL with GET, and then
all POSTs will show up in your terminal.

[hook.snd.one](https://hook.snd.one) also supports the browser's [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource) API,
meaning it can be used to push messages from back-end to front-end in real time. The original purpose
of this project was just to inspect webhooks, but I've since used it as a signalling server for WebRTC in another project.
I'm pretty happy with how versatile this ended up.

This project is written in Rust using [Hyper](https://docs.rs/hyper/latest/hyper/) with minimal supporting libraries.
The live deployment serves HTTPS requests directly using Rustls with no load balancer. This makes it easier to serve
indefinitely running requests.
