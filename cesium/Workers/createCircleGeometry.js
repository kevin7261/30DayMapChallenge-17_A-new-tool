/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.134.1
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */
import{a as l}from"./chunk-36M4VMOA.js";import"./chunk-PABIYHEA.js";import"./chunk-FCCJEZP2.js";import"./chunk-6VRQKJFS.js";import"./chunk-HICISBVP.js";import"./chunk-26UHRUB3.js";import"./chunk-IXYLEDPQ.js";import{a as m}from"./chunk-26456K5W.js";import"./chunk-VPIAW7TM.js";import"./chunk-CKDBE4RR.js";import"./chunk-GCWYQAXJ.js";import"./chunk-QND5YPLT.js";import"./chunk-UHBRQJNJ.js";import"./chunk-KWW52NRT.js";import"./chunk-S2E5UWT4.js";import"./chunk-XNSUDY5I.js";import{a,d as s,f as _}from"./chunk-HMXGNDLA.js";import"./chunk-V7XA5C77.js";import"./chunk-DGHOUIXA.js";import"./chunk-Q2UJZ7OW.js";import{b as p}from"./chunk-U7V5VQ2T.js";import{e as d}from"./chunk-NVZ5L4JK.js";function n(e){e=e??_.EMPTY_OBJECT;let t=e.radius;p.typeOf.number("radius",t);let i={center:e.center,semiMajorAxis:t,semiMinorAxis:t,ellipsoid:e.ellipsoid,height:e.height,extrudedHeight:e.extrudedHeight,granularity:e.granularity,vertexFormat:e.vertexFormat,stRotation:e.stRotation,shadowVolume:e.shadowVolume};this._ellipseGeometry=new l(i),this._workerName="createCircleGeometry"}n.packedLength=l.packedLength,n.pack=function(e,t,i){return p.typeOf.object("value",e),l.pack(e._ellipseGeometry,t,i)};var h=new l({center:new a,semiMajorAxis:1,semiMinorAxis:1}),t={center:new a,radius:void 0,ellipsoid:s.clone(s.default),height:void 0,extrudedHeight:void 0,granularity:void 0,vertexFormat:new m,stRotation:void 0,semiMajorAxis:void 0,semiMinorAxis:void 0,shadowVolume:void 0};n.unpack=function(e,i,o){let r=l.unpack(e,i,h);return t.center=a.clone(r._center,t.center),t.ellipsoid=s.clone(r._ellipsoid,t.ellipsoid),t.ellipsoid=s.clone(r._ellipsoid,h._ellipsoid),t.height=r._height,t.extrudedHeight=r._extrudedHeight,t.granularity=r._granularity,t.vertexFormat=m.clone(r._vertexFormat,t.vertexFormat),t.stRotation=r._stRotation,t.shadowVolume=r._shadowVolume,d(o)?(t.semiMajorAxis=r._semiMajorAxis,t.semiMinorAxis=r._semiMinorAxis,o._ellipseGeometry=new l(t),o):(t.radius=r._semiMajorAxis,new n(t))},n.createGeometry=function(e){return l.createGeometry(e._ellipseGeometry)},n.createShadowVolume=function(e,t,i){let o=e._ellipseGeometry._granularity,r=e._ellipseGeometry._ellipsoid,s=t(o,r),l=i(o,r);return new n({center:e._ellipseGeometry._center,radius:e._ellipseGeometry._semiMajorAxis,ellipsoid:r,stRotation:e._ellipseGeometry._stRotation,granularity:o,extrudedHeight:s,height:l,vertexFormat:m.POSITION_ONLY,shadowVolume:!0})},Object.defineProperties(n.prototype,{rectangle:{get:function(){return this._ellipseGeometry.rectangle}},textureCoordinateRotationPoints:{get:function(){return this._ellipseGeometry.textureCoordinateRotationPoints}}});var c=n;function g(e,t){return d(t)&&(e=c.unpack(e,t)),e._ellipseGeometry._center=a.clone(e._ellipseGeometry._center),e._ellipseGeometry._ellipsoid=s.clone(e._ellipseGeometry._ellipsoid),c.createGeometry(e)}var V=g;export{V as default};