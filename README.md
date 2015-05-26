[--> Demos, Examples, Playground, Docu](http://bgrsquared.com/#dr2)

### Some screenshots
(the third is from the playground on the docu page)
![Example](https://github.com/bgrsquared/d3-react-squared/blob/master/img/explPieBar.png)
![Example](https://github.com/bgrsquared/d3-react-squared/blob/master/img/explPieBar2.png)
![Playground](https://github.com/bgrsquared/d3-react-squared/blob/master/img/explPlayground.png)

# d3-react-squared
[![npm version](https://badge.fury.io/js/d3-react-squared.png)](http://badge.fury.io/js/d3-react-squared)

Not-so-stable-yet-version
ToDo list: 
see [wiki](https://github.com/bgrsquared/d3-react-squared/wiki) on github
Feedback, ideas, PRs, etc. very welcome!

Version Update log at the bottom.

## Why yet another d3-react component?
There are already some great solutions out there, combining React and D3, e.g.:
- [react-d3-components](https://github.com/codesuki/react-d3-components)
- [react-d3](https://github.com/esbullington/react-d3)

or how-tos:
- [siftblog](http://blog.siftscience.com/blog/2015/4/6/d-threeact-how-sift-science-made-d3-react-besties)
- [@sharifsbeat post](http://busypeoples.github.io/post/d3-with-react-js/)

and many more...

Most of these articles/code aims to combine/add d3 into the lifecycle methods to
generate charts that way. Have a look at them, great ideas there.

This is a great approach and has many use cases.

Our approach is not so different: we just keep all the d3 code of a chart in a module 
(also to have reusable, stateful components), 
without mixing in react there. This allows us to use most d3 examples on the net directly
and also, we can port the d3 charts to other frame works rather direclty. Put differently:
we do not mix react and d3 (or as little as possible), so that e.g. interaction designers don't
have to think about react-lifecycle hooks etc. Maybe you could call that 'separation of concerns'.

In keywords:
- Use D3 charts 'directly', maybe very limited adjustments needed (just think [examples](https://github.com/mbostock/d3/wiki/Gallery)!)
- Provide viewboxes etc. to get responsive graphs
- Make chart modular (a.k.a. reusable)
- Provide a clean API to create and update charts.
- Parametrize charts
- Be lightweight
- Provide a limited set of examples in this repo and make it easy to the users to add their own custom charts

We believe that especially the last bullet is helpful to teams separate concerns and have maintainable solutions.
Why? The chart generating code is in its own module and the interaction designer doesn't really have to care about React (maybe he should, but that's another story...).

We also plan to add few more basic charts in this repo directly and if there is demand, maybe add other modules (repos) with more advanced charts. 
This is too keep this thing as small as possible but give d3-beginners a chance to access more advanced graphs, still.

### Our hands-on-experience
In our daily work, we have to create many prototypes, for dashboard-like solutions. 
It is very helpful to us to have a way to load basic charts without effort and use the very same framework to implement more complicated solutions too.

[See also here](http://bgrsquared.com/#dr2)


## Documentation
[--> See here](http://bgrsquared.com/#dr2)

This documentation is still very basic and gives you mostly an idea on how to use the
existing charts (pie, bar). We try to find some time to write something about 
the layout of the charts (so that you can create your own charts.

For that we clean up the API a bit first. (wanna help?)

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
Please use above example as reference.

We designed this component to be **very lightweight**. 
All you need to do is include it in your existing [React.JS](https://facebook.github.io/react/) app.

Only additional (?) requirement:
* [BabelJS](https://babeljs.io)

Note: we run it in a webpack setup. If you are too, you might need something along those lines:
```
{
  test: /\.js$/,
  include: [app_dir, path.join(node_modules_dir, 'd3-react-squared')],
  loader: "babel-loader"
},
```
Also: we have bootstrap, no other css/sass/...
(Note: you could, if you wanted, to use SASS to style your graphs, must require the files where and when needed).
 
# Thanks
Huge thanks to all the people involved in providing awesome tools such as:
* [ReactJS](https://facebook.github.io/react/)
* [D3](http://d3js.org)
* [webpack](http://webpack.github.io)
* [BabelJS](https://babeljs.io)
* [Reflux](https://github.com/spoike/refluxjs)

and many others...

# ToDos
See [wiki](https://github.com/bgrsquared/d3-react-squared/wiki)


# Version Updates:
0.1.2:
- Replace `mouseout` by `mouseleave` (especially important in pie chart)
- Fix minor `attrTween` bug in pie chart

0.1.1:
- add eslint and clean up code (lint and other stuff)
- add propTypes.

0.1.0: 
- added standalone example

0.0.8:
- Add destroyFunction to charts (essentially to get rid of tooltips on unload)
- Added playground to docu! [--> See here](http://bgrsquared.com/#dr2)

0.0.7:
- Add tooltips to bar and pie charts
- Improve highlighting styles

0.0.6: 
- add cross-highlight capabilities (based on id of element)
(use of Reflux motivated by [@pbeshai 's linked-highlighting-react-d3-reflux](https://github.com/pbeshai/linked-highlighting-react-d3-reflux)  -
big thanks!)

0.0.5:
- add more parameters to pieChart and barChart (colors etc.)

0.0.4: 
- update charts to use ES6 modules and use Object.create() syntax to load (instead of `new`)
- rename `chartGenerator` prop of custom charts to `chartModule`

0.0.3: 
- add custom chart loader function



