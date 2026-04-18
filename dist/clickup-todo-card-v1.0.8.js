function t(t,e,i,s){var r,a=arguments.length,o=a<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(o=(a<3?r(o):a>3?r(e,i,o):r(e,i))||o);return a>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let a=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new a(i,t,s)},n=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,g=globalThis,f=g.trustedTypes,m=f?f.emptyScript:"",_=g.reactiveElementPolyfillSupport,v=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!c(t,e),b={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const a=s?.call(this);r?.call(this,e),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...h(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const a=r.fromAttribute(e,t.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const a=this.constructor;if(!1===s&&(r=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??$)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},a){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==r||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[v("elementProperties")]=new Map,x[v("finalized")]=new Map,_?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,k=t=>t,A=w.trustedTypes,C=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+S,T=`<${P}>`,D=document,U=()=>D.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,z=Array.isArray,O="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,F=/-->/g,H=/>/g,R=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,L=/"/g,V=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),B=Symbol.for("lit-noChange"),Y=Symbol.for("lit-nothing"),q=new WeakMap,W=D.createTreeWalker(D,129);function G(t,e){if(!z(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,s=[];let r,a=2===e?"<svg>":3===e?"<math>":"",o=N;for(let e=0;e<i;e++){const i=t[e];let n,c,l=-1,d=0;for(;d<i.length&&(o.lastIndex=d,c=o.exec(i),null!==c);)d=o.lastIndex,o===N?"!--"===c[1]?o=F:void 0!==c[1]?o=H:void 0!==c[2]?(V.test(c[2])&&(r=RegExp("</"+c[2],"g")),o=R):void 0!==c[3]&&(o=R):o===R?">"===c[0]?(o=r??N,l=-1):void 0===c[1]?l=-2:(l=o.lastIndex-c[2].length,n=c[1],o=void 0===c[3]?R:'"'===c[3]?L:j):o===L||o===j?o=R:o===F||o===H?o=N:(o=R,r=void 0);const h=o===R&&t[e+1].startsWith("/>")?" ":"";a+=o===N?i+T:l>=0?(s.push(n),i.slice(0,l)+E+i.slice(l)+S+h):i+S+(-2===l?e:h)}return[G(t,a+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,a=0;const o=t.length-1,n=this.parts,[c,l]=K(t,e);if(this.el=J.createElement(c,i),W.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=W.nextNode())&&n.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=l[a++],i=s.getAttribute(t).split(S),o=/([.?@])?(.*)/.exec(e);n.push({type:1,index:r,name:o[2],strings:i,ctor:"."===o[1]?et:"?"===o[1]?it:"@"===o[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(S)&&(n.push({type:6,index:r}),s.removeAttribute(t));if(V.test(s.tagName)){const t=s.textContent.split(S),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],U()),W.nextNode(),n.push({type:2,index:++r});s.append(t[e],U())}}}else if(8===s.nodeType)if(s.data===P)n.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(S,t+1));)n.push({type:7,index:r}),t+=S.length-1}r++}}static createElement(t,e){const i=D.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,s){if(e===B)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const a=M(e)?void 0:e._$litDirective$;return r?.constructor!==a&&(r?._$AO?.(!1),void 0===a?r=void 0:(r=new a(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=Z(t,r._$AS(t,e.values),r,s)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??D).importNode(e,!0);W.currentNode=s;let r=W.nextNode(),a=0,o=0,n=i[0];for(;void 0!==n;){if(a===n.index){let e;2===n.type?e=new X(r,r.nextSibling,this,t):1===n.type?e=new n.ctor(r,n.name,n.strings,this,t):6===n.type&&(e=new rt(r,this,t)),this._$AV.push(e),n=i[++o]}a!==n?.index&&(r=W.nextNode(),a++)}return W.currentNode=D,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=Y,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),M(t)?t===Y||null==t||""===t?(this._$AH!==Y&&this._$AR(),this._$AH=Y):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>z(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Y&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(D.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Q(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new J(t)),e}k(t){z(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new X(this.O(U()),this.O(U()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=Y,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Y}_$AI(t,e=this,i,s){const r=this.strings;let a=!1;if(void 0===r)t=Z(this,t,e,0),a=!M(t)||t!==this._$AH&&t!==B,a&&(this._$AH=t);else{const s=t;let o,n;for(t=r[0],o=0;o<r.length-1;o++)n=Z(this,s[i+o],e,o),n===B&&(n=this._$AH[o]),a||=!M(n)||n!==this._$AH[o],n===Y?t=Y:t!==Y&&(t+=(n??"")+r[o+1]),this._$AH[o]=n}a&&!s&&this.j(t)}j(t){t===Y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Y?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Y)}}class st extends tt{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??Y)===B)return;const i=this._$AH,s=t===Y&&i!==Y||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==Y&&(i===Y||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const at=w.litHtmlPolyfillSupport;at?.(J,X),(w.litHtmlVersions??=[]).push("3.3.2");const ot=globalThis;class nt extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new X(e.insertBefore(U(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}nt._$litElement$=!0,nt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:nt});const ct=ot.litElementPolyfillSupport;ct?.({LitElement:nt}),(ot.litElementVersions??=[]).push("4.2.2");const lt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},dt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:$},ht=(t=dt,e,i)=>{const{kind:s,metadata:r}=i;let a=globalThis.litPropertyMetadata.get(r);if(void 0===a&&globalThis.litPropertyMetadata.set(r,a=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),a.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ut(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function pt(t){return ut({...t,state:!0,attribute:!1})}var gt,ft;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(gt||(gt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(ft||(ft={}));var mt=function(t,e,i,s){s=s||{},i=null==i?{}:i;var r=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return r.detail=i,t.dispatchEvent(r),r};const _t={1:"mdi:alert",2:"mdi:chevron-double-up",3:"mdi:equal",4:"mdi:chevron-double-down",null:"mdi:minus"},vt={1:"#f50000",2:"#ffcc00",3:"#6fddff",4:"#d8d8d8",null:"#d8d8d8"},yt={show_start_date:!0,show_due_date:!0,show_priority:!0,show_tags:!0,show_assignees:!0,show_custom_fields:!1,compact_mode:!1,sort_by:"due_date",sort_order:"asc",group_by:"none"};function $t(t){const e=t.attributes,i=e.todo_items||[],s=e.clickup_tasks||[];return i.map(t=>{const e=s.find(e=>e.id===t.uid)||{};return{...t,clickup_id:t.uid,start_date:e.start_date,clickup_status:e.status,priority:e.priority,tags:e.tags||[],assignees:e.assignees||[],custom_fields:e.custom_fields||[],time_estimate:e.time_estimate,points:e.points,list:e.list,space:e.space}})}function bt(t,e){const i=[...t],s=e.sort_by||"due_date",r=e.sort_order||"asc";return i.sort((t,e)=>{let i=0;switch(s){case"due_date":i=xt(t.due,e.due);break;case"start_date":i=xt(t.start_date,e.start_date);break;case"priority":i=function(t,e){return null==t&&null==e?0:null==t?1:null==e?-1:t-e}(t.priority,e.priority);break;case"name":i=(t.summary||"").localeCompare(e.summary||"");break;case"status":i=function(t,e){const i=t.clickup_status?.status||"",s=e.clickup_status?.status||"",r=t.clickup_status?.type||"",a=e.clickup_status?.type||"";if(r!==a){if("open"===r)return-1;if("open"===a)return 1;if("closed"===r)return 1;if("closed"===a)return-1}return i.localeCompare(s)}(t,e);break;default:i=0}return"desc"===r?-i:i}),i}function xt(t,e){if(!t&&!e)return 0;if(!t)return 1;if(!e)return-1;return new Date(t).getTime()-new Date(e).getTime()}function wt(t,e,i){const s=new Map;return"none"===e?(s.set("all",t),s):(t.forEach(t=>{let r;switch(e){case"status":r=t.clickup_status?.status||"No Status";break;case"priority":r=function(t){if(null==t)return"No Priority";switch(t){case 1:return"Urgent";case 2:return"High";case 3:return"Normal";case 4:return"Low";default:return"Unknown"}}(t.priority);break;case"assignee":if(t.assignees&&t.assignees.length>0)return void t.assignees.forEach(e=>{const i=e.username||"Unknown";s.has(i)||s.set(i,[]),s.get(i).push(t)});r="Unassigned";break;case"custom_field":if(i&&t.custom_fields){const e=t.custom_fields.find(t=>t.id===i);r=e?.value?.toString()||"No Value"}else r="Uncategorized";break;default:r="All Tasks"}s.has(r)||s.set(r,[]),s.get(r).push(t)}),s)}function kt(t){if(!t)return"";let e;if(e="number"==typeof t||"string"==typeof t?new Date(t):t,isNaN(e.getTime()))return"";const i=new Date,s=new Date(i.getFullYear(),i.getMonth(),i.getDate()),r=new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime()-s.getTime(),a=Math.ceil(r/864e5);if(0===a)return"Today";if(1===a)return"Tomorrow";if(-1===a)return"Yesterday";if(a>1&&a<=7)return`In ${a} days`;if(a<-1&&a>=-7)return`${Math.abs(a)} days ago`;const o={month:"short",day:"numeric"};return e.getFullYear()!==i.getFullYear()&&(o.year="numeric"),e.toLocaleDateString(void 0,o)}const At=o`
  :host {
    display: block;
  }

  ha-card {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .warning {
    display: block;
    color: var(--error-color);
    padding: 16px;
  }

  /* Header */
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid var(--divider-color);
  }

  .card-header .name {
    font-size: 20px;
    font-weight: 500;
    color: var(--primary-text-color);
  }

  .card-header .task-count {
    background: var(--primary-color);
    color: var(--text-primary-color);
    border-radius: 12px;
    padding: 2px 8px;
    font-size: 12px;
    font-weight: 600;
    min-width: 20px;
    text-align: center;
  }

  /* Content */
  .card-content {
    padding: 8px;
    overflow-y: auto;
    flex: 1;
  }

  .card-content.compact {
    padding: 4px;
  }

  /* Empty State */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px 16px;
    color: var(--secondary-text-color);
    gap: 8px;
  }

  .empty-state ha-icon {
    --mdc-icon-size: 48px;
    color: var(--secondary-text-color);
    opacity: 0.5;
  }

  /* Task Groups */
  .task-group {
    margin-bottom: 16px;
  }

  .task-group:last-child {
    margin-bottom: 0;
  }

  .group-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    margin: 8px 0;
    background: var(--secondary-background-color);
    border-radius: 8px;
    font-weight: 500;
    color: var(--primary-text-color);
  }

  .group-name {
    font-size: 14px;
  }

  .group-count {
    background: var(--divider-color);
    color: var(--secondary-text-color);
    border-radius: 10px;
    padding: 2px 6px;
    font-size: 11px;
    font-weight: 600;
    min-width: 16px;
    text-align: center;
  }

  /* Tasks */
  .tasks {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .compact .tasks {
    gap: 4px;
  }

  /* Task Item */
  .task-item {
    display: flex;
    gap: 12px;
    padding: 12px;
    background: var(--card-background-color);
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    transition: all 0.2s ease;
  }

  .task-item:hover {
    background: var(--secondary-background-color);
    border-color: var(--primary-color);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .task-item.completed {
    opacity: 0.6;
  }

  .task-item.completed .task-summary {
    text-decoration: line-through;
    color: var(--secondary-text-color);
  }

  .task-item.overdue {
    border-left: 3px solid var(--error-color);
  }

  .compact .task-item {
    padding: 8px;
    gap: 8px;
  }

  /* Task Checkbox */
  .task-checkbox {
    flex-shrink: 0;
    display: flex;
    align-items: flex-start;
    padding-top: 2px;
  }

  /* Task Main Content */
  .task-main {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .compact .task-main {
    gap: 4px;
  }

  /* Task Header */
  .task-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
  }

  .task-summary {
    flex: 1;
    font-size: 15px;
    font-weight: 500;
    color: var(--primary-text-color);
    word-wrap: break-word;
    overflow-wrap: break-word;
    line-height: 1.4;
  }

  .compact .task-summary {
    font-size: 14px;
  }

  /* Priority Icon */
  .priority-icon {
    flex-shrink: 0;
    --mdc-icon-size: 20px;
    margin-top: 2px;
  }

  .compact .priority-icon {
    --mdc-icon-size: 16px;
  }

  /* Task Description */
  .task-description {
    font-size: 13px;
    color: var(--secondary-text-color);
    line-height: 1.4;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .compact .task-description {
    font-size: 12px;
  }

  /* Task Metadata */
  .task-metadata {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }

  .compact .task-metadata {
    gap: 6px;
  }

  /* Dates */
  .task-dates {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }

  .date-item {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    padding: 3px 8px;
    border-radius: 4px;
    background: var(--secondary-background-color);
    color: var(--secondary-text-color);
  }

  .date-item ha-icon {
    --mdc-icon-size: 14px;
  }

  .date-item.overdue {
    background: var(--error-color);
    color: white;
  }

  .date-item.today {
    background: var(--warning-color);
    color: white;
  }

  .date-item.tomorrow {
    background: var(--info-color);
    color: white;
  }

  .date-item.this-week {
    background: var(--primary-color);
    color: white;
    opacity: 0.8;
  }

  .compact .date-item {
    font-size: 11px;
    padding: 2px 6px;
  }

  .compact .date-item ha-icon {
    --mdc-icon-size: 12px;
  }

  /* Status Badge */
  .status-badge {
    display: inline-flex;
    align-items: center;
    font-size: 12px;
    font-weight: 500;
    padding: 3px 8px;
    border-radius: 4px;
    background: var(--status-color, var(--primary-color));
    color: white;
    text-transform: capitalize;
  }

  .compact .status-badge {
    font-size: 11px;
    padding: 2px 6px;
  }

  /* Tags */
  .task-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    font-size: 11px;
    font-weight: 500;
    padding: 3px 8px;
    border-radius: 12px;
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
    border: 1px solid var(--divider-color);
  }

  .compact .tag {
    font-size: 10px;
    padding: 2px 6px;
  }

  /* Assignees */
  .task-assignees {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .assignee-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary-color);
    color: white;
    font-size: 11px;
    font-weight: 600;
    overflow: hidden;
    border: 2px solid var(--card-background-color);
  }

  .assignee-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .compact .assignee-avatar {
    width: 24px;
    height: 24px;
    font-size: 10px;
    border-width: 1px;
  }

  /* Custom Fields */
  .custom-fields {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    padding-top: 4px;
  }

  .custom-field {
    display: flex;
    align-items: baseline;
    gap: 6px;
    font-size: 12px;
  }

  .field-name {
    color: var(--secondary-text-color);
    font-weight: 500;
  }

  .field-value {
    color: var(--primary-text-color);
  }

  .compact .custom-field {
    font-size: 11px;
    gap: 4px;
  }

  /* Responsive adjustments */
  @media (max-width: 600px) {
    .card-header {
      padding: 12px;
    }

    .card-header .name {
      font-size: 18px;
    }

    .task-item {
      padding: 10px;
      gap: 10px;
    }

    .task-summary {
      font-size: 14px;
    }
  }

  /* Dark mode adjustments */
  @media (prefers-color-scheme: dark) {
    .task-item:hover {
      box-shadow: 0 2px 8px rgba(255, 255, 255, 0.1);
    }
  }
`;console.info("%c  CLICKUP-TODO-CARD  \n%c  Version 1.0.0  ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"custom:clickup-todo-card",name:"ClickUp Todo Card",description:"Enhanced todo card with ClickUp custom fields and filters",preview:!0,documentationURL:"https://github.com/chbarnhouse/clickup-todo-card"});let Ct=class extends nt{constructor(){super(...arguments),this._config={type:"custom:clickup-todo-card",entity:"",...yt},this._tasks=[]}static async getConfigElement(){return await Promise.resolve().then(function(){return St}),document.createElement("clickup-todo-card-editor")}static getStubConfig(){return{type:"custom:clickup-todo-card",entity:"",...yt}}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={...yt,...t}}getCardSize(){return 3+(this._tasks?.length||0)}shouldUpdate(t){if(!this._config||!this.hass)return!0;if(!this._config.entity)return!0;try{return function(t,e,i){if(e.has("config")||i)return!0;if(t.config.entity){var s=e.get("hass");return!s||s.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}(this,t,!1)}catch(t){return console.error("Error in shouldUpdate:",t),!0}}render(){try{if(!this._config||!this.hass)return I`<ha-card><div class="warning">Loading...</div></ha-card>`;if(!this._config.entity)return I`
          <ha-card>
            <div class="warning">Please configure an entity in the card editor</div>
          </ha-card>
        `;const t=this.hass.states[this._config.entity];if(!t)return I`
          <ha-card>
            <div class="warning">Entity not found: ${this._config.entity}</div>
          </ha-card>
        `;this._tasks=$t(t);const e=bt(function(t,e){let i=[...t];if(!e.filters)return i;if(e.filters.status?.length&&(i=i.filter(t=>{const i=t.clickup_status?.status;return i&&e.filters.status.includes(i)})),e.filters.priority?.length&&(i=i.filter(t=>{const i=null===t.priority?null:t.priority;return e.filters.priority.includes(i)})),e.filters.tags?.length&&(i=i.filter(t=>!!t.tags?.length&&t.tags.some(t=>e.filters.tags.includes(t.name)))),e.filters.assignees?.length&&(i=i.filter(t=>!!t.assignees?.length&&t.assignees.some(t=>e.filters.assignees.includes(t.id.toString())))),e.filters.due_date_range){const{start:t,end:s}=e.filters.due_date_range;i=i.filter(e=>{if(!e.due)return!1;const i=new Date(e.due).getTime();return!(t&&i<new Date(t).getTime())&&!(s&&i>new Date(s).getTime())})}return i}(this._tasks,this._config),this._config),i=wt(e,this._config.group_by||"none",this._config.group_field_id);return I`
        <ha-card>
          ${this._renderHeader(t)}
          <div class="card-content ${this._config.compact_mode?"compact":""}">
            ${1===i.size&&i.has("all")?this._renderTaskList(i.get("all")):this._renderGroupedTasks(i)}
          </div>
        </ha-card>
      `}catch(t){return console.error("Error rendering ClickUp Todo Card:",t),I`
        <ha-card>
          <div class="warning">Error rendering card. Check console for details.</div>
        </ha-card>
      `}}_renderHeader(t){const e=this._config.title||t.attributes.friendly_name||"Tasks";return I`
      <div class="card-header">
        <div class="name">${e}</div>
        <div class="task-count">${this._tasks.length}</div>
      </div>
    `}_renderGroupedTasks(t){const e=Array.from(t.entries());return I`
      ${e.map(([t,e])=>I`
        <div class="task-group">
          <div class="group-header">
            <span class="group-name">${t}</span>
            <span class="group-count">${e.length}</span>
          </div>
          ${this._renderTaskList(e)}
        </div>
      `)}
    `}_renderTaskList(t){return t&&0!==t.length?I`
      <div class="tasks">
        ${t.map(t=>this._renderTask(t))}
      </div>
    `:I`
        <div class="empty-state">
          <ha-icon icon="mdi:check-circle-outline"></ha-icon>
          <span>No tasks</span>
        </div>
      `}_renderTask(t){const e=function(t){if(!t.due)return!1;const e=new Date;return new Date(t.due)<e&&"completed"!==t.status}(t),i="completed"===t.status;return I`
      <div class="task-item ${i?"completed":""} ${e?"overdue":""}">
        <div class="task-checkbox">
          <ha-checkbox
            .checked=${i}
            @change=${()=>this._toggleTask(t)}
          ></ha-checkbox>
        </div>

        <div class="task-main">
          <div class="task-header">
            <span class="task-summary">${t.summary}</span>
            ${this._renderPriority(t)}
          </div>

          ${t.description?I`
            <div class="task-description">${t.description}</div>
          `:""}

          <div class="task-metadata">
            ${this._renderDates(t)}
            ${this._renderStatus(t)}
            ${this._renderTags(t)}
            ${this._renderAssignees(t)}
            ${this._renderCustomFields(t)}
          </div>
        </div>
      </div>
    `}_renderPriority(t){if(!this._config.show_priority||null===t.priority||void 0===t.priority)return I``;const e=t.priority;return I`
      <ha-icon
        class="priority-icon"
        icon="${_t[e]||_t.null}"
        style="color: ${vt[e]||vt.null}"
      ></ha-icon>
    `}_renderDates(t){const e=this._config.show_start_date&&t.start_date,i=this._config.show_due_date&&t.due;return e||i?I`
      <div class="task-dates">
        ${e?I`
          <span class="date-item start-date">
            <ha-icon icon="mdi:calendar-start"></ha-icon>
            ${kt(t.start_date)}
          </span>
        `:""}

        ${i?I`
          <span class="date-item due-date ${function(t){if(!t)return"";let e;if(e="number"==typeof t||"string"==typeof t?new Date(t):t,isNaN(e.getTime()))return"";const i=new Date,s=new Date(i.getFullYear(),i.getMonth(),i.getDate()),r=new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime()-s.getTime(),a=Math.ceil(r/864e5);return a<0?"overdue":0===a?"today":1===a?"tomorrow":a<=7?"this-week":"future"}(t.due)}">
            <ha-icon icon="mdi:calendar-end"></ha-icon>
            ${kt(t.due)}
          </span>
        `:""}
      </div>
    `:I``}_renderStatus(t){if(!t.clickup_status)return I``;const e=t.clickup_status.color||"var(--primary-color)";return I`
      <span class="status-badge" style="--status-color: ${e}">
        ${t.clickup_status.status}
      </span>
    `}_renderTags(t){return this._config.show_tags&&t.tags&&0!==t.tags.length?I`
      <div class="task-tags">
        ${t.tags.map(t=>I`
          <span
            class="tag"
            style="
              ${t.tag_bg?`background-color: ${t.tag_bg};`:""}
              ${t.tag_fg?`color: ${t.tag_fg};`:""}
            "
          >
            ${t.name}
          </span>
        `)}
      </div>
    `:I``}_renderAssignees(t){return this._config.show_assignees&&t.assignees&&0!==t.assignees.length?I`
      <div class="task-assignees">
        ${t.assignees.map(t=>I`
          <div
            class="assignee-avatar"
            style="${t.color?`background-color: ${t.color}`:""}"
            title="${t.username}"
          >
            ${t.profilePicture?I`<img src="${t.profilePicture}" alt="${t.username}" />`:I`<span>${function(t){if(!t)return"?";const e=t.trim().split(/\s+/);return 1===e.length?e[0].charAt(0).toUpperCase():(e[0].charAt(0)+e[e.length-1].charAt(0)).toUpperCase()}(t.username)}</span>`}
          </div>
        `)}
      </div>
    `:I``}_renderCustomFields(t){if(!this._config.show_custom_fields||!t.custom_fields||0===t.custom_fields.length)return I``;let e=t.custom_fields;return this._config.visible_custom_fields&&this._config.visible_custom_fields.length>0&&(e=e.filter(t=>this._config.visible_custom_fields.includes(t.id))),0===e.length?I``:I`
      <div class="custom-fields">
        ${e.map(t=>I`
          <div class="custom-field">
            <span class="field-name">${t.name}:</span>
            <span class="field-value">${function(t){if(null===t.value||void 0===t.value||""===t.value)return"-";switch(t.type){case"text":case"email":case"phone":case"url":default:return String(t.value);case"number":return Number(t.value).toLocaleString();case"currency":const e=t.type_config?.currency_type||"USD";return new Intl.NumberFormat(void 0,{style:"currency",currency:e}).format(Number(t.value));case"date":return kt(t.value);case"checkbox":return t.value?"✓":"✗";case"drop_down":if(t.type_config?.options){const e=t.type_config.options.find(e=>e.id===t.value||e.name===t.value);return e?.name||String(t.value)}return String(t.value);case"labels":return Array.isArray(t.value)?t.value.join(", "):String(t.value);case"rating":const i=Number(t.value);return"★".repeat(i)+"☆".repeat(5-i);case"location":return"object"==typeof t.value&&t.value.location?t.value.location:String(t.value)}}(t)}</span>
          </div>
        `)}
      </div>
    `}async _toggleTask(t){const e="completed"===t.status?"needs_action":"completed";try{await this.hass.callService("todo","update_item",{entity_id:this._config.entity,item:t.uid,status:e})}catch(t){console.error("Error toggling task:",t)}}static get styles(){return At}};t([ut({attribute:!1})],Ct.prototype,"hass",void 0),t([pt()],Ct.prototype,"_config",void 0),t([pt()],Ct.prototype,"_tasks",void 0),Ct=t([lt("clickup-todo-card")],Ct);let Et=class extends nt{constructor(){super(...arguments),this._config={type:"custom:clickup-todo-card",entity:""},this._tasks=[]}setConfig(t){this._config={type:"custom:clickup-todo-card",entity:"",...t},this._loadEntityData()}_loadEntityData(){if(!this.hass||!this._config.entity)return;const t=this.hass.states[this._config.entity];t&&(this._tasks=$t(t))}render(){try{if(!this.hass)return I`<div>Loading hass...</div>`;if(!this._config)return I`<div>Loading config...</div>`;const t=Object.keys(this.hass.states||{}).filter(t=>t.startsWith("todo.")).sort(),e=this._tasks.length>0?function(t){const e=new Map;return t.forEach(t=>{t.clickup_status?.status&&e.set(t.clickup_status.status,t.clickup_status.status)}),Array.from(e.entries()).map(([t,e])=>({value:t,label:e})).sort((t,e)=>t.label.localeCompare(e.label))}(this._tasks):[],i=this._tasks.length>0?function(t){const e=new Set;return t.forEach(t=>{t.tags?.forEach(t=>{t.name&&e.add(t.name)})}),Array.from(e).map(t=>({value:t,label:t})).sort((t,e)=>t.label.localeCompare(e.label))}(this._tasks):[],s=this._tasks.length>0?function(t){const e=new Map;return t.forEach(t=>{t.assignees?.forEach(t=>{t.id&&t.username&&e.set(t.id.toString(),t.username)})}),Array.from(e.entries()).map(([t,e])=>({value:t,label:e})).sort((t,e)=>t.label.localeCompare(e.label))}(this._tasks):[],r=this._tasks.length>0?function(t){const e=new Map;return t.forEach(t=>{t.custom_fields?.forEach(t=>{t.id&&t.name&&e.set(t.id,t.name)})}),Array.from(e.entries()).map(([t,e])=>({value:t,label:e})).sort((t,e)=>t.label.localeCompare(e.label))}(this._tasks):[];return I`
      <div class="card-config">
        <!-- Basic Settings -->
        <div class="config-section">
          <h3>Basic Settings</h3>

          <p style="color: lime;">DEBUG: Found ${t.length} todo entities</p>
          <p style="color: cyan;">Current entity: ${this._config.entity||"none"}</p>

          ${t.length>0?I`
            <ha-select
              .label=${"Entity"}
              .value=${this._config.entity||""}
              @selected=${t=>this._entityChanged(t.target.value)}
              @closed=${t=>t.stopPropagation()}
            >
              ${t.map(t=>I`
                <mwc-list-item value="${t}">
                  ${this.hass.states[t]?.attributes.friendly_name||t}
                </mwc-list-item>
              `)}
            </ha-select>
          `:I`
            <p style="color: red;">No todo entities found! Please create a todo entity first.</p>
          `}

          <ha-textfield
            label="Title (Optional)"
            .configValue=${"title"}
            .value=${this._config.title||""}
            @input=${this._valueChanged}
          ></ha-textfield>
        </div>

        <!-- Display Options -->
        <div class="config-section">
          <h3>Display Options</h3>

          <ha-formfield .label=${"Show Start Date"}>
            <ha-switch
              .checked=${!1!==this._config.show_start_date}
              .configValue=${"show_start_date"}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${"Show Due Date"}>
            <ha-switch
              .checked=${!1!==this._config.show_due_date}
              .configValue=${"show_due_date"}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${"Show Priority"}>
            <ha-switch
              .checked=${!1!==this._config.show_priority}
              .configValue=${"show_priority"}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${"Show Tags"}>
            <ha-switch
              .checked=${!1!==this._config.show_tags}
              .configValue=${"show_tags"}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${"Show Assignees"}>
            <ha-switch
              .checked=${!1!==this._config.show_assignees}
              .configValue=${"show_assignees"}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${"Show Custom Fields"}>
            <ha-switch
              .checked=${!0===this._config.show_custom_fields}
              .configValue=${"show_custom_fields"}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${"Compact Mode"}>
            <ha-switch
              .checked=${!0===this._config.compact_mode}
              .configValue=${"compact_mode"}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>
        </div>

        <!-- Visible Custom Fields -->
        ${this._config.show_custom_fields&&r.length>0?I`
          <div class="config-section">
            <h3>Visible Custom Fields</h3>
            <p class="hint">Leave empty to show all custom fields</p>

            ${r.map(t=>I`
              <ha-formfield .label=${t.label}>
                <ha-checkbox
                  .checked=${this._isFieldVisible(t.value)}
                  .value=${t.value}
                  @change=${this._customFieldChanged}
                ></ha-checkbox>
              </ha-formfield>
            `)}
          </div>
        `:""}

        <!-- Sorting -->
        <div class="config-section">
          <h3>Sorting</h3>

          <ha-select
            .label=${"Sort By"}
            .configValue=${"sort_by"}
            .value=${this._config.sort_by||"due_date"}
            @selected=${this._valueChanged}
            @closed=${t=>t.stopPropagation()}
          >
            <mwc-list-item value="due_date">Due Date</mwc-list-item>
            <mwc-list-item value="start_date">Start Date</mwc-list-item>
            <mwc-list-item value="priority">Priority</mwc-list-item>
            <mwc-list-item value="name">Name</mwc-list-item>
            <mwc-list-item value="status">Status</mwc-list-item>
          </ha-select>

          <ha-select
            .label=${"Sort Order"}
            .configValue=${"sort_order"}
            .value=${this._config.sort_order||"asc"}
            @selected=${this._valueChanged}
            @closed=${t=>t.stopPropagation()}
          >
            <mwc-list-item value="asc">Ascending</mwc-list-item>
            <mwc-list-item value="desc">Descending</mwc-list-item>
          </ha-select>
        </div>

        <!-- Grouping -->
        <div class="config-section">
          <h3>Grouping</h3>

          <ha-select
            .label=${"Group By"}
            .configValue=${"group_by"}
            .value=${this._config.group_by||"none"}
            @selected=${this._valueChanged}
            @closed=${t=>t.stopPropagation()}
          >
            <mwc-list-item value="none">None</mwc-list-item>
            <mwc-list-item value="status">Status</mwc-list-item>
            <mwc-list-item value="priority">Priority</mwc-list-item>
            <mwc-list-item value="assignee">Assignee</mwc-list-item>
            <mwc-list-item value="custom_field">Custom Field</mwc-list-item>
          </ha-select>

          ${"custom_field"===this._config.group_by&&r.length>0?I`
            <ha-select
              .label=${"Custom Field for Grouping"}
              .configValue=${"group_field_id"}
              .value=${this._config.group_field_id||""}
              @selected=${this._valueChanged}
              @closed=${t=>t.stopPropagation()}
            >
              ${r.map(t=>I`
                <mwc-list-item value="${t.value}">${t.label}</mwc-list-item>
              `)}
            </ha-select>
          `:""}
        </div>

        <!-- Filters -->
        <div class="config-section">
          <h3>Filters</h3>

          ${e.length>0?I`
            <div class="filter-group">
              <label>Status</label>
              ${e.map(t=>I`
                <ha-formfield .label=${t.label}>
                  <ha-checkbox
                    .checked=${this._isStatusFiltered(t.value)}
                    .value=${t.value}
                    @change=${this._statusFilterChanged}
                  ></ha-checkbox>
                </ha-formfield>
              `)}
            </div>
          `:""}

          <div class="filter-group">
            <label>Priority</label>
            <ha-formfield .label=${"Urgent"}>
              <ha-checkbox
                .checked=${this._isPriorityFiltered(1)}
                .value=${"1"}
                @change=${this._priorityFilterChanged}
              ></ha-checkbox>
            </ha-formfield>
            <ha-formfield .label=${"High"}>
              <ha-checkbox
                .checked=${this._isPriorityFiltered(2)}
                .value=${"2"}
                @change=${this._priorityFilterChanged}
              ></ha-checkbox>
            </ha-formfield>
            <ha-formfield .label=${"Normal"}>
              <ha-checkbox
                .checked=${this._isPriorityFiltered(3)}
                .value=${"3"}
                @change=${this._priorityFilterChanged}
              ></ha-checkbox>
            </ha-formfield>
            <ha-formfield .label=${"Low"}>
              <ha-checkbox
                .checked=${this._isPriorityFiltered(4)}
                .value=${"4"}
                @change=${this._priorityFilterChanged}
              ></ha-checkbox>
            </ha-formfield>
            <ha-formfield .label=${"No Priority"}>
              <ha-checkbox
                .checked=${this._isPriorityFiltered(null)}
                .value=${"null"}
                @change=${this._priorityFilterChanged}
              ></ha-checkbox>
            </ha-formfield>
          </div>

          ${i.length>0?I`
            <div class="filter-group">
              <label>Tags</label>
              ${i.map(t=>I`
                <ha-formfield .label=${t.label}>
                  <ha-checkbox
                    .checked=${this._isTagFiltered(t.value)}
                    .value=${t.value}
                    @change=${this._tagFilterChanged}
                  ></ha-checkbox>
                </ha-formfield>
              `)}
            </div>
          `:""}

          ${s.length>0?I`
            <div class="filter-group">
              <label>Assignees</label>
              ${s.map(t=>I`
                <ha-formfield .label=${t.label}>
                  <ha-checkbox
                    .checked=${this._isAssigneeFiltered(t.value)}
                    .value=${t.value}
                    @change=${this._assigneeFilterChanged}
                  ></ha-checkbox>
                </ha-formfield>
              `)}
            </div>
          `:""}

          <div class="filter-group">
            <label>Due Date Range</label>
            <ha-textfield
              .label=${"Start Date (YYYY-MM-DD)"}
              .value=${this._config.filters?.due_date_range?.start||""}
              @input=${t=>this._dateRangeChanged("start",t.target.value)}
            ></ha-textfield>
            <ha-textfield
              .label=${"End Date (YYYY-MM-DD)"}
              .value=${this._config.filters?.due_date_range?.end||""}
              @input=${t=>this._dateRangeChanged("end",t.target.value)}
            ></ha-textfield>
          </div>
        </div>
      </div>
    `}catch(t){return console.error("Error rendering ClickUp Todo Card editor:",t),I`
        <div class="card-config">
          <div class="warning">
            Error loading editor. Please check the console for details.
          </div>
        </div>
      `}}_valueChanged(t){if(!this._config||!this.hass)return;const e=t.target,i=e.configValue;if(!i)return;let s;if(void 0!==e.checked)s=e.checked;else{if(void 0===e.value)return;s=e.value}""===s&&(s=void 0);const r={...this._config,[i]:s};"entity"===i&&setTimeout(()=>this._loadEntityData(),100),mt(this,"config-changed",{config:r})}_entityChanged(t){if(!this._config||t===this._config.entity)return;const e={...this._config,entity:t};this._config=e,this._loadEntityData(),mt(this,"config-changed",{config:e})}_isFieldVisible(t){return!(!this._config.visible_custom_fields||0===this._config.visible_custom_fields.length)&&this._config.visible_custom_fields.includes(t)}_customFieldChanged(t){const e=t.target,i=e.value,s=e.checked,r=this._config.visible_custom_fields||[];let a;a=s?[...r,i]:r.filter(t=>t!==i);const o={...this._config,visible_custom_fields:a.length>0?a:void 0};mt(this,"config-changed",{config:o})}_isStatusFiltered(t){return this._config.filters?.status?.includes(t)||!1}_statusFilterChanged(t){const e=t.target,i=e.value,s=e.checked,r=this._config.filters||{},a=r.status||[];let o;o=s?[...a,i]:a.filter(t=>t!==i);const n={...this._config,filters:{...r,status:o.length>0?o:void 0}};mt(this,"config-changed",{config:n})}_isPriorityFiltered(t){return this._config.filters?.priority?.includes(t)||!1}_priorityFilterChanged(t){const e=t.target,i=e.value,s="null"===i?null:parseInt(i),r=e.checked,a=this._config.filters||{},o=a.priority||[];let n;n=r?[...o,s]:o.filter(t=>t!==s);const c={...this._config,filters:{...a,priority:n.length>0?n:void 0}};mt(this,"config-changed",{config:c})}_isTagFiltered(t){return this._config.filters?.tags?.includes(t)||!1}_tagFilterChanged(t){const e=t.target,i=e.value,s=e.checked,r=this._config.filters||{},a=r.tags||[];let o;o=s?[...a,i]:a.filter(t=>t!==i);const n={...this._config,filters:{...r,tags:o.length>0?o:void 0}};mt(this,"config-changed",{config:n})}_isAssigneeFiltered(t){return this._config.filters?.assignees?.includes(t)||!1}_assigneeFilterChanged(t){const e=t.target,i=e.value,s=e.checked,r=this._config.filters||{},a=r.assignees||[];let o;o=s?[...a,i]:a.filter(t=>t!==i);const n={...this._config,filters:{...r,assignees:o.length>0?o:void 0}};mt(this,"config-changed",{config:n})}_dateRangeChanged(t,e){const i=this._config.filters||{},s={...i.due_date_range||{},[t]:e||void 0},r=s.start||s.end,a={...this._config,filters:{...i,due_date_range:r?s:void 0}};mt(this,"config-changed",{config:a})}static get styles(){return o`
      .card-config {
        padding: 16px;
      }

      .config-section {
        margin-bottom: 24px;
        padding-bottom: 16px;
        border-bottom: 1px solid var(--divider-color);
      }

      .config-section:last-child {
        border-bottom: none;
      }

      h3 {
        margin: 0 0 16px 0;
        font-size: 16px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .hint {
        margin: 0 0 12px 0;
        font-size: 12px;
        color: var(--secondary-text-color);
        font-style: italic;
      }

      .input-group {
        margin-bottom: 24px;
      }

      .input-group label {
        display: block;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .entity-input {
        width: 100%;
        padding: 12px;
        font-size: 14px;
        background: var(--card-background-color);
        color: var(--primary-text-color);
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        box-sizing: border-box;
      }

      .entity-list {
        margin-top: 12px;
        padding: 12px;
        background: var(--secondary-background-color);
        border-radius: 4px;
        max-height: 200px;
        overflow-y: auto;
      }

      .entity-list p {
        margin: 0 0 8px 0;
        font-size: 12px;
        font-weight: 500;
        color: var(--secondary-text-color);
      }

      .entity-item {
        padding: 8px;
        margin: 4px 0;
        background: var(--card-background-color);
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;
        color: var(--primary-text-color);
      }

      .entity-item:hover {
        background: var(--primary-color);
        color: var(--text-primary-color);
      }

      ha-entity-picker,
      ha-textfield,
      ha-select {
        display: block;
        margin-bottom: 16px;
        width: 100%;
      }

      ha-formfield {
        display: block;
        margin-bottom: 12px;
      }

      .filter-group {
        margin-bottom: 20px;
      }

      .filter-group:last-child {
        margin-bottom: 0;
      }

      .filter-group > label {
        display: block;
        font-weight: 500;
        margin-bottom: 8px;
        color: var(--primary-text-color);
      }

      .filter-group ha-formfield {
        margin-bottom: 8px;
      }
    `}};t([ut({attribute:!1})],Et.prototype,"hass",void 0),t([pt()],Et.prototype,"_config",void 0),t([pt()],Et.prototype,"_tasks",void 0),t([pt()],Et.prototype,"_helpers",void 0),Et=t([lt("clickup-todo-card-editor")],Et);var St=Object.freeze({__proto__:null,get ClickUpTodoCardEditor(){return Et}});export{Ct as ClickUpTodoCard};
