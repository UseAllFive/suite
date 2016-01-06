# Suite
The UA5 Toolbox of Reusable Code

![Use All Five Suite](suite.png)

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

### Components

#### orphan

- Adds a `&nbsp;` between the last two words in text to prevent an orphan from occuring.
- Usage:
	- `<p orphan>This line will have no oprhans.</p>`
- Requirements: 
	- [jhttps://github.com/matthewlein/jQuery-widowFix](jQuery widowFix)

#### carousel

- Create a [https://github.com/kenwheeler/slick/](Slick Carousel)
- Usage: 
```HTML
<!-- Wrap each item of the carousel in a div with the `carousel` attribute -->
<div 
	carousel
	carousel-options="myOptions">
	<div>...</div>
	<div>...</div>
	<div>...</div>
</div>
```
```JavaScript
// Whatever options you want to pass the slick carousel
$scope.myOptions = {
	autoplay: true,
	dots: true	
};
```
- Requirements:
	- [https://github.com/kenwheeler/slick/](Slick Carousel)

#### equalize

- Equalize the height of elements 
- Usage: 
```HTML
<div
	equalize
	equalize-child-selector=".child"
	equalize-mobile-breakpoint="797">
	<div class="child">
		...
	</div>
	<div class="child">
		...
	</div>
</div>
```
- Requirements:
	- [https://github.com/tsvensen/equalize.js/](Equalize)

### Filters

#### toTrusted

- Allows one to pass HTML that is normally not trusted (like an iFrame) to the template.
- Usage:
	- `<div>{{ iframeContent | toTrusted }}</div>`
- Requirements:
	- $ngSanitize

### Factories

#### BaseThreeScene
- Creates a three.js Scene, Camera, and Renderer
- Hooks for mouse over and mouse out on any object
- Usage:
```javascript
// Usually put this in the app.js and build it once:
$rootScope.renderer = new THREE.WebGLRenderer({
    antialias: (BrowserFactory.hasTouch()) ? false : true
});

// In a Directive:
var scene = new BaseThreeScene();
var sphere;

function init() {
    var $el = $('.quiltCanvas');
    var geometry;
    var material;
    $el.click(clickHandler);
    scene.init($el, $rootScope.renderer, onRender, mouseOverHandler, mouseOutHandler);
    $rootScope.quiltRenderer.setClearColor(0xffffff);
    geometry = new THREE.SphereGeometry(134, 6, 6);
    material = new THREE.MeshBasicMaterial({color: 0xff0000});
    sphere = new THREE.Mesh(geometry, material);
    //-- Using addItem will give mouse events to this sphere:
    scene.addItem(sphere);
}

function onRender() {
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    sphere.rotation.z += 0.01;
}

function clickHandler(item) {
    console.log('Clicked: ', scene.activeObject());
}

function mouseOverHandler(item) {
    console.log('Mouse Hovering: ', item);
}

function mouseOutHandler(item) {
    console.log('Mouse Out: ', item);
}
```

#### BrowserFactory

- Check the type of browser being used
- Usage: 
	- `BrowserFactory.isSafari()`

#### GeoFactory

- Plot lat/lon into 2D space (currently only for USA)
- Remap a number
- Usage: 
```javascript
while (i--) {
    coords = GeoFactory.convertCoords(Number(data[i].latitude), Number(data[i].longitude));
    $dot = $('<a class="dot"></a>');
    pointX = coords[0];
    pointY =  coords[1];
    $container.append($dot);
    $dot.css({
        left: pointX + 'px',
        top: pointY + 'px',
        // data[i].pointSize is how big the dot is
        // `GeoFactory.map` is used to scale it to our target min/max
        width: GeoFactory.map(data[i].pointSize, min, max, 10, 60) + 'px',
        height: GeoFactory.map(data[i].pointSize, min, max, 10, 60) + 'px'
    });
}
```

#### LockScroll

- Lock and unlock browser scroll on the window w/o hiding / showing the scrollbars. Also works on touch devices.
- Usage:
	- `LockScroll.enableScroll()`
	- `LockScroll.disableScroll()`

#### Meta

- Update the metadata for every state change
- Usage:
	- Add `MetaFactory.set(metaObj)` in each state controller
	- Configure defaults:

```javascript
app.value('metaDefaults', {
	title: 'Home',
    description: 'Base Angular description',
    image: 'http://base-angular.com/assets/img/share.jpg',
    ogUrl: window.location.href,
    prefix: '',
    suffix: ' | Base Angular'
})
```
