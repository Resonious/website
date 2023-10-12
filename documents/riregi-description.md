This was for my wife's small pop-up restaurant business. She tracks a lot on paper,
which is usually fine. The one thing that felt like it'd have a big impact was making change.
She uses a calculator to help with that, and it's rather error-prone. There are definitely
a million existing apps for this already, but most of them can't beat the speed of calculator + paper.
This app barely manages to speed things up.

On the technical side, I had a bit of fun with how this stores data. Rather than using SQLite like everyone else, I decided
to operate on basic binary data structures within a few mmap'd files. Mmapping means that the OS handles
saving to disk without me having to worry about it. Accessing _live_ data is a simple pointer dereference, and
does not require querying. This results in much less copying and duplicating information, as the front-end (Flutter)
can simply read the live data while building the UI, and modifications are automatically committed without any fancy
framework.

I wrote this "data layer" in Zig. Zig is perfect for this kind of thing - it provides very easy access
to basic OS and hardware features in a way that's much safer than C, and much simpler than Rust. The Zig code
compiles into a dynamic library, which is loaded by [Dart FFI](https://dart.dev/guides/libraries/c-interop).
This is another thing Zig is great at - cross compilation (though Rust is pretty good at this too). It's
pretty easy to build ARM binaries from my laptop, and even better I don't need the NDK since the Zig standard library
is enough for just bit pushing!
