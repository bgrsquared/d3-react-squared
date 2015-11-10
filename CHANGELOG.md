# Version Updates:
0.3.6:
- Remove c3 from this library and create [d3-react-squared-c3-loader](https://github.com/bgrsquared/d3-react-squared-c3-loader)

0.3.4 & 0.3.5:
- Bug fixing.

0.3.3:
- Fix event system (events blocked first update after event)

0.3.2:
- While we're at it, externalize c3 too.

0.3.1:
- Fix webpack externals (react-dom) to avoid "...it probably means that 
you've loaded two copies of React..."

0.3.0:
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
