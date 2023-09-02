# Do we need new tools for web dev?

First let me be clear: I'm one of those web devs that is obsessed with systems programming. I like being close to the metal. Despite this, I work in web, which is generally not very close to the metal. But I wonder if it should be. That's the topic here.

There's a common rule of thumb in web dev: web servers are I/O bound, and most of the time is spent in the database. This applies to tests as well. In fact, FactoryBot, popular fixtures library for Rails and RSpec, has a function called `build_stubbed` which exists solely to avoid hitting the database in the interest of faster tests.

Here's the problem: I'm dealing with a very large Rails app, and many of the model unit tests take about half a second each to execute. This is astonishing when you compare to a new project where the *entire test suite* can finish in half a second, even with 100s of tests. I hooked this project's test suite up to `ruby-prof` to see where all the time was spent. I didn't get a single method over 10%.

When no single method takes more than 10% of the total time, it's hard for me to know where to optimize. It's demoralizing when you realize that even if you *removed all database interaction*, your app would see a speedup of *less than a 10%*. If my database-bound web app is only spending 10% of the time in the database, *what on earth is the other 90%??*

I hooked this program up to [a proper visual tracer](https://github.com/wolfpld/tracy) too, just in case ruby-prof was too terse for me. The visual tracer is nice because it lets me see the full call stack over time instead of just getting the crunched numbers. I had to write a Ruby binding for Tracy - I will share that later.

While the visuals are nice, it's the same data as `ruby-prof` in the end. Most of the program looked like this:

```
________________________________________________
|              some_frame (2.0s)               |
------------------------------------------------
_______________________________________________
| smaller_frame (0.4s)|  smaller_frame (0.6s) |
-----------------------------------------------
____________________   ______________________
| smaller | smaller|   | smaller | smaller  |
--------------------   ----------------------
________   ________     ________  ________
| ..   |   | ..   |     | ..   |  | ..   |
--------   --------     --------  --------
______      ______        ______  ______
| .. |      | .. |        | .. |  | .. |
------      ------        ------  ------
____         ____          ____    ____
|..|         |..|          |..|    |..|
----         ----          ----    ----
___          ___           ___     ___
|.|          |.|           |.|     |.|
---          ---           ---     ---
```

I hope you'll forgive my crude art. What I mean to illustrate here is that `some_frame` is taking 2s (*way too long* for my taste), but there's no one single culprit. The two `smaller_frame` portions aren't obvious bloat and so we can't just chop them out. The frames go super deep down until the leaf nodes are only 10 microseconds long. Even the supposedly-super-slow DB interactions are in the 100s of microseconds range, a very insignificant portion of 2 seconds. What gives?

Another thing I didn't even mention was boot times. The test suite takes 10-15 seconds before even running tests. What's it doing? Compiling Ruby files and executing routes. Compiling, fine, any language will have compile times (though pretty sure we can still do better), but *routes?*

I know that "rewrite it in Rust" is a bad joke now, but I feel cornered. I'm repeating the mantra in my head: *your web app is I/O bound, your web app is I/O bound*, but when I sit down and measure, I see *so much cruft* and it's *not I/O*. The call stacks go so deep that we're losing 10s of milliseconds *just in method call overhead*. It's hard for me to *not* point towards Ruby (and Rails) as part of the problem.

Of course it doesn't have to be Rust. I'm also a big fan of Zig, and even C. The tough part is that there is no Rust on Rails. No Zig on Rails. I know there's [Rocket](https://rocket.rs/) and probably similar, but it's not Rails. The collective knowledge and best practices around Rails (also Django and other dog-slow-but-popular frameworks) is immence. My team is mostly developers who only know Ruby and Rails. Their productivity would plummet if we asked them to use Rocket. Unfortunately that is an institutional defect and not a technical one.

Update 2023-09-01: just wanted to point out that it was maybe a bit silly of me to use absolute numbers like "10 microseconds" and "2 seconds" when referring to an application being traced. The tracing itself imposes some overhead too, and I know that. Bottom line is I'm a sucker for fast software, and quite a lot of the web isn't that.
