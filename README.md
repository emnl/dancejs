# Dancejs

Dancejs is diet Haskell in Javascript (unt CoffeeScript). It's kind of a step-sister to [Underscore](http://underscore.com).
While Underscore has its strict ways, Dancejs, released under the BeerWare
license, does functional things a bit more out of hand and awesome.
Imagine dragging a monkey to a bohemic rails party, yeah.

Basically you can do gnarly functional programming in [CoffeeScript](http://jashkenas.github.com/coffee-script/) and Javascript.

Dance is **STRONGLY** influenced by [Haskell](http://haskell.org/) and its
standard library.

(dance.min.js 4KB < underscore-min.js 11KB)

## Usage

Just require the dance.js file, alt dance.min.js.

Dance depends on Node and [Vows](http://vowsjs.org/) for testing.
Compiling Dancejs requires [CoffeeScript](http://jashkenas.github.com/coffee-script/).

Compiling is easy:

```
coffee -c dance.coffee
```

Testing is even easier:

```
node test/array_spec.js
node test/number_spec.js
node test/object_spec.js
```

To Dance in the browser, just include the dance.js file:

``` html
<script type="text/javascript" src="dance.js"></script>
```

Vows may be installed with npm.

## Examples

This is an example in CoffeeScript:

```javascript
insertion_sort = (xs) ->
  if (xs.empty) return []
  return (insertion_sort xs.tail).insert xs.head
```

Further examples can be found under the Dancemv (Move-implementation) page, [examples](https://github.com/emnl/dancemv/tree/master/examples).

## Functions

Included functions are:
tail, head, last, init, empty, _reverse, rev, add, append, fadd, map, foldl, foldr, and, or, sum, product, _concat, conc, any, all, concatMap, maximum, minimum, insert, delete, del, replicate, take, drop, takeWhile, dropWhile, group, elem, NotElem, find, filter, zip, even, odd, minimumBy, maximumBy, insertBy, deleteBy, sortBy, groupBy

To find out what each of these do, please read the source, the tests or the [Haskell List](http://hackage.haskell.org/packages/archive/base/latest/doc/html/Data-List.html) documentation.

Those functions which do not require any parameters are used as vars, ie array.tail,
not array.tail() - just like Ruby (<3).

## Performance

Please note that this library favors recursion. I do not fully know what implication it
will have on your software.

Also note that this library adds to the standard Array, Number and Object libraries.
Dance was designed to be neutral and easy.

## License

(The MIT License)

Copyright (c) 2011 Emanuel Andersson

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.