I've written a lot of Ruby throughout my professional career. Ruby is very dynamic, leading to nice expression,
but poor developer experience in large codebases due to limited ability to provide intellisense. Ever looked
at a Ruby variable and wondered what type it is?

This "Exposure" project has two parts: a runtime type recorder, and an LSP extension to read those types.

The runtime type recorder is a Ruby C extension that uses <a target=_blank href="https://docs.ruby-lang.org/en/master/TracePoint.html">TracePoint</a>
to run code on every Ruby method call. That code scans every local variable (and the method's return type!) and writes its type to a giant hashmap.
This giant hashmap is mmap'd and doesn't use any pointers, meaning it can be read by another process while it's being modified. Run your test suite
with this TracePoint active and it'll build a big dictionary of types.

```ruby
# Example:
Exposure.start
run_some_code # <- all types will be recorded
Exposure.stop
```

The so-called LSP extension is implemented as a fork of Solargraph. This Solargraph fork pulls type info from the previously mentioned big dictionary,
and shows it to you in your editor (VSCode, Vim, whatever).

The type recorder was a fun challenge, because I wanted it to be fast even on large projects like our monolith at work. Many initial prototypes
failed this, and I gave up a few times thinking it was infeasible. My first attempt would write many files - one file per unique local variable.
This was nice in that I could rely on the filesystem to map names to data, but was very slow. I tried writing data in a separate thread, which helped,
but the writer thread would stay alive for a loong time after the Rails app exited. Eventually I came up with mmap + a custom hashmap implementation,
which works very well. The bottleneck now is not writeback, but rather the querying of the Ruby VM to get type names.

