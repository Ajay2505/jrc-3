class Fade{static in(el){el.style.display='block';return el.animate([{opacity:0},{opacity:1}],{duration:300,});}
static out(el){const anim=el.animate([{opacity:1},{opacity:0}],{duration:300,});anim.finished.then(()=>{el.style.display='';});return anim;}};;class Menu{MENU_OPEN_CLASS='menu-open';constructor(){this.triggers=document.querySelectorAll('[data-toggle-menu]');this.isOpen=false;this._attachEvents();}
get isOpen(){return this._isOpen??false;}
set isOpen(isOpen){this._isOpen=isOpen;document.documentElement.classList.toggle(this.MENU_OPEN_CLASS,isOpen);}
_attachEvents(){this.triggers.forEach(trigger=>{trigger.addEventListener('click',this._handleTriggerClick.bind(this));});}
_handleTriggerClick(e){if(!e.currentTarget)return;const targetSelector=e.currentTarget.dataset.toggleMenu;const target=document.querySelector(targetSelector);if(!target)return;this._toggle(target);}
_toggle(el){return this.isOpen?this._close(el):this._open(el);}
_open(el){const anim=Fade.in(el);anim.finished.then(()=>{this.isOpen=true;});return anim;}
_close(el){const anim=Fade.out(el);anim.finished.then(()=>{this.isOpen=false;});return anim;}}
window.Menu=Menu;;;class PopupMenu{constructor(trigger){this.trigger=trigger;this.popup=document.querySelector(this.trigger.dataset.togglePopupMenu);this.isOpen=false;this._attachEvents();}
_attachEvents(){this.trigger.addEventListener('click',this._toggle.bind(this));document.addEventListener('click',this._handleOutsideClick.bind(this));}
_handleOutsideClick(e){if(!e.target)return;const hasClickedOnPopup=e.target.closest(this.trigger.dataset.togglePopupMenu);if(!hasClickedOnPopup&&this.isOpen)this._close();}
_toggle(){return this.isOpen?this._close():this._open();}
_open(){const anim=Fade.in(this.popup);anim.finished.then(()=>{this.isOpen=true;});return anim;}
_close(){const anim=Fade.out(this.popup);anim.finished.then(()=>{this.isOpen=false;});return anim;}}
window.PopupMenu=PopupMenu;;;class BackLink{static onClick(clickedLink){const clickedUrl=new URL(clickedLink.href);if(document.referrer.startsWith(clickedUrl.href.replace(/\/+$/,''))){history.back();return false;}
return true;}};;class ContentNav{constructor(nav){this.nav=nav;this.links=nav.querySelectorAll('a');this.hero=document.querySelector('.hero');this._hideUnusedLinks();this._attachEvents();}
_hideUnusedLinks(){this.links.forEach(link=>{if(!link.href.includes('#'))return;const referencedEl=document.querySelector(`#${link.href.split('#')[1]}`);if(!referencedEl)link.parentElement.style.display='none';});}
_attachEvents(){window.addEventListener('scroll',this._onScroll.bind(this));}
_onScroll(){if(this.hero){const headerHeight=parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height'),10)||0;document.documentElement.classList.toggle('content-nav-sticky',window.scrollY>this.hero.clientHeight-headerHeight);}}}
window.ContentNav=ContentNav;;;class Header{STICKY_CLASS_NAME='header-sticky';STICK_THRESHOLD=0;constructor(){this._attachEvents();this._handleScroll();}
get isSticky(){return this._isSticky??false;}
set isSticky(isSticky){this._isSticky=isSticky;document.documentElement.classList.toggle(this.STICKY_CLASS_NAME,isSticky);}
_attachEvents(){window.addEventListener('scroll',this._handleScroll.bind(this));}
_handleScroll(){this.isSticky=this._shouldStick();}
_shouldStick(){return window.scrollY>this.STICK_THRESHOLD;}}
window.Header=Header;;;