(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],a)}else{a(CodeMirror)}}})(function(a){a.defineMode("rust",function(){var A=4,K=2;var k={"if":"if-style","while":"if-style",loop:"else-style","else":"else-style","do":"else-style",ret:"else-style",fail:"else-style","break":"atom",cont:"atom","const":"let",resource:"fn",let:"let",fn:"fn","for":"for",alt:"alt",iface:"iface",impl:"impl",type:"type","enum":"enum",mod:"mod",as:"op","true":"atom","false":"atom",assert:"op",check:"op",claim:"op","native":"ignore",unsafe:"ignore","import":"else-style","export":"else-style",copy:"op",log:"op",log_err:"op",use:"op",bind:"op",self:"atom",struct:"enum"};var f=function(){var ad={fn:"fn",block:"fn",obj:"obj"};var r="bool uint int i8 i16 i32 i64 u8 u16 u32 u64 float f32 f64 str char".split(" ");for(var ac=0,ae=r.length;ac<ae;++ac){ad[r[ac]]="atom"}return ad}();var Y=/[+\-*&%=<>!?|\.@]/;var q,o;function W(r,ac){q=r;return ac}function O(ae,ad){var ac=ae.next();if(ac=='"'){ad.tokenize=n;return ad.tokenize(ae,ad)}if(ac=="'"){q="atom";if(ae.eat("\\")){if(ae.skipTo("'")){ae.next();return"string"}else{return"error"}}else{ae.next();return ae.eat("'")?"string":"error"}}if(ac=="/"){if(ae.eat("/")){ae.skipToEnd();return"comment"}if(ae.eat("*")){ad.tokenize=w(1);return ad.tokenize(ae,ad)}}if(ac=="#"){if(ae.eat("[")){q="open-attr";return null}ae.eatWhile(/\w/);return W("macro","meta")}if(ac==":"&&ae.match(":<")){return W("op",null)}if(ac.match(/\d/)||(ac=="."&&ae.eat(/\d/))){var r=false;if(!ae.match(/^x[\da-f]+/i)&&!ae.match(/^b[01]+/)){ae.eatWhile(/\d/);if(ae.eat(".")){r=true;ae.eatWhile(/\d/)}if(ae.match(/^e[+\-]?\d+/i)){r=true}}if(r){ae.match(/^f(?:32|64)/)}else{ae.match(/^[ui](?:8|16|32|64)/)}return W("atom","number")}if(ac.match(/[()\[\]{}:;,]/)){return W(ac,null)}if(ac=="-"&&ae.eat(">")){return W("->",null)}if(ac.match(Y)){ae.eatWhile(Y);return W("op",null)}ae.eatWhile(/\w/);o=ae.current();if(ae.match(/^::\w/)){ae.backUp(1);return W("prefix","variable-2")}if(ad.keywords.propertyIsEnumerable(o)){return W(ad.keywords[o],o.match(/true|false/)?"atom":"keyword")}return W("name","variable")}function n(ae,ac){var r,ad=false;while(r=ae.next()){if(r=='"'&&!ad){ac.tokenize=O;return W("atom","string")}ad=!ad&&r=="\\"}return W("op","string")}function w(r){return function(af,ae){var ac=null,ad;while(ad=af.next()){if(ad=="/"&&ac=="*"){if(r==1){ae.tokenize=O;break}else{ae.tokenize=w(r-1);return ae.tokenize(af,ae)}}if(ad=="*"&&ac=="/"){ae.tokenize=w(r+1);return ae.tokenize(af,ae)}ac=ad}return"comment"}}var z={state:null,stream:null,marked:null,cc:null};function b(){for(var r=arguments.length-1;r>=0;r--){z.cc.push(arguments[r])}}function N(){b.apply(null,arguments);return true}function g(ac,ad){var r=function(){var ae=z.state;ae.lexical={indented:ae.indented,column:z.stream.column(),type:ac,prev:ae.lexical,info:ad}};r.lex=true;return r}function M(){var r=z.state;if(r.lexical.prev){if(r.lexical.type==")"){r.indented=r.lexical.indented}r.lexical=r.lexical.prev}}function C(){z.state.keywords=f}function B(){z.state.keywords=k}M.lex=C.lex=B.lex=true;function X(ad,r){function ac(ae){if(ae==","){return N(ad,ac)}if(ae==r){return N()}return N(ac)}return function(ae){if(ae==r){return N()}return b(ad,ac)}}function aa(ac,r){return N(g("stat",r),ac,M,m)}function m(r){if(r=="}"){return N()}if(r=="let"){return aa(l,"let")}if(r=="fn"){return aa(J)}if(r=="type"){return N(g("stat"),s,P,M,m)}if(r=="enum"){return aa(e)}if(r=="mod"){return aa(d)}if(r=="iface"){return aa(G)}if(r=="impl"){return aa(V)}if(r=="open-attr"){return N(g("]"),X(D,"]"),M)}if(r=="ignore"||r.match(/[\]\);,]/)){return N(m)}return b(g("stat"),D,M,P,m)}function P(r){if(r==";"){return N()}return b()}function D(r){if(r=="atom"||r=="name"){return N(u)}if(r=="{"){return N(g("}"),Z,M)}if(r.match(/[\[\(]/)){return T(r,D)}if(r.match(/[\]\)\};,]/)){return b()}if(r=="if-style"){return N(D,D)}if(r=="else-style"||r=="op"){return N(D)}if(r=="for"){return N(i,p,ab,D,D)}if(r=="alt"){return N(D,Q)}if(r=="fn"){return N(J)}if(r=="macro"){return N(h)}return N()}function u(r){if(o=="."){return N(L)}if(o=="::<"){return N(x,u)}if(r=="op"||o==":"){return N(D)}if(r=="("||r=="["){return T(r,D)}return b()}function L(){if(o.match(/^\w+$/)){z.marked="variable";return N(u)}return b(D)}function Z(r){if(r=="op"){if(o=="|"){return N(c,M,g("}","block"),m)}if(o=="||"){return N(M,g("}","block"),m)}}if(o=="mutable"||(o.match(/^\w+$/)&&z.stream.peek()==":"&&!z.stream.match("::",false))){return b(I(D))}return b(m)}function I(r){function ac(ad){if(o=="mutable"||o=="with"){z.marked="keyword";return N(ac)}if(o.match(/^\w*$/)){z.marked="variable";return N(ac)}if(ad==":"){return N(r,ac)}if(ad=="}"){return N()}return N(ac)}return ac}function c(r){if(r=="name"){z.marked="def";return N(c)}if(r=="op"&&o=="|"){return N()}return N(c)}function l(r){if(r.match(/[\]\)\};]/)){return N()}if(o=="="){return N(D,j)}if(r==","){return N(l)}return b(i,p,l)}function j(r){if(r.match(/[\]\)\};,]/)){return b(l)}else{return b(D,j)}}function p(r){if(r==":"){return N(C,U,B)}return b()}function ab(r){if(r=="name"&&o=="in"){z.marked="keyword";return N()}return b()}function J(r){if(o=="@"||o=="~"){z.marked="keyword";return N(J)}if(r=="name"){z.marked="def";return N(J)}if(o=="<"){return N(x,J)}if(r=="{"){return b(D)}if(r=="("){return N(g(")"),X(F,")"),M,J)}if(r=="->"){return N(C,U,B,J)}if(r==";"){return N()}return N(J)}function s(r){if(r=="name"){z.marked="def";return N(s)}if(o=="<"){return N(x,s)}if(o=="="){return N(C,U,B)}return N(s)}function e(r){if(r=="name"){z.marked="def";return N(e)}if(o=="<"){return N(x,e)}if(o=="="){return N(C,U,B,P)}if(r=="{"){return N(g("}"),C,y,B,M)}return N(e)}function y(r){if(r=="}"){return N()}if(r=="("){return N(g(")"),X(U,")"),M,y)}if(o.match(/^\w+$/)){z.marked="def"}return N(y)}function d(r){if(r=="name"){z.marked="def";return N(d)}if(r=="{"){return N(g("}"),m,M)}return b()}function G(r){if(r=="name"){z.marked="def";return N(G)}if(o=="<"){return N(x,G)}if(r=="{"){return N(g("}"),m,M)}return b()}function V(r){if(o=="<"){return N(x,V)}if(o=="of"||o=="for"){z.marked="keyword";return N(U,V)}if(r=="name"){z.marked="def";return N(V)}if(r=="{"){return N(g("}"),m,M)}return b()}function x(){if(o==">"){return N()}if(o==","){return N(x)}if(o==":"){return N(U,x)}return b(U,x)}function F(r){if(r=="name"){z.marked="def";return N(F)}if(r==":"){return N(C,U,B)}return b()}function U(r){if(r=="name"){z.marked="variable-3";return N(H)}if(o=="mutable"){z.marked="keyword";return N(U)}if(r=="atom"){return N(H)}if(r=="op"||r=="obj"){return N(U)}if(r=="fn"){return N(E)}if(r=="{"){return N(g("{"),I(U),M)}return T(r,U)}function H(){if(o=="<"){return N(x)}return b()}function E(r){if(r=="("){return N(g("("),X(U,")"),M,E)}if(r=="->"){return N(U)}return b()}function i(r){if(r=="name"){z.marked="def";return N(t)}if(r=="atom"){return N(t)}if(r=="op"){return N(i)}if(r.match(/[\]\)\};,]/)){return b()}return T(r,i)}function t(r){if(r=="op"&&o=="."){return N()}if(o=="to"){z.marked="keyword";return N(i)}else{return b()}}function Q(r){if(r=="{"){return N(g("}","alt"),S,M)}return b()}function S(r){if(r=="}"){return N()}if(r=="|"){return N(S)}if(o=="when"){z.marked="keyword";return N(D,R)}if(r.match(/[\]\);,]/)){return N(S)}return b(i,R)}function R(r){if(r=="{"){return N(g("}","alt"),m,M,S)}else{return b(S)}}function h(r){if(r.match(/[\[\(\{]/)){return T(r,D)}return b()}function T(ac,r){if(ac=="["){return N(g("]"),X(r,"]"),M)}if(ac=="("){return N(g(")"),X(r,")"),M)}if(ac=="{"){return N(g("}"),X(r,"}"),M)}return N()}function v(ad,ae,r){var af=ad.cc;z.state=ad;z.stream=ae;z.marked=null,z.cc=af;while(true){var ac=af.length?af.pop():m;if(ac(q)){while(af.length&&af[af.length-1].lex){af.pop()()}return z.marked||r}}}return{startState:function(){return{tokenize:O,cc:[],lexical:{indented:-A,column:0,type:"top",align:false},keywords:k,indented:0}},token:function(ad,ac){if(ad.sol()){if(!ac.lexical.hasOwnProperty("align")){ac.lexical.align=false}ac.indented=ad.indentation()}if(ad.eatSpace()){return null}q=o=null;var r=ac.tokenize(ad,ac);if(r=="comment"){return r}if(!ac.lexical.hasOwnProperty("align")){ac.lexical.align=true}if(q=="prefix"){return r}if(!o){o=ad.current()}return v(ac,ad,r)},indent:function(ag,r){if(ag.tokenize!=O){return 0}var af=r&&r.charAt(0),ad=ag.lexical,ae=ad.type,ac=af==ae;if(ae=="stat"){return ad.indented+A}if(ad.align){return ad.column+(ac?0:1)}return ad.indented+(ac?0:(ad.info=="alt"?K:A))},electricChars:"{}",blockCommentStart:"/*",blockCommentEnd:"*/",lineComment:"//",fold:"brace"}});a.defineMIME("text/x-rustsrc","rust")});