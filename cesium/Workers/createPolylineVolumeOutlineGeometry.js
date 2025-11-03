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
import{a as k}from"./chunk-ELLIJ4U5.js";import{a as N,c as w}from"./chunk-5YOHHDAP.js";import"./chunk-PKPGT5QI.js";import"./chunk-DYQOAIKX.js";import"./chunk-VSL3QDZM.js";import"./chunk-EOYPFHZC.js";import{a as v,b as G}from"./chunk-HER2H3SF.js";import{a as q}from"./chunk-6B3DM6A5.js";import"./chunk-7ZWGKBJM.js";import"./chunk-VPIAW7TM.js";import"./chunk-CKDBE4RR.js";import{a as g}from"./chunk-GCWYQAXJ.js";import{a as O}from"./chunk-QND5YPLT.js";import{b as A,c as R,d as S}from"./chunk-UHBRQJNJ.js";import{d as C}from"./chunk-KWW52NRT.js";import"./chunk-S2E5UWT4.js";import{a as b}from"./chunk-XNSUDY5I.js";import{a as d,c as y,d as s,f as D}from"./chunk-HMXGNDLA.js";import{a as T}from"./chunk-V7XA5C77.js";import"./chunk-DGHOUIXA.js";import"./chunk-Q2UJZ7OW.js";import{a}from"./chunk-U7V5VQ2T.js";import{e as u}from"./chunk-NVZ5L4JK.js";function W(e,o){let r=new O;r.position=new S({componentDatatype:b.DOUBLE,componentsPerAttribute:3,values:e});let i,t,n=o.length,s=r.position.values.length/3,a=e.length/3/n,p=g.createTypedArray(s,2*n*(a+1)),c=0;i=0;let u=i*n;for(t=0;t<n-1;t++)p[c++]=t+u,p[c++]=t+u+1;for(p[c++]=n-1+u,p[c++]=u,i=a-1,u=i*n,t=0;t<n-1;t++)p[c++]=t+u,p[c++]=t+u+1;for(p[c++]=n-1+u,p[c++]=u,i=0;i<a-1;i++){let e=n*i,o=e+n;for(t=0;t<n;t++)p[c++]=t+e,p[c++]=t+o}return new R({attributes:r,indices:g.createTypedArray(s,p),boundingSphere:C.fromVertices(e),primitiveType:A.LINES})}function P(e){e=e??D.EMPTY_OBJECT;let o=e.polylinePositions,r=e.shapePositions;if(!u(o))throw new a("options.polylinePositions is required.");if(!u(r))throw new a("options.shapePositions is required.");this._positions=o,this._shape=r,this._ellipsoid=s.clone(e.ellipsoid??s.default),this._cornerType=e.cornerType??N.ROUNDED,this._granularity=e.granularity??T.RADIANS_PER_DEGREE,this._workerName="createPolylineVolumeOutlineGeometry";let i=1+o.length*d.packedLength;i+=1+r.length*y.packedLength,this.packedLength=i+s.packedLength+2}P.pack=function(e,o,r){if(!u(e))throw new a("value is required");if(!u(o))throw new a("array is required");r=r??0;let i,t=e._positions,n=t.length;for(o[r++]=n,i=0;i<n;++i,r+=d.packedLength)d.pack(t[i],o,r);let p=e._shape;for(n=p.length,o[r++]=n,i=0;i<n;++i,r+=y.packedLength)y.pack(p[i],o,r);return s.pack(e._ellipsoid,o,r),r+=s.packedLength,o[r++]=e._cornerType,o[r]=e._granularity,o};var B=s.clone(s.UNIT_SPHERE),_={polylinePositions:void 0,shapePositions:void 0,ellipsoid:B,height:void 0,cornerType:void 0,granularity:void 0};P.unpack=function(e,o,r){if(!u(e))throw new a("array is required");o=o??0;let i,t=e[o++],n=new Array(t);for(i=0;i<t;++i,o+=d.packedLength)n[i]=d.unpack(e,o);t=e[o++];let p=new Array(t);for(i=0;i<t;++i,o+=y.packedLength)p[i]=y.unpack(e,o);let c=s.unpack(e,o,B);o+=s.packedLength;let l=e[o++],h=e[o];return u(r)?(r._positions=n,r._shape=p,r._ellipsoid=s.clone(c,r._ellipsoid),r._cornerType=l,r._granularity=h,r):(_.polylinePositions=n,_.shapePositions=p,_.cornerType=l,_.granularity=h,new P(_))};var F=new k;P.createGeometry=function(e){let o=e._positions,r=q(o,d.equalsEpsilon),i=e._shape;if(i=w.removeDuplicatesFromShape(i),r.length<2||i.length<3)return;G.computeWindingOrder2D(i)===v.CLOCKWISE&&i.reverse();let t=k.fromPoints(i,F),n=w.computePositions(r,i,t,e,!1);return W(n,i)};var E=P;function M(e,o){return u(o)&&(e=E.unpack(e,o)),e._ellipsoid=s.clone(e._ellipsoid),E.createGeometry(e)}var he=M;export{he as default};