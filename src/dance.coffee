
###
  Dancejs Library v0.1.0
  http://github.com/emnl/dancejs

  Copyright 2011, Emanuel Andersson
  Dual licensed under the MIT or BeerWare licenses.
  https://github.com/emnl/dancejs/blob/master/README.md

  This project was inspired by the Haskell
  programming language and its standard library.
  Some native support functions was taken from
  Underscore (MIT), thanks guys!

  Date: 31 Oct 2011
###

# These classes are affected,
# Array considerable more than
# the other two.
_ap = Array.prototype
_op = Object.prototype
_np = Number.prototype

# Find native ECMAScript 5 functions
# to use instead, for performance
nativeMap          = _ap.map
nativeFoldl        = _ap.reduce
nativeFoldr        = _ap.reduceRight
nativeFilter       = _ap.filter
nativeAll          = _ap.every
nativeAny          = _ap.some
nativeSort         = _ap.sort


# ** all functions should return a new object,
# thus not modifying the original one **

_ap.__defineGetter__ "clone", ->
  return @slice 0, @length

############################################################
#### List operations

# tail will return all elements in an
# array except the first one
_ap.__defineGetter__ "tail", ->
  if @length <= 1 then return []
  return @slice 1, @length

# head will return the first element
# in an array
_ap.__defineGetter__ "head", ->
  return this[0]

# last will return the last element
# in an array
_ap.__defineGetter__ "last", ->
  return this[@length-1]

# init will return all elements in an
# array except the first one
_ap.__defineGetter__ "init", ->
  return @slice 0, @length-1

# empty will return true if the array
# holds 0 values
_ap.__defineGetter__ "empty", ->
  return (@length == 0)

# reverse will return the array reversed,
# last element first and so on
_ap.__defineGetter__ "_reverse", ->
  if @length == 0 then return []
  return @clone.reverse()

# rev is short for _reverse
_ap.__defineGetter__ "rev", ->
  return @_reverse

# add or append will add the input array
# to the original one
_ap.add = _ap.append = (a) ->
  return @concat a

# fadd will take the first element in the
# array then add to it with add
_ap.fadd = (a) ->
  return (@slice 0, 1).add a

# map will apply a function on all elements
# in an array
_ap.map = nativeMap || (f) ->
  if @empty then return []
  return [f @head].add @tail.map(f)

############################################################
#### Reducing lists (folds)

# foldl will fold from the left with a function
# and return the result, base case is z
_ap.foldl = nativeFoldl || (f,z) ->
  if !z && z != 0 then throw "Foldl: no initial value specified"
  if @empty then return z
  return f @head, @tail.foldl(f,z)

# foldl will fold from the right with a function
# and return the result, base case is z
_ap.foldr = nativeFoldr || (f,z) ->
  if (!z && z != 0) then throw "Foldr: no initial value specified"
  return @_reverse.foldl f, z

############################################################
#### Special folds

# and will return true if all elements in
# the array is a bool and true
_ap.__defineGetter__ "and", ->
  @foldr ((a,b) -> a && b), true

# and will return true if at least one
# elements in the array is a bool and true
_ap.__defineGetter__ "or", ->
  @foldr ((a,b) -> a || b), false

# sum will use foldl with addition,
# thus creating a sum of all numeric
# elements
_ap.__defineGetter__ "sum", ->
  sum = @foldl ((a,b) -> a + b), 0
  if sum == undefined then return 0
  return sum

# product will use foldl with multiplication,
# thus creating a product of all numeric
# elements
_ap.__defineGetter__ "product", ->
  product = @foldl ((a,b) -> a * b), 1
  if product == undefined then return 0
  return product

# _concat will return the array flatten
# one level
_ap.__defineGetter__ "_concat", ->
  return @foldl ((a,b) -> a.add b ), []

# conc is short for _concat
_ap.__defineGetter__ "conc", ->
  return @_concat

# any will apply the input function
# to all elements and return true
# if any value is true
_ap.any = nativeAny || (f) ->
  return (@map f).or

# any will apply the input function
# to all elements and return true
# if all values is true
_ap.all = nativeAll || (f) ->
  return (@map f).and

# concatMap will flatten the array
# one level then map it with a function
_ap.concatMap = (f) ->
  return @_concat.map f

# maximum will return the "heighest"
# element in the array
_ap.__defineGetter__ "maximum", ->
  return @maximumBy (a,b) -> a >= b

# minimum will return the "lowest"
# element in the array
_ap.__defineGetter__ "minimum", ->
  return @minimumBy (a,b) -> a <= b

# insert will return the array with
# an input element inserted at an ordered
# position
_ap.insert = (e) ->
  return @insertBy e, (a,b) -> e <= b

# delete will return the array
# with the first instance of
# the input element removed
_ap._delete = _ap.del = (e) ->
  return @deleteBy e, (a,b) -> e == b

############################################################
#### Infinite lists

# replicate will return an array
# with n elements of the object
_op.replicate = (n) ->
  if n <= 0 then return []
  return [this].add(@replicate n-1)

############################################################
#### Sublists

# take will return n elements
_ap.take = (n) ->
  if n == 0 || @empty then return []
  return @fadd @tail.take n-1

# drop will return array without
# n elements
_ap.drop = (n) ->
  if n == 0 || @empty then return this
  return @tail.drop n-1

# takeWhile will return n elements
# while f is true
_ap.takeWhile = (f) ->
  if @empty then return []
  if f @head then return @fadd(@tail.takeWhile f)
  return []

# dropWhile will return the array
# without n elements while f
# is true
_ap.dropWhile = (f) ->
  if @empty then return []
  if f @head then return @tail.dropWhile f
  return this

# group will return an array with
# the elements grouped based on
# == comparison
_ap.__defineGetter__ "group", ->
  return @groupBy (a,b) -> a == b

############################################################
#### Searching lists

# elem will return true if the input
# element is a part of the array
_ap.elem = (e) ->
  return !(@indexOf(e) == -1)

# notElem is elem's invers
_ap.notElem = (e) ->
  return !@elem(e)

# find will return the first element
# where f is true
_ap.find = (f) ->
  if @empty then return null # null, undefined, NaN, exception?
  if f @head then return @head
  return @tail.find(f)

# filter will return an array
# with the elements which fulfills
# the input function
_ap.filter = nativeFilter || (f) ->
  if @empty then return []
  if f @head then return @fadd @tail.filter(f)
  return @tail.filter(f)

############################################################
#### Zipping and unzipping lists

# zip will return an array with
# the original and the input combined,
# leftover elements are disposed
_ap.zip = (ar) ->
  if this.empty || ar.empty then return []
  return [[@head,ar.head]].add(@tail.zip ar.tail)

############################################################
#### Numeric Functions

# even will return true if the
# number is even
_np.__defineGetter__ "even", ->
  return (this%2 == 0)

# odd is even's inverse
_np.__defineGetter__ "odd", ->
  return !@even

############################################################
#### Generalized functions

# minimumBy returns the least element
# the array compared with the input
# function

# minimumBy returns the greatest element
# the array compared with the input
# function
_ap.maximumBy = _ap.minimumBy = (f) ->
  if @empty then return undefined
  if @length == 1 then return @head
  if (f @head, (@tail.maximumBy f)) then return @head
  return @tail.maximumBy f

# insertBy will return the array with
# an input element inserted at an ordered
# position depending on input function
_ap.insertBy = (e,f) ->
  if @empty then return [e]
  if (f e, @head) then return [e].add(this)
  return @fadd(@tail.insertBy e, f)

# deleteBy returnes the array with
# the first elements which fulfills
# the input function removed
_ap.deleteBy = (e,f) ->
  if @empty then return undefined
  if (f e, @head) then return @tail
  return @fadd(@tail.deleteBy e, f)

# sortBy returns the array sorted
# with comparision relying on
# the input function
_ap.sortBy = (f) ->
  if !nativeSort then throw "sortBy: you're missing sort(), uppgrade!"
  return @clone.sort f

# groupBy returns an array with
# the elements grouped by the
# input function
_ap.groupBy = (f) ->
  if @empty then return []
  if @length == 1 then return [[@head]]

  e = @head
  n = @tail.takeWhile (a) -> f a,e
  n = [e].add n
  o = @drop n.length

  return [n].add(o.groupBy f)

############################################################
