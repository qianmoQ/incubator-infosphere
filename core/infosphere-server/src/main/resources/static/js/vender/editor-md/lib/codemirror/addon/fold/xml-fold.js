(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],a)}else{a(CodeMirror)}}})(function(i){var m=i.Pos;function l(r,q){return r.line-q.line||r.ch-q.ch}var j="A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";var o=j+"-:.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";var d=new RegExp("<(/?)(["+j+"]["+o+"]*)","g");function b(q,r,t,s){this.line=r;this.ch=t;this.cm=q;this.text=q.getLine(r);this.min=s?s.from:q.firstLine();this.max=s?s.to-1:q.lastLine()}function h(q,s){var r=q.cm.getTokenTypeAt(m(q.line,s));return r&&/\btag\b/.test(r)}function a(q){if(q.line>=q.max){return}q.ch=0;q.text=q.cm.getLine(++q.line);return true}function n(q){if(q.line<=q.min){return}q.text=q.cm.getLine(--q.line);q.ch=q.text.length;return true}function g(s){for(;;){var r=s.text.indexOf(">",s.ch);if(r==-1){if(a(s)){continue}else{return}}if(!h(s,r+1)){s.ch=r+1;continue}var q=s.text.lastIndexOf("/",r);var t=q>-1&&!/\S/.test(s.text.slice(q+1,r));s.ch=r+1;return t?"selfClose":"regular"}}function k(r){for(;;){var q=r.ch?r.text.lastIndexOf("<",r.ch-1):-1;if(q==-1){if(n(r)){continue}else{return}}if(!h(r,q+1)){r.ch=q;continue}d.lastIndex=q;r.ch=q;var s=d.exec(r.text);if(s&&s.index==q){return s}}}function p(q){for(;;){d.lastIndex=q.ch;var r=d.exec(q.text);if(!r){if(a(q)){continue}else{return}}if(!h(q,r.index+1)){q.ch=r.index+1;continue}q.ch=r.index+r[0].length;return r}}function e(s){for(;;){var r=s.ch?s.text.lastIndexOf(">",s.ch-1):-1;if(r==-1){if(n(s)){continue}else{return}}if(!h(s,r+1)){s.ch=r;continue}var q=s.text.lastIndexOf("/",r);var t=q>-1&&!/\S/.test(s.text.slice(q+1,r));s.ch=r+1;return t?"selfClose":"regular"}}function f(t,r){var q=[];for(;;){var v=p(t),s,x=t.line,w=t.ch-(v?v[0].length:0);if(!v||!(s=g(t))){return}if(s=="selfClose"){continue}if(v[1]){for(var u=q.length-1;u>=0;--u){if(q[u]==v[2]){q.length=u;break}}if(u<0&&(!r||r==v[2])){return{tag:v[2],from:m(x,w),to:m(t.line,t.ch)}}}else{q.push(v[2])}}}function c(s,r){var q=[];for(;;){var w=e(s);if(!w){return}if(w=="selfClose"){k(s);continue}var v=s.line,u=s.ch;var x=k(s);if(!x){return}if(x[1]){q.push(x[2])}else{for(var t=q.length-1;t>=0;--t){if(q[t]==x[2]){q.length=t;break}}if(t<0&&(!r||r==x[2])){return{tag:x[2],from:m(s.line,s.ch),to:m(v,u)}}}}}i.registerHelper("fold","xml",function(q,v){var s=new b(q,v.line,0);for(;;){var t=p(s),r;if(!t||s.line!=v.line||!(r=g(s))){return}if(!t[1]&&r!="selfClose"){var v=m(s.line,s.ch);var u=f(s,t[2]);return u&&{from:v,to:u.from}}}});i.findMatchingTag=function(q,x,t){var s=new b(q,x.line,x.ch,t);if(s.text.indexOf(">")==-1&&s.text.indexOf("<")==-1){return}var r=g(s),w=r&&m(s.line,s.ch);var v=r&&k(s);if(!r||!v||l(s,x)>0){return}var u={from:m(s.line,s.ch),to:w,tag:v[2]};if(r=="selfClose"){return{open:u,close:null,at:"open"}}if(v[1]){return{open:c(s,v[2]),close:u,at:"close"}}else{s=new b(q,w.line,w.ch,t);return{open:u,close:f(s,v[2]),at:"open"}}};i.findEnclosingTag=function(q,w,s){var r=new b(q,w.line,w.ch,s);for(;;){var u=c(r);if(!u){break}var t=new b(q,w.line,w.ch,s);var v=f(t,u.tag);if(v){return{open:u,close:v}}}};i.scanForClosingTag=function(q,u,t,s){var r=new b(q,u.line,u.ch,s?{from:0,to:s}:null);return f(r,t)}});