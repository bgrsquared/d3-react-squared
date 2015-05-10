# d3-react-squared
[![npm version](https://badge.fury.io/js/d3-react-squared.png)](http://badge.fury.io/js/d3-react-squared)

ALPHA VERSION. 
There will be major changes coming up (ToDo list will follow).
Feedback, ideas, PRs, etc. very welcome!

Version Update log at the bottom.

## Documentation
[--> See here](http://bgrsquared.com/#dr2)

This documentation is still very basic and gives you mostly an idea on how to use the
existing charts (pie, bar). We try to find some time to write something about 
the layout of the charts (so that you can create your own charts.

For that we clean up the API a bit first. (wanna help?)

## Requirements
We designed this component to be **very lightweight**. All you need to do is include it in your existing [React.JS](https://facebook.github.io/react/) app.

Only additional requirement:
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

## Why yet another d3-react component?
There are already some great solutions out there, combining React and D3, e.g.:
- [react-d3-components](https://github.com/codesuki/react-d3-components)
- [react-d3](https://github.com/esbullington/react-d3)

They aim to use React have control over the DOM and use D3 for scales, layouts, etc.
So in other words: React creates the charts, D3 is a helper.

This is a great approach and has many use cases.

We choose a slightly different approach: We want:
- Use D3 charts 'directly', maybe very limited adjustments needed (just think [examples](https://github.com/mbostock/d3/wiki/Gallery)!)
- Provide viewboxes etc. to get stuff responsive
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
 
# Thanks
Huge thanks to all the people involved in providing awesome tools such as:
* [ReactJS](https://facebook.github.io/react/)
* [D3](http://d3js.org)
* [webpack](http://webpack.github.io)
* [BabelJS](https://babeljs.io)

# Version Updates:

0.0.3: 
- add custom chart loader function
0.0.4: 
- update charts to use ES6 modules and use Object.create() syntax to load (instead of `new`)
- rename `chartGenerator` prop of custom charts to `chartModule`



