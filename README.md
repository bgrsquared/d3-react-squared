[--> Demos, Examples, Playground, Docu](http://bgrsquared.com/DR2/)

### Notes
--> v0.3.0 requires React 0.14!

For the new c3 integration (v0.2.7):
Please note that this is still 'beta'. So far, there is no docu on the docu page.
--> please check out the c3example.js in the source (./examples).

### Some screenshots

#### New Docu-Page 
![DocuPage](https://github.com/bgrsquared/d3-react-squared/blob/master/img/dr2overview.png)

#### Playground ([--> See here](http://bgrsquared.com/DR2/)) to learn about parameters:
![Playground](https://github.com/bgrsquared/d3-react-squared/blob/master/img/explPlayground2.png)

# d3-react-squared
[![npm version](https://badge.fury.io/js/d3-react-squared.png)](http://badge.fury.io/js/d3-react-squared)

Feedback, ideas, PRs, etc. very welcome!

Version Update log at the bottom.

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

# Version Updates:
0.3.0
- Update react to 0.14 and redux to v3.0 (and update other dependencies)
- Linting (airbnb style).

0.2.7:
- Add c3-wrapper, so that you can add [c3](http://c3js.org) charts to the mix.

0.2.6:
- Update documentation.
- Fix a paddingBottom issue.

0.2.5:
- Add wrapper functionality (so far undocumented on dr2 page). Core idea: 
Use the Chart Component to wrap a component that is passed to it to enable access to chart-related redux functionality.
(listen to events or even init events).

0.2.4:
- We replaced Reflux and are using redux now. We implemented it so that you shouldn't notice a thing (breaking changes might occur later, as we have added possible functionality)

0.2.3: 
- Precompiled (babel) single library as direct entry point, to make stuff easier for direct users.

0.2.0 - 0.2.2 (including some betas): 
- Experiments with npm packages.

0.1.9: 
- Update dependencies
- Linting.

0.1.8: 
- Adjust margins in bar- and line-charts.

0.1.7:
- Add 'aspectRatio' and 'labelSize' to barChart
- Change basic size of pie- and barCharts to 1000 (can be overridden in params)

0.1.6:
- Add 'line chart' with some new features (these will be added to other charts later, where appilcable), such as:
  - Parametrized **aspect ratio** (make sure you also adjust paddingBottom!) This will be improved in future versions 
    (We are thinking of automated paddingBottom ratios, unless overridden)
  - Parametrized **label size**
  - Parametrized **size** (currently not really useful (due to automated viewbox), unless you want to be pixel perfect)
  - Parametrized **line thickness**
  - 'Automatic' adjustment of margins (currently based on labelSize, not on actual tick label)
  - For fun: parametrized (and sort-of-animated) **interpolation modes** for paths (based on d3)
  - Some other, see documentation (when completed, until then: source)
  - And: the line chart uses same highlight-sharing-system and tooltips as in the other examplary charts.
  - Also added two exemplary line charts in ./example/example.js

0.1.5: 
- Add 'bubble up' of chart events. I.e. when a calling component passes `onChartEvent` property,
it will be passed the the respective data object plus the event's label 
(will add documentation to this later).

0.1.4: 
- Add highlightEmit and highlightListen props. This allows you to specifiy which
events (which groups) a chart should listen to (and emit to).

0.1.3:
- Add dynamic paddingBottom (useful in custom charts that have a dynamic aspect ratio depending on data)
(let me know if you require an example)

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
- Added playground to docu! [--> See here](http://bgrsquared.com/DR2/)

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



