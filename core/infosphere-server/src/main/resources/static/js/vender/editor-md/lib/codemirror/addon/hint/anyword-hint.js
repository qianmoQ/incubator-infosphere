(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],a)}else{a(CodeMirror)}}})(function(c){var b=/[\w$]+/,a=500;c.registerHelper("hint","anyword",function(o,u){var f=u&&u.word||b;var n=u&&u.range||a;var q=o.getCursor(),e=o.getLine(q.line);var l=q.ch,h=l;while(h&&f.test(e.charAt(h-1))){--h}var g=h!=l&&e.slice(h,l);var p=[],d={};var s=new RegExp(f.source,"g");for(var k=-1;k<=1;k+=2){var t=q.line,j=Math.min(Math.max(t+k*n,o.firstLine()),o.lastLine())+k;for(;t!=j;t+=k){var r=o.getLine(t),i;while(i=s.exec(r)){if(t==q.line&&i[0]===g){continue}if((!g||i[0].lastIndexOf(g,0)==0)&&!Object.prototype.hasOwnProperty.call(d,i[0])){d[i[0]]=true;p.push(i[0])}}}}return{list:p,from:c.Pos(q.line,h),to:c.Pos(q.line,l)}})});