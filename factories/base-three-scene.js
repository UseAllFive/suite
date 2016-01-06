/* global angular, THREE, window, _, $ */
angular.module('suite').factory('BaseThreeScene', ['$rootScope', 'BrowserFactory',
    function($rootScope, BrowserFactory) {
        return function() {

            var $$el;
            var activeElement = false;
            var activeElements = [];
            var animationFrameRequest;
            var camera;
            var itemsMouseCanHit = [];
            var mouse = new THREE.Vector2();
            var onMouseOut = function(item) {};
            var onMouseOver = function(item) {};
            var raycaster;
            var renderHook = function() {};
            var renderer;
            var rendering = true;
            var scene;

            function init($el, _renderer, _renderHook, _onMouseOver, _onMouseOut) {
                $$el = $el;
                renderer = _renderer;
                setupBaseScene();
                if (typeof _renderHook === 'function') {
                    renderHook = _renderHook;
                }
                if (typeof _onMouseOut === 'function') {
                    onMouseOut = _onMouseOut;
                }
                if (typeof _onMouseOver === 'function') {
                    onMouseOver = _onMouseOver;
                }
            }

            function setupBaseScene() {
                var ASPECT = $$el.width() / $$el.height();
                var FAR = 1000;
                var FOV = 75;
                var NEAR = 1;
                var targetCamPos;

                scene = new THREE.Scene();
                camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.shadowMap.enabled = false;
                renderer.setSize($$el.width(), $$el.height());
                $$el.append(renderer.domElement);

                targetCamPos = getTargetCameraPosition();
                camera.position.x = targetCamPos.x;
                camera.position.y = targetCamPos.y;
                camera.position.z = targetCamPos.z;

                raycaster = new THREE.Raycaster();

                render();
            }

            function getTargetCameraPosition() {
                var MIN_ASPECT = 1.3;
                var PREFERRED_Z_LEVEL = 330;
                var aspect = $$el.width() / $$el.height();
                //-- set defaults:
                var targetCameraPosition = {
                    x: (!BrowserFactory.hasTouch()) ? 40 : 90,
                    y: 100,
                    z: PREFERRED_Z_LEVEL
                };

                if (aspect < MIN_ASPECT) {
                    //camera.position.z = 530;
                    targetCameraPosition.z = (PREFERRED_Z_LEVEL - (PREFERRED_Z_LEVEL * aspect) / MIN_ASPECT) + PREFERRED_Z_LEVEL;
                } else {
                    targetCameraPosition.z = PREFERRED_Z_LEVEL;
                }
                return targetCameraPosition;
            }

            function destroy() {
                var i;

                rendering = false;
                cancelAnimationFrame(animationFrameRequest);
                i = scene.children.length;
                while (i--) {
                    var obj = scene.children[i];
                    scene.remove(obj);
                    if (obj.geometry) {
                        obj.geometry.dispose();
                    }
                    if (obj.material) {
                        if (obj.material instanceof THREE.MeshFaceMaterial) {
                            _.each(obj.material.materials, function(obj, idx) {
                                obj.dispose();
                            });
                        } else {
                            obj.material.dispose();
                        }
                    }
                    if (obj.dispose) {
                        obj.dispose();
                    }
                    obj = undefined;
                }
                $(renderer.domElement).remove();
                i = scene.children.length;
            }

            function render() {
                camera.updateMatrixWorld();
                activeElements = getHoveredElements();
                renderHook();
                renderer.render(scene, camera);
                if (rendering) {
                    animationFrameRequest = requestAnimationFrame(render);
                }
            }

            function getHoveredElements() {
                var elToMouseOver = false;
                var firstTouched = true;
                var hits = [];
                var intersects;
                var j;

                raycaster.setFromCamera(mouse, camera);
                intersects = raycaster.intersectObjects(itemsMouseCanHit);
                if (intersects.length > 0) {
                    j = intersects.length;
                    while (j--) {
                        if (
                            intersects[j].hasOwnProperty('object') &&
                            !intersects[j].object.isVisible
                        ) {
                            intersects.splice(j, 1);
                        }
                    }
                }

                if (intersects.length > 0) {

                    for (var i = 0; i < intersects.length; i ++) {
                        hits.push(intersects[i].object.id);
                        //-- store the new elements:
                        if (activeElement === intersects[i].object.id) {
                            elToMouseOver = intersects[i].object.id;
                            firstTouched = false;
                        }
                    }

                    if (!elToMouseOver) {
                        elToMouseOver = intersects[0].object.id;
                        if (activeElement) {
                            onMouseOut(scene.getObjectById(activeElement, true));
                            activeElement = false;
                        }
                    }

                    if (activeElement && !firstTouched) {
                        onMouseOver(scene.getObjectById(activeElement, true));
                    }

                    activeElement = elToMouseOver;
                } else {
                    //-- get the items that have been removed
                    if (activeElement) {
                        onMouseOut(scene.getObjectById(activeElement, true));
                        activeElement = false;
                    }
                }

                return hits;
            }

            function stopRendering() {
                rendering = false;
                cancelAnimationFrame(animationFrameRequest);
            }

            function startRendering() {
                rendering = true;
                render();
            }

            function setCursorPosition(x, y) {
                mouse.x = (x / $$el.width()) * 2 - 1;
                mouse.y = - (y / $$el.height()) * 2 + 1;
            }

            function updateDimensions() {
                var width = $$el.width();
                var height = $$el.height();

                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                renderer.setSize(width, height);
            }

            function getScene() {
                return scene;
            }

            function getCamera() {
                return camera;
            }

            function getMouse() {
                return mouse;
            }

            function getActiveObject() {
                return scene.getObjectById(activeElement, true);
            }

            function addItem(item) {
                itemsMouseCanHit.push(item);
                item.isVisible = true;
                scene.add(item);
            }

            return {
                activeObject: getActiveObject,
                addItem: addItem,
                camera: getCamera,
                destroy: destroy,
                init: init,
                mouse: getMouse,
                scene: getScene,
                setCursorPosition: setCursorPosition,
                startRendering: startRendering,
                stopRendering: stopRendering,
                resize: updateDimensions
            };
        };
    }
]);
