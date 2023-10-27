I moved to Japan in 2019 and took learning the language pretty seriously. One thing that made it really
hard to study was the very slow feedback loop of seeing an unknown word and being able to look up
what it is. If it's on a digital screen, no problem - I can usually copy/paste. If it's on a piece of
paper, I'm screwed. This app lets me do a quick OCR scan of any text, then lets me look up the words
one at a time.

### Doesn't Google Translate already let you do this?

Well, kind of. The problem is, Google Translate just spits out English, which is barely useful when
learning a language where writing and reading aren't one-to-one. I want a proper dictionary that
tells me readings and nuanced meaning.

### So how does it work?

Dictionarian is a pretty simple wrapper around Google's OCR API. In fact, despite the name, there is no dictionary feature at all.
When you scan and tap a word, it opens the Android "share" dialog for that word. This lets me use another app as a dictionary - specifically
[Chase Colburn's Kanji Study app](https://play.google.com/store/apps/details?id=com.mindtwisted.kanjistudy&hl=en_US).
Kanji Study is amazing, easily deserving the 4.8 stars it has on Google Play.

### How is it built?

This Dictionarian app is built in Kotlin using Jetpack Compose for UI. I had already done Android dev and Kotlin
before on separate occasions, but Compose was new to me. Felt like a "reactification" of the old Android
UI component system. As you can see in the video, it gets pretty sluggish when dealing with an entire page of a book.
Maybe I just wasn't doing it right, but I suspect Flutter would've performed better with a similarly naive implementation.

### Can I download it?

I haven't published it. If you're interested, [send me an email](mailto:nigel@baillie.dev).