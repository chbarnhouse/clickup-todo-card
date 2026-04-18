function t(t,e,i,s){var a,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var n=t.length-1;n>=0;n--)(a=t[n])&&(r=(o<3?a(r):o>3?a(e,i,r):a(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),a=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)},n=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,g=globalThis,f=g.trustedTypes,m=f?f.emptyScript:"",_=g.reactiveElementPolyfillSupport,v=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!l(t,e),$={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:a}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);a?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...h(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),a=e.litNonce;void 0!==a&&s.setAttribute("nonce",a),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const o=a.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,a){if(void 0!==t){const o=this.constructor;if(!1===s&&(a=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??b)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==a||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,_?.({ReactiveElement:w}),(g.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,k=t=>t,A=x.trustedTypes,C=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+E,D=`<${T}>`,P=document,U=()=>P.createComment(""),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,z="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,F=/>/g,H=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,V=/"/g,j=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),I=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),Y=new WeakMap,W=P.createTreeWalker(P,129);function G(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const X=(t,e)=>{const i=t.length-1,s=[];let a,o=2===e?"<svg>":3===e?"<math>":"",r=O;for(let e=0;e<i;e++){const i=t[e];let n,l,c=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===O?"!--"===l[1]?r=R:void 0!==l[1]?r=F:void 0!==l[2]?(j.test(l[2])&&(a=RegExp("</"+l[2],"g")),r=H):void 0!==l[3]&&(r=H):r===H?">"===l[0]?(r=a??O,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,n=l[1],r=void 0===l[3]?H:'"'===l[3]?V:L):r===V||r===L?r=H:r===R||r===F?r=O:(r=H,a=void 0);const h=r===H&&t[e+1].startsWith("/>")?" ":"";o+=r===O?i+D:c>=0?(s.push(n),i.slice(0,c)+S+i.slice(c)+E+h):i+E+(-2===c?e:h)}return[G(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,o=0;const r=t.length-1,n=this.parts,[l,c]=X(t,e);if(this.el=K.createElement(l,i),W.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=W.nextNode())&&n.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=c[o++],i=s.getAttribute(t).split(E),r=/([.?@])?(.*)/.exec(e);n.push({type:1,index:a,name:r[2],strings:i,ctor:"."===r[1]?et:"?"===r[1]?it:"@"===r[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(E)&&(n.push({type:6,index:a}),s.removeAttribute(t));if(j.test(s.tagName)){const t=s.textContent.split(E),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],U()),W.nextNode(),n.push({type:2,index:++a});s.append(t[e],U())}}}else if(8===s.nodeType)if(s.data===T)n.push({type:2,index:a});else{let t=-1;for(;-1!==(t=s.data.indexOf(E,t+1));)n.push({type:7,index:a}),t+=E.length-1}a++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,s){if(e===I)return e;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const o=N(e)?void 0:e._$litDirective$;return a?.constructor!==o&&(a?._$AO?.(!1),void 0===o?a=void 0:(a=new o(t),a._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(e=J(t,a._$AS(t,e.values),a,s)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??P).importNode(e,!0);W.currentNode=s;let a=W.nextNode(),o=0,r=0,n=i[0];for(;void 0!==n;){if(o===n.index){let e;2===n.type?e=new Q(a,a.nextSibling,this,t):1===n.type?e=new n.ctor(a,n.name,n.strings,this,t):6===n.type&&(e=new at(a,this,t)),this._$AV.push(e),n=i[++r]}o!==n?.index&&(a=W.nextNode(),o++)}return W.currentNode=P,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),N(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==I&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Z(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new K(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const a of t)s===e.length?e.push(i=new Q(this.O(U()),this.O(U()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,s){const a=this.strings;let o=!1;if(void 0===a)t=J(this,t,e,0),o=!N(t)||t!==this._$AH&&t!==I,o&&(this._$AH=t);else{const s=t;let r,n;for(t=a[0],r=0;r<a.length-1;r++)n=J(this,s[i+r],e,r),n===I&&(n=this._$AH[r]),o||=!N(n)||n!==this._$AH[r],n===q?t=q:t!==q&&(t+=(n??"")+a[r+1]),this._$AH[r]=n}o&&!s&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class st extends tt{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??q)===I)return;const i=this._$AH,s=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class at{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const ot=x.litHtmlPolyfillSupport;ot?.(K,Q),(x.litHtmlVersions??=[]).push("3.3.2");const rt=globalThis;class nt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let a=s._$litPart$;if(void 0===a){const t=i?.renderBefore??null;s._$litPart$=a=new Q(e.insertBefore(U(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return I}}nt._$litElement$=!0,nt.finalized=!0,rt.litElementHydrateSupport?.({LitElement:nt});const lt=rt.litElementPolyfillSupport;lt?.({LitElement:nt}),(rt.litElementVersions??=[]).push("4.2.2");const ct={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:b},dt=(t=ct,e,i)=>{const{kind:s,metadata:a}=i;let o=globalThis.litPropertyMetadata.get(a);if(void 0===o&&globalThis.litPropertyMetadata.set(a,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const a=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,a,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const a=this[s];e.call(this,i),this.requestUpdate(s,a,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ht(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){return ht({...t,state:!0,attribute:!1})}var pt,gt;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(pt||(pt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(gt||(gt={}));var ft=function(t,e,i,s){s=s||{},i=null==i?{}:i;var a=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return a.detail=i,t.dispatchEvent(a),a};const mt={1:"mdi:alert",2:"mdi:chevron-double-up",3:"mdi:equal",4:"mdi:chevron-double-down",null:"mdi:minus"},_t={1:"var(--error-color)",2:"var(--warning-color)",3:"var(--info-color)",4:"var(--disabled-text-color)",null:"var(--disabled-text-color)"},vt={hide_header:!1,hide_title:!1,show_task_count:!0,show_start_date:!1,show_due_date:!0,show_priority:!1,show_status:!1,show_tags:!1,show_assignees:!1,show_custom_fields:!1,compact_mode:!1,add_button_text:"Add Task",add_button_position:"bottom-right",sort_by:"due_date",sort_order:"asc",group_by:"none"};function yt(t){return(t.attributes.clickup_tasks||[]).map(t=>{const e="closed"===t.status?.type?"completed":"needs_action";let i,s;if(t.due_date){const e=parseInt(t.due_date);isNaN(e)||(i=new Date(e))}if(t.start_date){const e=parseInt(t.start_date);isNaN(e)||(s=e)}return{uid:t.id,summary:t.name,status:e,description:t.description||void 0,due:i,clickup_id:t.id,start_date:s,clickup_status:t.status,priority:t.priority,tags:t.tags||[],assignees:t.assignees||[],custom_fields:t.custom_fields||[],time_estimate:t.time_estimate,points:t.points,list:t.list,space:t.space}})}function bt(t,e){const i=[...t],s=e.sort_by||"due_date",a=e.sort_order||"asc";return i.sort((t,e)=>{let i=0;switch(s){case"due_date":i=$t(t.due,e.due);break;case"start_date":i=$t(t.start_date,e.start_date);break;case"priority":i=function(t,e){return null==t&&null==e?0:null==t?1:null==e?-1:t-e}(t.priority,e.priority);break;case"name":i=(t.summary||"").localeCompare(e.summary||"");break;case"status":i=function(t,e){const i=t.clickup_status?.status||"",s=e.clickup_status?.status||"",a=t.clickup_status?.type||"",o=e.clickup_status?.type||"";if(a!==o){if("open"===a)return-1;if("open"===o)return 1;if("closed"===a)return 1;if("closed"===o)return-1}return i.localeCompare(s)}(t,e);break;default:i=0}return"desc"===a?-i:i}),i}function $t(t,e){if(!t&&!e)return 0;if(!t)return 1;if(!e)return-1;return new Date(t).getTime()-new Date(e).getTime()}function wt(t,e,i){const s=new Map;return"none"===e?(s.set("all",t),s):(t.forEach(t=>{let a;switch(e){case"status":a=t.clickup_status?.status||"No Status";break;case"priority":a=function(t){if(null==t)return"No Priority";switch(t){case 1:return"Urgent";case 2:return"High";case 3:return"Normal";case 4:return"Low";default:return"Unknown"}}(t.priority);break;case"assignee":if(t.assignees&&t.assignees.length>0)return void t.assignees.forEach(e=>{const i=e.username||"Unknown";s.has(i)||s.set(i,[]),s.get(i).push(t)});a="Unassigned";break;case"list":a=t.list?.name||"No List";break;case"custom_field":if(i&&t.custom_fields){const e=t.custom_fields.find(t=>t.id===i);a=e?.value?.toString()||"No Value"}else a="Uncategorized";break;default:a="All Tasks"}s.has(a)||s.set(a,[]),s.get(a).push(t)}),s)}function xt(t){if(!t)return"";let e;if(e="number"==typeof t||"string"==typeof t?new Date(t):t,isNaN(e.getTime()))return"";const i=new Date,s=new Date(i.getFullYear(),i.getMonth(),i.getDate()),a=new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime()-s.getTime(),o=Math.ceil(a/864e5);if(0===o)return"Today";if(1===o)return"Tomorrow";if(-1===o)return"Yesterday";if(o>1&&o<=7)return`In ${o} days`;if(o<-1&&o>=-7)return`${Math.abs(o)} days ago`;const r={month:"short",day:"numeric"};return e.getFullYear()!==i.getFullYear()&&(r.year="numeric"),e.toLocaleDateString(void 0,r)}const kt=r`
  :host {
    display: block;
  }

  ha-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
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
    border-radius: 24px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;
    z-index: 1;
  }

  .floating-add-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
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
    gap: 0;
  }

  .compact .tasks {
    gap: 0;
  }

  /* Task Item */
  .task-item {
    display: flex;
    gap: 12px;
    padding: 8px 16px;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--divider-color);
    border-radius: 0;
    transition: background-color 0.2s ease;
  }

  .task-item:last-child {
    border-bottom: none;
  }

  .task-item:hover {
    background: var(--secondary-background-color);
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
    padding: 6px 12px;
    gap: 8px;
  }

  /* Task Checkbox */
  .task-checkbox {
    flex-shrink: 0;
    display: flex;
    align-items: flex-start;
    padding-top: 2px;
  }

  /* Task Status Wrapper (status badge with checkbox inside) */
  .task-status-wrapper {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    position: relative;
  }

  .task-status-wrapper .status-badge {
    padding-left: 36px;
    position: relative;
  }

  .task-status-wrapper ha-checkbox {
    position: absolute;
    left: 6px;
    z-index: 1;
  }

  /* Task Main Content */
  .task-main {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    cursor: pointer;
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
    padding: 0;
    border-radius: 0;
    background: transparent;
    color: var(--secondary-text-color);
  }

  .date-item ha-icon {
    --mdc-icon-size: 16px;
  }

  .date-item.overdue {
    color: var(--error-color);
  }

  .compact .date-item {
    font-size: 11px;
    padding: 0;
  }

  .compact .date-item ha-icon {
    --mdc-icon-size: 14px;
  }

  /* Status Badge */
  .status-badge {
    display: inline-flex;
    align-items: center;
    font-size: 11px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 12px;
    background: var(--status-color, var(--primary-color));
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  .compact .status-badge {
    font-size: 10px;
    padding: 3px 8px;
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

  /* Dialog Content */
  .dialog-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 8px 0;
    min-width: 400px;
  }

  .dialog-content ha-textfield,
  .dialog-content ha-textarea,
  .dialog-content ha-date-input,
  .dialog-content ha-select {
    width: 100%;
  }

  .dialog-actions-extra {
    display: flex;
    justify-content: flex-start;
    padding-top: 8px;
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
      padding: 6px 12px;
      gap: 10px;
    }

    .task-summary {
      font-size: 14px;
    }

    .dialog-content {
      min-width: 300px;
    }
  }
`;console.info("%c  CLICKUP-TODO-CARD  \n%c  Version 1.0.21  ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray");class At extends nt{constructor(){super(...arguments),this._config={type:"custom:clickup-todo-card",entity:"",...vt},this._tasks=[],this._editingTask=null,this._showAddDialog=!1}static async getConfigElement(){return await Promise.resolve().then(function(){return St}),document.createElement("clickup-todo-card-editor")}static getStubConfig(){return{type:"custom:clickup-todo-card",entity:"",...vt}}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={...vt,...t}}getCardSize(){return 3+(this._tasks?.length||0)}shouldUpdate(t){if(!this._config||!this.hass)return!0;if(!this._config.entity)return!0;try{return function(t,e,i){if(e.has("config")||i)return!0;if(t.config.entity){var s=e.get("hass");return!s||s.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}(this,t,!1)}catch(t){return console.error("Error in shouldUpdate:",t),!0}}render(){try{if(!this._config||!this.hass)return B`<ha-card><div class="warning">Loading...</div></ha-card>`;if(!this._config.entity)return B`
          <ha-card>
            <div class="warning">Please configure an entity in the card editor</div>
          </ha-card>
        `;const t=this.hass.states[this._config.entity];if(!t)return B`
          <ha-card>
            <div class="warning">Entity not found: ${this._config.entity}</div>
          </ha-card>
        `;this._tasks=yt(t);const e=bt(function(t,e){let i=[...t];if(!e.filters)return i;if(e.filters.status?.length&&(i=i.filter(t=>{const i=t.clickup_status?.status;return i&&e.filters.status.includes(i)})),e.filters.priority?.length&&(i=i.filter(t=>{const i=null===t.priority?null:t.priority;return e.filters.priority.includes(i)})),e.filters.tags?.length&&(i=i.filter(t=>!!t.tags?.length&&t.tags.some(t=>e.filters.tags.includes(t.name)))),e.filters.assignees?.length&&(i=i.filter(t=>!!t.assignees?.length&&t.assignees.some(t=>e.filters.assignees.includes(t.id.toString())))),e.filters.due_date_range){const{start:t,end:s}=e.filters.due_date_range;i=i.filter(e=>{if(!e.due)return!1;const i=new Date(e.due).getTime();return!(t&&i<new Date(t).getTime())&&!(s&&i>new Date(s).getTime())})}return i}(this._tasks,this._config),this._config),i=wt(e,this._config.group_by||"none",this._config.group_field_id);return B`
        <ha-card>
          ${this._renderHeader(t)}
          <div class="card-content ${this._config.compact_mode?"compact":""}">
            ${1===i.size&&i.has("all")?this._renderTaskList(i.get("all")):this._renderGroupedTasks(i)}
          </div>
          ${this._renderFloatingAddButton(t)}
        </ha-card>
        ${this._showAddDialog?this._renderAddDialog():""}
        ${this._editingTask?this._renderEditDialog():""}
      `}catch(t){return console.error("Error rendering ClickUp Todo Card:",t),B`
        <ha-card>
          <div class="warning">Error rendering card. Check console for details.</div>
        </ha-card>
      `}}_renderHeader(t){if(this._config.hide_header)return B``;const e=this._config.title||t.attributes.friendly_name||"Tasks",i=!1!==this._config.show_task_count,s=!0!==this._config.hide_title;return s||i?B`
      <div class="card-header">
        ${s?B`<div class="name">${e}</div>`:""}
        ${i?B`<div class="task-count">${this._tasks.length}</div>`:""}
      </div>
    `:B``}_renderFloatingAddButton(t){const e="unavailable"===t.state,i=this._config.add_button_text||"Add Task",s=this._config.add_button_position||"bottom-right";return B`
      <button
        class="floating-add-button ${s}"
        ?disabled=${e}
        @click=${this._openAddDialog}
      >
        <ha-icon icon="mdi:plus"></ha-icon>
        <span>${i}</span>
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
      `}_renderTask(t){const e=function(t){if(!t.due)return!1;const e=new Date;return new Date(t.due)<e&&"completed"!==t.status}(t),i="completed"===t.status,s=this._config.show_status&&t.clickup_status;return B`
      <div class="task-item ${i?"completed":""} ${e?"overdue":""}">
        ${s?B`
          <div class="task-status-wrapper">
            ${this._renderStatus(t)}
            <ha-checkbox
              .checked=${i}
              @change=${()=>this._toggleTask(t)}
            ></ha-checkbox>
          </div>
        `:B`
          <div class="task-checkbox">
            <ha-checkbox
              .checked=${i}
              @change=${()=>this._toggleTask(t)}
            ></ha-checkbox>
          </div>
        `}

        <div class="task-main" @click=${()=>this._openEditDialog(t)}>
          <div class="task-header">
            <span class="task-summary">${t.summary}</span>
            ${this._renderPriority(t)}
          </div>

          ${t.description?B`
            <div class="task-description">${t.description}</div>
          `:""}

          <div class="task-metadata">
            ${this._renderDates(t)}
            ${this._renderTags(t)}
            ${this._renderAssignees(t)}
            ${this._renderCustomFields(t)}
          </div>
        </div>
      </div>
    `}_renderPriority(t){if(!this._config.show_priority||null===t.priority||void 0===t.priority)return B``;const e=t.priority;return B`
      <ha-icon
        class="priority-icon"
        icon="${mt[e]||mt.null}"
        style="color: ${_t[e]||_t.null}"
      ></ha-icon>
    `}_renderDates(t){const e=this._config.show_start_date&&t.start_date,i=this._config.show_due_date&&t.due;return e||i?B`
      <div class="task-dates">
        ${e?B`
          <span class="date-item start-date">
            <ha-icon icon="mdi:calendar-start"></ha-icon>
            ${xt(t.start_date)}
          </span>
        `:""}

        ${i?B`
          <span class="date-item due-date ${function(t){if(!t)return"";let e;if(e="number"==typeof t||"string"==typeof t?new Date(t):t,isNaN(e.getTime()))return"";const i=new Date,s=new Date(i.getFullYear(),i.getMonth(),i.getDate()),a=new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime()-s.getTime(),o=Math.ceil(a/864e5);return o<0?"overdue":0===o?"today":1===o?"tomorrow":o<=7?"this-week":"future"}(t.due)}">
            <ha-icon icon="mdi:calendar-end"></ha-icon>
            ${xt(t.due)}
          </span>
        `:""}
      </div>
    `:B``}_renderStatus(t){if(!t.clickup_status)return B``;const e=t.clickup_status.color||"var(--primary-color)";return B`
      <span class="status-badge" style="--status-color: ${e}">
        ${t.clickup_status.status}
      </span>
    `}_renderTags(t){return this._config.show_tags&&t.tags&&0!==t.tags.length?B`
      <div class="task-tags">
        ${t.tags.map(t=>B`
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
    `:B``}_renderAssignees(t){return this._config.show_assignees&&t.assignees&&0!==t.assignees.length?B`
      <div class="task-assignees">
        ${t.assignees.map(t=>B`
          <div
            class="assignee-avatar"
            style="${t.color?`background-color: ${t.color}`:""}"
            title="${t.username}"
          >
            ${t.profilePicture?B`<img src="${t.profilePicture}" alt="${t.username}" />`:B`<span>${function(t){if(!t)return"?";const e=t.trim().split(/\s+/);return 1===e.length?e[0].charAt(0).toUpperCase():(e[0].charAt(0)+e[e.length-1].charAt(0)).toUpperCase()}(t.username)}</span>`}
          </div>
        `)}
      </div>
    `:B``}_renderCustomFields(t){if(!this._config.show_custom_fields||!t.custom_fields||0===t.custom_fields.length)return B``;let e=t.custom_fields;return this._config.visible_custom_fields&&this._config.visible_custom_fields.length>0&&(e=e.filter(t=>this._config.visible_custom_fields.includes(t.id))),0===e.length?B``:B`
      <div class="custom-fields">
        ${e.map(t=>B`
          <div class="custom-field">
            <span class="field-name">${t.name}:</span>
            <span class="field-value">${function(t){if(null===t.value||void 0===t.value||""===t.value)return"-";switch(t.type){case"text":case"email":case"phone":case"url":default:return String(t.value);case"number":return Number(t.value).toLocaleString();case"currency":const e=t.type_config?.currency_type||"USD";return new Intl.NumberFormat(void 0,{style:"currency",currency:e}).format(Number(t.value));case"date":return xt(t.value);case"checkbox":return t.value?"✓":"✗";case"drop_down":if(t.type_config?.options){const e=t.type_config.options.find(e=>e.id===t.value||e.name===t.value);return e?.name||String(t.value)}return String(t.value);case"labels":return Array.isArray(t.value)?t.value.join(", "):String(t.value);case"rating":const i=Number(t.value);return"★".repeat(i)+"☆".repeat(5-i);case"location":return"object"==typeof t.value&&t.value.location?t.value.location:String(t.value)}}(t)}</span>
          </div>
        `)}
      </div>
    `}async _toggleTask(t){const e="completed"===t.status?"needs_action":"completed";try{await this.hass.callService("todo","update_item",{entity_id:this._config.entity,item:t.uid,status:e})}catch(t){console.error("Error toggling task:",t)}}_openAddDialog(){this._showAddDialog=!0}_openEditDialog(t){this._editingTask=t}_renderAddDialog(){return B`
      <ha-dialog
        open
        @closed=${()=>this._showAddDialog=!1}
        .heading=${"Add Task"}
      >
        <div class="dialog-content">
          <ha-textfield
            dialogInitialFocus
            label="Summary"
            id="add-summary"
            required
          ></ha-textfield>

          <ha-textarea
            label="Description"
            id="add-description"
            rows="3"
          ></ha-textarea>

          <ha-textfield
            label="Start Date"
            id="add-start-date"
            type="date"
          ></ha-textfield>

          <ha-textfield
            label="Due Date"
            id="add-due-date"
            type="date"
          ></ha-textfield>

          <ha-select
            label="Priority"
            id="add-priority"
          >
            <mwc-list-item value="">No Priority</mwc-list-item>
            <mwc-list-item value="1">Urgent</mwc-list-item>
            <mwc-list-item value="2">High</mwc-list-item>
            <mwc-list-item value="3">Normal</mwc-list-item>
            <mwc-list-item value="4">Low</mwc-list-item>
          </ha-select>
        </div>

        <mwc-button slot="primaryAction" @click=${this._submitAddTask}>
          Add
        </mwc-button>
        <mwc-button slot="secondaryAction" dialogAction="cancel">
          Cancel
        </mwc-button>
      </ha-dialog>
    `}_renderEditDialog(){if(!this._editingTask)return B``;const t=this._editingTask,e=t.start_date?new Date("number"==typeof t.start_date?t.start_date:parseInt(t.start_date)).toISOString().split("T")[0]:"",i=t.due?new Date(t.due).toISOString().split("T")[0]:"";return B`
      <ha-dialog
        open
        @closed=${()=>this._editingTask=null}
        .heading=${"Edit Task"}
      >
        <div class="dialog-content">
          <ha-textfield
            dialogInitialFocus
            label="Summary"
            id="edit-summary"
            .value=${t.summary}
            required
          ></ha-textfield>

          <ha-textarea
            label="Description"
            id="edit-description"
            .value=${t.description||""}
            rows="3"
          ></ha-textarea>

          <ha-textfield
            label="Start Date"
            id="edit-start-date"
            type="date"
            .value=${e}
          ></ha-textfield>

          <ha-textfield
            label="Due Date"
            id="edit-due-date"
            type="date"
            .value=${i}
          ></ha-textfield>

          <ha-select
            label="Priority"
            id="edit-priority"
            .value=${t.priority?.toString()||""}
          >
            <mwc-list-item value="">No Priority</mwc-list-item>
            <mwc-list-item value="1">Urgent</mwc-list-item>
            <mwc-list-item value="2">High</mwc-list-item>
            <mwc-list-item value="3">Normal</mwc-list-item>
            <mwc-list-item value="4">Low</mwc-list-item>
          </ha-select>

          <div class="dialog-actions-extra">
            <mwc-button @click=${()=>this._deleteTask(t)}>
              Delete Task
            </mwc-button>
          </div>
        </div>

        <mwc-button slot="primaryAction" @click=${this._submitEditTask}>
          Save
        </mwc-button>
        <mwc-button slot="secondaryAction" dialogAction="cancel">
          Cancel
        </mwc-button>
      </ha-dialog>
    `}async _submitAddTask(){const t=this.shadowRoot?.querySelector("#add-summary")?.value?.trim();if(!t)return;const e=this.shadowRoot?.querySelector("#add-description")?.value?.trim();this.shadowRoot?.querySelector("#add-start-date");const i=this.shadowRoot?.querySelector("#add-due-date")?.value;this.shadowRoot?.querySelector("#add-priority");try{const s={item:t};e&&(s.description=e),i&&(s.due=i),await this.hass.callService("todo","add_item",s,{entity_id:this._config.entity}),this._showAddDialog=!1}catch(t){console.error("Error adding task:",t)}}async _submitEditTask(){if(!this._editingTask)return;const t=this.shadowRoot?.querySelector("#edit-summary")?.value?.trim();if(!t)return;const e=this.shadowRoot?.querySelector("#edit-description")?.value?.trim();this.shadowRoot?.querySelector("#edit-start-date");const i=this.shadowRoot?.querySelector("#edit-due-date")?.value;this.shadowRoot?.querySelector("#edit-priority");try{const s={entity_id:this._config.entity,item:this._editingTask.uid,rename:t};void 0!==e&&(s.description=e||null),i&&(s.due=i),await this.hass.callService("todo","update_item",s),this._editingTask=null}catch(t){console.error("Error updating task:",t)}}async _deleteTask(t){if(confirm(`Delete task "${t.summary}"?`))try{await this.hass.callService("todo","remove_item",{entity_id:this._config.entity,item:t.uid}),this._editingTask=null}catch(t){console.error("Error deleting task:",t)}}static get styles(){return kt}}t([ht({attribute:!1})],At.prototype,"hass",void 0),t([ut()],At.prototype,"_config",void 0),t([ut()],At.prototype,"_tasks",void 0),t([ut()],At.prototype,"_editingTask",void 0),t([ut()],At.prototype,"_showAddDialog",void 0),customElements.get("clickup-todo-card")||(customElements.define("clickup-todo-card",At),console.log("ClickUp Todo Card: Manually registered custom element")),window.customCards=window.customCards||[],window.customCards.push({type:"clickup-todo-card",name:"ClickUp Todo Card",description:"Enhanced todo card with ClickUp custom fields and filters",preview:!0,documentationURL:"https://github.com/chbarnhouse/clickup-todo-card"}),console.log("ClickUp Todo Card: Registered in customCards array");class Ct extends nt{constructor(){super(),this._config={type:"custom:clickup-todo-card",entity:""},this._tasks=[],console.log("ClickUp Card Editor: Constructor called")}connectedCallback(){super.connectedCallback(),console.log("ClickUp Card Editor: Connected to DOM")}setConfig(t){this._config={type:"custom:clickup-todo-card",entity:"",...t},this._loadEntityData()}_loadEntityData(){if(!this.hass||!this._config.entity)return;const t=this.hass.states[this._config.entity];t&&(this._tasks=yt(t))}render(){try{if(!this.hass)return B`<div>Loading hass...</div>`;if(!this._config)return B`<div>Loading config...</div>`;const t=this._tasks.length>0?function(t){const e=new Map;return t.forEach(t=>{t.clickup_status?.status&&e.set(t.clickup_status.status,t.clickup_status.status)}),Array.from(e.entries()).map(([t,e])=>({value:t,label:e})).sort((t,e)=>t.label.localeCompare(e.label))}(this._tasks):[],e=this._tasks.length>0?function(t){const e=new Set;return t.forEach(t=>{t.tags?.forEach(t=>{t.name&&e.add(t.name)})}),Array.from(e).map(t=>({value:t,label:t})).sort((t,e)=>t.label.localeCompare(e.label))}(this._tasks):[],i=this._tasks.length>0?function(t){const e=new Map;return t.forEach(t=>{t.assignees?.forEach(t=>{t.id&&t.username&&e.set(t.id.toString(),t.username)})}),Array.from(e.entries()).map(([t,e])=>({value:t,label:e})).sort((t,e)=>t.label.localeCompare(e.label))}(this._tasks):[],s=this._tasks.length>0?function(t){const e=new Map;return t.forEach(t=>{t.custom_fields?.forEach(t=>{t.id&&t.name&&e.set(t.id,t.name)})}),Array.from(e.entries()).map(([t,e])=>({value:t,label:e})).sort((t,e)=>t.label.localeCompare(e.label))}(this._tasks):[];return B`
      <div class="card-config">
        <!-- Basic Settings -->
        <div class="config-section">
          <h3>Basic Settings</h3>

          <ha-selector
            .hass=${this.hass}
            .selector=${{entity:{domain:["todo"]}}}
            .value=${this._config.entity}
            .label=${"Entity (required)"}
            .required=${!0}
            @value-changed=${t=>this._entityChanged(t.detail.value)}
          ></ha-selector>

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

          <ha-formfield .label=${"Hide Header"}>
            <ha-switch
              .checked=${!0===this._config.hide_header}
              .configValue=${"hide_header"}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${"Hide Title"}>
            <ha-switch
              .checked=${!0===this._config.hide_title}
              .configValue=${"hide_title"}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${"Show Task Count Badge"}>
            <ha-switch
              .checked=${!1!==this._config.show_task_count}
              .configValue=${"show_task_count"}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

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

          <ha-formfield .label=${"Show ClickUp Status"}>
            <ha-switch
              .checked=${!0===this._config.show_status}
              .configValue=${"show_status"}
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

        <!-- Add Button Settings -->
        <div class="config-section">
          <h3>Add Button</h3>

          <ha-textfield
            label="Button Text"
            .configValue=${"add_button_text"}
            .value=${this._config.add_button_text||"Add Task"}
            @input=${this._valueChanged}
          ></ha-textfield>

          <ha-select
            .label=${"Button Position"}
            .configValue=${"add_button_position"}
            .value=${this._config.add_button_position||"bottom-right"}
            @selected=${this._valueChanged}
            @closed=${t=>t.stopPropagation()}
          >
            <mwc-list-item value="bottom-left">Bottom Left</mwc-list-item>
            <mwc-list-item value="bottom-center">Bottom Center</mwc-list-item>
            <mwc-list-item value="bottom-right">Bottom Right</mwc-list-item>
            <mwc-list-item value="top-left">Top Left</mwc-list-item>
            <mwc-list-item value="top-center">Top Center</mwc-list-item>
            <mwc-list-item value="top-right">Top Right</mwc-list-item>
          </ha-select>
        </div>

        <!-- Visible Custom Fields -->
        ${this._config.show_custom_fields&&s.length>0?B`
          <div class="config-section">
            <h3>Visible Custom Fields</h3>
            <p class="hint">Leave empty to show all custom fields</p>

            ${s.map(t=>B`
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
            <mwc-list-item value="list">List</mwc-list-item>
            <mwc-list-item value="custom_field">Custom Field</mwc-list-item>
          </ha-select>

          ${"custom_field"===this._config.group_by&&s.length>0?B`
            <ha-select
              .label=${"Custom Field for Grouping"}
              .configValue=${"group_field_id"}
              .value=${this._config.group_field_id||""}
              @selected=${this._valueChanged}
              @closed=${t=>t.stopPropagation()}
            >
              ${s.map(t=>B`
                <mwc-list-item value="${t.value}">${t.label}</mwc-list-item>
              `)}
            </ha-select>
          `:""}
        </div>

        <!-- Filters -->
        <div class="config-section">
          <h3>Filters</h3>

          ${t.length>0?B`
            <div class="filter-group">
              <label>Status</label>
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

          ${e.length>0?B`
            <div class="filter-group">
              <label>Tags</label>
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
            <div class="filter-group">
              <label>Assignees</label>
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
    `}catch(t){return console.error("Error rendering ClickUp Todo Card editor:",t),B`
        <div class="card-config">
          <div class="warning">
            Error loading editor. Please check the console for details.
          </div>
        </div>
      `}}_valueChanged(t){if(!this._config||!this.hass)return;const e=t.target,i=e.configValue;if(!i)return;let s;if(void 0!==e.checked)s=e.checked;else{if(void 0===e.value)return;s=e.value}""===s&&(s=void 0);const a={...this._config,[i]:s};"entity"===i&&setTimeout(()=>this._loadEntityData(),100),ft(this,"config-changed",{config:a})}_entityChanged(t){if(!this._config||t===this._config.entity)return;const e={...this._config,entity:t};this._config=e,this._loadEntityData(),ft(this,"config-changed",{config:e})}_isFieldVisible(t){return!(!this._config.visible_custom_fields||0===this._config.visible_custom_fields.length)&&this._config.visible_custom_fields.includes(t)}_customFieldChanged(t){const e=t.target,i=e.value,s=e.checked,a=this._config.visible_custom_fields||[];let o;o=s?[...a,i]:a.filter(t=>t!==i);const r={...this._config,visible_custom_fields:o.length>0?o:void 0};ft(this,"config-changed",{config:r})}_isStatusFiltered(t){return this._config.filters?.status?.includes(t)||!1}_statusFilterChanged(t){const e=t.target,i=e.value,s=e.checked,a=this._config.filters||{},o=a.status||[];let r;r=s?[...o,i]:o.filter(t=>t!==i);const n={...this._config,filters:{...a,status:r.length>0?r:void 0}};ft(this,"config-changed",{config:n})}_isPriorityFiltered(t){return this._config.filters?.priority?.includes(t)||!1}_priorityFilterChanged(t){const e=t.target,i=e.value,s="null"===i?null:parseInt(i),a=e.checked,o=this._config.filters||{},r=o.priority||[];let n;n=a?[...r,s]:r.filter(t=>t!==s);const l={...this._config,filters:{...o,priority:n.length>0?n:void 0}};ft(this,"config-changed",{config:l})}_isTagFiltered(t){return this._config.filters?.tags?.includes(t)||!1}_tagFilterChanged(t){const e=t.target,i=e.value,s=e.checked,a=this._config.filters||{},o=a.tags||[];let r;r=s?[...o,i]:o.filter(t=>t!==i);const n={...this._config,filters:{...a,tags:r.length>0?r:void 0}};ft(this,"config-changed",{config:n})}_isAssigneeFiltered(t){return this._config.filters?.assignees?.includes(t)||!1}_assigneeFilterChanged(t){const e=t.target,i=e.value,s=e.checked,a=this._config.filters||{},o=a.assignees||[];let r;r=s?[...o,i]:o.filter(t=>t!==i);const n={...this._config,filters:{...a,assignees:r.length>0?r:void 0}};ft(this,"config-changed",{config:n})}_dateRangeChanged(t,e){const i=this._config.filters||{},s={...i.due_date_range||{},[t]:e||void 0},a=s.start||s.end,o={...this._config,filters:{...i,due_date_range:a?s:void 0}};ft(this,"config-changed",{config:o})}static get styles(){return r`
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
    `}}t([ht({attribute:!1})],Ct.prototype,"hass",void 0),t([ut()],Ct.prototype,"_config",void 0),t([ut()],Ct.prototype,"_tasks",void 0),t([ut()],Ct.prototype,"_helpers",void 0),customElements.get("clickup-todo-card-editor")||(customElements.define("clickup-todo-card-editor",Ct),console.log("ClickUp Todo Card Editor: Manually registered custom element"));var St=Object.freeze({__proto__:null,ClickUpTodoCardEditor:Ct});export{At as ClickUpTodoCard};
