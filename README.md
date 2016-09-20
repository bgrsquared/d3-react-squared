[--> Demos, Examples, Playground, Docu](http://bgrsquared.com/DR2/)

[--> d3-react-squared-c3-loader](https://github.com/bgrsquared/d3-react-squared-c3-loader)

[--> New live example](http://bgrsquared.com/dogs/)

[--> New blog post, based on live example](https://medium.com/@ilikepiecharts/about-using-d3-react-squared-an-example-8cc5e5a6b58e#.jso6use4q)

### Notes
--> v0.6.0 and later require d3 v4!

--> v0.3.0 and later require React 0.14!

### c3

Documentation is still missing, sorry!

#### v0.3.6 and newer
Starting in 0.3.6, c3 charts are loaded using [d3-react-squared-c3-loader](https://github.com/bgrsquared/d3-react-squared-c3-loader)

#### v0.2.7 through v0.3.5:
Please note that this is still 'beta'. So far, there is no docu on the docu page.
--> please check out the c3example.js in the source (./examples).

# d3-react-squared
[![npm version](https://badge.fury.io/js/d3-react-squared.png)](http://badge.fury.io/js/d3-react-squared)

Feedback, ideas, PRs, etc. very welcome!

## Why yet another d3-react component?
There are already some great solutions out there, combining React and D3, e.g.:

[A gist with some links here](https://gist.github.com/chroth7/a56fafed1efc43737d11) 

Most of these articles/code aims to combine/add d3 into the lifecycle methods to
generate charts that way. Have a look at them, great ideas there.

See docu page for some details about my approach. I don't want to bore you with details here -
just contact us (contacts on docu page). I am very happy to discuss ideas/concepts!

Some keywords:
- Use D3 charts 'directly', maybe very limited adjustments needed (just think [examples](https://github.com/mbostock/d3/wiki/Gallery)!)
- Provide viewboxes etc. to get responsive graphs
- Make chart modular (a.k.a. reusable)
- Provide a clean API to create and update charts (from ANY component!).
- Parametrize charts
- Be lightweight
- Provide a way to share events between charts (and using a wrapper: any component!)
- Provide access to a charts library (we currently offer [c3js](http://c3js.org), as of v0.2.7)
- Provide a limited set of examples in this repo and make it easy to the users to add their own custom charts

We believe that especially the last bullet is helpful to teams separate concerns and have maintainable solutions.
Why? The chart generating code is in its own module and the interaction designer doesn't really have to care about React (maybe he should, but that's another story...).

Details?

[See also here](http://bgrsquared.com/DR2/)
(click on DR2 in top right navigation!)


## Documentation
[--> See here](http://bgrsquared.com/DR2/)
(click on DR2 in top right navigation!)

The documentation is still somewhat basic. Definitely check out the examples in the repo!

But hey, writing docu is sooooo time consuming...

## Stand-alone example
This repo now includes a stand-alone example. Simply:

```
npm install
```

and then 

```
npm run dev
```

and it should be running on `localhost:8080`.

### Requirements
As far as I know, you shouldn't need anything fancy.

We run it in a babel/webpack/react setup, plain vanilla, so to speak (plenty of setup guides out there),
and it works. 

Also: we have bootstrap, no other css/sass/... (actually: we love [react-bootstrap](https://react-bootstrap.github.io))
(Note: you could, if you wanted, to use SASS to style your graphs, must require the files where and when needed; you know how.).
 
# Thanks
Huge thanks to all the people involved in providing awesome tools such as:
* [ReactJS](https://facebook.github.io/react/)
* [D3](http://d3js.org)
* [webpack](http://webpack.github.io)
* [BabelJS](https://babeljs.io)
* [Reflux (no longer using it, thanks anyway!)](https://github.com/spoike/refluxjs)
* [redux (replaces Reflux)](https://github.com/rackt/redux)
* [c3.js](http://c3js.org)

and many others...

### Some screenshots

#### New Docu-Page 
![DocuPage](https://github.com/bgrsquared/d3-react-squared/blob/master/img/dr2overview.png)

#### Playground ([--> See here](http://bgrsquared.com/DR2/)) to learn about parameters:
![Playground](https://github.com/bgrsquared/d3-react-squared/blob/master/img/explPlayground2.png)
