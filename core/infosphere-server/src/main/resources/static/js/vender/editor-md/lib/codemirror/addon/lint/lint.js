(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],a)}else{a(CodeMirror)}}})(function(n){var b="CodeMirror-lint-markers";function e(v,u){var t=document.createElement("div");t.className="CodeMirror-lint-tooltip";t.appendChild(u.cloneNode(true));document.body.appendChild(t);function s(w){if(!t.parentNode){return n.off(document,"mousemove",s)}t.style.top=Math.max(0,w.clientY-t.offsetHeight-5)+"px";t.style.left=(w.clientX+5)+"px"}n.on(document,"mousemove",s);s(v);if(t.style.opacity!=null){t.style.opacity=1}return t}function j(s){if(s.parentNode){s.parentNode.removeChild(s)}}function h(s){if(!s.parentNode){return}if(s.style.opacity==null){j(s)}s.style.opacity=0;setTimeout(function(){j(s)},600)}function r(w,u,t){var v=e(w,u);function s(){n.off(t,"mouseout",s);if(v){h(v);v=null}}var x=setInterval(function(){if(v){for(var y=t;;y=y.parentNode){if(y&&y.nodeType==11){y=y.host}if(y==document.body){return}if(!y){s();break}}}if(!v){return clearInterval(x)}},400);n.on(t,"mouseout",s)}function l(s,u,t){this.marked=[];this.options=u;this.timeout=null;this.hasGutter=t;this.onMouseOver=function(v){m(s,v)}}function a(s,t){if(t instanceof Function){return{getAnnotations:t}}if(!t||t===true){t={}}if(!t.getAnnotations){t.getAnnotations=s.getHelper(n.Pos(0,0),"lint")}if(!t.getAnnotations){throw new Error("Required option 'getAnnotations' missing (lint addon)")}return t}function d(s){var u=s.state.lint;if(u.hasGutter){s.clearGutter(b)}for(var t=0;t<u.marked.length;++t){u.marked[t].clear()}u.marked.length=0}function q(x,v,s,w){var t=document.createElement("div"),u=t;t.className="CodeMirror-lint-marker-"+v;if(s){u=t.appendChild(document.createElement("div"));u.className="CodeMirror-lint-marker-multiple"}if(w!=false){n.on(u,"mouseover",function(y){r(y,x,u)})}return t}function f(t,s){if(t=="error"){return t}else{return s}}function g(w){var t=[];for(var u=0;u<w.length;++u){var v=w[u],s=v.from.line;(t[s]||(t[s]=[])).push(v)}return t}function c(u){var s=u.severity;if(!s){s="error"}var t=document.createElement("div");t.className="CodeMirror-lint-message-"+s;t.appendChild(document.createTextNode(u.message));return t}function p(s){var v=s.state.lint,u=v.options;var t=u.options||u;if(u.async||u.getAnnotations.async){u.getAnnotations(s.getValue(),k,t,s)}else{k(s,u.getAnnotations(s.getValue(),t,s))}}function k(z,y){d(z);var t=z.state.lint,B=t.options;var x=g(y);for(var C=0;C<x.length;++C){var v=x[C];if(!v){continue}var D=null;var u=t.hasGutter&&document.createDocumentFragment();for(var w=0;w<v.length;++w){var s=v[w];var A=s.severity;if(!A){A="error"}D=f(D,A);if(B.formatAnnotation){s=B.formatAnnotation(s)}if(t.hasGutter){u.appendChild(c(s))}if(s.to){t.marked.push(z.markText(s.from,s.to,{className:"CodeMirror-lint-mark-"+A,__annotation:s}))}}if(t.hasGutter){z.setGutterMarker(C,b,q(u,D,v.length>1,t.options.tooltips))}}if(B.onUpdateLinting){B.onUpdateLinting(y,x,z)}}function o(s){var t=s.state.lint;clearTimeout(t.timeout);t.timeout=setTimeout(function(){p(s)},t.options.delay||500)}function i(s,u){var t=u.target||u.srcElement;r(u,c(s),t)}function m(C,v){var w=v.target||v.srcElement;if(!/\bCodeMirror-lint-mark-/.test(w.className)){return}var u=w.getBoundingClientRect(),B=(u.left+u.right)/2,A=(u.top+u.bottom)/2;var z=C.findMarksAt(C.coordsChar({left:B,top:A},"client"));for(var t=0;t<z.length;++t){var s=z[t].__annotation;if(s){return i(s,v)}}}n.defineOption("lint",false,function(s,y,t){if(t&&t!=n.Init){d(s);s.off("change",o);n.off(s.getWrapperElement(),"mouseover",s.state.lint.onMouseOver);delete s.state.lint}if(y){var u=s.getOption("gutters"),w=false;for(var v=0;v<u.length;++v){if(u[v]==b){w=true}}var x=s.state.lint=new l(s,a(s,y),w);s.on("change",o);if(x.options.tooltips!=false){n.on(s.getWrapperElement(),"mouseover",x.onMouseOver)}p(s)}})});