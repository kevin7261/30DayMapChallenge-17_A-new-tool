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
import{a as T}from"./chunk-CAW5BE2L.js";import"./chunk-ZYCILUCF.js";import{a as l}from"./chunk-HJOLI3MG.js";import"./chunk-QXY3EU54.js";import{a as G}from"./chunk-FCCJEZP2.js";import{a as C}from"./chunk-6VRQKJFS.js";import"./chunk-HICISBVP.js";import"./chunk-26UHRUB3.js";import"./chunk-VSL3QDZM.js";import"./chunk-EOYPFHZC.js";import"./chunk-HER2H3SF.js";import{a as L}from"./chunk-6B3DM6A5.js";import"./chunk-7ZWGKBJM.js";import"./chunk-VPIAW7TM.js";import"./chunk-CKDBE4RR.js";import{a as w}from"./chunk-GCWYQAXJ.js";import{a as O}from"./chunk-QND5YPLT.js";import{b,c as d,d as k}from"./chunk-UHBRQJNJ.js";import{d as P}from"./chunk-KWW52NRT.js";import"./chunk-S2E5UWT4.js";import{a as H}from"./chunk-XNSUDY5I.js";import{a as y,d as g,f as u}from"./chunk-HMXGNDLA.js";import"./chunk-V7XA5C77.js";import"./chunk-DGHOUIXA.js";import"./chunk-Q2UJZ7OW.js";import{b as m}from"./chunk-U7V5VQ2T.js";import{e as f}from"./chunk-NVZ5L4JK.js";function E(e){let t=e.length,r=new Float64Array(3*t),n=w.createTypedArray(t,2*t),o=0,i=0;for(let c=0;c<t;c++){let s=e[c];r[o++]=s.x,r[o++]=s.y,r[o++]=s.z,n[i++]=c,n[i++]=(c+1)%t}let s=new O({position:new k({componentDatatype:H.DOUBLE,componentsPerAttribute:3,values:r})});return new d({attributes:s,indices:n,primitiveType:b.LINES})}function c(e){e=e??u.EMPTY_OBJECT;let t=e.polygonHierarchy;m.defined("options.polygonHierarchy",t),this._polygonHierarchy=t,this._workerName="createCoplanarPolygonOutlineGeometry",this.packedLength=l.computeHierarchyPackedLength(t,y)+1}c.fromPositions=function(e){e=e??u.EMPTY_OBJECT,m.defined("options.positions",e.positions);let t={polygonHierarchy:{positions:e.positions}};return new c(t)},c.pack=function(e,t,r){return m.typeOf.object("value",e),m.defined("array",t),r=r??0,r=l.packPolygonHierarchy(e._polygonHierarchy,t,r,y),t[r]=e.packedLength,t};var v={polygonHierarchy:{}};c.unpack=function(e,t,r){m.defined("array",e),t=t??0;let n=l.unpackPolygonHierarchy(e,t,y);t=n.startingIndex,delete n.startingIndex;let o=e[t];return f(r)||(r=new c(v)),r._polygonHierarchy=n,r.packedLength=o,r},c.createGeometry=function(e){let t=e._polygonHierarchy,r=t.positions;if(r=L(r,y.equalsEpsilon,!0),r.length<3||!T.validOutline(r))return;let n=l.polygonOutlinesFromHierarchy(t,!1);if(0===n.length)return;let o=[];for(let c=0;c<n.length;c++){let e=new G({geometry:E(n[c])});o.push(e)}let i=C.combineInstances(o)[0],s=P.fromPoints(t.positions);return new d({attributes:i.attributes,indices:i.indices,primitiveType:i.primitiveType,boundingSphere:s})};var h=c;function A(e,t){return f(t)&&(e=h.unpack(e,t)),e._ellipsoid=g.clone(e._ellipsoid),h.createGeometry(e)}var Z=A;export{Z as default};