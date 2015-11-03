# Suite
The UA5 Toolbox of Reusable Code

## Installation
Download as a dependency using bower

```
bower install suite --save
```

Load suite after Angular but before your main app

```javascript
<script src="angular.js"></script>
<script src="suite.js"></script>
<script src="app.js"></script>
```

Include the `suite` [module](https://docs.angularjs.org/guide/module) as a dependency in your main module.

```
angular.module('ua5App', ['suite']);
```

Add specific directives, filters and factories as needed 

```javascript
<script src="angular.js"></script>
<script src="suite.js"></script>
<script src="filters/to-trusted.js"></script>
<script src="factories/lock-scroll.js"></script>
<script src="app.js"></script>
```

## What’s in the toolbox

### Filters

#### toTrusted

- Allows one to pass HTML that is normally not trusted (like an iFrame) to the template.
- Usage:
	- `<div>{{ iframeContent | toTrusted }}</div>`
- Requirements:
	- $ngSanitize

### Factories

#### BrowserFactory

- Check the type of browser being used
- Usage: 
	- `BrowserFactory.isSafari()`

#### LockScroll

- Lock and unlock browser scroll on the window w/o hiding / showing the scrollbars. Also works on touch devices.
- Usage:
	- `LockScroll.enableScroll()`
	- `LockScroll.disableScroll()`
