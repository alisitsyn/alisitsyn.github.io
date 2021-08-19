!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=20)}([function(e,t,r){const n=r(6),{MAX_LENGTH:o,MAX_SAFE_INTEGER:s}=r(5),{re:i,t:a}=r(3),{compareIdentifiers:l}=r(8);class c{constructor(e,t){if(t&&"object"==typeof t||(t={loose:!!t,includePrerelease:!1}),e instanceof c){if(e.loose===!!t.loose&&e.includePrerelease===!!t.includePrerelease)return e;e=e.version}else if("string"!=typeof e)throw new TypeError(`Invalid Version: ${e}`);if(e.length>o)throw new TypeError(`version is longer than ${o} characters`);n("SemVer",e,t),this.options=t,this.loose=!!t.loose,this.includePrerelease=!!t.includePrerelease;const r=e.trim().match(t.loose?i[a.LOOSE]:i[a.FULL]);if(!r)throw new TypeError(`Invalid Version: ${e}`);if(this.raw=e,this.major=+r[1],this.minor=+r[2],this.patch=+r[3],this.major>s||this.major<0)throw new TypeError("Invalid major version");if(this.minor>s||this.minor<0)throw new TypeError("Invalid minor version");if(this.patch>s||this.patch<0)throw new TypeError("Invalid patch version");r[4]?this.prerelease=r[4].split(".").map(e=>{if(/^[0-9]+$/.test(e)){const t=+e;if(t>=0&&t<s)return t}return e}):this.prerelease=[],this.build=r[5]?r[5].split("."):[],this.format()}format(){return this.version=`${this.major}.${this.minor}.${this.patch}`,this.prerelease.length&&(this.version+=`-${this.prerelease.join(".")}`),this.version}toString(){return this.version}compare(e){if(n("SemVer.compare",this.version,this.options,e),!(e instanceof c)){if("string"==typeof e&&e===this.version)return 0;e=new c(e,this.options)}return e.version===this.version?0:this.compareMain(e)||this.comparePre(e)}compareMain(e){return e instanceof c||(e=new c(e,this.options)),l(this.major,e.major)||l(this.minor,e.minor)||l(this.patch,e.patch)}comparePre(e){if(e instanceof c||(e=new c(e,this.options)),this.prerelease.length&&!e.prerelease.length)return-1;if(!this.prerelease.length&&e.prerelease.length)return 1;if(!this.prerelease.length&&!e.prerelease.length)return 0;let t=0;do{const r=this.prerelease[t],o=e.prerelease[t];if(n("prerelease compare",t,r,o),void 0===r&&void 0===o)return 0;if(void 0===o)return 1;if(void 0===r)return-1;if(r!==o)return l(r,o)}while(++t)}compareBuild(e){e instanceof c||(e=new c(e,this.options));let t=0;do{const r=this.build[t],o=e.build[t];if(n("prerelease compare",t,r,o),void 0===r&&void 0===o)return 0;if(void 0===o)return 1;if(void 0===r)return-1;if(r!==o)return l(r,o)}while(++t)}inc(e,t){switch(e){case"premajor":this.prerelease.length=0,this.patch=0,this.minor=0,this.major++,this.inc("pre",t);break;case"preminor":this.prerelease.length=0,this.patch=0,this.minor++,this.inc("pre",t);break;case"prepatch":this.prerelease.length=0,this.inc("patch",t),this.inc("pre",t);break;case"prerelease":0===this.prerelease.length&&this.inc("patch",t),this.inc("pre",t);break;case"major":0===this.minor&&0===this.patch&&0!==this.prerelease.length||this.major++,this.minor=0,this.patch=0,this.prerelease=[];break;case"minor":0===this.patch&&0!==this.prerelease.length||this.minor++,this.patch=0,this.prerelease=[];break;case"patch":0===this.prerelease.length&&this.patch++,this.prerelease=[];break;case"pre":if(0===this.prerelease.length)this.prerelease=[0];else{let e=this.prerelease.length;for(;--e>=0;)"number"==typeof this.prerelease[e]&&(this.prerelease[e]++,e=-2);-1===e&&this.prerelease.push(0)}t&&(this.prerelease[0]===t?isNaN(this.prerelease[1])&&(this.prerelease=[t,0]):this.prerelease=[t,0]);break;default:throw new Error(`invalid increment argument: ${e}`)}return this.format(),this.raw=this.version,this}}e.exports=c},function(e,t,r){class n{constructor(e,t){if(t&&"object"==typeof t||(t={loose:!!t,includePrerelease:!1}),e instanceof n)return e.loose===!!t.loose&&e.includePrerelease===!!t.includePrerelease?e:new n(e.raw,t);if(e instanceof o)return this.raw=e.value,this.set=[[e]],this.format(),this;if(this.options=t,this.loose=!!t.loose,this.includePrerelease=!!t.includePrerelease,this.raw=e,this.set=e.split(/\s*\|\|\s*/).map(e=>this.parseRange(e.trim())).filter(e=>e.length),!this.set.length)throw new TypeError(`Invalid SemVer Range: ${e}`);this.format()}format(){return this.range=this.set.map(e=>e.join(" ").trim()).join("||").trim(),this.range}toString(){return this.range}parseRange(e){const t=this.options.loose;e=e.trim();const r=t?a[l.HYPHENRANGELOOSE]:a[l.HYPHENRANGE];e=e.replace(r,O),s("hyphen replace",e),e=e.replace(a[l.COMPARATORTRIM],c),s("comparator trim",e,a[l.COMPARATORTRIM]),e=(e=(e=e.replace(a[l.TILDETRIM],u)).replace(a[l.CARETTRIM],p)).split(/\s+/).join(" ");const n=t?a[l.COMPARATORLOOSE]:a[l.COMPARATOR];return e.split(" ").map(e=>E(e,this.options)).join(" ").split(/\s+/).filter(this.options.loose?e=>!!e.match(n):()=>!0).map(e=>new o(e,this.options))}intersects(e,t){if(!(e instanceof n))throw new TypeError("a Range is required");return this.set.some(r=>h(r,t)&&e.set.some(e=>h(e,t)&&r.every(r=>e.every(e=>r.intersects(e,t)))))}test(e){if(!e)return!1;if("string"==typeof e)try{e=new i(e,this.options)}catch(e){return!1}for(let t=0;t<this.set.length;t++)if(T(this.set[t],e,this.options))return!0;return!1}}e.exports=n;const o=r(14),s=r(6),i=r(0),{re:a,t:l,comparatorTrimReplace:c,tildeTrimReplace:u,caretTrimReplace:p}=r(3),h=(e,t)=>{let r=!0;const n=e.slice();let o=n.pop();for(;r&&n.length;)r=n.every(e=>o.intersects(e,t)),o=n.pop();return r},E=(e,t)=>(s("comp",e,t),e=I(e,t),s("caret",e),e=m(e,t),s("tildes",e),e=N(e,t),s("xrange",e),e=$(e,t),s("stars",e),e),f=e=>!e||"x"===e.toLowerCase()||"*"===e,m=(e,t)=>e.trim().split(/\s+/).map(e=>d(e,t)).join(" "),d=(e,t)=>{const r=t.loose?a[l.TILDELOOSE]:a[l.TILDE];return e.replace(r,(t,r,n,o,i)=>{let a;return s("tilde",e,t,r,n,o,i),f(r)?a="":f(n)?a=`>=${r}.0.0 <${+r+1}.0.0`:f(o)?a=`>=${r}.${n}.0 <${r}.${+n+1}.0`:i?(s("replaceTilde pr",i),a=`>=${r}.${n}.${o}-${i} <${r}.${+n+1}.0`):a=`>=${r}.${n}.${o} <${r}.${+n+1}.0`,s("tilde return",a),a})},I=(e,t)=>e.trim().split(/\s+/).map(e=>R(e,t)).join(" "),R=(e,t)=>{s("caret",e,t);const r=t.loose?a[l.CARETLOOSE]:a[l.CARET];return e.replace(r,(t,r,n,o,i)=>{let a;return s("caret",e,t,r,n,o,i),f(r)?a="":f(n)?a=`>=${r}.0.0 <${+r+1}.0.0`:f(o)?a="0"===r?`>=${r}.${n}.0 <${r}.${+n+1}.0`:`>=${r}.${n}.0 <${+r+1}.0.0`:i?(s("replaceCaret pr",i),a="0"===r?"0"===n?`>=${r}.${n}.${o}-${i} <${r}.${n}.${+o+1}`:`>=${r}.${n}.${o}-${i} <${r}.${+n+1}.0`:`>=${r}.${n}.${o}-${i} <${+r+1}.0.0`):(s("no pr"),a="0"===r?"0"===n?`>=${r}.${n}.${o} <${r}.${n}.${+o+1}`:`>=${r}.${n}.${o} <${r}.${+n+1}.0`:`>=${r}.${n}.${o} <${+r+1}.0.0`),s("caret return",a),a})},N=(e,t)=>(s("replaceXRanges",e,t),e.split(/\s+/).map(e=>v(e,t)).join(" ")),v=(e,t)=>{e=e.trim();const r=t.loose?a[l.XRANGELOOSE]:a[l.XRANGE];return e.replace(r,(r,n,o,i,a,l)=>{s("xRange",e,r,n,o,i,a,l);const c=f(o),u=c||f(i),p=u||f(a),h=p;return"="===n&&h&&(n=""),l=t.includePrerelease?"-0":"",c?r=">"===n||"<"===n?"<0.0.0-0":"*":n&&h?(u&&(i=0),a=0,">"===n?(n=">=",u?(o=+o+1,i=0,a=0):(i=+i+1,a=0)):"<="===n&&(n="<",u?o=+o+1:i=+i+1),r=`${n+o}.${i}.${a}${l}`):u?r=`>=${o}.0.0${l} <${+o+1}.0.0${l}`:p&&(r=`>=${o}.${i}.0${l} <${o}.${+i+1}.0${l}`),s("xRange return",r),r})},$=(e,t)=>(s("replaceStars",e,t),e.trim().replace(a[l.STAR],"")),O=(e,t,r,n,o,s,i,a,l,c,u,p,h)=>`${t=f(r)?"":f(n)?`>=${r}.0.0`:f(o)?`>=${r}.${n}.0`:`>=${t}`} ${a=f(l)?"":f(c)?`<${+l+1}.0.0`:f(u)?`<${l}.${+c+1}.0`:p?`<=${l}.${c}.${u}-${p}`:`<=${a}`}`.trim(),T=(e,t,r)=>{for(let r=0;r<e.length;r++)if(!e[r].test(t))return!1;if(t.prerelease.length&&!r.includePrerelease){for(let r=0;r<e.length;r++)if(s(e[r].semver),e[r].semver!==o.ANY&&e[r].semver.prerelease.length>0){const n=e[r].semver;if(n.major===t.major&&n.minor===t.minor&&n.patch===t.patch)return!0}return!1}return!0}},function(e,t,r){const n=r(0);e.exports=(e,t,r)=>new n(e,r).compare(new n(t,r))},function(e,t,r){const{MAX_SAFE_COMPONENT_LENGTH:n}=r(5),o=r(6),s=(t=e.exports={}).re=[],i=t.src=[],a=t.t={};let l=0;const c=(e,t,r)=>{const n=l++;o(n,t),a[e]=n,i[n]=t,s[n]=new RegExp(t,r?"g":void 0)};c("NUMERICIDENTIFIER","0|[1-9]\\d*"),c("NUMERICIDENTIFIERLOOSE","[0-9]+"),c("NONNUMERICIDENTIFIER","\\d*[a-zA-Z-][a-zA-Z0-9-]*"),c("MAINVERSION",`(${i[a.NUMERICIDENTIFIER]})\\.`+`(${i[a.NUMERICIDENTIFIER]})\\.`+`(${i[a.NUMERICIDENTIFIER]})`),c("MAINVERSIONLOOSE",`(${i[a.NUMERICIDENTIFIERLOOSE]})\\.`+`(${i[a.NUMERICIDENTIFIERLOOSE]})\\.`+`(${i[a.NUMERICIDENTIFIERLOOSE]})`),c("PRERELEASEIDENTIFIER",`(?:${i[a.NUMERICIDENTIFIER]}|${i[a.NONNUMERICIDENTIFIER]})`),c("PRERELEASEIDENTIFIERLOOSE",`(?:${i[a.NUMERICIDENTIFIERLOOSE]}|${i[a.NONNUMERICIDENTIFIER]})`),c("PRERELEASE",`(?:-(${i[a.PRERELEASEIDENTIFIER]}(?:\\.${i[a.PRERELEASEIDENTIFIER]})*))`),c("PRERELEASELOOSE",`(?:-?(${i[a.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${i[a.PRERELEASEIDENTIFIERLOOSE]})*))`),c("BUILDIDENTIFIER","[0-9A-Za-z-]+"),c("BUILD",`(?:\\+(${i[a.BUILDIDENTIFIER]}(?:\\.${i[a.BUILDIDENTIFIER]})*))`),c("FULLPLAIN",`v?${i[a.MAINVERSION]}${i[a.PRERELEASE]}?${i[a.BUILD]}?`),c("FULL",`^${i[a.FULLPLAIN]}$`),c("LOOSEPLAIN",`[v=\\s]*${i[a.MAINVERSIONLOOSE]}${i[a.PRERELEASELOOSE]}?${i[a.BUILD]}?`),c("LOOSE",`^${i[a.LOOSEPLAIN]}$`),c("GTLT","((?:<|>)?=?)"),c("XRANGEIDENTIFIERLOOSE",`${i[a.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`),c("XRANGEIDENTIFIER",`${i[a.NUMERICIDENTIFIER]}|x|X|\\*`),c("XRANGEPLAIN",`[v=\\s]*(${i[a.XRANGEIDENTIFIER]})`+`(?:\\.(${i[a.XRANGEIDENTIFIER]})`+`(?:\\.(${i[a.XRANGEIDENTIFIER]})`+`(?:${i[a.PRERELEASE]})?${i[a.BUILD]}?`+")?)?"),c("XRANGEPLAINLOOSE",`[v=\\s]*(${i[a.XRANGEIDENTIFIERLOOSE]})`+`(?:\\.(${i[a.XRANGEIDENTIFIERLOOSE]})`+`(?:\\.(${i[a.XRANGEIDENTIFIERLOOSE]})`+`(?:${i[a.PRERELEASELOOSE]})?${i[a.BUILD]}?`+")?)?"),c("XRANGE",`^${i[a.GTLT]}\\s*${i[a.XRANGEPLAIN]}$`),c("XRANGELOOSE",`^${i[a.GTLT]}\\s*${i[a.XRANGEPLAINLOOSE]}$`),c("COERCE",`(^|[^\\d])(\\d{1,${n}})`+`(?:\\.(\\d{1,${n}}))?`+`(?:\\.(\\d{1,${n}}))?`+"(?:$|[^\\d])"),c("COERCERTL",i[a.COERCE],!0),c("LONETILDE","(?:~>?)"),c("TILDETRIM",`(\\s*)${i[a.LONETILDE]}\\s+`,!0),t.tildeTrimReplace="$1~",c("TILDE",`^${i[a.LONETILDE]}${i[a.XRANGEPLAIN]}$`),c("TILDELOOSE",`^${i[a.LONETILDE]}${i[a.XRANGEPLAINLOOSE]}$`),c("LONECARET","(?:\\^)"),c("CARETTRIM",`(\\s*)${i[a.LONECARET]}\\s+`,!0),t.caretTrimReplace="$1^",c("CARET",`^${i[a.LONECARET]}${i[a.XRANGEPLAIN]}$`),c("CARETLOOSE",`^${i[a.LONECARET]}${i[a.XRANGEPLAINLOOSE]}$`),c("COMPARATORLOOSE",`^${i[a.GTLT]}\\s*(${i[a.LOOSEPLAIN]})$|^$`),c("COMPARATOR",`^${i[a.GTLT]}\\s*(${i[a.FULLPLAIN]})$|^$`),c("COMPARATORTRIM",`(\\s*)${i[a.GTLT]}\\s*(${i[a.LOOSEPLAIN]}|${i[a.XRANGEPLAIN]})`,!0),t.comparatorTrimReplace="$1$2$3",c("HYPHENRANGE",`^\\s*(${i[a.XRANGEPLAIN]})`+"\\s+-\\s+"+`(${i[a.XRANGEPLAIN]})`+"\\s*$"),c("HYPHENRANGELOOSE",`^\\s*(${i[a.XRANGEPLAINLOOSE]})`+"\\s+-\\s+"+`(${i[a.XRANGEPLAINLOOSE]})`+"\\s*$"),c("STAR","(<|>)?=?\\s*\\*")},function(e,t,r){const{MAX_LENGTH:n}=r(5),{re:o,t:s}=r(3),i=r(0);e.exports=(e,t)=>{if(t&&"object"==typeof t||(t={loose:!!t,includePrerelease:!1}),e instanceof i)return e;if("string"!=typeof e)return null;if(e.length>n)return null;if(!(t.loose?o[s.LOOSE]:o[s.FULL]).test(e))return null;try{return new i(e,t)}catch(e){return null}}},function(e,t){const r=Number.MAX_SAFE_INTEGER||9007199254740991;e.exports={SEMVER_SPEC_VERSION:"2.0.0",MAX_LENGTH:256,MAX_SAFE_INTEGER:r,MAX_SAFE_COMPONENT_LENGTH:16}},function(e,t,r){(function(t){const r="object"==typeof t&&t.env&&t.env.NODE_DEBUG&&/\bsemver\b/i.test(t.env.NODE_DEBUG)?(...e)=>console.error("SEMVER",...e):()=>{};e.exports=r}).call(this,r(24))},function(e,t,r){const n=r(2);e.exports=(e,t,r)=>n(e,t,r)>0},function(e,t){const r=/^[0-9]+$/,n=(e,t)=>{const n=r.test(e),o=r.test(t);return n&&o&&(e=+e,t=+t),e===t?0:n&&!o?-1:o&&!n?1:e<t?-1:1};e.exports={compareIdentifiers:n,rcompareIdentifiers:(e,t)=>n(t,e)}},function(e,t,r){const n=r(2);e.exports=(e,t,r)=>0===n(e,t,r)},function(e,t,r){const n=r(0);e.exports=(e,t,r)=>{const o=new n(e,r),s=new n(t,r);return o.compare(s)||o.compareBuild(s)}},function(e,t,r){const n=r(2);e.exports=(e,t,r)=>n(e,t,r)<0},function(e,t,r){const n=r(2);e.exports=(e,t,r)=>n(e,t,r)>=0},function(e,t,r){const n=r(2);e.exports=(e,t,r)=>n(e,t,r)<=0},function(e,t,r){const n=Symbol("SemVer ANY");class o{static get ANY(){return n}constructor(e,t){if(t&&"object"==typeof t||(t={loose:!!t,includePrerelease:!1}),e instanceof o){if(e.loose===!!t.loose)return e;e=e.value}l("comparator",e,t),this.options=t,this.loose=!!t.loose,this.parse(e),this.semver===n?this.value="":this.value=this.operator+this.semver.version,l("comp",this)}parse(e){const t=this.options.loose?s[i.COMPARATORLOOSE]:s[i.COMPARATOR],r=e.match(t);if(!r)throw new TypeError(`Invalid comparator: ${e}`);this.operator=void 0!==r[1]?r[1]:"","="===this.operator&&(this.operator=""),r[2]?this.semver=new c(r[2],this.options.loose):this.semver=n}toString(){return this.value}test(e){if(l("Comparator.test",e,this.options.loose),this.semver===n||e===n)return!0;if("string"==typeof e)try{e=new c(e,this.options)}catch(e){return!1}return a(e,this.operator,this.semver,this.options)}intersects(e,t){if(!(e instanceof o))throw new TypeError("a Comparator is required");if(t&&"object"==typeof t||(t={loose:!!t,includePrerelease:!1}),""===this.operator)return""===this.value||new u(e.value,t).test(this.value);if(""===e.operator)return""===e.value||new u(this.value,t).test(e.semver);const r=!(">="!==this.operator&&">"!==this.operator||">="!==e.operator&&">"!==e.operator),n=!("<="!==this.operator&&"<"!==this.operator||"<="!==e.operator&&"<"!==e.operator),s=this.semver.version===e.semver.version,i=!(">="!==this.operator&&"<="!==this.operator||">="!==e.operator&&"<="!==e.operator),l=a(this.semver,"<",e.semver,t)&&(">="===this.operator||">"===this.operator)&&("<="===e.operator||"<"===e.operator),c=a(this.semver,">",e.semver,t)&&("<="===this.operator||"<"===this.operator)&&(">="===e.operator||">"===e.operator);return r||n||s&&i||l||c}}e.exports=o;const{re:s,t:i}=r(3),a=r(18),l=r(6),c=r(0),u=r(1)},function(e,t,r){const n=r(0),o=r(14),{ANY:s}=o,i=r(1),a=r(19),l=r(7),c=r(11),u=r(13),p=r(12);e.exports=(e,t,r,h)=>{let E,f,m,d,I;switch(e=new n(e,h),t=new i(t,h),r){case">":E=l,f=u,m=c,d=">",I=">=";break;case"<":E=c,f=p,m=l,d="<",I="<=";break;default:throw new TypeError('Must provide a hilo val of "<" or ">"')}if(a(e,t,h))return!1;for(let r=0;r<t.set.length;++r){const n=t.set[r];let i=null,a=null;if(n.forEach(e=>{e.semver===s&&(e=new o(">=0.0.0")),i=i||e,a=a||e,E(e.semver,i.semver,h)?i=e:m(e.semver,a.semver,h)&&(a=e)}),i.operator===d||i.operator===I)return!1;if((!a.operator||a.operator===d)&&f(e,a.semver))return!1;if(a.operator===I&&m(e,a.semver))return!1}return!0}},function(e,t){e.exports=jQuery},function(e,t,r){const n=r(2);e.exports=(e,t,r)=>0!==n(e,t,r)},function(e,t,r){const n=r(9),o=r(17),s=r(7),i=r(12),a=r(11),l=r(13);e.exports=(e,t,r,c)=>{switch(t){case"===":return"object"==typeof e&&(e=e.version),"object"==typeof r&&(r=r.version),e===r;case"!==":return"object"==typeof e&&(e=e.version),"object"==typeof r&&(r=r.version),e!==r;case"":case"=":case"==":return n(e,r,c);case"!=":return o(e,r,c);case">":return s(e,r,c);case">=":return i(e,r,c);case"<":return a(e,r,c);case"<=":return l(e,r,c);default:throw new TypeError(`Invalid operator: ${t}`)}}},function(e,t,r){const n=r(1);e.exports=(e,t,r)=>{try{t=new n(t,r)}catch(e){return!1}return t.test(e)}},function(e,t,r){r(21),r(22),e.exports=r(47)},function(e,t,r){(function(){var t="undefined"!=typeof window?window.jQuery:r(16);e.exports.ThemeNav={navBar:null,win:null,winScroll:!1,winResize:!1,linkScroll:!1,winPosition:0,winHeight:null,docHeight:null,isRunning:!1,enable:function(e){var r=this;void 0===e&&(e=!0),r.isRunning||(r.isRunning=!0,t((function(t){r.init(t),r.reset(),r.win.on("hashchange",r.reset),e&&r.win.on("scroll",(function(){r.linkScroll||r.winScroll||(r.winScroll=!0,requestAnimationFrame((function(){r.onScroll()})))})),r.win.on("resize",(function(){r.winResize||(r.winResize=!0,requestAnimationFrame((function(){r.onResize()})))})),r.onResize()})))},enableSticky:function(){this.enable(!0)},init:function(e){e(document);var t=this;this.navBar=e("div.wy-side-scroll:first"),this.win=e(window),e(document).on("click","[data-toggle='wy-nav-top']",(function(){e("[data-toggle='wy-nav-shift']").toggleClass("shift"),e("[data-toggle='rst-versions']").toggleClass("shift")})).on("click",".wy-menu-vertical .current ul li a",(function(){var r=e(this);e("[data-toggle='wy-nav-shift']").removeClass("shift"),e("[data-toggle='rst-versions']").toggleClass("shift"),t.toggleCurrent(r),t.hashChange()})).on("click","[data-toggle='rst-current-version']",(function(){e("[data-toggle='rst-versions']").toggleClass("shift-up")})),e("table.docutils:not(.field-list,.footnote,.citation)").wrap("<div class='wy-table-responsive'></div>"),e("table.docutils.footnote").wrap("<div class='wy-table-responsive footnote'></div>"),e("table.docutils.citation").wrap("<div class='wy-table-responsive citation'></div>"),e(".wy-menu-vertical ul").not(".simple").siblings("a").each((function(){var r=e(this);expand=e('<span class="toctree-expand"></span>'),expand.on("click",(function(e){return t.toggleCurrent(r),e.stopPropagation(),!1})),r.prepend(expand)}))},reset:function(){var e=encodeURI(window.location.hash)||"#";try{var t=$(".wy-menu-vertical"),r=t.find('[href="'+e+'"]');if(0===r.length){var n=$('.document [id="'+e.substring(1)+'"]').closest("div.section");0===(r=t.find('[href="#'+n.attr("id")+'"]')).length&&(r=t.find('[href="#"]'))}r.length>0&&($(".wy-menu-vertical .current").removeClass("current"),r.addClass("current"),r.closest("li.toctree-l1").addClass("current"),r.closest("li.toctree-l1").parent().addClass("current"),r.closest("li.toctree-l1").addClass("current"),r.closest("li.toctree-l2").addClass("current"),r.closest("li.toctree-l3").addClass("current"),r.closest("li.toctree-l4").addClass("current"),r[0].scrollIntoView())}catch(e){console.log("Error expanding nav for anchor",e)}},onScroll:function(){this.winScroll=!1;var e=this.win.scrollTop(),t=e+this.winHeight,r=this.navBar.scrollTop()+(e-this.winPosition);e<0||t>this.docHeight||(this.navBar.scrollTop(r),this.winPosition=e)},onResize:function(){this.winResize=!1,this.winHeight=this.win.height(),this.docHeight=$(document).height()},hashChange:function(){this.linkScroll=!0,this.win.one("hashchange",(function(){this.linkScroll=!1}))},toggleCurrent:function(e){var t=e.closest("li");t.siblings("li.current").removeClass("current"),t.siblings().find("li.current").removeClass("current"),t.find("> ul li.current").removeClass("current"),t.toggleClass("current")}},"undefined"!=typeof window&&(window.SphinxRtdTheme={Navigation:e.exports.ThemeNav,StickyNav:e.exports.ThemeNav}),function(){for(var e=0,t=["ms","moz","webkit","o"],r=0;r<t.length&&!window.requestAnimationFrame;++r)window.requestAnimationFrame=window[t[r]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[t[r]+"CancelAnimationFrame"]||window[t[r]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t,r){var n=(new Date).getTime(),o=Math.max(0,16-(n-e)),s=window.setTimeout((function(){t(n+o)}),o);return e=n+o,s}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)})}()}).call(window)},function(e,t,r){},function(e,t,r){const n=r(3);e.exports={re:n.re,src:n.src,tokens:n.t,SEMVER_SPEC_VERSION:r(5).SEMVER_SPEC_VERSION,SemVer:r(0),compareIdentifiers:r(8).compareIdentifiers,rcompareIdentifiers:r(8).rcompareIdentifiers,parse:r(4),valid:r(25),clean:r(26),inc:r(27),diff:r(28),major:r(29),minor:r(30),patch:r(31),prerelease:r(32),compare:r(2),rcompare:r(33),compareLoose:r(34),compareBuild:r(10),sort:r(35),rsort:r(36),gt:r(7),lt:r(11),eq:r(9),neq:r(17),gte:r(12),lte:r(13),cmp:r(18),coerce:r(37),Comparator:r(14),Range:r(1),satisfies:r(19),toComparators:r(38),maxSatisfying:r(39),minSatisfying:r(40),minVersion:r(41),validRange:r(42),outside:r(15),gtr:r(43),ltr:r(44),intersects:r(45)}},function(e,t){var r,n,o=e.exports={};function s(){throw new Error("setTimeout has not been defined")}function i(){throw new Error("clearTimeout has not been defined")}function a(e){if(r===setTimeout)return setTimeout(e,0);if((r===s||!r)&&setTimeout)return r=setTimeout,setTimeout(e,0);try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:s}catch(e){r=s}try{n="function"==typeof clearTimeout?clearTimeout:i}catch(e){n=i}}();var l,c=[],u=!1,p=-1;function h(){u&&l&&(u=!1,l.length?c=l.concat(c):p=-1,c.length&&E())}function E(){if(!u){var e=a(h);u=!0;for(var t=c.length;t;){for(l=c,c=[];++p<t;)l&&l[p].run();p=-1,t=c.length}l=null,u=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===i||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function f(e,t){this.fun=e,this.array=t}function m(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];c.push(new f(e,t)),1!==c.length||u||a(E)},f.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=m,o.addListener=m,o.once=m,o.off=m,o.removeListener=m,o.removeAllListeners=m,o.emit=m,o.prependListener=m,o.prependOnceListener=m,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(e,t,r){const n=r(4);e.exports=(e,t)=>{const r=n(e,t);return r?r.version:null}},function(e,t,r){const n=r(4);e.exports=(e,t)=>{const r=n(e.trim().replace(/^[=v]+/,""),t);return r?r.version:null}},function(e,t,r){const n=r(0);e.exports=(e,t,r,o)=>{"string"==typeof r&&(o=r,r=void 0);try{return new n(e,r).inc(t,o).version}catch(e){return null}}},function(e,t,r){const n=r(4),o=r(9);e.exports=(e,t)=>{if(o(e,t))return null;{const r=n(e),o=n(t),s=r.prerelease.length||o.prerelease.length,i=s?"pre":"",a=s?"prerelease":"";for(const e in r)if(("major"===e||"minor"===e||"patch"===e)&&r[e]!==o[e])return i+e;return a}}},function(e,t,r){const n=r(0);e.exports=(e,t)=>new n(e,t).major},function(e,t,r){const n=r(0);e.exports=(e,t)=>new n(e,t).minor},function(e,t,r){const n=r(0);e.exports=(e,t)=>new n(e,t).patch},function(e,t,r){const n=r(4);e.exports=(e,t)=>{const r=n(e,t);return r&&r.prerelease.length?r.prerelease:null}},function(e,t,r){const n=r(2);e.exports=(e,t,r)=>n(t,e,r)},function(e,t,r){const n=r(2);e.exports=(e,t)=>n(e,t,!0)},function(e,t,r){const n=r(10);e.exports=(e,t)=>e.sort((e,r)=>n(e,r,t))},function(e,t,r){const n=r(10);e.exports=(e,t)=>e.sort((e,r)=>n(r,e,t))},function(e,t,r){const n=r(0),o=r(4),{re:s,t:i}=r(3);e.exports=(e,t)=>{if(e instanceof n)return e;if("number"==typeof e&&(e=String(e)),"string"!=typeof e)return null;let r=null;if((t=t||{}).rtl){let t;for(;(t=s[i.COERCERTL].exec(e))&&(!r||r.index+r[0].length!==e.length);)r&&t.index+t[0].length===r.index+r[0].length||(r=t),s[i.COERCERTL].lastIndex=t.index+t[1].length+t[2].length;s[i.COERCERTL].lastIndex=-1}else r=e.match(s[i.COERCE]);return null===r?null:o(`${r[2]}.${r[3]||"0"}.${r[4]||"0"}`,t)}},function(e,t,r){const n=r(1);e.exports=(e,t)=>new n(e,t).set.map(e=>e.map(e=>e.value).join(" ").trim().split(" "))},function(e,t,r){const n=r(0),o=r(1);e.exports=(e,t,r)=>{let s=null,i=null,a=null;try{a=new o(t,r)}catch(e){return null}return e.forEach(e=>{a.test(e)&&(s&&-1!==i.compare(e)||(s=e,i=new n(s,r)))}),s}},function(e,t,r){const n=r(0),o=r(1);e.exports=(e,t,r)=>{let s=null,i=null,a=null;try{a=new o(t,r)}catch(e){return null}return e.forEach(e=>{a.test(e)&&(s&&1!==i.compare(e)||(s=e,i=new n(s,r)))}),s}},function(e,t,r){const n=r(0),o=r(1),s=r(7);e.exports=(e,t)=>{e=new o(e,t);let r=new n("0.0.0");if(e.test(r))return r;if(r=new n("0.0.0-0"),e.test(r))return r;r=null;for(let t=0;t<e.set.length;++t){e.set[t].forEach(e=>{const t=new n(e.semver.version);switch(e.operator){case">":0===t.prerelease.length?t.patch++:t.prerelease.push(0),t.raw=t.format();case"":case">=":r&&!s(r,t)||(r=t);break;case"<":case"<=":break;default:throw new Error(`Unexpected operation: ${e.operator}`)}})}return r&&e.test(r)?r:null}},function(e,t,r){const n=r(1);e.exports=(e,t)=>{try{return new n(e,t).range||"*"}catch(e){return null}}},function(e,t,r){const n=r(15);e.exports=(e,t,r)=>n(e,t,">",r)},function(e,t,r){const n=r(15);e.exports=(e,t,r)=>n(e,t,"<",r)},function(e,t,r){const n=r(1);e.exports=(e,t,r)=>(e=new n(e,r),t=new n(t,r),e.intersects(t))},,function(e,t,r){"use strict";r.r(t);const n={en:"You are reading the documentation for an ESP-IDF release version that is end of life. ",zh_CN:"当前文档对应的 ESP-IDF 版本支持期限已满，版本停止更新维护。"},o={en:"This documentation is not for the latest stable ESP-IDF release version. ",zh_CN:"当前文档对应的 ESP-IDF 版本不是最新稳定版。"},s={en:"There is a newer bugfix release of this ESP-IDF version. ",zh_CN:"当前 ESP-IDF 版本已发布新的 Bugfix。"},i={en:"You are reading the documentation for an ESP-IDF pre-release version. ",zh_CN:"当前文档为 ESP-IDF 预发布版本的配套文档。"},a={en:"The latest stable version is ",zh_CN:"最新稳定版本是 "},l={en:"The latest bugfix release is ",zh_CN:"最新 Bugfix 发布是"};function c(e){const t=document.createElement("div");t.className="admonition warning";const r=document.createElement("p");r.className="first admonition-title";const n=document.createTextNode("Note");r.append(n);let o=document.createElement("p");o.className="last",o.innerHTML=e,t.appendChild(r),t.appendChild(o),document.getElementsByClassName("document")[0].prepend(t)}var u="undefined"!=typeof window?window.jQuery:r(16);const p=r(23);function h(e){return"latest"==e?"master (latest)":e.startsWith("release-")?e.replace("release-","release/"):e}function E(e){return"stable"==e.name||!/^v[0-9\.]+$/.test(e.name)}function f(){let e=DOCUMENTATION_VERSIONS.VERSIONS,t=null;for(let r=0;r<e.length;r++){let n=e[r];n.name.startsWith("v")&&!E(n)&&(!t||p.coerce(n.name)>p.coerce(t.name))&&(t=n)}return t}function m(e){const t=f();return e.name===t.name}function d(e,t){return void 0===e.supported_targets?"esp32"==e.name:e.supported_targets.includes(t)}"undefined"!=typeof window&&u((function(e){let t=DOCUMENTATION_OPTIONS.RELEASE,r=DOCUMENTATION_OPTIONS.LANGUAGE,u=DOCUMENTATION_OPTIONS.IDF_TARGET,I=DOCUMENTATION_OPTIONS.PAGENAME+".html",R=DOCUMENTATION_VERSIONS.VERSIONS,N=DOCUMENTATION_VERSIONS.DEFAULTS,v=DOCUMENTATION_VERSIONS.IDF_TARGETS,$=R[0];for(let e=0;e<R.length;e++){let r=R[e];for(let e in N)e in r||(r[e]=N[e]);r.name===t&&($=r)}let O=DOCUMENTATION_OPTIONS.URL_ROOT+"../..";function T(e,t){let n=O+"/"+r+"/"+e;return t&&(n+="/"+(u||"esp32")),n+="/"+I,n}function w(){var t=e("#version-select option:selected");window.location.href=T(t.val(),t.data("has_target"))}function g(){var n=e("#target-select").val();window.location.href=function(e){let n=O+"/"+r+"/"+t+"/"+e;return n+="/"+I,n}(n)}DOCUMENTATION_OPTIONS.HAS_IDF_TARGETS&&(O+="/.."),function(){var e=document.getElementById("target-select");e.onchange=g;for(let r=0;r<v.length;r++){let n=v[r];var t=new Option(n.text,n.value);e.add(t)}e.value=u}(),function(){var e=document.getElementById("version-select");e.onchange=w;var r=!1;function n(n,o,s){var i=new Option(o,n);i.setAttribute("data-has_target",s),e.add(i),n==t&&(r=!0)}var o=f();for(let e=0;e<R.length;e++){let t=R[e];if(!t.old&&!t.pre_release&&"latest"!=t.name){if(t.name==o.name)var s=`stable (${o.name})`;else s=h(t.name);d(t,u)&&n(t.name,s,t.has_targets)}}(i=new Option("Pre-Release Versions","")).disabled=!0,e.add(i);for(let e=0;e<R.length;e++){let t=R[e];"latest"==t.name&&n(t.name,h(t.name),t.has_targets)}for(let e=0;e<R.length;e++){let t=R[e];!t.old&&t.pre_release&&d(t,u)&&n(t.name,h(t.name),t.has_targets)}if(!r){var i=new Option(h(t),t,!0,!0);e.add(i)}e.value=t}(),function(){if("latest"===$.name||m($))return;const e=f(),t=T(e.name,e.has_targets),u=function(e){const t=DOCUMENTATION_VERSIONS.VERSIONS,r=p.validRange("~"+p.coerce(e.name));for(let e=0;e<t.length;e++){const n=t[e];if(p.satisfies(p.coerce(n.name),r)&&!n.old)return n}}($);let h="";u&&(h=T(u.name,u.has_targets)),$.end_of_life?function(e,t,r){const o='<a href="'+e+'">'+t+"</a>";c("<p> "+n[r]+a[r]+o+"</p>")}(t,e.name,r):$.old&&u?function(e,t,r){const n='<a href="'+e+'">'+t+"</a>";c("<p> "+s[r]+l[r]+n+"</p>")}(h,u.name,r):E($)?function(e,t,r){const n='<a href="'+e+'">'+t+"</a>";c("<p> "+i[r]+a[r]+n+"</p>")}(t,e.name,r):m($)||function(e,t,r){const n='<a href="'+e+'">'+t+"</a>";c("<p> "+o[r]+a[r]+n+"</p>")}(t,e.name,r)}()}))}]);