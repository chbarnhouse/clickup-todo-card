function t(t,e,i,a){var s,o=arguments.length,r=o<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,a);else for(var n=t.length-1;n>=0;n--)(s=t[n])&&(r=(o<3?s(r):o>3?s(e,i,r):s(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),s=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,a)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[a+1],t[0]);return new o(i,t,a)},n=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,a))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,f=g.trustedTypes,_=f?f.emptyScript:"",m=g.reactiveElementPolyfillSupport,v=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!l(t,e),x={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(t,i,e);void 0!==a&&c(this.prototype,t,a)}}static getPropertyDescriptor(t,e,i){const{get:a,set:s}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:a,set(e){const o=a?.call(this);s?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,a)=>{if(i)t.adoptedStyleSheets=a.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of a){const a=document.createElement("style"),s=e.litNonce;void 0!==s&&a.setAttribute("nonce",s),a.textContent=i.cssText,t.appendChild(a)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),a=this.constructor._$Eu(t,i);if(void 0!==a&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(a):this.setAttribute(a,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,a=i._$Eh.get(t);if(void 0!==a&&this._$Em!==a){const t=i.getPropertyOptions(a),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=a;const o=s.fromAttribute(e,t.type);this[a]=o??this._$Ej?.get(a)??o,this._$Em=null}}requestUpdate(t,e,i,a=!1,s){if(void 0!==t){const o=this.constructor;if(!1===a&&(s=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??y)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:a,wrapped:s},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==s||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===a&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,a=this[e];!0!==t||this._$AL.has(e)||void 0===a||this.C(e,void 0,i,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[v("elementProperties")]=new Map,$[v("finalized")]=new Map,m?.({ReactiveElement:$}),(g.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,w=t=>t,S=k.trustedTypes,C=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,T="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,D="?"+A,E=`<${D}>`,z=document,F=()=>z.createComment(""),I=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,P="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,U=/>/g,L=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),V=/'/g,j=/"/g,R=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),H=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),Y=new WeakMap,G=z.createTreeWalker(z,129);function K(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const W=(t,e)=>{const i=t.length-1,a=[];let s,o=2===e?"<svg>":3===e?"<math>":"",r=M;for(let e=0;e<i;e++){const i=t[e];let n,l,c=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===M?"!--"===l[1]?r=N:void 0!==l[1]?r=U:void 0!==l[2]?(R.test(l[2])&&(s=RegExp("</"+l[2],"g")),r=L):void 0!==l[3]&&(r=L):r===L?">"===l[0]?(r=s??M,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,n=l[1],r=void 0===l[3]?L:'"'===l[3]?j:V):r===j||r===V?r=L:r===N||r===U?r=M:(r=L,s=void 0);const h=r===L&&t[e+1].startsWith("/>")?" ":"";o+=r===M?i+E:c>=0?(a.push(n),i.slice(0,c)+T+i.slice(c)+A+h):i+A+(-2===c?e:h)}return[K(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),a]};class X{constructor({strings:t,_$litType$:e},i){let a;this.parts=[];let s=0,o=0;const r=t.length-1,n=this.parts,[l,c]=W(t,e);if(this.el=X.createElement(l,i),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(a=G.nextNode())&&n.length<r;){if(1===a.nodeType){if(a.hasAttributes())for(const t of a.getAttributeNames())if(t.endsWith(T)){const e=c[o++],i=a.getAttribute(t).split(A),r=/([.?@])?(.*)/.exec(e);n.push({type:1,index:s,name:r[2],strings:i,ctor:"."===r[1]?et:"?"===r[1]?it:"@"===r[1]?at:tt}),a.removeAttribute(t)}else t.startsWith(A)&&(n.push({type:6,index:s}),a.removeAttribute(t));if(R.test(a.tagName)){const t=a.textContent.split(A),e=t.length-1;if(e>0){a.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)a.append(t[i],F()),G.nextNode(),n.push({type:2,index:++s});a.append(t[e],F())}}}else if(8===a.nodeType)if(a.data===D)n.push({type:2,index:s});else{let t=-1;for(;-1!==(t=a.data.indexOf(A,t+1));)n.push({type:7,index:s}),t+=A.length-1}s++}}static createElement(t,e){const i=z.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,a){if(e===H)return e;let s=void 0!==a?i._$Co?.[a]:i._$Cl;const o=I(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),void 0===o?s=void 0:(s=new o(t),s._$AT(t,i,a)),void 0!==a?(i._$Co??=[])[a]=s:i._$Cl=s),void 0!==s&&(e=Z(t,s._$AS(t,e.values),s,a)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,a=(t?.creationScope??z).importNode(e,!0);G.currentNode=a;let s=G.nextNode(),o=0,r=0,n=i[0];for(;void 0!==n;){if(o===n.index){let e;2===n.type?e=new Q(s,s.nextSibling,this,t):1===n.type?e=new n.ctor(s,n.name,n.strings,this,t):6===n.type&&(e=new st(s,this,t)),this._$AV.push(e),n=i[++r]}o!==n?.index&&(s=G.nextNode(),o++)}return G.currentNode=z,a}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,a){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),I(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==H&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(z.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,a="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=X.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(e);else{const t=new J(a,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new X(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,a=0;for(const s of t)a===e.length?e.push(i=new Q(this.O(F()),this.O(F()),this,this.options)):i=e[a],i._$AI(s),a++;a<e.length&&(this._$AR(i&&i._$AB.nextSibling,a),e.length=a)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,a,s){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=a,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,a){const s=this.strings;let o=!1;if(void 0===s)t=Z(this,t,e,0),o=!I(t)||t!==this._$AH&&t!==H,o&&(this._$AH=t);else{const a=t;let r,n;for(t=s[0],r=0;r<s.length-1;r++)n=Z(this,a[i+r],e,r),n===H&&(n=this._$AH[r]),o||=!I(n)||n!==this._$AH[r],n===q?t=q:t!==q&&(t+=(n??"")+s[r+1]),this._$AH[r]=n}o&&!a&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class at extends tt{constructor(t,e,i,a,s){super(t,e,i,a,s),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??q)===H)return;const i=this._$AH,a=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==q&&(i===q||a);a&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const ot=k.litHtmlPolyfillSupport;ot?.(X,Q),(k.litHtmlVersions??=[]).push("3.3.2");const rt=globalThis;class nt extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const a=i?.renderBefore??e;let s=a._$litPart$;if(void 0===s){const t=i?.renderBefore??null;a._$litPart$=s=new Q(e.insertBefore(F(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return H}}nt._$litElement$=!0,nt.finalized=!0,rt.litElementHydrateSupport?.({LitElement:nt});const lt=rt.litElementPolyfillSupport;lt?.({LitElement:nt}),(rt.litElementVersions??=[]).push("4.2.2");const ct=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},dt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y},ht=(t=dt,e,i)=>{const{kind:a,metadata:s}=i;let o=globalThis.litPropertyMetadata.get(s);if(void 0===o&&globalThis.litPropertyMetadata.set(s,o=new Map),"setter"===a&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===a){const{name:a}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(a,s,t,!0,i)},init(e){return void 0!==e&&this.C(a,void 0,t,e),e}}}if("setter"===a){const{name:a}=i;return function(i){const s=this[a];e.call(this,i),this.requestUpdate(a,s,t,!0,i)}}throw Error("Unsupported decorator location: "+a)};function pt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const a=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),a?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){return pt({...t,state:!0,attribute:!1})}function gt(t,e){return(e,i,a)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}var ft,_t;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(ft||(ft={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(_t||(_t={}));var mt=function(t,e,i,a){a=a||{},i=null==i?{}:i;var s=new Event(e,{bubbles:void 0===a.bubbles||a.bubbles,cancelable:Boolean(a.cancelable),composed:void 0===a.composed||a.composed});return s.detail=i,t.dispatchEvent(s),s};const vt={1:"mdi:alert",2:"mdi:chevron-double-up",3:"mdi:equal",4:"mdi:chevron-double-down",null:"mdi:minus"},bt={1:"var(--error-color)",2:"var(--warning-color)",3:"var(--info-color)",4:"var(--disabled-text-color)",null:"var(--disabled-text-color)"},yt={hide_header:!1,hide_title:!1,show_task_count:!0,show_start_date:!1,show_due_date:!0,show_priority:!1,show_status:!1,show_tags:!1,show_assignees:!1,show_custom_fields:!1,show_task_locations:!1,compact_mode:!1,add_button_text:"Add Task",add_button_position:"bottom-right",add_button_overlay:!0,sort_by:"due_date",sort_order:"asc",group_by:"none",show_sort_controls:!1,show_filter_controls:!1,field_styles:{},field_icons:{}},xt="repeat(auto-fit, minmax(150px, 1fr))",$t="6px 8px";function kt(t){return(t.attributes.clickup_tasks||[]).map(t=>{const e="closed"===t.status?.type?"completed":"needs_action";let i,a,s;if(t.due_date){const e=parseInt(t.due_date);isNaN(e)||(i=new Date(e))}if(t.start_date){const e=parseInt(t.start_date);isNaN(e)||(a=e)}if(t.date_closed){const e=parseInt(t.date_closed);isNaN(e)||(s=e)}return{uid:t.id,summary:t.name,status:e,description:t.description||void 0,due:i,clickup_id:t.id,start_date:a,date_closed:s,clickup_status:t.status,priority:t.priority,tags:t.tags||[],assignees:t.assignees||[],custom_fields:t.custom_fields||[],time_estimate:t.time_estimate,points:t.points,list:t.list,space:t.space,list_info:t.list_info,space_info:t.space_info,folder_info:t.folder_info}})}function wt(t){const e=new Map;return t.forEach(t=>{t.custom_fields?.forEach(t=>{t.id&&t.name&&e.set(t.id,t.name)})}),Array.from(e.entries()).map(([t,e])=>({value:t,label:e})).sort((t,e)=>t.label.localeCompare(e.label))}function St(t,e){const i=[...t],a=e.sort_by||"due_date",s=e.sort_order||"asc";return"custom"===a||i.sort((t,e)=>{let i=0;switch(a){case"due_date":i=Ct(t.due,e.due);break;case"start_date":i=Ct(t.start_date,e.start_date);break;case"priority":i=function(t,e){return null==t&&null==e?0:null==t?1:null==e?-1:t-e}(t.priority,e.priority);break;case"name":i=(t.summary||"").localeCompare(e.summary||"");break;case"status":i=function(t,e){const i=t.clickup_status?.status||"",a=e.clickup_status?.status||"",s=t.clickup_status?.type||"",o=e.clickup_status?.type||"";if(s!==o){if("open"===s)return-1;if("open"===o)return 1;if("closed"===s)return 1;if("closed"===o)return-1}return i.localeCompare(a)}(t,e);break;default:i=0}return"desc"===s?-i:i}),i}function Ct(t,e){if(!t&&!e)return 0;if(!t)return 1;if(!e)return-1;return new Date(t).getTime()-new Date(e).getTime()}function Tt(t,e,i){const a=new Map;return"none"===e?(a.set("all",t),a):(t.forEach(t=>{let s;switch(e){case"status":s=t.clickup_status?.status||"No Status";break;case"priority":s=function(t){if(null==t)return"No Priority";switch(t){case 1:return"Urgent";case 2:return"High";case 3:return"Normal";case 4:return"Low";default:return"Unknown"}}(t.priority);break;case"assignee":if(t.assignees&&t.assignees.length>0)return void t.assignees.forEach(e=>{const i=e.username||"Unknown";a.has(i)||a.set(i,[]),a.get(i).push(t)});s="Unassigned";break;case"list":s=t.list?.name||"No List";break;case"custom_field":if(i&&t.custom_fields){const e=t.custom_fields.find(t=>t.id===i);s=e?.value?.toString()||"No Value"}else s="Uncategorized";break;default:s="All Tasks"}a.has(s)||a.set(s,[]),a.get(s).push(t)}),a)}function At(t){if(!t)return"";let e;if(e="number"==typeof t||"string"==typeof t?new Date(t):t,isNaN(e.getTime()))return"";const i=new Date,a=new Date(i.getFullYear(),i.getMonth(),i.getDate()),s=new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime()-a.getTime(),o=Math.ceil(s/864e5);if(0===o)return"Today";if(1===o)return"Tomorrow";if(-1===o)return"Yesterday";if(o>1&&o<=7)return`In ${o} days`;if(o<-1&&o>=-7)return`${Math.abs(o)} days ago`;const r={month:"short",day:"numeric"};return e.getFullYear()!==i.getFullYear()&&(r.year="numeric"),e.toLocaleDateString(void 0,r)}function Dt(t){if(null===t.value||void 0===t.value||""===t.value)return"-";switch(t.type){case"text":case"email":case"phone":case"url":default:return String(t.value);case"number":return Number(t.value).toLocaleString();case"currency":const e=t.type_config?.currency_type||"USD";return new Intl.NumberFormat(void 0,{style:"currency",currency:e}).format(Number(t.value));case"date":return At(t.value);case"checkbox":return t.value?"✓":"✗";case"drop_down":if(t.type_config?.options){const e=t.type_config.options.find(e=>e.id===t.value||e.name===t.value);return e?.name||String(t.value)}return String(t.value);case"labels":return Array.isArray(t.value)?t.value.join(", "):String(t.value);case"rating":const i=Number(t.value);return"★".repeat(i)+"☆".repeat(5-i);case"location":return"object"==typeof t.value&&t.value.location?t.value.location:String(t.value)}}function Et(t){if(!t)return"?";const e=t.trim().split(/\s+/);return 1===e.length?e[0].charAt(0).toUpperCase():(e[0].charAt(0)+e[e.length-1].charAt(0)).toUpperCase()}function zt(t){if(!t)return"";let e;if(e="number"==typeof t||"string"==typeof t?new Date(t):t,isNaN(e.getTime()))return"";const i=new Date,a=new Date(i.getFullYear(),i.getMonth(),i.getDate()),s=new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime()-a.getTime(),o=Math.ceil(s/864e5);return o<0?"overdue":0===o?"today":1===o?"tomorrow":o<=7?"this-week":"future"}function Ft(t){return`clickup-card-order-${t}`}const It=r`
  :host {
    display: block;
    height: 100%;
  }

  ha-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
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
    border-radius: min(calc(var(--ha-card-border-radius, 12px) * 1.5), 999px);
    padding: 4px 12px;
    font-size: 12px;
    font-weight: 600;
    min-width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .card-header .task-count.single-digit {
    border-radius: 50%;
    width: 28px;
    padding: 0;
  }

  /* Button Container (for non-overlay mode) */
  .button-container {
    padding: 12px 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .button-container .floating-add-button.bottom-left,
  .button-container .floating-add-button.top-left {
    margin-right: auto;
  }

  .button-container .floating-add-button.bottom-right,
  .button-container .floating-add-button.top-right {
    margin-left: auto;
  }

  .button-container .floating-add-button {
    position: relative;
  }

  /* Floating Add Button */
  .floating-add-button {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    background: var(--primary-color);
    color: var(--text-primary-color);
    border: none;
    border-radius: min(calc(var(--ha-card-border-radius, 12px) * 2), 999px);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 8px color-mix(in srgb, var(--shadow-color, #000) 20%, transparent);
    transition: all 0.2s ease;
    z-index: 1;
  }

  .floating-add-button.non-overlay {
    position: static;
  }

  .floating-add-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px color-mix(in srgb, var(--shadow-color, #000) 30%, transparent);
  }

  .floating-add-button:active:not(:disabled) {
    transform: translateY(0);
  }

  .floating-add-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .floating-add-button ha-icon {
    --mdc-icon-size: 20px;
  }

  .floating-add-button.icon-only {
    padding: 12px;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    justify-content: center;
  }

  .floating-add-button.icon-only ha-icon {
    --mdc-icon-size: 24px;
  }

  /* Positioning classes */
  .floating-add-button.bottom-left {
    bottom: 16px;
    left: 16px;
  }

  .floating-add-button.bottom-center {
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
  }

  .floating-add-button.bottom-center:hover:not(:disabled) {
    transform: translateX(-50%) translateY(-2px);
  }

  .floating-add-button.bottom-center:active:not(:disabled) {
    transform: translateX(-50%) translateY(0);
  }

  .floating-add-button.bottom-right {
    bottom: 16px;
    right: 16px;
  }

  .floating-add-button.top-left {
    top: 16px;
    left: 16px;
  }

  .floating-add-button.top-center {
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
  }

  .floating-add-button.top-center:hover:not(:disabled) {
    transform: translateX(-50%) translateY(-2px);
  }

  .floating-add-button.top-center:active:not(:disabled) {
    transform: translateX(-50%) translateY(0);
  }

  .floating-add-button.top-right {
    top: 16px;
    right: 16px;
  }

  /* Content */
  .card-content {
    padding: 0;
    overflow-y: auto;
    flex: 1;
  }

  .card-content.compact {
    padding: 0;
  }

  .card-content.fixed-height {
    overflow-y: auto;
    overflow-x: hidden;
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

  .compact .empty-state {
    padding: 24px 12px;
  }

  .compact .empty-state ha-icon {
    --mdc-icon-size: 36px;
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
    border-radius: calc(var(--ha-card-border-radius, 12px) * 0.67);
    font-weight: 500;
    color: var(--primary-text-color);
  }

  .group-name {
    font-size: 14px;
  }

  .group-count {
    background: var(--divider-color);
    color: var(--secondary-text-color);
    border-radius: min(calc(var(--ha-card-border-radius, 12px) * 0.83), 999px);
    padding: 2px 6px;
    font-size: 11px;
    font-weight: 600;
    min-width: 16px;
    text-align: center;
  }

  .compact .group-header {
    padding: 6px 10px;
    margin: 6px 0;
  }

  .compact .group-name {
    font-size: 13px;
  }

  .compact .group-count {
    padding: 1px 5px;
    font-size: 10px;
  }

  /* Tasks */
  .tasks {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .compact .tasks {
    gap: 0;
  }

  /* Task Item */
  .task-item {
    display: flex;
    gap: 8px;
    padding: 8px 12px;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--divider-color);
    border-radius: 0;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .task-item:first-child {
    padding-top: 8px;
    margin-top: 0;
  }

  .task-item:last-child {
    border-bottom: none;
  }

  .task-item:hover {
    background: var(--secondary-background-color);
    cursor: pointer;
  }

  .task-item.completed {
    opacity: 0.6;
  }

  .task-item.completed .task-name {
    text-decoration: line-through;
    color: var(--secondary-text-color);
  }

  .task-item.overdue {
    border-left: 3px solid var(--error-color);
  }

  .compact .task-item {
    padding: 6px 10px;
    gap: 6px;
  }

  /* Task Checkbox */
  .task-checkbox {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    align-self: center;
  }

  /* Task Status Pill - v2.14.0 Center-Aligned with Task Content */
  .task-status-pill {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    align-self: center;
    justify-content: space-between;
    gap: 0px;
    padding: 8px 2px;
    border-radius: 6px;
    width: var(--pill-width, auto);
    height: 32px;
    max-height: 32px;
    line-height: 16px;
  }

  .task-status-pill ha-checkbox {
    flex-shrink: 0;
    margin: 0 !important;
    padding: 0 !important;
    --mdc-checkbox-size: 16px;
    line-height: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .compact .task-status-pill {
    gap: 0px;
    padding: 6px 2px;
    border-radius: 4px;
    width: var(--pill-width, auto);
    height: 26px;
    max-height: 26px;
    line-height: 14px;
  }

  .compact .task-status-pill ha-checkbox {
    margin: 0 !important;
    padding: 0 !important;
    --mdc-checkbox-size: 14px;
    line-height: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .task-status-pill editable-status {
    flex: 1;
    min-width: 0;
    margin: 0;
    padding: 0;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.5px;
    line-height: 1.0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow: visible;
  }

  .compact .task-status-pill editable-status {
    margin: 0;
    padding: 0;
    font-size: 11px;
    letter-spacing: 0.4px;
    line-height: 1.0;
    overflow: visible;
  }

  /* Task Main Content */
  .task-main {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
    cursor: pointer;
    align-self: center;
  }

  .compact .task-main {
    gap: 1px;
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
    --mdc-icon-size: 14px;
    margin-top: 1px;
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
    font-size: 11px;
    line-height: 1.3;
  }

  /* Task Metadata */
  .task-metadata {
    display: grid;
    /* grid-template-columns and gap are set dynamically via inline styles */
    margin-top: 0;
    align-items: start;
  }

  .compact .task-metadata {
    margin-top: 0;
  }

  /* Task Location */
  .task-location {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: var(--secondary-text-color);
    padding: 4px 8px 4px 0;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;
  }

  .task-location:hover {
    background: rgba(0, 0, 0, 0.08);
  }

  /* Date fields */
  .task-start-date,
  .task-due-date {
    display: flex;
    align-items: center;
  }

  /* Field spans are controlled by metadata_grid config */

  .task-location ha-icon {
    --mdc-icon-size: 14px;
    opacity: 0.7;
  }

  .compact .task-location {
    font-size: 11px;
    padding: 3px 6px 3px 0;
  }

  .compact .task-location ha-icon {
    --mdc-icon-size: 12px;
  }

  /* Dates */
  .task-dates {
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
    align-items: center;
  }

  .compact .task-dates {
    gap: 2px;
  }

  .date-item {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-size: 11px;
    padding: 2px 6px 2px 0;
    border-radius: 6px;
    background: rgba(0, 0, 0, 0.05);
    color: var(--secondary-text-color);
    transition: all 0.2s ease;
  }

  .date-item:hover {
    background: rgba(0, 0, 0, 0.08);
  }

  .date-item ha-icon {
    --mdc-icon-size: 14px;
  }

  .date-item.overdue {
    color: var(--error-color);
    background: rgba(var(--rgb-error-color), 0.1);
  }

  .compact .date-item {
    font-size: 10px;
    padding: 2px 5px 2px 0;
  }

  .compact .date-item ha-icon {
    --mdc-icon-size: 12px;
  }

  /* Status Badge (inside pill)
   * Note: Badge styles are set on editable-status element above and inherited
   * into the component's shadow DOM. Cannot style .status-badge directly.
   */

  /* Standalone status badge (when not in pill) */
  .status-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 700;
    padding: 6px 12px;
    border-radius: 12px;
    background: var(--status-color, var(--primary-color));
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    white-space: nowrap;
    transition: filter 0.15s ease;
    line-height: 1.3;
  }

  .status-badge:hover {
    filter: brightness(1.1);
  }

  .compact .status-badge {
    font-size: 9px;
    padding: 5px 10px;
    border-radius: 10px;
    letter-spacing: 0.5px;
  }

  /* Tags */
  .task-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    font-size: 10px;
    font-weight: 500;
    padding: 2px 7px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.05);
    color: var(--primary-text-color);
    border: 1px solid rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
  }

  .tag:hover {
    background: rgba(0, 0, 0, 0.08);
  }

  .compact .tag {
    font-size: 9px;
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
    width: 22px;
    height: 22px;
    font-size: 9px;
    border-width: 1px;
  }

  /* Custom Fields */
  .custom-fields {
    display: flex;
    flex-wrap: wrap;
    gap: 3px;
    padding-top: 0;
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

  /* Dialog Content */
  .dialog-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 16px 0;
    min-width: 420px;
  }

  .dialog-content ha-textfield,
  .dialog-content ha-textarea,
  .dialog-content ha-date-input,
  .dialog-content ha-select {
    width: 100%;
  }

  .dialog-content ha-textfield,
  .dialog-content ha-textarea {
    --mdc-theme-primary: var(--primary-color);
  }

  .dialog-content ha-select {
    --mdc-theme-primary: var(--primary-color);
    margin-top: 4px;
  }

  .dialog-actions-extra {
    display: flex;
    justify-content: flex-start;
    padding-top: 12px;
    margin-top: 8px;
    border-top: 1px solid var(--divider-color);
  }

  .dialog-actions-extra mwc-button {
    color: var(--error-color);
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
      padding: 8px 10px;
      gap: 8px;
    }

    .task-item:first-child {
      padding-top: 8px;
      margin-top: 0;
    }

    .task-summary {
      font-size: 14px;
    }

    .dialog-content {
      min-width: 300px;
    }
  }

  /* ========================================
   * v2.0.0: Inline Editing Styles
   * ======================================== */

  /* Inline editable text */
  .task-name-editor {
    flex: 1;
    min-width: 0;
  }

  .task-name-editor editable-text {
    width: 100%;
  }


  /* ========================================
   * v2.0.0: Multi-Select & Bulk Actions
   * ======================================== */

  /* Selection checkbox */
  .task-select {
    display: flex;
    align-items: center;
    padding: 0 8px;
  }

  .task-item.selected {
    background: color-mix(in srgb, var(--primary-color) 10%, transparent);
    border-left: 3px solid var(--primary-color);
  }

  /* Bulk actions toolbar */
  .bulk-actions-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: color-mix(in srgb, var(--primary-color) 15%, transparent);
    border-bottom: 1px solid var(--divider-color);
    gap: 12px;
    flex-wrap: wrap;
    animation: slideDown 0.2s ease;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .bulk-actions-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .selected-count {
    font-size: 14px;
    font-weight: 600;
    color: var(--primary-color);
  }

  .bulk-actions-buttons {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .bulk-action-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border: none;
    border-radius: 8px;
    background: var(--card-background-color);
    color: var(--primary-text-color);
    cursor: pointer;
    transition: all 0.15s ease;
    font-size: 13px;
    font-weight: 500;
    font-family: inherit;
  }

  .bulk-action-btn:hover {
    background: var(--divider-color);
    transform: translateY(-1px);
  }

  .bulk-action-btn.danger {
    color: var(--error-color);
  }

  .bulk-action-btn.danger:hover {
    background: color-mix(in srgb, var(--error-color) 15%, transparent);
  }

  .bulk-action-btn ha-icon {
    --mdc-icon-size: 18px;
  }

  .bulk-status-select {
    padding: 6px 12px;
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    background: var(--card-background-color);
    color: var(--primary-text-color);
    cursor: pointer;
    font-size: 13px;
    font-family: inherit;
    transition: all 0.15s ease;
  }

  .bulk-status-select:hover {
    border-color: var(--primary-color);
  }

  .bulk-status-select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary-color) 20%, transparent);
  }

  /* ========================================
   * v2.0.0: Drag and Drop
   * ======================================== */

  .task-item[draggable="true"] {
    cursor: move;
  }

  .task-item.drag-over {
    border-top: 2px solid var(--primary-color);
    margin-top: -2px;
  }

  /* Compact mode adjustments for v2.0.0 */
  .compact .bulk-actions-toolbar {
    padding: 8px 12px;
  }

  .compact .selected-count {
    font-size: 12px;
  }

  .compact .bulk-action-btn {
    padding: 4px 8px;
    font-size: 11px;
  }

  .compact .bulk-action-btn ha-icon {
    --mdc-icon-size: 16px;
  }

  .compact .bulk-status-select {
    padding: 4px 8px;
    font-size: 11px;
  }

  /* ========================================
   * v2.0.1: Controls Toolbar
   * ======================================== */

  .controls-toolbar {
    display: flex;
    align-items: center;
    padding: 10px 16px;
    background: transparent;
    border-bottom: 1px solid var(--divider-color);
    gap: 16px;
    flex-wrap: wrap;
  }

  .control-group {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .control-label {
    font-size: 13px;
    font-weight: 600;
    color: var(--secondary-text-color);
  }

  .control-select {
    padding: 6px 10px;
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.2);
    color: var(--primary-text-color);
    cursor: pointer;
    font-size: 13px;
    font-family: inherit;
    transition: all 0.15s ease;
  }

  .control-select:hover {
    border-color: var(--primary-color);
    background: rgba(0, 0, 0, 0.3);
  }

  .control-select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary-color) 20%, transparent);
  }

  .control-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.2);
    color: var(--primary-text-color);
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .control-btn:hover {
    border-color: var(--primary-color);
    background: rgba(0, 0, 0, 0.3);
    color: var(--primary-color);
    transform: translateY(-1px);
  }

  .control-btn ha-icon {
    --mdc-icon-size: 18px;
  }

  .compact .controls-toolbar {
    padding: 8px 12px;
  }

  .compact .control-label {
    font-size: 11px;
  }

  .compact .control-select {
    padding: 4px 8px;
    font-size: 11px;
  }

  .compact .control-btn {
    width: 28px;
    height: 28px;
  }

  .compact .control-btn ha-icon {
    --mdc-icon-size: 16px;
  }

  /* ========================================
   * v2.0.1: Style Polish
   * ======================================== */

  /* Improved task item transition */
  .task-item {
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Better shadow for dropdowns */
  editable-status .dropdown,
  editable-priority .dropdown,
  editable-date .edit-popup,
  editable-assignees .dropdown {
    box-shadow:
      0 2px 8px color-mix(in srgb, var(--shadow-color, #000) 10%, transparent),
      0 8px 24px color-mix(in srgb, var(--shadow-color, #000) 15%, transparent);
  }

  /* Smooth scrolling */
  .card-content {
    scroll-behavior: smooth;
  }

  /* Better focus indicators */
  input:focus,
  select:focus,
  textarea:focus,
  button:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  /* Improved button transitions */
  .add-button,
  .bulk-action-btn,
  .control-btn {
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Better disabled states */
  button:disabled,
  select:disabled,
  input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Improved animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-8px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  /* Apply animations */
  .task-item {
    animation: slideIn 0.2s ease;
  }

  .bulk-actions-toolbar,
  .controls-toolbar {
    animation: fadeIn 0.2s ease;
  }
`;async function Ot(t,e,i){try{return e.clickup_id?(await t.callService("clickup","update_task_status",{task_id:e.clickup_id,status:i}),{success:!0}):{success:!1,error:"Task does not have a ClickUp ID"}}catch(t){return console.error("Error updating task status:",t),{success:!1,error:t instanceof Error?t.message:"Unknown error"}}}let Pt=class extends nt{constructor(){super(...arguments),this.value="",this.editing=!1,this.placeholder="Click to edit",this.required=!1,this.multiline=!1,this._tempValue="",this._error=""}static{this.styles=r`
    :host {
      display: block;
      position: relative;
    }

    .display-mode {
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;
      transition: background-color 0.15s ease;
      min-height: 20px;
      word-break: break-word;
    }

    .display-mode:hover {
      background-color: var(--divider-color, rgba(0, 0, 0, 0.08));
    }

    .display-mode.empty {
      color: var(--secondary-text-color);
      font-style: italic;
    }

    .edit-mode {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    input, textarea {
      width: 100%;
      padding: 4px 8px;
      border: 2px solid var(--primary-color);
      border-radius: 4px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font-family: inherit;
      font-size: inherit;
      box-sizing: border-box;
      outline: none;
    }

    input.error, textarea.error {
      border-color: var(--error-color, #f44336);
    }

    textarea {
      resize: vertical;
      min-height: 60px;
    }

    .error-message {
      color: var(--error-color, #f44336);
      font-size: 12px;
      padding: 0 8px;
    }

    .actions {
      display: flex;
      gap: 8px;
      padding: 4px 0;
    }

    .btn {
      padding: 4px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
      transition: all 0.15s ease;
    }

    .btn-save {
      background: var(--primary-color);
      color: var(--text-primary-color, white);
    }

    .btn-save:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }

    .btn-cancel {
      background: var(--divider-color, rgba(0, 0, 0, 0.12));
      color: var(--primary-text-color);
    }

    .btn-cancel:hover {
      background: var(--divider-color, rgba(0, 0, 0, 0.2));
    }

    .hint {
      font-size: 11px;
      color: var(--secondary-text-color);
      padding: 0 8px;
    }
  `}render(){return this.editing?this._renderEditMode():this._renderDisplayMode()}_renderDisplayMode(){const t=!this.value||""===this.value.trim();return B`
      <div
        class="display-mode ${t?"empty":""}"
        @click=${this._startEditing}
        title="Click to edit"
      >
        ${t?this.placeholder:this.value}
      </div>
    `}_renderEditMode(){const t=""!==this._error;return B`
      <div class="edit-mode">
        ${this.multiline?B`
          <textarea
            class="${t?"error":""}"
            .value=${this._tempValue}
            placeholder=${this.placeholder}
            maxlength=${this.maxLength||""}
            @input=${this._handleInput}
            @keydown=${this._handleKeyDown}
            @blur=${this._handleBlur}
          ></textarea>
        `:B`
          <input
            type="text"
            class="${t?"error":""}"
            .value=${this._tempValue}
            placeholder=${this.placeholder}
            maxlength=${this.maxLength||""}
            @input=${this._handleInput}
            @keydown=${this._handleKeyDown}
            @blur=${this._handleBlur}
          />
        `}

        ${t?B`
          <div class="error-message">${this._error}</div>
        `:""}

        <div class="actions">
          <button class="btn btn-save" @click=${this._save}>Save</button>
          <button class="btn btn-cancel" @click=${this._cancel}>Cancel</button>
        </div>

        <div class="hint">Press Enter to save, Esc to cancel</div>
      </div>
    `}_startEditing(){this._tempValue=this.value,this._error="",this.editing=!0,requestAnimationFrame(()=>{this._input?.focus(),this._input?.select()}),this.dispatchEvent(new CustomEvent("edit-start"))}_handleInput(t){const e=t.target;this._tempValue=e.value,this._error="",this.required&&!this._tempValue.trim()&&(this._error="This field is required")}_handleKeyDown(t){"Enter"!==t.key||this.multiline?"Enter"===t.key&&t.ctrlKey&&this.multiline?(t.preventDefault(),this._save()):"Escape"===t.key&&(t.preventDefault(),this._cancel()):(t.preventDefault(),this._save())}_handleBlur(){setTimeout(()=>{this.editing&&this._save()},200)}_validate(){return!(this.required&&!this._tempValue.trim())||(this._error="This field is required",!1)}_save(){if(!this._validate())return;const t=this.value,e=this._tempValue.trim();t!==e&&(this.value=e,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:e,oldValue:t},bubbles:!0,composed:!0}))),this.editing=!1,this.dispatchEvent(new CustomEvent("edit-end"))}_cancel(){this._tempValue=this.value,this._error="",this.editing=!1,this.dispatchEvent(new CustomEvent("edit-cancel"))}startEditing(){this._startEditing()}cancelEditing(){this._cancel()}};t([pt({type:String})],Pt.prototype,"value",void 0),t([pt({type:Boolean})],Pt.prototype,"editing",void 0),t([pt({type:String})],Pt.prototype,"placeholder",void 0),t([pt({type:Boolean})],Pt.prototype,"required",void 0),t([pt({type:Boolean})],Pt.prototype,"multiline",void 0),t([pt({type:Number})],Pt.prototype,"maxLength",void 0),t([ut()],Pt.prototype,"_tempValue",void 0),t([ut()],Pt.prototype,"_error",void 0),t([gt("input, textarea")],Pt.prototype,"_input",void 0),Pt=t([ct("editable-text")],Pt);const Mt=[{value:1,label:"Urgent",icon:"mdi:flag",color:"#f44336"},{value:2,label:"High",icon:"mdi:chevron-double-up",color:"#ff9800"},{value:3,label:"Normal",icon:"mdi:equal",color:"#2196f3"},{value:4,label:"Low",icon:"mdi:chevron-double-down",color:"#9e9e9e"},{value:null,label:"No Priority",icon:"mdi:dots-horizontal",color:"var(--disabled-text-color)"}];let Nt=class extends nt{constructor(){super(...arguments),this.value=null,this.showLabel=!1,this.compact=!1,this._isOpen=!1}static{this.styles=r`
    :host {
      display: inline-block;
      position: relative;
    }

    .priority-display {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.15s ease;
      user-select: none;
    }

    .priority-display:hover {
      background-color: var(--divider-color, rgba(0, 0, 0, 0.08));
      transform: translateY(-1px);
    }

    .priority-display.open {
      background-color: var(--divider-color, rgba(0, 0, 0, 0.12));
    }

    .priority-icon {
      --mdc-icon-size: 18px;
      flex-shrink: 0;
    }

    .priority-label {
      font-size: 13px;
      font-weight: 500;
      white-space: nowrap;
    }

    .compact .priority-icon {
      --mdc-icon-size: 14px;
    }

    .compact .priority-label {
      font-size: 11px;
    }

    .dropdown {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      background: var(--card-background-color);
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-card-border-radius, 12px);
      box-shadow: 0 4px 16px color-mix(in srgb, var(--shadow-color, #000) 25%, transparent);
      z-index: 100;
      min-width: 180px;
      overflow: hidden;
      padding: 8px;
      animation: fadeIn 0.15s ease;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .priority-option {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 12px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.15s ease;
      margin-bottom: 4px;
    }

    .priority-option:last-child {
      margin-bottom: 0;
    }

    .priority-option:hover {
      background-color: var(--divider-color, rgba(0, 0, 0, 0.08));
      transform: translateX(2px);
    }

    .priority-option.selected {
      background-color: color-mix(in srgb, var(--primary-color) 15%, transparent);
    }

    .option-icon {
      --mdc-icon-size: 20px;
      flex-shrink: 0;
    }

    .option-label {
      flex: 1;
      font-size: 14px;
      font-weight: 500;
    }

    .option-check {
      --mdc-icon-size: 16px;
      color: var(--primary-color);
    }
  `}render(){return B`
      <div class="${this.compact?"compact":""}">
        ${this._renderDisplay()}
        ${this._isOpen?this._renderDropdown():""}
      </div>
    `}_renderDisplay(){const t=Mt.find(t=>t.value===this.value)||Mt[4];return B`
      <div
        class="priority-display ${this._isOpen?"open":""}"
        @click=${this._toggleDropdown}
        title="${t.label}"
      >
        <ha-icon
          class="priority-icon"
          icon="${t.icon}"
          style="color: ${t.color}"
        ></ha-icon>
        ${this.showLabel?B`
          <span class="priority-label" style="color: ${t.color}">
            ${t.label}
          </span>
        `:""}
      </div>
    `}_renderDropdown(){return B`
      <div class="dropdown" @click=${t=>t.stopPropagation()}>
        ${Mt.map(t=>this._renderOption(t))}
      </div>
    `}_renderOption(t){const e=t.value===this.value;return B`
      <div
        class="priority-option ${e?"selected":""}"
        @click=${()=>this._selectPriority(t.value)}
      >
        <ha-icon
          class="option-icon"
          icon="${t.icon}"
          style="color: ${t.color}"
        ></ha-icon>
        <span class="option-label">${t.label}</span>
        ${e?B`
          <ha-icon class="option-check" icon="mdi:check"></ha-icon>
        `:""}
      </div>
    `}_toggleDropdown(){this._isOpen=!this._isOpen,this._isOpen&&setTimeout(()=>{const t=e=>{this.shadowRoot?.contains(e.target)||(this._isOpen=!1,document.removeEventListener("click",t))};document.addEventListener("click",t)},0)}_selectPriority(t){const e=this.value;e!==t&&(this.value=t,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:t,oldValue:e},bubbles:!0,composed:!0}))),this._isOpen=!1}connectedCallback(){super.connectedCallback(),this._handleKeyDown=this._handleKeyDown.bind(this),document.addEventListener("keydown",this._handleKeyDown)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this._handleKeyDown)}_handleKeyDown(t){"Escape"===t.key&&this._isOpen&&(this._isOpen=!1)}};t([pt({type:Number})],Nt.prototype,"value",void 0),t([pt({type:Boolean})],Nt.prototype,"showLabel",void 0),t([pt({type:Boolean})],Nt.prototype,"compact",void 0),t([ut()],Nt.prototype,"_isOpen",void 0),Nt=t([ct("editable-priority")],Nt);let Ut=class extends nt{constructor(){super(...arguments),this.value=null,this.label="Date",this.icon="mdi:calendar",this.compact=!1,this.allowNull=!0,this.dateType="due",this._editing=!1,this._tempValue=""}static{this.styles=r`
    :host {
      display: inline-block;
      position: relative;
    }

    .date-display {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.15s ease;
      user-select: none;
      font-size: 13px;
    }

    .date-display:hover {
      background-color: var(--divider-color, rgba(0, 0, 0, 0.08));
      transform: translateY(-1px);
    }

    .date-display.editing {
      background-color: var(--divider-color, rgba(0, 0, 0, 0.12));
    }

    .date-display.empty {
      color: var(--secondary-text-color);
      font-style: italic;
    }

    .date-display.overdue {
      color: var(--error-color, #f44336);
    }

    .date-display.upcoming {
      color: var(--warning-color, #ff9800);
    }

    .compact .date-display {
      padding: 2px 6px;
      font-size: 11px;
    }

    .date-icon {
      --mdc-icon-size: 16px;
    }

    .compact .date-icon {
      --mdc-icon-size: 14px;
    }

    .edit-popup {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      background: var(--card-background-color);
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-card-border-radius, 12px);
      box-shadow: 0 4px 16px color-mix(in srgb, var(--shadow-color, #000) 25%, transparent);
      z-index: 100;
      padding: 12px;
      min-width: 200px;
      animation: fadeIn 0.15s ease;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .edit-content {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    input[type="date"] {
      width: 100%;
      padding: 8px;
      border: 2px solid var(--primary-color);
      border-radius: 4px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font-family: inherit;
      font-size: 14px;
      box-sizing: border-box;
      outline: none;
    }

    .actions {
      display: flex;
      gap: 8px;
    }

    .btn {
      flex: 1;
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
      transition: all 0.15s ease;
    }

    .btn-save {
      background: var(--primary-color);
      color: var(--text-primary-color, white);
    }

    .btn-save:hover {
      opacity: 0.9;
    }

    .btn-cancel {
      background: var(--divider-color, rgba(0, 0, 0, 0.12));
      color: var(--primary-text-color);
    }

    .btn-cancel:hover {
      background: var(--divider-color, rgba(0, 0, 0, 0.2));
    }

    .btn-clear {
      background: var(--error-color, #f44336);
      color: white;
    }

    .btn-clear:hover {
      opacity: 0.9;
    }
  `}render(){return B`
      <div class="${this.compact?"compact":""}">
        ${this._renderDisplay()}
        ${this._editing?this._renderEditPopup():""}
      </div>
    `}_renderDisplay(){const t=this._getDateClass(),e=!this.value;return B`
      <div
        class="date-display ${this._editing?"editing":""} ${t} ${e?"empty":""}"
        @click=${this._startEditing}
        title="${e?`Add ${this.label}`:this._formatDate(this.value)}"
      >
        <ha-icon class="date-icon" icon="${this.icon}"></ha-icon>
        <span>${e?`Add ${this.label}`:this._formatDateShort(this.value)}</span>
      </div>
    `}_renderEditPopup(){return B`
      <div class="edit-popup" @click=${t=>t.stopPropagation()}>
        <div class="edit-content">
          <input
            type="date"
            .value=${this._tempValue}
            @change=${this._handleDateChange}
            @keydown=${this._handleKeyDown}
          />

          <div class="actions">
            <button class="btn btn-save" @click=${this._save}>Save</button>
            <button class="btn btn-cancel" @click=${this._cancel}>Cancel</button>
            ${this.allowNull&&this.value?B`
              <button class="btn btn-clear" @click=${this._clear}>Clear</button>
            `:""}
          </div>
        </div>
      </div>
    `}_getDateClass(){if(!this.value||"due"!==this.dateType)return"";const t=new Date,e=this.value.getTime()-t.getTime(),i=Math.floor(e/864e5);return i<0?"overdue":i<=3?"upcoming":""}_formatDate(t){return t.toLocaleDateString(void 0,{year:"numeric",month:"long",day:"numeric"})}_formatDateShort(t){const e=new Date,i=new Date(e.getFullYear(),e.getMonth(),e.getDate()),a=new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime()-i.getTime(),s=Math.round(a/864e5);return 0===s?"Today":1===s?"Tomorrow":-1===s?"Yesterday":s>0&&s<=7||s<0&&s>=-7?t.toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"}):t.toLocaleDateString(void 0,{month:"short",day:"numeric"})}_dateToInputValue(t){return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}_inputValueToDate(t){const[e,i,a]=t.split("-").map(Number);return new Date(e,i-1,a)}_startEditing(){this._tempValue=this.value?this._dateToInputValue(this.value):"",this._editing=!0,requestAnimationFrame(()=>{this._input?.focus()}),setTimeout(()=>{const t=e=>{this.shadowRoot?.contains(e.target)||(this._save(),document.removeEventListener("click",t))};document.addEventListener("click",t)},0),this.dispatchEvent(new CustomEvent("edit-start"))}_handleDateChange(t){const e=t.target;this._tempValue=e.value}_handleKeyDown(t){"Enter"===t.key?(t.preventDefault(),this._save()):"Escape"===t.key&&(t.preventDefault(),this._cancel())}_save(){const t=this.value;let e=null;this._tempValue&&(e=this._inputValueToDate(this._tempValue));const i=t?.getTime(),a=e?.getTime();i!==a&&(this.value=e,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:e,oldValue:t},bubbles:!0,composed:!0}))),this._editing=!1,this.dispatchEvent(new CustomEvent("edit-end"))}_clear(){const t=this.value;null!==t&&(this.value=null,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:null,oldValue:t},bubbles:!0,composed:!0}))),this._editing=!1,this.dispatchEvent(new CustomEvent("edit-end"))}_cancel(){this._tempValue=this.value?this._dateToInputValue(this.value):"",this._editing=!1,this.dispatchEvent(new CustomEvent("edit-cancel"))}};t([pt({type:Object})],Ut.prototype,"value",void 0),t([pt({type:String})],Ut.prototype,"label",void 0),t([pt({type:String})],Ut.prototype,"icon",void 0),t([pt({type:Boolean})],Ut.prototype,"compact",void 0),t([pt({type:Boolean})],Ut.prototype,"allowNull",void 0),t([pt({type:String})],Ut.prototype,"dateType",void 0),t([ut()],Ut.prototype,"_editing",void 0),t([ut()],Ut.prototype,"_tempValue",void 0),t([gt('input[type="date"]')],Ut.prototype,"_input",void 0),Ut=t([ct("editable-date")],Ut);let Lt=class extends nt{constructor(){super(...arguments),this.value=[],this.available=[],this.compact=!1,this._isOpen=!1,this._selectedIds=new Set}static{this.styles=r`
    :host {
      display: inline-block;
      position: relative;
    }

    .assignees-display {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .assignees-display:hover {
      background-color: var(--divider-color, rgba(0, 0, 0, 0.08));
    }

    .assignees-display.open {
      background-color: var(--divider-color, rgba(0, 0, 0, 0.12));
    }

    .assignees-display.empty {
      color: var(--secondary-text-color);
      font-size: 13px;
      padding: 4px 8px;
    }

    .assignee-avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 600;
      color: white;
      background-color: var(--primary-color);
      border: 2px solid var(--card-background-color);
      flex-shrink: 0;
    }

    .assignee-avatar:not(:first-child) {
      margin-left: -8px;
    }

    .compact .assignee-avatar {
      width: 20px;
      height: 20px;
      font-size: 9px;
      border-width: 1px;
    }

    .assignee-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .add-assignee {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 2px dashed var(--divider-color);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--secondary-text-color);
      background: var(--card-background-color);
    }

    .compact .add-assignee {
      width: 20px;
      height: 20px;
      border-width: 1px;
    }

    .add-icon {
      --mdc-icon-size: 14px;
    }

    .compact .add-icon {
      --mdc-icon-size: 12px;
    }

    .dropdown {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      background: var(--card-background-color);
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-card-border-radius, 12px);
      box-shadow: 0 4px 16px color-mix(in srgb, var(--shadow-color, #000) 25%, transparent);
      z-index: 100;
      min-width: 250px;
      max-height: 300px;
      overflow-y: auto;
      padding: 8px;
      animation: fadeIn 0.15s ease;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .dropdown-header {
      font-size: 12px;
      font-weight: 600;
      color: var(--secondary-text-color);
      padding: 4px 12px 8px;
      border-bottom: 1px solid var(--divider-color);
      margin-bottom: 8px;
    }

    .assignee-option {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 12px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.15s ease;
      margin-bottom: 4px;
    }

    .assignee-option:last-child {
      margin-bottom: 0;
    }

    .assignee-option:hover {
      background-color: var(--divider-color, rgba(0, 0, 0, 0.08));
    }

    .assignee-option.selected {
      background-color: color-mix(in srgb, var(--primary-color) 15%, transparent);
    }

    .option-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 600;
      color: white;
      background-color: var(--primary-color);
      flex-shrink: 0;
    }

    .option-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .option-info {
      flex: 1;
      min-width: 0;
    }

    .option-name {
      font-size: 14px;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .option-email {
      font-size: 12px;
      color: var(--secondary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .option-check {
      --mdc-icon-size: 20px;
      color: var(--primary-color);
    }

    .actions {
      display: flex;
      gap: 8px;
      padding: 8px 12px 4px;
      border-top: 1px solid var(--divider-color);
      margin-top: 8px;
    }

    .btn {
      flex: 1;
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
      transition: all 0.15s ease;
    }

    .btn-save {
      background: var(--primary-color);
      color: var(--text-primary-color, white);
    }

    .btn-save:hover {
      opacity: 0.9;
    }

    .btn-cancel {
      background: var(--divider-color, rgba(0, 0, 0, 0.12));
      color: var(--primary-text-color);
    }

    .btn-cancel:hover {
      background: var(--divider-color, rgba(0, 0, 0, 0.2));
    }
  `}render(){return B`
      <div class="${this.compact?"compact":""}">
        ${this._renderDisplay()}
        ${this._isOpen?this._renderDropdown():""}
      </div>
    `}_renderDisplay(){return!this.value||0===this.value.length?B`
        <div
          class="assignees-display empty ${this._isOpen?"open":""}"
          @click=${this._toggleDropdown}
          title="Add assignees"
        >
          <ha-icon icon="mdi:account-plus" class="add-icon"></ha-icon>
          <span>Add assignees</span>
        </div>
      `:B`
      <div
        class="assignees-display ${this._isOpen?"open":""}"
        @click=${this._toggleDropdown}
        title="${this.value.map(t=>t.username).join(", ")}"
      >
        ${this.value.map(t=>this._renderAvatar(t))}
        <div class="add-assignee">
          <ha-icon icon="mdi:plus" class="add-icon"></ha-icon>
        </div>
      </div>
    `}_renderAvatar(t){const e=t.initials||this._getInitials(t.username);return B`
      <div
        class="assignee-avatar"
        style="${t.color?`background-color: ${t.color}`:""}"
        title="${t.username}"
      >
        ${t.profilePicture?B`
          <img src="${t.profilePicture}" alt="${t.username}" />
        `:B`
          <span>${e}</span>
        `}
      </div>
    `}_renderDropdown(){return B`
      <div class="dropdown" @click=${t=>t.stopPropagation()}>
        <div class="dropdown-header">Select Assignees</div>

        ${this.available.length>0?B`
          ${this.available.map(t=>this._renderOption(t))}
        `:B`
          <div style="padding: 12px; text-align: center; color: var(--secondary-text-color);">
            No assignees available
          </div>
        `}

        <div class="actions">
          <button class="btn btn-save" @click=${this._save}>Done</button>
          <button class="btn btn-cancel" @click=${this._cancel}>Cancel</button>
        </div>
      </div>
    `}_renderOption(t){const e=this._selectedIds.has(t.id),i=t.initials||this._getInitials(t.username);return B`
      <div
        class="assignee-option ${e?"selected":""}"
        @click=${()=>this._toggleAssignee(t.id)}
      >
        <div
          class="option-avatar"
          style="${t.color?`background-color: ${t.color}`:""}"
        >
          ${t.profilePicture?B`
            <img src="${t.profilePicture}" alt="${t.username}" />
          `:B`
            <span>${i}</span>
          `}
        </div>

        <div class="option-info">
          <div class="option-name">${t.username}</div>
          ${t.email?B`
            <div class="option-email">${t.email}</div>
          `:""}
        </div>

        ${e?B`
          <ha-icon class="option-check" icon="mdi:check"></ha-icon>
        `:""}
      </div>
    `}_getInitials(t){return t.split(/\s+/).map(t=>t[0]).filter(Boolean).slice(0,2).join("").toUpperCase()}_toggleDropdown(){this._isOpen||(this._selectedIds=new Set(this.value.map(t=>t.id))),this._isOpen=!this._isOpen,this._isOpen&&setTimeout(()=>{const t=e=>{this.shadowRoot?.contains(e.target)||(this._save(),document.removeEventListener("click",t))};document.addEventListener("click",t)},0)}_toggleAssignee(t){this._selectedIds.has(t)?this._selectedIds.delete(t):this._selectedIds.add(t),this.requestUpdate()}_save(){const t=this.value,e=this.available.filter(t=>this._selectedIds.has(t.id)),i=new Set(t.map(t=>t.id)),a=this._selectedIds;(i.size!==a.size||![...i].every(t=>a.has(t)))&&(this.value=e,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:e,oldValue:t},bubbles:!0,composed:!0}))),this._isOpen=!1}_cancel(){this._selectedIds=new Set(this.value.map(t=>t.id)),this._isOpen=!1}connectedCallback(){super.connectedCallback(),this._handleKeyDown=this._handleKeyDown.bind(this),document.addEventListener("keydown",this._handleKeyDown)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this._handleKeyDown)}_handleKeyDown(t){"Escape"===t.key&&this._isOpen&&this._cancel()}};t([pt({type:Array})],Lt.prototype,"value",void 0),t([pt({type:Array})],Lt.prototype,"available",void 0),t([pt({type:Boolean})],Lt.prototype,"compact",void 0),t([ut()],Lt.prototype,"_isOpen",void 0),t([ut()],Lt.prototype,"_selectedIds",void 0),Lt=t([ct("editable-assignees")],Lt);let Vt=class extends nt{constructor(){super(...arguments),this.value=[],this.compact=!1,this._isAdding=!1,this._newTagName=""}static{this.styles=r`
    :host {
      display: inline-block;
    }

    .tags-container {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
      padding: 2px;
    }

    .tag {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border-radius: 12px;
      background-color: var(--primary-color);
      color: white;
      font-size: 11px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s ease;
      user-select: none;
    }

    .tag:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }

    .compact .tag {
      padding: 2px 6px;
      font-size: 10px;
      border-radius: 10px;
    }

    .tag-remove {
      --mdc-icon-size: 14px;
      cursor: pointer;
      opacity: 0.7;
      transition: opacity 0.15s ease;
    }

    .tag-remove:hover {
      opacity: 1;
    }

    .compact .tag-remove {
      --mdc-icon-size: 12px;
    }

    .add-tag-button {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border-radius: 12px;
      border: 1px dashed var(--divider-color);
      background: transparent;
      color: var(--secondary-text-color);
      font-size: 11px;
      cursor: pointer;
      transition: all 0.15s ease;
      user-select: none;
    }

    .add-tag-button:hover {
      border-color: var(--primary-color);
      color: var(--primary-color);
      background: color-mix(in srgb, var(--primary-color) 10%, transparent);
    }

    .compact .add-tag-button {
      padding: 2px 6px;
      font-size: 10px;
      border-radius: 10px;
    }

    .add-icon {
      --mdc-icon-size: 14px;
    }

    .compact .add-icon {
      --mdc-icon-size: 12px;
    }

    .add-tag-input-container {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: var(--card-background-color);
      border: 2px solid var(--primary-color);
      border-radius: 12px;
      padding: 4px 8px;
      animation: fadeIn 0.15s ease;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .compact .add-tag-input-container {
      padding: 2px 6px;
      border-radius: 10px;
    }

    input {
      border: none;
      background: transparent;
      color: var(--primary-text-color);
      font-family: inherit;
      font-size: 11px;
      outline: none;
      width: 80px;
    }

    .compact input {
      font-size: 10px;
      width: 60px;
    }

    input::placeholder {
      color: var(--secondary-text-color);
    }

    .input-actions {
      display: flex;
      gap: 2px;
    }

    .input-btn {
      --mdc-icon-size: 16px;
      cursor: pointer;
      opacity: 0.7;
      transition: all 0.15s ease;
      color: var(--primary-text-color);
    }

    .input-btn:hover {
      opacity: 1;
      transform: scale(1.1);
    }

    .compact .input-btn {
      --mdc-icon-size: 14px;
    }

    .input-btn.save {
      color: var(--success-color, #4caf50);
    }

    .input-btn.cancel {
      color: var(--error-color, #f44336);
    }
  `}render(){return B`
      <div class="tags-container ${this.compact?"compact":""}">
        ${this.value.map((t,e)=>this._renderTag(t,e))}
        ${this._isAdding?this._renderAddInput():this._renderAddButton()}
      </div>
    `}_renderTag(t,e){const i=t.tag_bg||"var(--primary-color)",a=t.tag_fg||"white";return B`
      <div
        class="tag"
        style="background-color: ${i}; color: ${a};"
        title="${t.name}"
      >
        <span>${t.name}</span>
        <ha-icon
          class="tag-remove"
          icon="mdi:close"
          @click=${()=>this._removeTag(e)}
        ></ha-icon>
      </div>
    `}_renderAddButton(){return B`
      <div class="add-tag-button" @click=${this._startAdding}>
        <ha-icon class="add-icon" icon="mdi:tag-plus"></ha-icon>
        <span>Add tag</span>
      </div>
    `}_renderAddInput(){return B`
      <div class="add-tag-input-container">
        <input
          type="text"
          placeholder="Tag name"
          .value=${this._newTagName}
          @input=${this._handleInput}
          @keydown=${this._handleKeyDown}
          @blur=${this._handleBlur}
        />
        <div class="input-actions">
          <ha-icon
            class="input-btn save"
            icon="mdi:check"
            @click=${this._addTag}
            title="Add (Enter)"
          ></ha-icon>
          <ha-icon
            class="input-btn cancel"
            icon="mdi:close"
            @click=${this._cancelAdding}
            title="Cancel (Esc)"
          ></ha-icon>
        </div>
      </div>
    `}_startAdding(){this._isAdding=!0,this._newTagName="",requestAnimationFrame(()=>{this._input?.focus()})}_handleInput(t){const e=t.target;this._newTagName=e.value}_handleKeyDown(t){"Enter"===t.key?(t.preventDefault(),this._addTag()):"Escape"===t.key&&(t.preventDefault(),this._cancelAdding())}_handleBlur(){setTimeout(()=>{this._isAdding&&this._newTagName.trim()?this._addTag():this._isAdding&&this._cancelAdding()},200)}_addTag(){const t=this._newTagName.trim();if(!t)return void this._cancelAdding();if(this.value.some(e=>e.name.toLowerCase()===t.toLowerCase()))return void this._cancelAdding();const e=this.value,i={name:t},a=[...this.value,i];this.value=a,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:a,oldValue:e},bubbles:!0,composed:!0})),this._newTagName="",this._isAdding=!1}_removeTag(t){const e=this.value,i=this.value.filter((e,i)=>i!==t);this.value=i,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:i,oldValue:e},bubbles:!0,composed:!0}))}_cancelAdding(){this._isAdding=!1,this._newTagName=""}};t([pt({type:Array})],Vt.prototype,"value",void 0),t([pt({type:Boolean})],Vt.prototype,"compact",void 0),t([ut()],Vt.prototype,"_isAdding",void 0),t([ut()],Vt.prototype,"_newTagName",void 0),t([gt("input")],Vt.prototype,"_input",void 0),Vt=t([ct("editable-tags")],Vt);let jt=class extends nt{constructor(){super(...arguments),this.value=null,this.options=[],this.compact=!1,this._isOpen=!1}static{this.styles=r`
    :host {
      display: flex;
      justify-content: center;
      margin: 0;
      padding: 0;
    }

    .status-display {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      user-select: none;
      margin: 0;
      padding: 0;
    }

    .status-display:hover .status-badge {
      opacity: 0.85;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: inherit;
      font-weight: inherit;
      padding: 0;
      margin: 0;
      border-radius: 0;
      background: transparent;
      color: inherit;
      text-transform: uppercase;
      letter-spacing: inherit;
      white-space: nowrap;
      transition: opacity 0.15s ease;
      line-height: inherit;
      position: relative;
    }

    .compact .status-badge {
      font-size: inherit;
      padding: 0;
      border-radius: 0;
      letter-spacing: inherit;
    }

    /* Dialog styling */
    ha-dialog {
      --mdc-dialog-min-width: 380px;
      --mdc-dialog-max-width: 480px;
      --mdc-dialog-box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      --mdc-shape-medium: 20px;
    }

    .status-options {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 20px;
      max-height: 60vh;
      overflow-y: auto;
    }

    .status-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .group-label {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--secondary-text-color);
      padding: 0 4px 4px 4px;
      border-bottom: 1px solid var(--divider-color);
    }

    .status-option {
      display: flex;
      align-items: center;
      padding: 0;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      border: 2px solid transparent;
      background: transparent;
      position: relative;
      min-height: 48px;
      overflow: hidden;
    }

    .status-option:hover {
      transform: translateX(4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .status-option:active {
      transform: translateX(2px);
    }

    .status-option.selected {
      border-color: rgba(255, 255, 255, 0.3);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2), 0 0 0 2px rgba(255, 255, 255, 0.2);
    }

    .status-option.selected::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 12px;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
      z-index: 2;
    }

    .status-option.selected::before {
      content: '✓';
      position: absolute;
      top: 50%;
      right: 12px;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      color: var(--option-color);
      font-size: 14px;
      font-weight: 900;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 3;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .option-badge {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 11px;
      font-weight: 700;
      padding: 14px 44px 14px 18px;
      width: 100%;
      background: var(--option-color);
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      text-align: left;
      line-height: 1.3;
      transition: filter 0.15s ease;
    }

    .status-option:hover .option-badge {
      filter: brightness(1.1);
    }

    .status-option.selected .option-badge {
      filter: brightness(1.15);
    }
  `}render(){return B`
      <div class="${this.compact?"compact":""}">
        ${this._renderDisplay()}
        ${this._renderDialog()}
      </div>
    `}_renderDisplay(){const t=this.value?.name||this.value?.status||"NO STATUS",e=this.value?.name||this.value?.status||"No Status";return B`
      <div
        class="status-display"
        @click=${this._openDialog}
        title="${e}"
      >
        <span
          class="status-badge"
          style="--status-color: ${this.value?.color||"var(--disabled-text-color)"}"
        >
          ${t}
        </span>
      </div>
    `}_renderDialog(){const t={notStarted:[],active:[],done:[],closed:[]};return this.options.forEach(e=>{const i=e.type||"custom",a=(e.name||e.status||"").toLowerCase();a.includes("complete")||a.includes("done")||"finished"===a?t.done.push(e):a.includes("cancel")||a.includes("archive")||"closed"===i&&!a.includes("complete")?t.closed.push(e):"open"===i||a.includes("to do")||a.includes("todo")||a.includes("backlog")?t.notStarted.push(e):t.active.push(e)}),B`
      <ha-dialog
        .open=${this._isOpen}
        @closed=${this._closeDialog}
        .heading=${"Change Status"}
      >
        <div class="status-options">
          ${t.notStarted.length>0?B`
            <div class="status-group">
              <div class="group-label">Not Started</div>
              ${t.notStarted.map(t=>this._renderOption(t))}
            </div>
          `:""}
          ${t.active.length>0?B`
            <div class="status-group">
              <div class="group-label">Active</div>
              ${t.active.map(t=>this._renderOption(t))}
            </div>
          `:""}
          ${t.done.length>0?B`
            <div class="status-group">
              <div class="group-label">Done</div>
              ${t.done.map(t=>this._renderOption(t))}
            </div>
          `:""}
          ${t.closed.length>0?B`
            <div class="status-group">
              <div class="group-label">Closed</div>
              ${t.closed.map(t=>this._renderOption(t))}
            </div>
          `:""}
        </div>
      </ha-dialog>
    `}_renderOption(t){const e=t.name||t.status||"",i=this.value?.name||this.value?.status||"";return B`
      <div
        class="status-option ${e===i?"selected":""}"
        @click=${()=>this._selectStatus(t)}
      >
        <span
          class="option-badge"
          style="--option-color: ${t.color}"
        >
          ${e}
        </span>
      </div>
    `}_openDialog(){this._isOpen=!0}_closeDialog(){this._isOpen=!1}_selectStatus(t){const e=this.value;(e?.name||e?.status||"")!==(t.name||t.status||"")&&(this.value=t,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:t,oldValue:e},bubbles:!0,composed:!0}))),this._isOpen=!1}};t([pt({type:Object})],jt.prototype,"value",void 0),t([pt({type:Array})],jt.prototype,"options",void 0),t([pt({type:Boolean})],jt.prototype,"compact",void 0),t([ut()],jt.prototype,"_isOpen",void 0),jt=t([ct("editable-status")],jt),console.info("%c  CLICKUP-TODO-CARD  \n%c  Version 2.17.1  ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray");class Rt extends nt{constructor(){super(...arguments),this._config={type:"custom:clickup-todo-card",entity:"",...yt},this._tasks=[],this._displayedTasks=[],this._editingTask=null,this._showAddDialog=!1,this._selectedTasks=new Set,this._selectionMode=!1,this._draggedTask=null,this._dragOverTask=null}get config(){return this._config}static async getConfigElement(){return await Promise.resolve().then(function(){return Ht}),document.createElement("clickup-todo-card-editor")}static getStubConfig(){return{type:"custom:clickup-todo-card",entity:"",...yt}}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={...yt,...t}}getCardSize(){return 3+(this._tasks?.length||0)}shouldUpdate(t){if(!this._config||!this.hass)return!0;if(!this._config.entity)return!0;try{return function(t,e,i){if(e.has("config")||i)return!0;if(t.config.entity){var a=e.get("hass");return!a||a.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}(this,t,!1)}catch(t){return console.error("Error in shouldUpdate:",t),!0}}_calculatePillWidth(t){if(!this._config.show_status||!t||0===t.length)return 100;let e="";for(const i of t)if(i.clickup_status?.status){const t=i.clickup_status.status;t.length>e.length&&(e=t)}if(!e)return 100;const i=this._config.compact_mode,a=1*(i?11:12),s=i?.4:.5;return 4+(i?14:16)+0+Math.ceil(e.length*a+e.length*s+8)}_renderDynamicStyles(){if(!this._config.field_styles)return B``;const t=this._config.field_styles;let e="";return t.status&&(e+=`.status-badge { ${t.status} }\n`),t.priority&&(e+=`.priority-icon { ${t.priority} }\n`),t.due_date&&(e+=`.date-item.due-date { ${t.due_date} }\n`),t.start_date&&(e+=`.date-item.start-date { ${t.start_date} }\n`),t.dates&&(e+=`.task-dates { ${t.dates} }\n`),t.tags&&(e+=`.task-tags { ${t.tags} }\n`),t.assignees&&(e+=`.task-assignees { ${t.assignees} }\n`),t.location&&(e+=`.task-location { ${t.location} }\n`),t.custom_fields&&Object.entries(t.custom_fields).forEach(([t,i])=>{const a=t.replace(/[^a-zA-Z0-9]/g,"-");e+=`.custom-field[data-field="${a}"] { ${i} }\n`}),e?B`<style>${e}</style>`:B``}render(){try{if(!this._config||!this.hass)return B`<ha-card><div class="warning">Loading...</div></ha-card>`;if(!this._config.entity)return B`
          <ha-card>
            <div class="warning">Please configure an entity in the card editor</div>
          </ha-card>
        `;const t=this.hass.states[this._config.entity];if(!t)return B`
          <ha-card>
            <div class="warning">Entity not found: ${this._config.entity}</div>
          </ha-card>
        `;this._tasks=kt(t);let e=this._tasks;if("custom"===this._config.sort_by){const t=function(t){try{const e=Ft(t),i=localStorage.getItem(e);return i?JSON.parse(i):null}catch(t){return console.error("Error loading custom order:",t),null}}(this._config.entity);t&&(e=function(t,e){const i=new Map(t.map(t=>[t.uid,t])),a=[],s=new Set;for(const t of e){const e=i.get(t);e&&(a.push(e),s.add(t))}for(const e of t)s.has(e.uid)||a.push(e);return a}(this._tasks,t))}const i=St(function(t,e){let i=[...t];if(!e.filters)return i;if(e.filters.status?.length&&(i=i.filter(t=>{const i=t.clickup_status?.status;return i&&e.filters.status.includes(i)})),e.filters.priority?.length&&(i=i.filter(t=>{const i=null===t.priority?null:t.priority;return e.filters.priority.includes(i)})),e.filters.tags?.length&&(i=i.filter(t=>!!t.tags?.length&&t.tags.some(t=>e.filters.tags.includes(t.name)))),e.filters.assignees?.length&&(i=i.filter(t=>!!t.assignees?.length&&t.assignees.some(t=>e.filters.assignees.includes(t.id.toString())))),e.filters.due_date_range){const{start:t,end:a}=e.filters.due_date_range;i=i.filter(e=>{if(!e.due)return!1;const i=new Date(e.due).getTime();return!(t&&i<new Date(t).getTime())&&!(a&&i>new Date(a).getTime())})}if(void 0!==e.hide_completed_after&&e.hide_completed_after>0){const t=e.hide_completed_after,a=Date.now()-60*t*60*1e3;i=i.filter(t=>"completed"!==t.status||(!t.date_closed||("number"==typeof t.date_closed?t.date_closed:parseInt(t.date_closed))>=a))}return i}(e,this._config),this._config);this._displayedTasks=i;const a=this._calculatePillWidth(i),s=Tt(i,this._config.group_by||"none",this._config.group_field_id),o=!1!==this._config.add_button_overlay,r=this._config.add_button_position||"bottom-right",n=!o&&r.startsWith("top"),l=!o&&r.startsWith("bottom");return B`
        <ha-card>
          ${this._renderDynamicStyles()}
          ${this._renderHeader(t)}
          ${this._selectionMode?this._renderBulkActionsToolbar():""}
          ${!this._config.show_sort_controls&&!this._config.show_filter_controls||this._selectionMode?"":this._renderControlsToolbar()}
          ${n?B`<div class="button-container">${this._renderFloatingAddButton(t)}</div>`:""}
          <div
            class="card-content ${this._config.compact_mode?"compact":""} ${this._config.fixed_height?"fixed-height":""}"
            style="${this._config.fixed_height?`height: ${this._config.fixed_height}px; min-height: ${this._config.fixed_height}px; max-height: ${this._config.fixed_height}px;`:""} --pill-width: ${a}px;"
          >
            ${1===s.size&&s.has("all")?this._renderTaskList(s.get("all")):this._renderGroupedTasks(s)}
          </div>
          ${l?B`<div class="button-container">${this._renderFloatingAddButton(t)}</div>`:""}
          ${o?this._renderFloatingAddButton(t):""}
        </ha-card>
        ${this._showAddDialog?this._renderAddDialog():""}
        ${this._editingTask?this._renderEditDialog():""}
      `}catch(t){return console.error("Error rendering ClickUp Todo Card:",t),B`
        <ha-card>
          <div class="warning">Error rendering card. Check console for details.</div>
        </ha-card>
      `}}_renderHeader(t){if(this._config.hide_header)return B``;const e=this._config.title||t.attributes.friendly_name||"Tasks",i=!1!==this._config.show_task_count,a=!0!==this._config.hide_title;if(!a&&!i)return B``;const s=this._tasks.length;return B`
      <div class="card-header">
        ${a?B`<div class="name">${e}</div>`:""}
        ${i?B`<div class="task-count ${s<10?"single-digit":""}">${s}</div>`:""}
      </div>
    `}_renderBulkActionsToolbar(){const t=this._selectedTasks.size,e=this._getAvailableStatuses();return B`
      <div class="bulk-actions-toolbar">
        <div class="bulk-actions-info">
          <span class="selected-count">${t} selected</span>
          <button class="bulk-action-btn" @click=${this._selectAll} title="Select all">
            <ha-icon icon="mdi:checkbox-multiple-marked"></ha-icon>
          </button>
          <button class="bulk-action-btn" @click=${this._clearSelection} title="Clear selection">
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
        </div>

        <div class="bulk-actions-buttons">
          ${e&&e.length>0?B`
            <select
              class="bulk-status-select"
              @change=${t=>{const e=t.target;e.value&&(this._bulkUpdateStatus(e.value),e.value="")}}
            >
              <option value="">Change status...</option>
              ${e.map(t=>B`
                <option value="${t.name}">${t.name}</option>
              `)}
            </select>
          `:""}

          <button class="bulk-action-btn danger" @click=${this._bulkDelete} title="Delete selected">
            <ha-icon icon="mdi:delete"></ha-icon>
            <span>Delete</span>
          </button>
        </div>
      </div>
    `}_renderControlsToolbar(){return B`
      <div class="controls-toolbar">
        ${this._config.show_sort_controls?B`
          <div class="control-group">
            <span class="control-label">Sort:</span>
            <select
              class="control-select"
              .value=${this._config.sort_by||"due_date"}
              @change=${t=>{const e=t.target;this._config={...this._config,sort_by:e.value},mt(this,"config-changed",{config:this._config})}}
            >
              ${[{value:"due_date",label:"Due Date"},{value:"start_date",label:"Start Date"},{value:"priority",label:"Priority"},{value:"name",label:"Name"},{value:"status",label:"Status"},{value:"custom",label:"Custom Order"}].map(t=>B`
                <option value="${t.value}">${t.label}</option>
              `)}
            </select>

            <button
              class="control-btn"
              @click=${()=>{const t="asc"===this._config.sort_order?"desc":"asc";this._config={...this._config,sort_order:t},mt(this,"config-changed",{config:this._config})}}
              title="${"asc"===this._config.sort_order?"Ascending":"Descending"}"
            >
              <ha-icon icon="${"asc"===this._config.sort_order?"mdi:sort-ascending":"mdi:sort-descending"}"></ha-icon>
            </button>

            <select
              class="control-select"
              .value=${this._config.group_by||"none"}
              @change=${t=>{const e=t.target;this._config={...this._config,group_by:e.value},mt(this,"config-changed",{config:this._config})}}
            >
              ${[{value:"none",label:"No Grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"assignee",label:"Assignee"},{value:"list",label:"List"}].map(t=>B`
                <option value="${t.value}">${t.label}</option>
              `)}
            </select>
          </div>
        `:""}
      </div>
    `}_renderFloatingAddButton(t){const e="unavailable"===t.state,i=void 0!==this._config.add_button_text?this._config.add_button_text:"Add Task",a=this._config.add_button_position||"bottom-right",s=!1!==this._config.add_button_overlay;return B`
      <button
        class="floating-add-button ${a} ${""===i?"icon-only":""} ${s?"overlay":"non-overlay"}"
        ?disabled=${e}
        @click=${this._openAddDialog}
      >
        <ha-icon icon="mdi:plus"></ha-icon>
        ${i?B`<span>${i}</span>`:""}
      </button>
    `}_renderGroupedTasks(t){const e=Array.from(t.entries());return B`
      ${e.map(([t,e])=>B`
        <div class="task-group">
          <div class="group-header">
            <span class="group-name">${t}</span>
            <span class="group-count">${e.length}</span>
          </div>
          ${this._renderTaskList(e)}
        </div>
      `)}
    `}_renderTaskList(t){return t&&0!==t.length?B`
      <div class="tasks">
        ${t.map(t=>this._renderTask(t))}
      </div>
    `:B`
        <div class="empty-state">
          <ha-icon icon="mdi:check-circle-outline"></ha-icon>
          <span>No tasks</span>
        </div>
      `}_renderTask(t){const e=function(t){if(!t.due)return!1;const e=new Date;return new Date(t.due)<e&&"completed"!==t.status}(t),i="completed"===t.status,a=this._config.show_status&&t.clickup_status,s=this._selectedTasks.has(t.uid),o=this._dragOverTask===t.uid;return B`
      <div
        class="task-item ${i?"completed":""} ${e?"overdue":""} ${s?"selected":""} ${o?"drag-over":""}"
        draggable="true"
        @dragstart=${()=>this._handleDragStart(t)}
        @dragend=${()=>this._handleDragEnd()}
        @dragover=${e=>this._handleDragOver(e,t)}
        @dragleave=${()=>this._handleDragLeave()}
        @drop=${e=>this._handleDrop(e,t)}
        @click=${()=>this._openEditDialog(t)}
      >
        ${this._selectionMode?B`
          <div class="task-select">
            <ha-checkbox
              .checked=${s}
              @change=${()=>this._toggleSelection(t.uid)}
              @click=${t=>t.stopPropagation()}
            ></ha-checkbox>
          </div>
        `:""}

        ${a?B`
          <div class="task-status-pill" style="background: ${t.clickup_status?.color||"var(--disabled-text-color)"}; ${this._config.field_styles?.status_pill||""}"><ha-checkbox
              .checked=${i}
              @change=${e=>{e.stopPropagation(),this._toggleTask(t)}}
              @click=${t=>t.stopPropagation()}
            ></ha-checkbox><editable-status
              .value=${t.clickup_status}
              .options=${function(t){const e=t.list_info?.statuses||[];return e.length>0?e.map(t=>({name:t.status,color:t.color||"#d3d3d3",type:t.type||"custom"})).sort((t,e)=>t.name.localeCompare(e.name)):t.clickup_status?.status?[{name:t.clickup_status.status,color:t.clickup_status.color||"#d3d3d3",type:t.clickup_status.type||"custom"}]:[{name:"TO DO",color:"#d3d3d3",type:"open"},{name:"IN PROGRESS",color:"#4194f6",type:"custom"},{name:"IN REVIEW",color:"#f6c342",type:"custom"},{name:"COMPLETE",color:"#6bc950",type:"closed"},{name:"BLOCKED",color:"#f50000",type:"custom"}]}(t)}
              .compact=${this._config.compact_mode}
              @value-changed=${e=>this._handleStatusChange(t,e.detail.value)}
              @click=${t=>t.stopPropagation()}
            ></editable-status>
          </div>
        `:B`
          <div class="task-checkbox">
            <ha-checkbox
              .checked=${i}
              @change=${e=>{e.stopPropagation(),this._toggleTask(t)}}
              @click=${t=>t.stopPropagation()}
            ></ha-checkbox>
          </div>
        `}

        <div class="task-main">
          <div class="task-header">
            <span class="task-name" style="${this._config.field_styles?.task_name||""}">${t.summary}</span>

            ${this._config.show_priority?this._renderPriority(t):""}
          </div>

          ${t.description?B`
            <div class="task-description">${t.description}</div>
          `:""}

          ${this._renderTaskMetadata(t)}
        </div>
      </div>
    `}_renderPriority(t){if(!this._config.show_priority)return B``;if(!(null!==t.priority&&void 0!==t.priority)&&!this._config.always_show_fields?.priority)return B``;const e=t.priority??null,i=this._config.field_icons?.priority,a=i||vt[e]||vt.null,s=bt[e]||bt.null,o=this._config.field_styles?.priority||"";return B`
      <ha-icon
        class="priority-icon"
        icon="${a}"
        style="color: ${s}; ${o}"
      ></ha-icon>
    `}_renderDates(t){const e=this._config.show_start_date&&(t.start_date||this._config.always_show_fields?.start_date),i=this._config.show_due_date&&(t.due||this._config.always_show_fields?.due_date);if(!e&&!i)return B``;const a=this._config.field_icons?.start_date,s=a||"mdi:calendar-start",o=this._config.field_styles?.start_date||"",r=this._config.field_icons?.due_date,n=r||"mdi:calendar-end",l=this._config.field_styles?.due_date||"",c=this._config.field_styles?.dates||"";return B`
      <div class="task-dates" style="${c}">
        ${e?B`
          <span class="date-item start-date" style="${o}">
            <ha-icon icon="${s}"></ha-icon>
            ${t.start_date?At(t.start_date):"—"}
          </span>
        `:""}

        ${i?B`
          <span class="date-item due-date ${t.due?zt(t.due):""}" style="${l}">
            <ha-icon icon="${n}"></ha-icon>
            ${t.due?At(t.due):"—"}
          </span>
        `:""}
      </div>
    `}_renderTags(t){if(!this._config.show_tags)return B``;const e=t.tags&&t.tags.length>0;if(!e&&!this._config.always_show_fields?.tags)return B``;const i=this._config.field_styles?.tags||"";return B`
      <div class="task-tags" style="${i}">
        ${e?t.tags.map(t=>B`
          <span
            class="tag"
            style="
              ${t.tag_bg?`background-color: ${t.tag_bg};`:""}
              ${t.tag_fg?`color: ${t.tag_fg};`:""}
            "
          >
            ${t.name}
          </span>
        `):B`<span class="no-data">—</span>`}
      </div>
    `}_renderAssignees(t){if(!this._config.show_assignees)return B``;const e=t.assignees&&t.assignees.length>0;if(!e&&!this._config.always_show_fields?.assignees)return B``;const i=this._config.field_styles?.assignees||"";return B`
      <div class="task-assignees" style="${i}">
        ${e?t.assignees.map(t=>B`
          <div
            class="assignee-avatar"
            style="${t.color?`background-color: ${t.color}`:""}"
            title="${t.username}"
          >
            ${t.profilePicture?B`<img src="${t.profilePicture}" alt="${t.username}" />`:B`<span>${Et(t.username)}</span>`}
          </div>
        `):B`<span class="no-data">—</span>`}
      </div>
    `}_renderCustomFields(t){if(!this._config.show_custom_fields||!t.custom_fields||0===t.custom_fields.length)return B``;let e=t.custom_fields;return this._config.visible_custom_fields&&this._config.visible_custom_fields.length>0&&(e=e.filter(t=>this._config.visible_custom_fields.includes(t.id))),0===e.length?B``:B`
      <div class="custom-fields">
        ${e.map(t=>{const e=this._config.field_styles?.custom_fields?.[t.name]||"",i=this._config.field_icons?.custom_fields?.[t.name],a=t.name.replace(/[^a-zA-Z0-9]/g,"-");return B`
            <div class="custom-field" data-field="${a}" style="${e}">
              ${i?B`<ha-icon icon="${i}"></ha-icon>`:""}
              <span class="field-name">${t.name}:</span>
              <span class="field-value">${Dt(t)}</span>
            </div>
          `})}
      </div>
    `}_renderTaskMetadata(t){const e=this._getMetadataGrid();if(!e.fields||0===e.fields.length)return B``;const i=e.columns||xt,a=e.gap||$t,s=this._config.compact_mode?"4px 6px":a;return B`
      <div
        class="task-metadata"
        style="
          grid-template-columns: ${this._config.compact_mode?i.replace("150px","140px"):i};
          gap: ${this._config.compact_mode?s:a};
        "
      >
        ${e.fields.map(e=>this._renderMetadataField(e,t))}
      </div>
    `}_getMetadataGrid(){return this._config.metadata_grid?{columns:this._config.metadata_grid.columns||xt,gap:this._config.metadata_grid.gap||$t,fields:this._config.metadata_grid.fields}:this._buildDefaultMetadataGrid()}_buildDefaultMetadataGrid(){const t=[];return this._config.show_task_locations&&t.push({type:"location"}),(this._config.show_start_date||this._config.show_due_date)&&t.push({type:"dates"}),this._config.show_tags&&t.push({type:"tags",span:"full"}),this._config.show_assignees&&t.push({type:"assignees",span:"full"}),this._config.show_custom_fields&&t.push({type:"custom_fields",span:"full"}),{columns:xt,gap:$t,fields:t}}_renderMetadataField(t,e){const i=this._getFieldSpanStyle(t.span);if(t.type.startsWith("custom_field:")){const a=t.type.replace("custom_field:","");return this._renderSingleCustomField(e,a,i,t.label,t.always_show)}switch(t.type){case"location":return this._renderLocationField(e,i,t.always_show);case"start_date":return this._renderStartDateField(e,i,t.always_show);case"due_date":return this._renderDueDateField(e,i,t.always_show);case"dates":return this._renderDatesField(e,i,t.always_show);case"tags":return this._renderTagsField(e,i,t.always_show);case"assignees":return this._renderAssigneesField(e,i,t.always_show);case"custom_fields":return this._renderCustomFieldsField(e,i);case"status":return this._renderStatusField(e,i,t.always_show);case"priority":return this._renderPriorityField(e,i,t.always_show);default:return B``}}_getFieldSpanStyle(t){return t?"full"===t?"grid-column: 1 / -1;":"number"==typeof t?`grid-column: span ${t};`:`grid-column: ${t};`:""}_renderLocationField(t,e,i){if(!this._config.show_task_locations)return B``;const a=[];(t.space_info?.name||t.space?.name)&&a.push(t.space_info?.name||t.space.name),t.folder_info?.name&&a.push(t.folder_info.name),(t.list_info?.name||t.list?.name)&&a.push(t.list_info?.name||t.list.name);const s=i??this._config.always_show_fields?.location??!1;if(0===a.length&&!s)return B``;const o=this._config.field_icons?.location,r=o||"mdi:folder-outline",n=this._config.field_styles?.location||"",l=a.length>0?a.join(" / "):"—";return B`
      <div class="task-location" style="${e} ${n}">
        <ha-icon icon="${r}"></ha-icon>
        <span>${l}</span>
      </div>
    `}_renderStartDateField(t,e,i){if(!this._config.show_start_date)return B``;const a=i??this._config.always_show_fields?.start_date??!1;if(!t.start_date&&!a)return B``;const s=this._config.field_icons?.start_date,o=s||"mdi:calendar-start",r=this._config.field_styles?.start_date||"";return B`
      <span class="date-item start-date" style="${e} ${r}">
        <ha-icon icon="${o}"></ha-icon>
        ${t.start_date?At(t.start_date):"—"}
      </span>
    `}_renderDueDateField(t,e,i){if(!this._config.show_due_date)return B``;const a=i??this._config.always_show_fields?.due_date??!1;if(!t.due&&!a)return B``;const s=this._config.field_icons?.due_date,o=s||"mdi:calendar-end",r=this._config.field_styles?.due_date||"";return B`
      <span class="date-item due-date ${t.due?zt(t.due):""}" style="${e} ${r}">
        <ha-icon icon="${o}"></ha-icon>
        ${t.due?At(t.due):"—"}
      </span>
    `}_renderDatesField(t,e,i){const a=this._config.show_start_date,s=this._config.show_due_date;if(!a&&!s)return B``;const o=this._config.field_styles?.dates||"";return B`
      <div class="task-dates" style="${e} ${o}">
        ${a?this._renderStartDateField(t,"",i):""}
        ${s?this._renderDueDateField(t,"",i):""}
      </div>
    `}_renderTagsField(t,e,i){if(!this._config.show_tags)return B``;const a=t.tags&&t.tags.length>0,s=i??this._config.always_show_fields?.tags??!1;if(!a&&!s)return B``;const o=this._config.field_styles?.tags||"";return B`
      <div class="task-tags" style="${e} ${o}">
        ${a?t.tags.map(t=>B`
          <span
            class="tag"
            style="
              ${t.tag_bg?`background-color: ${t.tag_bg};`:""}
              ${t.tag_fg?`color: ${t.tag_fg};`:""}
            "
          >
            ${t.name}
          </span>
        `):B`<span class="no-data">—</span>`}
      </div>
    `}_renderAssigneesField(t,e,i){if(!this._config.show_assignees)return B``;const a=t.assignees&&t.assignees.length>0,s=i??this._config.always_show_fields?.assignees??!1;if(!a&&!s)return B``;const o=this._config.field_styles?.assignees||"";return B`
      <div class="task-assignees" style="${e} ${o}">
        ${a?t.assignees.map(t=>B`
          <div
            class="assignee-avatar"
            style="${t.color?`background-color: ${t.color}`:""}"
            title="${t.username}"
          >
            ${t.profilePicture?B`<img src="${t.profilePicture}" alt="${t.username}" />`:B`<span>${Et(t.username)}</span>`}
          </div>
        `):B`<span class="no-data">—</span>`}
      </div>
    `}_renderCustomFieldsField(t,e){if(!this._config.show_custom_fields)return B``;const i=this._renderCustomFields(t);return i&&0!==i.values.length?B`<div style="${e}">${i}</div>`:B``}_renderStatusField(t,e,i){if(!this._config.show_status)return B``;const a=i??this._config.always_show_fields?.status??!1;if(!t.clickup_status&&!a)return B``;const s=this._config.field_styles?.status||"",o=t.clickup_status?.color||"#d3d3d3",r=t.clickup_status?.status||"—";return B`
      <span
        class="status-badge"
        style="--status-color: ${o}; ${e} ${s}"
      >
        ${r}
      </span>
    `}_renderPriorityField(t,e,i){if(!this._config.show_priority)return B``;const a=null!==t.priority&&void 0!==t.priority,s=i??this._config.always_show_fields?.priority??!1;if(!a&&!s)return B``;const o=t.priority??null,r=this._config.field_icons?.priority,n=r||vt[o]||vt.null,l=bt[o]||bt.null,c=this._config.field_styles?.priority||"";return B`
      <ha-icon
        class="priority-icon"
        icon="${n}"
        style="color: ${l}; ${e} ${c}"
      ></ha-icon>
    `}_renderSingleCustomField(t,e,i,a,s){const o=t.custom_fields?.find(t=>t.id===e);if(!o&&!(s??!1))return B``;const r=this._config.field_styles?.custom_fields?.[o?.name||""]||"",n=this._config.field_icons?.custom_fields?.[o?.name||""],l=(o?.name||e).replace(/[^a-zA-Z0-9]/g,"-");return B`
      <div class="custom-field" data-field="${l}" style="${i} ${r}">
        ${n?B`<ha-icon icon="${n}"></ha-icon>`:""}
        <span class="field-name">${a||o?.name||e}:</span>
        <span class="field-value">${o?Dt(o):"—"}</span>
      </div>
    `}_renderTaskLocation(t){if(!this._config.show_task_locations)return B``;const e=[];if((t.space_info?.name||t.space?.name)&&e.push(t.space_info?.name||t.space.name),t.folder_info?.name&&e.push(t.folder_info.name),(t.list_info?.name||t.list?.name)&&e.push(t.list_info?.name||t.list.name),0===e.length&&!this._config.always_show_fields?.location)return B``;const i=this._config.field_icons?.location,a=i||"mdi:folder-outline",s=this._config.field_styles?.location||"",o=e.length>0?e.join(" / "):"—";return B`
      <div class="task-location" style="${s}">
        <ha-icon icon="${a}"></ha-icon>
        <span>${o}</span>
      </div>
    `}async _toggleTask(t){const e="completed"===t.status?"needs_action":"completed";try{await this.hass.callService("todo","update_item",{entity_id:this._config.entity,item:t.uid,status:e})}catch(t){console.error("Error toggling task:",t)}}_openAddDialog(){this._showAddDialog=!0}_openEditDialog(t){this._editingTask=t}_renderAddDialog(){const t=this._getAvailableStatuses();return B`
      <ha-dialog
        open
        @closed=${()=>this._showAddDialog=!1}
        .heading=${"Add Task"}
      >
        <div class="dialog-content">
          <ha-textfield
            dialogInitialFocus
            label="Task Name"
            id="add-summary"
            required
            helper="What needs to be done?"
          ></ha-textfield>

          <ha-textarea
            label="Description (Optional)"
            id="add-description"
            rows="3"
            helper="Add additional details"
          ></ha-textarea>

          <ha-select
            label="Status"
            id="add-status"
          >
            ${t.map(t=>B`
              <mwc-list-item value="${t.name}">${t.name}</mwc-list-item>
            `)}
          </ha-select>

          <ha-select
            label="Priority"
            id="add-priority"
          >
            <mwc-list-item value="">No Priority</mwc-list-item>
            <mwc-list-item value="1">🔴 Urgent</mwc-list-item>
            <mwc-list-item value="2">🟠 High</mwc-list-item>
            <mwc-list-item value="3">🟡 Normal</mwc-list-item>
            <mwc-list-item value="4">⚪ Low</mwc-list-item>
          </ha-select>

          <ha-textfield
            label="Start Date (Optional)"
            id="add-start-date"
            type="date"
            helper="When to start working on this"
          ></ha-textfield>

          <ha-textfield
            label="Due Date (Optional)"
            id="add-due-date"
            type="date"
            helper="When this should be completed"
          ></ha-textfield>
        </div>

        <mwc-button slot="primaryAction" @click=${this._submitAddTask}>
          Add Task
        </mwc-button>
        <mwc-button slot="secondaryAction" dialogAction="cancel">
          Cancel
        </mwc-button>
      </ha-dialog>
    `}_renderEditDialog(){if(!this._editingTask)return B``;const t=this._editingTask,e=t.start_date?new Date("number"==typeof t.start_date?t.start_date:parseInt(t.start_date)).toISOString().split("T")[0]:"",i=t.due?new Date(t.due).toISOString().split("T")[0]:"",a=this._getAvailableStatuses();return B`
      <ha-dialog
        open
        @closed=${()=>this._editingTask=null}
        .heading=${"Edit Task"}
      >
        <div class="dialog-content">
          <ha-textfield
            dialogInitialFocus
            label="Task Name"
            id="edit-summary"
            .value=${t.summary}
            required
            helper="What needs to be done?"
          ></ha-textfield>

          <ha-textarea
            label="Description (Optional)"
            id="edit-description"
            .value=${t.description||""}
            rows="3"
            helper="Add additional details"
          ></ha-textarea>

          <ha-select
            label="Status"
            id="edit-status"
            .value=${t.clickup_status?.status||"TO DO"}
          >
            ${a.map(t=>B`
              <mwc-list-item value="${t.name}">${t.name}</mwc-list-item>
            `)}
          </ha-select>

          <ha-select
            label="Priority"
            id="edit-priority"
            .value=${t.priority?.toString()||""}
          >
            <mwc-list-item value="">No Priority</mwc-list-item>
            <mwc-list-item value="1">🔴 Urgent</mwc-list-item>
            <mwc-list-item value="2">🟠 High</mwc-list-item>
            <mwc-list-item value="3">🟡 Normal</mwc-list-item>
            <mwc-list-item value="4">⚪ Low</mwc-list-item>
          </ha-select>

          <ha-textfield
            label="Start Date (Optional)"
            id="edit-start-date"
            type="date"
            .value=${e}
            helper="When to start working on this"
          ></ha-textfield>

          <ha-textfield
            label="Due Date (Optional)"
            id="edit-due-date"
            type="date"
            .value=${i}
            helper="When this should be completed"
          ></ha-textfield>

          <div class="dialog-actions-extra">
            <mwc-button @click=${()=>this._deleteTask(t)}>
              Delete Task
            </mwc-button>
          </div>
        </div>

        <mwc-button slot="primaryAction" @click=${this._submitEditTask}>
          Save Changes
        </mwc-button>
        <mwc-button slot="secondaryAction" dialogAction="cancel">
          Cancel
        </mwc-button>
      </ha-dialog>
    `}async _submitAddTask(){const t=this.shadowRoot?.querySelector("#add-summary")?.value?.trim();if(!t)return;const e=this.shadowRoot?.querySelector("#add-description")?.value?.trim(),i=this.shadowRoot?.querySelector("#add-status")?.value,a=this.shadowRoot?.querySelector("#add-start-date")?.value,s=this.shadowRoot?.querySelector("#add-due-date")?.value,o=this.shadowRoot?.querySelector("#add-priority")?.value;try{const r={item:t};e&&(r.description=e),s&&(r.due=s),await this.hass.callService("todo","add_item",r,{entity_id:this._config.entity}),(i||o||a)&&setTimeout(async()=>{try{const e=this.hass.states[this._config.entity],s=(e?.attributes?.clickup_tasks||[]).find(e=>e.summary===t);s&&s.clickup_id&&(i&&await this.hass.callService("clickup","update_task_status",{task_id:s.clickup_id,status:i}),o&&await this.hass.callService("clickup","update_task_priority",{task_id:s.clickup_id,priority:parseInt(o)}),a&&await this.hass.callService("clickup","update_task_start_date",{task_id:s.clickup_id,start_date:new Date(a).getTime()}))}catch(t){console.error("Error updating task details:",t)}},1e3),this._showAddDialog=!1}catch(t){console.error("Error adding task:",t)}}async _submitEditTask(){if(!this._editingTask)return;const t=this.shadowRoot?.querySelector("#edit-summary")?.value?.trim();if(!t)return;const e=this.shadowRoot?.querySelector("#edit-description")?.value?.trim(),i=this.shadowRoot?.querySelector("#edit-status")?.value,a=this.shadowRoot?.querySelector("#edit-start-date")?.value,s=this.shadowRoot?.querySelector("#edit-due-date")?.value,o=this.shadowRoot?.querySelector("#edit-priority")?.value;try{const r=this._editingTask.clickup_id,n={entity_id:this._config.entity,item:this._editingTask.uid,rename:t};if(void 0!==e&&(n.description=e||null),s&&(n.due=s),await this.hass.callService("todo","update_item",n),r){i&&i!==this._editingTask.clickup_status?.status&&await this.hass.callService("clickup","update_task_status",{task_id:r,status:i});const t=o?parseInt(o):null;t!==this._editingTask.priority&&await this.hass.callService("clickup","update_task_priority",{task_id:r,priority:t});a!==(this._editingTask.start_date?new Date("number"==typeof this._editingTask.start_date?this._editingTask.start_date:parseInt(this._editingTask.start_date)).toISOString().split("T")[0]:"")&&await this.hass.callService("clickup","update_task_start_date",{task_id:r,start_date:a?new Date(a).getTime():null})}this._editingTask=null}catch(t){console.error("Error updating task:",t)}}async _deleteTask(t){if(confirm(`Delete task "${t.summary}"?`))try{await this.hass.callService("todo","remove_item",{entity_id:this._config.entity,item:t.uid}),this._editingTask=null}catch(t){console.error("Error deleting task:",t)}}async _handleTaskNameChange(t,e){if(e===t.summary)return;const i=await async function(t,e,i,a){try{return a&&""!==a.trim()?(await t.callService("todo","update_item",{entity_id:e,item:i.uid,rename:a.trim()}),{success:!0}):{success:!1,error:"Task name cannot be empty"}}catch(t){return console.error("Error updating task name:",t),{success:!1,error:t instanceof Error?t.message:"Unknown error"}}}(this.hass,this._config.entity,t,e);i.success||console.error("Failed to update task name:",i.error)}async _handlePriorityChange(t,e){if(e===t.priority)return;const i=await async function(t,e,i){try{return e.clickup_id?null!==i&&(i<1||i>4)?{success:!1,error:"Priority must be between 1 and 4, or null"}:(await t.callService("clickup","update_task_priority",{task_id:e.clickup_id,priority:i}),{success:!0}):{success:!1,error:"Task does not have a ClickUp ID"}}catch(t){return console.error("Error updating task priority:",t),{success:!1,error:t instanceof Error?t.message:"Unknown error"}}}(this.hass,t,e);i.success||console.error("Failed to update priority:",i.error)}_getAvailableStatuses(){if(!this.hass||!this._config.entity)return[];const t=this.hass.states[this._config.entity];return t?function(t,e){const i=new Map,a=t.attributes?.available_statuses||[];return a.length>0&&a.forEach(t=>{i.set(t.status,{name:t.status,color:t.color||"#d3d3d3",type:t.type||"custom"})}),e.forEach(t=>{(t.list_info?.statuses||[]).forEach(t=>{i.has(t.status)||i.set(t.status,{name:t.status,color:t.color||"#d3d3d3",type:t.type||"custom"})})}),e.forEach(t=>{t.clickup_status?.status&&!i.has(t.clickup_status.status)&&i.set(t.clickup_status.status,{name:t.clickup_status.status,color:t.clickup_status.color||"#d3d3d3",type:t.clickup_status.type||"custom"})}),0===i.size?[{name:"TO DO",color:"#d3d3d3",type:"open"},{name:"IN PROGRESS",color:"#4194f6",type:"custom"},{name:"IN REVIEW",color:"#f6c342",type:"custom"},{name:"COMPLETE",color:"#6bc950",type:"closed"},{name:"BLOCKED",color:"#f50000",type:"custom"}]:Array.from(i.values()).sort((t,e)=>t.name.localeCompare(e.name))}(t,this._tasks):[]}async _handleStatusChange(t,e){if(e?.name===t.clickup_status?.status)return;const i=await Ot(this.hass,t,e.name);i.success||console.error("Failed to update status:",i.error)}async _handleDueDateChange(t,e){const i=await async function(t,e,i,a){try{let s=null;return a&&(s=a instanceof Date?a.toISOString().split("T")[0]:a),await t.callService("todo","update_item",{entity_id:e,item:i.uid,due:s}),{success:!0}}catch(t){return console.error("Error updating task due date:",t),{success:!1,error:t instanceof Error?t.message:"Unknown error"}}}(this.hass,this._config.entity,t,e);i.success||console.error("Failed to update due date:",i.error)}async _handleStartDateChange(t,e){const i=await async function(t,e,i){try{if(!e.clickup_id)return{success:!1,error:"Task does not have a ClickUp ID"};let a=null;return i&&(a=i instanceof Date?i.getTime():"string"==typeof i?new Date(i).getTime():i),await t.callService("clickup","update_task_start_date",{task_id:e.clickup_id,start_date:a}),{success:!0}}catch(t){return console.error("Error updating task start date:",t),{success:!1,error:t instanceof Error?t.message:"Unknown error"}}}(this.hass,t,e);i.success||console.error("Failed to update start date:",i.error)}async _handleAssigneesChange(t,e){const i=e.map(t=>t.id),a=await async function(t,e,i){try{return e.clickup_id?(await t.callService("clickup","update_task_assignees",{task_id:e.clickup_id,assignees:i}),{success:!0}):{success:!1,error:"Task does not have a ClickUp ID"}}catch(t){return console.error("Error updating task assignees:",t),{success:!1,error:t instanceof Error?t.message:"Unknown error"}}}(this.hass,t,i);a.success||console.error("Failed to update assignees:",a.error)}async _handleTagsChange(t,e){const i=e.map(t=>t.name),a=await async function(t,e,i){try{return e.clickup_id?(await t.callService("clickup","update_task_tags",{task_id:e.clickup_id,tags:i}),{success:!0}):{success:!1,error:"Task does not have a ClickUp ID"}}catch(t){return console.error("Error updating task tags:",t),{success:!1,error:t instanceof Error?t.message:"Unknown error"}}}(this.hass,t,i);a.success||console.error("Failed to update tags:",a.error)}_getAvailableAssignees(){const t=new Map;return this._tasks.forEach(e=>{e.assignees&&e.assignees.forEach(e=>{t.has(e.id)||t.set(e.id,e)})}),Array.from(t.values())}_toggleSelection(t){this._selectedTasks.has(t)?this._selectedTasks.delete(t):this._selectedTasks.add(t),this.requestUpdate(),this._selectionMode=this._selectedTasks.size>0}_selectAll(){this._tasks.forEach(t=>{this._selectedTasks.add(t.uid)}),this._selectionMode=!0,this.requestUpdate()}_clearSelection(){this._selectedTasks.clear(),this._selectionMode=!1,this.requestUpdate()}async _bulkUpdateStatus(t){const e=this._tasks.filter(t=>this._selectedTasks.has(t.uid));for(const i of e){const e=await Ot(this.hass,i,t);e.success||console.error("Failed to update status:",e.error)}this._clearSelection()}async _bulkDelete(){if(!confirm(`Delete ${this._selectedTasks.size} tasks?`))return;const t=this._tasks.filter(t=>this._selectedTasks.has(t.uid));for(const e of t)try{await this.hass.callService("todo","remove_item",{entity_id:this._config.entity,item:e.uid})}catch(t){console.error("Error deleting task:",t)}this._clearSelection()}_handleDragStart(t){this._draggedTask=t}_handleDragEnd(){this._draggedTask=null,this._dragOverTask=null}_handleDragOver(t,e){t.preventDefault(),this._draggedTask&&this._draggedTask.uid!==e.uid&&(this._dragOverTask=e.uid)}_handleDragLeave(){this._dragOverTask=null}_handleDrop(t,e){if(t.preventDefault(),!this._draggedTask||this._draggedTask.uid===e.uid)return void(this._dragOverTask=null);const i=[...this._displayedTasks],a=i.findIndex(t=>t.uid===this._draggedTask.uid),s=i.findIndex(t=>t.uid===e.uid);if(-1===a||-1===s)return void(this._dragOverTask=null);i.splice(a,1),i.splice(s,0,this._draggedTask);const o=new Set(i.map(t=>t.uid)),r=this._tasks.filter(t=>!o.has(t.uid)),n=[...i,...r],l=n.map(t=>t.uid);!function(t,e){try{const i=Ft(t);localStorage.setItem(i,JSON.stringify(e))}catch(t){console.error("Error saving custom order:",t)}}(this._config.entity,l),"custom"!==this._config.sort_by&&(this._config={...this._config,sort_by:"custom"},mt(this,"config-changed",{config:this._config})),this._tasks=n,this._displayedTasks=i,this._dragOverTask=null,console.log("Task reordered and saved:",{task:this._draggedTask.summary,from:a,to:s,totalTasks:n.length,displayedTasks:i.length})}static get styles(){return It}}t([pt({attribute:!1})],Rt.prototype,"hass",void 0),t([ut()],Rt.prototype,"_config",void 0),t([ut()],Rt.prototype,"_tasks",void 0),t([ut()],Rt.prototype,"_displayedTasks",void 0),t([ut()],Rt.prototype,"_editingTask",void 0),t([ut()],Rt.prototype,"_showAddDialog",void 0),t([ut()],Rt.prototype,"_selectedTasks",void 0),t([ut()],Rt.prototype,"_selectionMode",void 0),t([ut()],Rt.prototype,"_draggedTask",void 0),t([ut()],Rt.prototype,"_dragOverTask",void 0),customElements.get("clickup-todo-card")||(customElements.define("clickup-todo-card",Rt),console.log("ClickUp Todo Card: Manually registered custom element")),window.customCards=window.customCards||[],window.customCards.push({type:"clickup-todo-card",name:"ClickUp Todo Card",description:"Enhanced todo card with ClickUp custom fields and filters",preview:!0,documentationURL:"https://github.com/chbarnhouse/clickup-todo-card"}),console.log("ClickUp Todo Card: Registered in customCards array");class Bt extends nt{constructor(){super(),this._config={type:"custom:clickup-todo-card",entity:""},this._tasks=[],this._selectedTab=0,console.log("ClickUp Card Editor: Constructor called")}connectedCallback(){super.connectedCallback()}setConfig(t){this._config={type:"custom:clickup-todo-card",entity:"",...t},this._loadEntityData()}_loadEntityData(){if(!this.hass||!this._config.entity)return;const t=this.hass.states[this._config.entity];t&&(this._tasks=kt(t))}render(){try{if(!this.hass)return B`<div>Loading hass...</div>`;if(!this._config)return B`<div>Loading config...</div>`;const t=this._tasks.length>0?function(t){const e=new Map;return t.forEach(t=>{t.clickup_status?.status&&e.set(t.clickup_status.status,t.clickup_status.status)}),Array.from(e.entries()).map(([t,e])=>({value:t,label:e})).sort((t,e)=>t.label.localeCompare(e.label))}(this._tasks):[],e=this._tasks.length>0?function(t){const e=new Set;return t.forEach(t=>{t.tags?.forEach(t=>{t.name&&e.add(t.name)})}),Array.from(e).map(t=>({value:t,label:t})).sort((t,e)=>t.label.localeCompare(e.label))}(this._tasks):[],i=this._tasks.length>0?function(t){const e=new Map;return t.forEach(t=>{t.assignees?.forEach(t=>{t.id&&t.username&&e.set(t.id.toString(),t.username)})}),Array.from(e.entries()).map(([t,e])=>({value:t,label:e})).sort((t,e)=>t.label.localeCompare(e.label))}(this._tasks):[],a=this._tasks.length>0?wt(this._tasks):[];return B`
      <div class="card-config">
        <div class="tabs">
          <button
            class="tab ${0===this._selectedTab?"active":""}"
            @click=${()=>this._selectTab(0)}
          >
            Config
          </button>
          <button
            class="tab ${1===this._selectedTab?"active":""}"
            @click=${()=>this._selectTab(1)}
          >
            Fields
          </button>
          <button
            class="tab ${2===this._selectedTab?"active":""}"
            @click=${()=>this._selectTab(2)}
          >
            Appearance
          </button>
          <button
            class="tab ${3===this._selectedTab?"active":""}"
            @click=${()=>this._selectTab(3)}
          >
            Filters
          </button>
          <button
            class="tab ${4===this._selectedTab?"active":""}"
            @click=${()=>this._selectTab(4)}
          >
            Sort & Group
          </button>
        </div>

        <div class="tab-content">
          ${0===this._selectedTab?this._renderConfigTab():""}
          ${1===this._selectedTab?this._renderVisibilityTab(a):""}
          ${2===this._selectedTab?this._renderLayoutTab():""}
          ${3===this._selectedTab?this._renderFiltersTab(t,e,i):""}
          ${4===this._selectedTab?this._renderSortGroupTab(a):""}
        </div>
      </div>
    `}catch(t){return console.error("Error rendering ClickUp Todo Card editor:",t),B`
        <div class="card-config">
          <div class="warning">
            Error loading editor. Please check the console for details.
          </div>
        </div>
      `}}_selectTab(t){this._selectedTab=t}_renderConfigTab(){return B`
      <div class="tab-panel">
        <div class="config-section">
          <h3>Data Source</h3>
          <p class="hint">Select the ClickUp entity to display tasks from</p>

          <ha-selector
            .hass=${this.hass}
            .selector=${{entity:{domain:["todo"]}}}
            .value=${this._config.entity}
            .label=${"ClickUp Entity (required)"}
            .required=${!0}
            @value-changed=${t=>this._entityChanged(t.detail.value)}
          ></ha-selector>
        </div>

        <div class="config-section">
          <h3>Card Display</h3>
          <p class="hint">Customize the card's appearance and behavior</p>

          <ha-textfield
            label="Card Title"
            .configValue=${"title"}
            .value=${this._config.title||""}
            @input=${this._valueChanged}
            helper="Override the entity's friendly name (leave empty to use entity name)"
          ></ha-textfield>

          <ha-formfield .label=${"Compact Mode"}>
            <ha-switch
              .checked=${!0===this._config.compact_mode}
              .configValue=${"compact_mode"}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>
          <p class="hint">Reduces padding and spacing for a denser task list</p>

          <ha-textfield
            label="Fixed Height (pixels)"
            type="number"
            .configValue=${"fixed_height"}
            .value=${this._config.fixed_height||""}
            @input=${this._valueChanged}
            helper="Set a fixed height to enable scrolling (leave empty for auto-height)"
          ></ha-textfield>

          <ha-textfield
            label="Hide Completed After (hours)"
            type="number"
            min="0"
            .configValue=${"hide_completed_after"}
            .value=${void 0!==this._config.hide_completed_after?this._config.hide_completed_after:""}
            @input=${this._valueChanged}
            helper="Hide completed tasks after X hours (0 = never hide, leave empty = show all completed)"
          ></ha-textfield>
        </div>
      </div>
    `}_renderVisibilityTab(t){const e=void 0!==this._config.metadata_grid;return B`
      <div class="tab-panel">
        <div class="info-box">
          <ha-icon icon="mdi:information-outline"></ha-icon>
          <div>
            <strong>Field Layout System</strong>
            <p>Control which fields appear on tasks and how they're arranged. Enable custom layout for full control, or use quick toggles for simple configuration.</p>
          </div>
        </div>

        <div class="config-section">
          <div class="section-header">
            <h3>Custom Field Layout</h3>
            <ha-switch
              .checked=${e}
              @change=${this._toggleMetadataGrid}
            ></ha-switch>
          </div>
          <p class="hint">Enable to customize field order, grouping, and width. Disable to use simple toggles.</p>

          ${e?B`
            <div class="metadata-grid-config">
              <ha-textfield
                label="Grid Columns"
                .value=${this._config.metadata_grid.columns||"repeat(auto-fit, minmax(150px, 1fr))"}
                @input=${t=>this._metadataGridPropertyChanged("columns",t.target.value)}
                helper="CSS grid-template-columns value"
              ></ha-textfield>

              <ha-textfield
                label="Grid Gap"
                .value=${this._config.metadata_grid.gap||"6px 8px"}
                @input=${t=>this._metadataGridPropertyChanged("gap",t.target.value)}
                helper="CSS gap value (row column)"
              ></ha-textfield>

              <div class="field-list">
                <label>Fields (use arrows to reorder)</label>
                ${this._config.metadata_grid.fields?.map((t,e)=>this._renderMetadataFieldRow(t,e))}
              </div>

              <mwc-button @click=${this._addMetadataField}>
                <ha-icon icon="mdi:plus"></ha-icon>
                Add Field
              </mwc-button>
            </div>
          `:B`
            <div class="quick-toggles">
              <p class="hint">Quick toggles - enable the fields you want to show:</p>

              <div class="toggle-grid">
                <ha-formfield .label=${"Task Location"}>
                  <ha-switch
                    .checked=${!0===this._config.show_task_locations}
                    .configValue=${"show_task_locations"}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>

                <ha-formfield .label=${"Start Date"}>
                  <ha-switch
                    .checked=${!1!==this._config.show_start_date}
                    .configValue=${"show_start_date"}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>

                <ha-formfield .label=${"Due Date"}>
                  <ha-switch
                    .checked=${!1!==this._config.show_due_date}
                    .configValue=${"show_due_date"}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>

                <ha-formfield .label=${"Priority"}>
                  <ha-switch
                    .checked=${!1!==this._config.show_priority}
                    .configValue=${"show_priority"}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>

                <ha-formfield .label=${"ClickUp Status"}>
                  <ha-switch
                    .checked=${!0===this._config.show_status}
                    .configValue=${"show_status"}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>

                <ha-formfield .label=${"Tags"}>
                  <ha-switch
                    .checked=${!1!==this._config.show_tags}
                    .configValue=${"show_tags"}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>

                <ha-formfield .label=${"Assignees"}>
                  <ha-switch
                    .checked=${!1!==this._config.show_assignees}
                    .configValue=${"show_assignees"}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>

                <ha-formfield .label=${"Custom Fields"}>
                  <ha-switch
                    .checked=${!0===this._config.show_custom_fields}
                    .configValue=${"show_custom_fields"}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
              </div>
            </div>

            <div class="config-section">
              <h3>Always Show Fields</h3>
              <p class="hint">Show these fields even when tasks don't have data for them</p>

              <div class="toggle-grid">
                <ha-formfield .label=${"Start Date"}>
                  <ha-switch
                    .checked=${!0===this._config.always_show_fields?.start_date}
                    @change=${t=>this._updateAlwaysShowField("start_date",t.target.checked)}
                  ></ha-switch>
                </ha-formfield>

                <ha-formfield .label=${"Due Date"}>
                  <ha-switch
                    .checked=${!0===this._config.always_show_fields?.due_date}
                    @change=${t=>this._updateAlwaysShowField("due_date",t.target.checked)}
                  ></ha-switch>
                </ha-formfield>

                <ha-formfield .label=${"Priority"}>
                  <ha-switch
                    .checked=${!0===this._config.always_show_fields?.priority}
                    @change=${t=>this._updateAlwaysShowField("priority",t.target.checked)}
                  ></ha-switch>
                </ha-formfield>

                <ha-formfield .label=${"ClickUp Status"}>
                  <ha-switch
                    .checked=${!0===this._config.always_show_fields?.status}
                    @change=${t=>this._updateAlwaysShowField("status",t.target.checked)}
                  ></ha-switch>
                </ha-formfield>

                <ha-formfield .label=${"Tags"}>
                  <ha-switch
                    .checked=${!0===this._config.always_show_fields?.tags}
                    @change=${t=>this._updateAlwaysShowField("tags",t.target.checked)}
                  ></ha-switch>
                </ha-formfield>

                <ha-formfield .label=${"Assignees"}>
                  <ha-switch
                    .checked=${!0===this._config.always_show_fields?.assignees}
                    @change=${t=>this._updateAlwaysShowField("assignees",t.target.checked)}
                  ></ha-switch>
                </ha-formfield>

                <ha-formfield .label=${"Location"}>
                  <ha-switch
                    .checked=${!0===this._config.always_show_fields?.location}
                    @change=${t=>this._updateAlwaysShowField("location",t.target.checked)}
                  ></ha-switch>
                </ha-formfield>
              </div>
            </div>
          `}

          <div class="config-section">
            <h3>Field Customization</h3>
            <p class="hint">Customize icons and styles for visible fields</p>

            ${this._renderFieldCustomization()}
          </div>
        </div>
      </div>
    `}_renderLayoutTab(){return B`
      <div class="tab-panel">
        <div class="config-section">
          <h3>Header Display</h3>
          <p class="hint">Control what appears in the card header</p>

          <ha-formfield .label=${"Hide Entire Header"}>
            <ha-switch
              .checked=${!0===this._config.hide_header}
              .configValue=${"hide_header"}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

          ${this._config.hide_header?"":B`
            <ha-formfield .label=${"Hide Title"}>
              <ha-switch
                .checked=${!0===this._config.hide_title}
                .configValue=${"hide_title"}
                @change=${this._valueChanged}
              ></ha-switch>
            </ha-formfield>

            <ha-formfield .label=${"Show Task Count"}>
              <ha-switch
                .checked=${!1!==this._config.show_task_count}
                .configValue=${"show_task_count"}
                @change=${this._valueChanged}
              ></ha-switch>
            </ha-formfield>
          `}
        </div>

        <div class="config-section">
          <h3>Add Task Button</h3>
          <p class="hint">Configure the button for adding new tasks</p>

          <ha-textfield
            label="Button Text"
            .configValue=${"add_button_text"}
            .value=${void 0!==this._config.add_button_text?this._config.add_button_text:"Add Task"}
            @input=${this._valueChanged}
            helper="Leave empty for icon only"
          ></ha-textfield>

          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{options:[{value:"bottom-left",label:"Bottom Left"},{value:"bottom-center",label:"Bottom Center"},{value:"bottom-right",label:"Bottom Right"},{value:"top-left",label:"Top Left"},{value:"top-center",label:"Top Center"},{value:"top-right",label:"Top Right"}]}}}
            .value=${this._config.add_button_position||"bottom-right"}
            .label=${"Button Position"}
            @value-changed=${t=>this._updateConfig("add_button_position",t.detail.value)}
          ></ha-selector>

          <ha-formfield .label=${"Overlay Button (float over content)"}>
            <ha-switch
              .checked=${!1!==this._config.add_button_overlay}
              .configValue=${"add_button_overlay"}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>
        </div>

        <div class="config-section">
          <h3>Interactive Controls</h3>
          <p class="hint">Show user controls in the card for sorting and filtering</p>

          <ha-formfield .label=${"Show Sort Controls"}>
            <ha-switch
              .checked=${!0===this._config.show_sort_controls}
              .configValue=${"show_sort_controls"}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${"Show Filter Controls"}>
            <ha-switch
              .checked=${!0===this._config.show_filter_controls}
              .configValue=${"show_filter_controls"}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>
        </div>
      </div>
    `}_renderFiltersTab(t,e,i){return B`
      <div class="tab-panel">
        ${t.length>0?B`
          <div class="config-section">
            <h3>Status Filters</h3>
            <p class="hint">Select which statuses to show</p>
            ${t.map(t=>B`
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

        <div class="config-section">
          <h3>Priority Filters</h3>
          <p class="hint">Select which priorities to show</p>

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

        ${e.length>0?B`
          <div class="config-section">
            <h3>Tag Filters</h3>
            <p class="hint">Select which tags to show</p>
            ${e.map(t=>B`
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

        ${i.length>0?B`
          <div class="config-section">
            <h3>Assignee Filters</h3>
            <p class="hint">Select which assignees to show</p>
            ${i.map(t=>B`
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

        <div class="config-section">
          <h3>Due Date Range</h3>
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
    `}_renderSortGroupTab(t){return B`
      <div class="tab-panel">
        <div class="config-section">
          <h3>Sorting</h3>

          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{mode:"dropdown",options:[{value:"due_date",label:"Due Date"},{value:"start_date",label:"Start Date"},{value:"priority",label:"Priority"},{value:"name",label:"Name"},{value:"status",label:"Status"},{value:"custom",label:"Custom Order (drag & drop)"}]}}}
            .value=${this._config.sort_by||"due_date"}
            .label=${"Sort By"}
            @value-changed=${t=>this._updateConfig("sort_by",t.detail.value)}
          ></ha-selector>

          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{mode:"dropdown",options:[{value:"asc",label:"Ascending"},{value:"desc",label:"Descending"}]}}}
            .value=${this._config.sort_order||"asc"}
            .label=${"Sort Order"}
            @value-changed=${t=>this._updateConfig("sort_order",t.detail.value)}
          ></ha-selector>
        </div>

        <div class="config-section">
          <h3>Grouping</h3>

          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{options:[{value:"none",label:"None"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"assignee",label:"Assignee"},{value:"list",label:"List"},{value:"custom_field",label:"Custom Field"}]}}}
            .value=${this._config.group_by||"none"}
            .label=${"Group By"}
            @value-changed=${t=>this._updateConfig("group_by",t.detail.value)}
          ></ha-selector>

          ${"custom_field"===this._config.group_by&&t.length>0?B`
            <ha-selector
              .hass=${this.hass}
              .selector=${{select:{options:t.map(t=>({value:t.value,label:t.label}))}}}
              .value=${this._config.group_field_id||""}
              .label=${"Custom Field for Grouping"}
              @value-changed=${t=>this._updateConfig("group_field_id",t.detail.value)}
            ></ha-selector>
          `:""}
        </div>
      </div>
    `}_renderFieldCustomization(){const t=this._config.field_styles||{},e=this._config.field_icons||{},i=this._getVisibleFieldTypes(),a=[{key:"priority",label:"Priority",defaultIcon:"mdi:flag"},{key:"status",label:"Status",defaultIcon:"mdi:circle"},{key:"start_date",label:"Start Date",defaultIcon:"mdi:calendar-start"},{key:"due_date",label:"Due Date",defaultIcon:"mdi:calendar-end"},{key:"dates",label:"Dates (Start + Due)",defaultIcon:"mdi:calendar-range"},{key:"tags",label:"Tags",defaultIcon:"mdi:tag-multiple"},{key:"assignees",label:"Assignees",defaultIcon:"mdi:account-multiple"},{key:"location",label:"Location",defaultIcon:"mdi:folder-outline"}],s=this._tasks.length>0?wt(this._tasks):[],o=[];return o.push({key:"task_name",label:"Task Name",defaultIcon:"",noIcon:!0}),this._config.show_status&&o.push({key:"status_pill",label:"Status Pill",defaultIcon:"",noIcon:!0}),i.forEach(t=>{if(t.startsWith("custom_field:")){const e=t.replace("custom_field:",""),i=s.find(t=>t.value===e);i&&o.push({key:`custom_fields.${e}`,label:`Custom: ${i.label}`,defaultIcon:"mdi:form-textbox",isCustomField:!0})}else{const e=a.find(e=>e.key===t);e&&o.push(e)}}),B`
      <div class="field-customization-list">
        ${o.map(i=>{let a,o;if(i.isCustomField){const r=i.key.replace("custom_fields.",""),n=s.find(t=>t.value===r);a=e.custom_fields?.[n?.label||""]||i.defaultIcon,o=t.custom_fields?.[n?.label||""]||""}else a=e[i.key]||i.defaultIcon,o=t[i.key]||"";return B`
            <details class="field-custom-details">
              <summary class="field-custom-summary">
                ${i.label}
                ${a!==i.defaultIcon||o?B`<span class="customized-indicator">●</span>`:""}
              </summary>
              <div class="field-custom-content">
                ${i.noIcon?"":B`
                  <ha-icon-picker
                    .hass=${this.hass}
                    .value=${a}
                    .label=${"Icon (default: "+i.defaultIcon+")"}
                    @value-changed=${t=>{if(i.isCustomField){const e=i.key.replace("custom_fields.",""),a=s.find(t=>t.value===e);this._updateCustomFieldIcon(a?.label||"",t.detail.value)}else this._updateFieldIcon(i.key,t.detail.value)}}
                  ></ha-icon-picker>
                `}

                <ha-textfield
                  label="Custom CSS"
                  .value=${o}
                  @input=${t=>{if(i.isCustomField){const e=i.key.replace("custom_fields.",""),a=s.find(t=>t.value===e);this._updateCustomFieldStyle(a?.label||"",t.target.value)}else this._updateFieldStyle(i.key,t.target.value)}}
                  helper="Leave empty to use default styling"
                ></ha-textfield>
              </div>
            </details>
          `})}
      </div>
    `}_renderCustomFieldCustomization(t){const e=this._config.field_styles?.custom_fields||{},i=this._config.field_icons?.custom_fields||{};return B`
      <div class="field-customization-list">
        ${t.map(t=>{const a=i[t.label]||"",s=e[t.label]||"";return B`
            <details class="field-custom-details">
              <summary class="field-custom-summary">
                ${t.label}
                ${a||s?B`<span class="customized-indicator">●</span>`:""}
              </summary>
              <div class="field-custom-content">
                <ha-icon-picker
                  .hass=${this.hass}
                  .value=${a}
                  .label=${"Icon"}
                  @value-changed=${e=>this._updateCustomFieldIcon(t.label,e.detail.value)}
                ></ha-icon-picker>

                <ha-textfield
                  label="Custom CSS"
                  .value=${s}
                  @input=${e=>this._updateCustomFieldStyle(t.label,e.target.value)}
                  helper="Leave empty to use default styling"
                ></ha-textfield>
              </div>
            </details>
          `})}
      </div>
    `}_renderStylingTab(t){const e=this._config.field_styles||{},i=this._config.field_icons||{};return B`
      <div class="tab-panel">
        <div class="info-box">
          <ha-icon icon="mdi:palette"></ha-icon>
          <div>
            <strong>Field Customization</strong>
            <p>Customize the appearance of each field type with custom CSS styles and icons.</p>
          </div>
        </div>

        <div class="config-section">
          <h3>Custom Icons</h3>
          <p class="hint">Set custom Material Design Icons for each field type</p>

          <div class="field-customization-grid">
            <div class="field-custom-item">
              <label>Status Icon</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${i.status||""}
                .label=${"Icon"}
                @value-changed=${t=>this._updateFieldIcon("status",t.detail.value)}
              ></ha-icon-picker>
            </div>

            <div class="field-custom-item">
              <label>Priority Icon</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${i.priority||""}
                .label=${"Icon"}
                @value-changed=${t=>this._updateFieldIcon("priority",t.detail.value)}
              ></ha-icon-picker>
            </div>

            <div class="field-custom-item">
              <label>Due Date Icon</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${i.due_date||""}
                .label=${"Icon"}
                @value-changed=${t=>this._updateFieldIcon("due_date",t.detail.value)}
              ></ha-icon-picker>
            </div>

            <div class="field-custom-item">
              <label>Start Date Icon</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${i.start_date||""}
                .label=${"Icon"}
                @value-changed=${t=>this._updateFieldIcon("start_date",t.detail.value)}
              ></ha-icon-picker>
            </div>

            <div class="field-custom-item">
              <label>Tags Icon</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${i.tags||""}
                .label=${"Icon"}
                @value-changed=${t=>this._updateFieldIcon("tags",t.detail.value)}
              ></ha-icon-picker>
            </div>

            <div class="field-custom-item">
              <label>Assignees Icon</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${i.assignees||""}
                .label=${"Icon"}
                @value-changed=${t=>this._updateFieldIcon("assignees",t.detail.value)}
              ></ha-icon-picker>
            </div>

            <div class="field-custom-item">
              <label>Location Icon</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${i.location||""}
                .label=${"Icon"}
                @value-changed=${t=>this._updateFieldIcon("location",t.detail.value)}
              ></ha-icon-picker>
            </div>
          </div>
        </div>

        <div class="config-section">
          <h3>Custom Styles (CSS)</h3>
          <p class="hint">Enter custom CSS to style each field type (e.g., "color: red; font-weight: bold;")</p>

          <ha-textfield
            label="Status Style"
            .value=${e.status||""}
            @change=${t=>this._updateFieldStyle("status",t.target.value)}
            helper="Custom CSS for status field"
          ></ha-textfield>

          <ha-textfield
            label="Priority Style"
            .value=${e.priority||""}
            @change=${t=>this._updateFieldStyle("priority",t.target.value)}
            helper="Custom CSS for priority field"
          ></ha-textfield>

          <ha-textfield
            label="Due Date Style"
            .value=${e.due_date||""}
            @change=${t=>this._updateFieldStyle("due_date",t.target.value)}
            helper="Custom CSS for due date field"
          ></ha-textfield>

          <ha-textfield
            label="Start Date Style"
            .value=${e.start_date||""}
            @change=${t=>this._updateFieldStyle("start_date",t.target.value)}
            helper="Custom CSS for start date field"
          ></ha-textfield>

          <ha-textfield
            label="Tags Style"
            .value=${e.tags||""}
            @change=${t=>this._updateFieldStyle("tags",t.target.value)}
            helper="Custom CSS for tags field"
          ></ha-textfield>

          <ha-textfield
            label="Assignees Style"
            .value=${e.assignees||""}
            @change=${t=>this._updateFieldStyle("assignees",t.target.value)}
            helper="Custom CSS for assignees field"
          ></ha-textfield>

          <ha-textfield
            label="Location Style"
            .value=${e.location||""}
            @change=${t=>this._updateFieldStyle("location",t.target.value)}
            helper="Custom CSS for location field"
          ></ha-textfield>
        </div>
      </div>
    `}_updateFieldStyle(t,e){if(!this._config)return;const i={...this._config.field_styles||{}};e?i[t]=e:delete i[t],this._updateConfig("field_styles",Object.keys(i).length>0?i:{})}_updateFieldIcon(t,e){if(!this._config)return;const i={...this._config.field_icons||{}};e?i[t]=e:delete i[t],this._updateConfig("field_icons",Object.keys(i).length>0?i:{})}_updateAlwaysShowField(t,e){if(!this._config)return;const i={...this._config.always_show_fields||{}};e?i[t]=!0:delete i[t],this._updateConfig("always_show_fields",Object.keys(i).length>0?i:void 0)}_updateCustomFieldStyle(t,e){if(!this._config)return;const i={...this._config.field_styles||{}},a={...i.custom_fields||{}};e?a[t]=e:delete a[t],Object.keys(a).length>0?i.custom_fields=a:delete i.custom_fields,this._updateConfig("field_styles",Object.keys(i).length>0?i:{})}_updateCustomFieldIcon(t,e){if(!this._config)return;const i={...this._config.field_icons||{}},a={...i.custom_fields||{}};e?a[t]=e:delete a[t],Object.keys(a).length>0?i.custom_fields=a:delete i.custom_fields,this._updateConfig("field_icons",Object.keys(i).length>0?i:{})}_valueChanged(t){if(!this._config||!this.hass)return;const e=t.target,i=e.configValue;if(!i)return;let a;if(void 0!==e.checked)a=e.checked;else{if(void 0===e.value)return;a=e.value}""===a&&"add_button_text"!==i&&(a=void 0),"fixed_height"===i&&void 0!==a&&(a=parseInt(a,10),isNaN(a)&&(a=void 0));const s={...this._config,[i]:a};"entity"===i&&setTimeout(()=>this._loadEntityData(),100),mt(this,"config-changed",{config:s})}_selectChanged(t){if(!this._config||!this.hass)return;const e=t.target;if(!e)return void console.log("No target element in select change event");const i=e.configValue;i?setTimeout(()=>{let t=e.value;if(null==t&&e&&"number"==typeof e.selected)try{const i=(e.querySelectorAll?Array.from(e.querySelectorAll("mwc-list-item")):[])[e.selected];i&&(t=i.value||i.getAttribute("value"))}catch(t){console.log("Error querying list items",t)}if(null==t)return void console.log("Could not determine dropdown value",{target:e,configValue:i,targetValue:e?.value,targetSelected:e?.selected});const a=""===t?void 0:t,s={...this._config,[i]:a};console.log("Updating config:",{configValue:i,value:a}),mt(this,"config-changed",{config:s}),this.requestUpdate(),this._config=s},50):console.log("No configValue on target",e)}_updateConfig(t,e){if(console.log("_updateConfig called:",{key:t,value:e,hasConfig:!!this._config}),!this._config)return;const i={...this._config,[t]:""===e?void 0:e};console.log("New config:",i),this._config=i,mt(this,"config-changed",{config:i}),console.log("Config updated and event fired")}_entityChanged(t){if(!this._config||t===this._config.entity)return;const e={...this._config,entity:t};this._config=e,this._loadEntityData(),mt(this,"config-changed",{config:e})}_getVisibleFieldTypes(){if(this._config.metadata_grid&&this._config.metadata_grid.fields)return this._config.metadata_grid.fields.map(t=>t.type);const t=[];return this._config.show_task_locations&&t.push("location"),this._config.show_start_date&&t.push("start_date"),this._config.show_due_date&&t.push("due_date"),this._config.show_priority&&t.push("priority"),this._config.show_status&&t.push("status"),this._config.show_tags&&t.push("tags"),this._config.show_assignees&&t.push("assignees"),t}_isFieldVisible(t){return!(!this._config.visible_custom_fields||0===this._config.visible_custom_fields.length)&&this._config.visible_custom_fields.includes(t)}_customFieldChanged(t){const e=t.target,i=e.value,a=e.checked,s=this._config.visible_custom_fields||[];let o;o=a?[...s,i]:s.filter(t=>t!==i);const r={...this._config,visible_custom_fields:o.length>0?o:void 0};mt(this,"config-changed",{config:r})}_isStatusFiltered(t){return this._config.filters?.status?.includes(t)||!1}_statusFilterChanged(t){const e=t.target,i=e.value,a=e.checked,s=this._config.filters||{},o=s.status||[];let r;r=a?[...o,i]:o.filter(t=>t!==i);const n={...this._config,filters:{...s,status:r.length>0?r:void 0}};mt(this,"config-changed",{config:n})}_isPriorityFiltered(t){return this._config.filters?.priority?.includes(t)||!1}_priorityFilterChanged(t){const e=t.target,i=e.value,a="null"===i?null:parseInt(i),s=e.checked,o=this._config.filters||{},r=o.priority||[];let n;n=s?[...r,a]:r.filter(t=>t!==a);const l={...this._config,filters:{...o,priority:n.length>0?n:void 0}};mt(this,"config-changed",{config:l})}_isTagFiltered(t){return this._config.filters?.tags?.includes(t)||!1}_tagFilterChanged(t){const e=t.target,i=e.value,a=e.checked,s=this._config.filters||{},o=s.tags||[];let r;r=a?[...o,i]:o.filter(t=>t!==i);const n={...this._config,filters:{...s,tags:r.length>0?r:void 0}};mt(this,"config-changed",{config:n})}_isAssigneeFiltered(t){return this._config.filters?.assignees?.includes(t)||!1}_assigneeFilterChanged(t){const e=t.target,i=e.value,a=e.checked,s=this._config.filters||{},o=s.assignees||[];let r;r=a?[...o,i]:o.filter(t=>t!==i);const n={...this._config,filters:{...s,assignees:r.length>0?r:void 0}};mt(this,"config-changed",{config:n})}_dateRangeChanged(t,e){const i=this._config.filters||{},a={...i.due_date_range||{},[t]:e||void 0},s=a.start||a.end,o={...this._config,filters:{...i,due_date_range:s?a:void 0}};mt(this,"config-changed",{config:o})}_toggleMetadataGrid(t){if(t.target.checked){const t=[];this._config.show_task_locations&&t.push({type:"location"}),(this._config.show_start_date||this._config.show_due_date)&&t.push({type:"dates"}),this._config.show_tags&&t.push({type:"tags",span:"full"}),this._config.show_assignees&&t.push({type:"assignees",span:"full"}),this._config.show_custom_fields&&t.push({type:"custom_fields",span:"full"});const e={...this._config,metadata_grid:{columns:"repeat(auto-fit, minmax(150px, 1fr))",gap:"6px 8px",fields:t}};mt(this,"config-changed",{config:e})}else{const t={...this._config};delete t.metadata_grid,mt(this,"config-changed",{config:t})}}_metadataGridPropertyChanged(t,e){if(!this._config.metadata_grid)return;const i={...this._config,metadata_grid:{...this._config.metadata_grid,[t]:e}};mt(this,"config-changed",{config:i})}_renderMetadataFieldRow(t,e){const i=[{value:"location",label:"Location"},{value:"start_date",label:"Start Date"},{value:"due_date",label:"Due Date"},{value:"dates",label:"Dates (Start + Due)"},{value:"tags",label:"Tags"},{value:"assignees",label:"Assignees"},{value:"status",label:"Status"},{value:"priority",label:"Priority"}];(this._tasks.length>0?wt(this._tasks):[]).forEach(t=>{i.push({value:`custom_field:${t.value}`,label:`Custom: ${t.label}`})});return B`
      <div class="field-row">
        <ha-icon icon="mdi:drag" class="drag-handle"></ha-icon>

        <ha-selector
          .hass=${this.hass}
          .selector=${{select:{options:i}}}
          .value=${t.type}
          @value-changed=${t=>this._metadataFieldPropertyChanged(e,"type",t.detail.value)}
        ></ha-selector>

        <ha-selector
          .hass=${this.hass}
          .selector=${{select:{options:[{value:"",label:"Auto"},{value:"full",label:"Full Width"},{value:"2",label:"Span 2"},{value:"3",label:"Span 3"}]}}}
          .value=${t.span||""}
          @value-changed=${t=>this._metadataFieldPropertyChanged(e,"span",t.detail.value)}
        ></ha-selector>

        <mwc-icon-button
          @click=${()=>this._toggleFieldAlwaysShow(e)}
          title="${t.always_show?"Always show (even when empty)":"Hide when empty"}"
          style="color: ${t.always_show?"var(--primary-color)":"var(--disabled-text-color)"}"
        >
          <ha-icon icon="${t.always_show?"mdi:eye":"mdi:eye-off"}"></ha-icon>
        </mwc-icon-button>

        <mwc-icon-button @click=${()=>this._moveMetadataField(e,-1)}>
          <ha-icon icon="mdi:arrow-up"></ha-icon>
        </mwc-icon-button>

        <mwc-icon-button @click=${()=>this._moveMetadataField(e,1)}>
          <ha-icon icon="mdi:arrow-down"></ha-icon>
        </mwc-icon-button>

        <mwc-icon-button @click=${()=>this._removeMetadataField(e)}>
          <ha-icon icon="mdi:delete"></ha-icon>
        </mwc-icon-button>
      </div>
    `}_addMetadataField(){if(!this._config.metadata_grid)return;const t={...this._config,metadata_grid:{...this._config.metadata_grid,fields:[...this._config.metadata_grid.fields||[],{type:"location"}]}};mt(this,"config-changed",{config:t})}_removeMetadataField(t){if(!this._config.metadata_grid)return;const e=[...this._config.metadata_grid.fields||[]];e.splice(t,1);const i={...this._config,metadata_grid:{...this._config.metadata_grid,fields:e}};mt(this,"config-changed",{config:i})}_moveMetadataField(t,e){if(!this._config.metadata_grid)return;const i=[...this._config.metadata_grid.fields||[]],a=t+e;if(a<0||a>=i.length)return;[i[t],i[a]]=[i[a],i[t]];const s={...this._config,metadata_grid:{...this._config.metadata_grid,fields:i}};mt(this,"config-changed",{config:s})}_toggleFieldAlwaysShow(t){if(!this._config.metadata_grid)return;const e=[...this._config.metadata_grid.fields||[]];e[t]={...e[t],always_show:!e[t].always_show};const i={...this._config,metadata_grid:{...this._config.metadata_grid,fields:e}};mt(this,"config-changed",{config:i})}_metadataFieldPropertyChanged(t,e,i){if(!this._config.metadata_grid)return;const a=[...this._config.metadata_grid.fields||[]];if("type"===e)a[t]={...a[t],type:i};else if("span"===e)if(""===i){const{span:e,...i}=a[t];a[t]=i}else a[t]={...a[t],span:i};const s={...this._config,metadata_grid:{...this._config.metadata_grid,fields:a}};mt(this,"config-changed",{config:s})}static get styles(){return r`
      .card-config {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .tabs {
        display: flex;
        border-bottom: 2px solid var(--divider-color);
        background: var(--card-background-color);
        gap: 4px;
        padding: 0 8px;
      }

      .tab {
        background: transparent;
        border: none;
        border-bottom: 2px solid transparent;
        color: var(--secondary-text-color);
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        padding: 12px 16px;
        margin-bottom: -2px;
        transition: all 0.2s ease;
        font-family: inherit;
      }

      .tab:hover {
        color: var(--primary-text-color);
        background: rgba(var(--rgb-primary-color), 0.05);
      }

      .tab.active {
        color: var(--primary-color);
        border-bottom-color: var(--primary-color);
      }

      .tab-content {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
      }

      .tab-panel {
        display: flex;
        flex-direction: column;
        gap: 16px;
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

      /* Metadata Grid Styles */
      .metadata-grid-config {
        margin-top: 16px;
        padding: 16px;
        background: var(--secondary-background-color);
        border-radius: 8px;
      }

      .field-list {
        margin: 16px 0;
      }

      .field-list > label {
        display: block;
        margin-bottom: 12px;
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .field-row {
        display: grid;
        grid-template-columns: 24px 1fr 1fr auto auto auto;
        gap: 8px;
        align-items: center;
        padding: 8px;
        margin-bottom: 8px;
        background: var(--card-background-color);
        border-radius: 8px;
        border: 1px solid var(--divider-color);
      }

      .field-row:hover {
        border-color: var(--primary-color);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .drag-handle {
        cursor: move;
        color: var(--secondary-text-color);
        --mdc-icon-size: 20px;
      }

      .field-row ha-selector {
        margin: 0;
      }

      .field-row mwc-icon-button {
        --mdc-icon-button-size: 32px;
        --mdc-icon-size: 20px;
      }

      mwc-button {
        margin-top: 12px;
      }

      /* Info Box */
      .info-box {
        display: flex;
        gap: 12px;
        padding: 12px;
        background: rgba(var(--rgb-primary-color), 0.08);
        border-left: 4px solid var(--primary-color);
        border-radius: 4px;
        margin-bottom: 16px;
      }

      .info-box ha-icon {
        color: var(--primary-color);
        --mdc-icon-size: 24px;
        margin-top: 2px;
        flex-shrink: 0;
      }

      .info-box strong {
        display: block;
        margin-bottom: 4px;
        color: var(--primary-text-color);
      }

      .info-box p {
        margin: 0;
        font-size: 13px;
        color: var(--secondary-text-color);
        line-height: 1.4;
      }

      /* Section Header with Toggle */
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }

      .section-header h3 {
        margin: 0;
      }

      /* Quick Toggles Grid */
      .quick-toggles {
        margin-top: 16px;
      }

      .toggle-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px 16px;
        margin-top: 12px;
      }

      /* Subsection */
      .subsection {
        margin-top: 16px;
        padding: 16px;
        background: var(--secondary-background-color);
        border-radius: 8px;
      }

      .subsection h4 {
        margin: 0 0 12px 0;
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .field-customization-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .field-custom-details {
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        overflow: hidden;
      }

      .field-custom-summary {
        padding: 12px 16px;
        cursor: pointer;
        list-style: none;
        font-weight: 500;
        color: var(--primary-text-color);
        background: var(--card-background-color);
        user-select: none;
        transition: background 0.2s ease;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .field-custom-summary:hover {
        background: var(--secondary-background-color);
      }

      .customized-indicator {
        color: var(--primary-color);
        font-size: 8px;
        margin-left: 8px;
      }

      .field-custom-summary::-webkit-details-marker {
        display: none;
      }

      .field-custom-content {
        padding: 16px;
        background: var(--secondary-background-color);
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
    `}}t([pt({attribute:!1})],Bt.prototype,"hass",void 0),t([ut()],Bt.prototype,"_config",void 0),t([ut()],Bt.prototype,"_tasks",void 0),t([ut()],Bt.prototype,"_helpers",void 0),t([ut()],Bt.prototype,"_selectedTab",void 0),customElements.get("clickup-todo-card-editor")||(customElements.define("clickup-todo-card-editor",Bt),console.log("ClickUp Todo Card Editor: Manually registered custom element"));var Ht=Object.freeze({__proto__:null,ClickUpTodoCardEditor:Bt});export{Rt as ClickUpTodoCard};
