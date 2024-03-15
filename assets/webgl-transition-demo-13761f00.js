import{l as K,R as J,a as ee}from"./constant-2c620e4d.js";import{d as y,r as p,u as oe,o as D,a as T,c as S,b as _,t as te,e as re,f as C,g as F,h as ie,p as se,i as ae,_ as P,j as ne,n as le,k as ce,l as ue}from"./index-a160e559.js";const ve={isNetworkImageLoose:{pattern:/^(http:\/\/|https:\/\/).*$/,msg:"不是网络图片，不以http://或https://开头"},webglTransitionParent:{pattern:/^(webgl-transition-).*$/}},he=(a,e)=>{let o=null;return function(){o&&clearTimeout(o),o=setTimeout(()=>{a.apply(this,arguments),o=null},e)}};var me=globalThis&&globalThis.__awaiter||function(a,e,o,t){function r(s){return s instanceof o?s:new o(function(l){l(s)})}return new(o||(o=Promise))(function(s,l){function i(u){try{v(t.next(u))}catch(n){l(n)}}function c(u){try{v(t.throw(u))}catch(n){l(n)}}function v(u){u.done?s(u.value):r(u.value).then(i,c)}v((t=t.apply(a,e||[])).next())})},h;(function(a){a.gl="gl",a.texturesLength="texturesLength",a.shaderProgram="shaderProgram",a.shaderCode="shaderCode"})(h||(h={}));(function(){let a=0;const e=["ms","moz","webkit","o"];for(let o=0;o<e.length&&!window.requestAnimationFrame;o++)window.requestAnimationFrame=window[e[o]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[o]+"CancelAnimationFrame"]||window[e[o]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(o){const t=new Date().getTime(),r=Math.max(0,16-(t-a)),s=window.setTimeout(function(){o(t+r)},r);return a=t+r,s}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(o){clearTimeout(o)})})();var m;(function(a){a.playing="playing",a.pause="pause",a.stop="stop"})(m||(m={}));class I{constructor(e){this.version="1.3.0",this.numberOfLostContext=0,this.analogLossContentCounts=0,this.aspect=0,this.canvasId="",this.canvas=null,this.vertexShader=null,this.fragmentShader=null,this.firstInit=!0,this.intervalTime=100,this.timer=void 0,this.vsSource="",this.fsSource="",this.assignmentList=[],this.textures=[],this.playIndex=0,this.playPicIndex=0,this.playPicPreloadList=[],this.playStatus=m.stop,this.stopPlaying=!1,this.shaderProgram=null,this.vertexBuffer=null,this.progress=0,this.onResizeCallback=null,this.defaultConfig={playPicUrlList:[],playPicList:[],carouselTime:3e3,watchResize:!1},this.config=Object.assign(Object.assign({},this.defaultConfig),e),this.checkInitResource(),this.canvasId=`webgl-transition-${Math.random().toString().slice(2,10)}`,this.canvas=document.createElement("canvas"),this.canvas.id=this.canvasId,this.canvas.setAttribute("version",`r${this.version}`);const o=document.querySelector(this.config.parentId);if(o instanceof HTMLDivElement)this.parentDom=o;else throw new Error("WebglTransitions初始化失败, parentId必须是div元素的id");this.onWatchResize();const{clientWidth:t,clientHeight:r}=this.parentDom;if(this.canvas.width=t,this.canvas.height=r,this.aspect=this.canvas.width/this.canvas.height,this.parentDom.appendChild(this.canvas),this.gl=this.canvas.getContext("webgl"),!this.gl){console.error("无法初始化WebGL, 您的浏览器或机器可能不支持它。");return}let s=this;this.canvas.addEventListener("webglcontextlost",function(l){console.log("WebGL上下文丢失"),l.preventDefault(),console.log("3秒后重新渲染"),s.timer&&clearTimeout(s.timer),s.timer=setTimeout(()=>{s.restart()},3e3)},!1),this.config.playPicList.length&&this.asyncLoadImageSelf(this.config.playPicList)}onWatchResize(){this.config.watchResize&&(this.resizeObserver=new ResizeObserver(he(()=>{this.onResize()},300)),this.resizeObserver.observe(this.parentDom))}onResize(e){const{width:o,height:t}=e||{width:this.parentDom.clientWidth,height:this.parentDom.clientHeight};this.canvas.width===Math.ceil(o)&&this.canvas.height===Math.ceil(t)||(this.setViewPort(0,0,o,t),this.triggerResizeCallback(),this.playStatus===m.playing&&this.startAnimationLoop())}setViewPort(e,o,t,r){this.canvas.width=t,this.canvas.height=r,this.gl.viewport(e,o,this.canvas.width,this.canvas.height)}setOnResizeCallback(e){this.onResizeCallback=e}triggerResizeCallback(){this.onResizeCallback&&this.onResizeCallback()}checkInitResource(){const{parentId:e,transitionList:o,playPicList:t,playPicUrlList:r}=this.config;if(!e||typeof e!="string")throw new Error("WebglTransitions初始化失败, 缺少Dom元素ID");if((o==null?void 0:o.length)<1)throw new Error("WebglTransitions初始化失败, 至少需要1种转场动画");if(t.length+r.length===0)throw new Error("WebglTransitions初始化失败, 缺少转场图片。参数：playPicList/playPicUrlList");if(t.length+r.length<2)throw new Error("至少需要2张图片")}asyncLoadImage(){return new Promise(e=>{for(let o=0;o<this.config.playPicUrlList.length;o++){const t=new Image;t.setAttribute("crossOrigin","Anonymous"),t.onload=()=>{this.playPicPreloadList.push(t),this.playPicPreloadList.length===this.config.playPicUrlList.length+this.config.playPicList.length&&(console.log("加载的图片列表：",this.playPicPreloadList),e(1))},t.onerror=()=>{throw new Error("图片加载失败")},t.src=this.config.playPicUrlList[o]}})}asyncLoadImageSelf(e){this.playPicPreloadList=[...this.playPicPreloadList,...e]}creatFirstTexture(){const e=this.createTexture(this.gl.LINEAR,this.playPicPreloadList[this.playPicIndex]);this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,e),e&&this.textures.push(e)}creatSecondTexture(){const e=this.createTexture(this.gl.LINEAR,this.playPicPreloadList[this.playPicIndex+1===this.playPicPreloadList.length?0:this.playPicIndex+1]);this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,e),e&&this.textures.push(e)}startCarousel(){this.playStatus=m.playing,this.checkResource([h.gl,h.shaderProgram]);const e=()=>{if(!this.gl||this.playStatus!=m.playing)return;this.animationId=window.requestAnimationFrame(e);const o=this.gl.getUniformLocation(this.shaderProgram,"progress");this.gl.uniform1f(o,this.progress);for(let t=0;t<this.assignmentList.length;t++){const r=this.assignmentList[t];switch(r.value.length){case 1:this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgram,r.key),r.value[0]);break;case 2:this.gl.uniform2f(this.gl.getUniformLocation(this.shaderProgram,r.key),r.value[0],r.value[1]);break;case 3:this.gl.uniform3f(this.gl.getUniformLocation(this.shaderProgram,r.key),r.value[0],r.value[1],r.value[2]);break;case 4:this.gl.uniform4f(this.gl.getUniformLocation(this.shaderProgram,r.key),r.value[0],r.value[1],r.value[2],r.value[3]);break}}if(this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),this.progress>=1){this.cancelAnimation(),this.progress=0,this.playPicIndex===this.playPicPreloadList.length-1?this.playPicIndex=0:this.playPicIndex+=1,this.playIndex===this.config.transitionList.length-1?this.playIndex=0:this.playIndex+=1,this.clearNextAnimation(),this.timer=setTimeout(()=>{this.main()},this.config.carouselTime);return}this.progress+=.01};e()}checkResource(e){let o=!0;return e.includes(h.gl)&&!this.gl&&(o=!1),e.includes(h.shaderProgram)&&this.textures.length===2&&(this.shaderProgram||(console.error("shaderProgram初始化失败"),o=!1)),e.includes(h.shaderCode)&&(!this.vertexShader||!this.fragmentShader)&&(o=!1),o}startAnimationLoop(){this.cancelAnimation(),this.startCarousel()}cancelAnimation(){window.cancelAnimationFrame(this.animationId)}main(){return me(this,void 0,void 0,function*(){if(!this.checkResource([h.gl]))return!1;const e=this.config.transitionList[this.playIndex];if(this.intervalTime=e.intervalTime||100,this.vsSource=e.vsSource,this.fsSource=e.fsSource,this.assignmentList=e.assignmentList,this.initShaderProgram(),!this.shaderProgram)return console.log("shaderProgram初始化失败"),!1;this.firstInit&&(this.gl.clearColor(0,0,0,0),this.gl.clearDepth(1),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT),this.firstInit=!1),this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.gl.useProgram(this.shaderProgram);const o=new Float32Array([-1,1,0,1,-1,-1,0,0,1,1,1,1,1,-1,1,0]),t=o.BYTES_PER_ELEMENT;this.vertexBuffer=this.gl.createBuffer(),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.vertexBuffer),this.gl.bufferData(this.gl.ARRAY_BUFFER,o,this.gl.STATIC_DRAW);const r=this.gl.getAttribLocation(this.shaderProgram,"a_Position"),s=this.gl.getAttribLocation(this.shaderProgram,"a_TexCoord");this.gl.vertexAttribPointer(r,2,this.gl.FLOAT,!1,t*4,0),this.gl.vertexAttribPointer(s,2,this.gl.FLOAT,!1,t*4,t*2),this.gl.enableVertexAttribArray(r),this.gl.enableVertexAttribArray(s);const l=this.gl.getUniformLocation(this.shaderProgram,"u_color");this.gl.uniform4f(l,1,1,1,1);const i=this.gl.getUniformLocation(this.shaderProgram,"u_Sampler"),c=this.gl.getUniformLocation(this.shaderProgram,"u_Sampler1"),v=this.gl.getUniformLocation(this.shaderProgram,"shadow_colour"),u=this.gl.getUniformLocation(this.shaderProgram,"shadow_height"),n=this.gl.getUniformLocation(this.shaderProgram,"bounces");this.gl.uniform4f(v,0,0,0,.6),this.gl.uniform1f(u,.075),this.gl.uniform1f(n,3),this.playPicPreloadList.length!=this.config.playPicUrlList.length+this.config.playPicList.length&&(yield Promise.all([this.asyncLoadImage()])),this.textures.length===2&&(this.gl.deleteTexture(this.textures[1]),this.gl.deleteTexture(this.textures[0]),this.textures=[]),this.creatFirstTexture(),this.creatSecondTexture(),this.gl.uniform1i(i,0),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.textures[1]),this.gl.uniform1i(c,1),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.textures[0]),this.startAnimationLoop()})}initShaderProgram(){if(this.loadVertexShader(this.vsSource),this.loadFragmentShader(this.fsSource),!this.checkResource([h.shaderCode]))return!1;if(this.shaderProgram=this.gl.createProgram(),!this.shaderProgram)return console.log("shaderProgram初始化失败",this.vertexShader,this.fragmentShader,this.shaderProgram),!1;if(this.gl.attachShader(this.shaderProgram,this.vertexShader),this.gl.attachShader(this.shaderProgram,this.fragmentShader),this.gl.linkProgram(this.shaderProgram),!this.gl.getProgramParameter(this.shaderProgram,this.gl.LINK_STATUS))return null}createTexture(e,o){if(!this.gl)return!1;const t=this.gl.createTexture();return this.gl.bindTexture(this.gl.TEXTURE_2D,t),this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,1),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,e),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,e),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,o),t}loadVertexShader(e){this.vertexShader||(this.vertexShader=this.gl.createShader(this.gl.VERTEX_SHADER)),this.gl.shaderSource(this.vertexShader,e),this.gl.compileShader(this.vertexShader),this.gl.getShaderParameter(this.vertexShader,this.gl.COMPILE_STATUS)||(console.log("编译顶点着色器失败，状态码：",this.gl.COMPILE_STATUS),console.error("编译顶点着色器时发生错误: ",this.gl.getShaderInfoLog(this.vertexShader)),this.gl.deleteShader(this.vertexShader))}loadFragmentShader(e){this.fragmentShader||(this.fragmentShader=this.gl.createShader(this.gl.FRAGMENT_SHADER)),this.gl.shaderSource(this.fragmentShader,e),this.gl.compileShader(this.fragmentShader),this.gl.getShaderParameter(this.fragmentShader,this.gl.COMPILE_STATUS)||(console.log("编译顶点着色器失败，状态码：",this.gl.COMPILE_STATUS),console.error("编译片元着色器时发生错误: ",this.gl.getShaderInfoLog(this.fragmentShader)),this.gl.deleteShader(this.fragmentShader))}simulatedLostContext(){if(this.gl&&this.gl.getExtension("WEBGL_lose_context")){if(++this.analogLossContentCounts,!this.gl||this.analogLossContentCounts>1)return;const e=this.gl.getExtension("WEBGL_lose_context");e&&e.loseContext(),console.clear(),console.log("模拟丢失"),this.cancelAnimation(),this.numberOfLostContext=0;return}}stop(){this.playStatus=m.stop,this.cancelAnimation()}pause(){this.playStatus=m.pause,this.cancelAnimation(),this.clearNextAnimation()}continue(){this.progress===0?this.main():this.startCarousel()}restart(){var e;this.dispose();let o=this;console.log("restart webgl transition..."),this.analogLossContentCounts=0;const t=document.querySelector(this.config.parentId);if(t){const s=t.children;for(let l=s.length-1;l>=0;l--)ve.webglTransitionParent.pattern.test(s[l].id)&&t.removeChild(s[l])}this.canvasId=`webgl-transition-${Math.random().toString().slice(2,10)}`,this.canvas=document.createElement("canvas"),this.canvas.id=this.canvasId;const r=document.querySelector(this.config.parentId);if((e=document.querySelector(this.config.parentId))===null||e===void 0||e.appendChild(this.canvas),this.canvas.width=r?r.clientWidth:1920,this.canvas.height=r?r.clientHeight:1080,this.canvas.addEventListener("webglcontextlost",function(){++o.numberOfLostContext,!(o.numberOfLostContext>1)&&(console.log("2次监听"),o.restart())}),this.gl=this.canvas.getContext("webgl"),!this.gl){console.error("无法重新初始化WebGL, 您的浏览器或机器可能不支持它。");return}this.clearNextAnimation(),this.timer=setTimeout(()=>{this.main()},1e3)}dispose(){var e;(e=this.resizeObserver)===null||e===void 0||e.disconnect(),this.resizeObserver=null,this.gl&&(this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null),this.vertexBuffer&&this.gl.deleteBuffer(this.vertexBuffer),this.vertexBuffer&&(this.vertexBuffer=null),this.gl.deleteProgram(this.shaderProgram),this.gl.deleteShader(this.vertexShader),this.gl.deleteShader(this.fragmentShader),this.gl.deleteTexture(this.textures[1]),this.gl.deleteTexture(this.textures[0])),this.firstInit=!0,this.vsSource="",this.fsSource="",this.playPicPreloadList=[],this.shaderProgram=null,this.vertexShader=null,this.fragmentShader=null,this.gl=null,this.textures=[],this.playIndex=0,this.playPicIndex=0;const o=document.querySelector(`#${this.canvasId}`);o!=null&&o.parentNode&&o.parentNode.removeChild(o),this.canvas=null}clearNextAnimation(){this.timer&&clearTimeout(this.timer)}}const R={vsSource:`
        attribute vec4 a_Position;
        attribute vec2 a_TexCoord;
        varying vec2 v_TexCoord;
        void main() {
            gl_Position =  a_Position;
            v_TexCoord = a_TexCoord;
        }
    `,fsSource:`
        #ifdef GL_ES
        precision mediump float;
        #endif
        uniform float size; // = 0.2


        uniform sampler2D u_Sampler;
        uniform sampler2D u_Sampler1;
        varying lowp vec2 v_TexCoord;
        uniform vec4 shadow_colour; 
        uniform float shadow_height; 
        uniform float bounces; 
        uniform float progress;

        vec4 getToColor(vec2  uv){
            return texture2D(u_Sampler,uv);
        }
        vec4 getFromColor(vec2 uv){
            return texture2D(u_Sampler1,uv);
        }

        float rand (vec2 co) {
            return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
        }


        vec4 transition (vec2 uv) {
            float r = rand(vec2(0, uv.y));
            float m = smoothstep(0.0, -size, uv.x*(1.0-size) + size*r - (progress * (1.0 + size)));
            return mix(
                getFromColor(uv),
                getToColor(uv),
                m
            );
        }
        void main() {
            gl_FragColor =  transition(v_TexCoord);
        }
    `,assignmentList:[{key:"size",value:[.2]}]},A={vsSource:`
        attribute vec4 a_Position;
        attribute vec2 a_TexCoord;
        varying vec2 v_TexCoord;
        void main() {
            gl_Position =  a_Position;
            v_TexCoord = a_TexCoord;
        }
    `,fsSource:`
        #ifdef GL_ES
        precision mediump float;
        #endif
        uniform float amplitude; // = 30
        uniform float speed; // = 30


        uniform sampler2D u_Sampler;
        uniform sampler2D u_Sampler1;
        varying lowp vec2 v_TexCoord;
        uniform vec4 shadow_colour; 
        uniform float shadow_height; 
        uniform float bounces; 
        uniform float progress;

        vec4 getToColor(vec2  uv){
            return texture2D(u_Sampler,uv);
        }
        vec4 getFromColor(vec2 uv){
            return texture2D(u_Sampler1,uv);
        }


        vec4 transition (vec2 uv) {
            vec2 dir = uv - vec2(.5);
            float dist = length(dir);

            if (dist > progress) {
                return mix(getFromColor(uv), getToColor(uv), progress);
            } else {
                vec2 offset = dir * sin(dist * amplitude - progress * speed);
                return mix(getFromColor(uv + offset), getToColor(uv), progress);
            }
        }

        void main() {
            gl_FragColor =  transition(v_TexCoord);
        }
    `,assignmentList:[{key:"amplitude",value:[40]},{key:"speed",value:[30]}]},k={vsSource:`
        attribute vec4 a_Position;
        attribute vec2 a_TexCoord;
        varying vec2 v_TexCoord;
        void main() {
            gl_Position =  a_Position;
            v_TexCoord = a_TexCoord;
        }
    `,fsSource:`
        #ifdef GL_ES
        precision mediump float;
        #endif

        uniform vec2 squares;// = vec2(10,10)
        uniform vec2 direction;// = vec2(1.0, -0.5)
        uniform float smoothness; // = 1.6
        const vec2 center = vec2(0.5, 0.5);


        uniform sampler2D u_Sampler;
        uniform sampler2D u_Sampler1;
        varying lowp vec2 v_TexCoord;
        uniform vec4 shadow_colour; 
        uniform float shadow_height; 
        uniform float bounces; 
        uniform float progress;

        vec4 getToColor(vec2  uv){
            return texture2D(u_Sampler,uv);
        }
        vec4 getFromColor(vec2 uv){
            return texture2D(u_Sampler1,uv);
        }


        vec4 transition (vec2 uv) {
            vec2 v = normalize(direction);
            v /= abs(v.x)+abs(v.y);
            float d = v.x * center.x + v.y * center.y;
            float offset = smoothness;
            float pr = smoothstep(-offset, 0.0, v.x * uv.x + v.y * uv.y - (d-0.5+progress*(1.+offset)));
            vec2 squarep = fract(uv*vec2(squares));
            vec2 squaremin = vec2(pr/2.0);
            vec2 squaremax = vec2(1.0 - pr/2.0);
            float a = (1.0 - step(progress, 0.0)) * step(squaremin.x, squarep.x) * step(squaremin.y, squarep.y) * step(squarep.x, squaremax.x) * step(squarep.y, squaremax.y);
            return mix(getFromColor(uv), getToColor(uv), a);
        }

        void main() {
            gl_FragColor =  transition(v_TexCoord);
        }
    `,assignmentList:[{key:"squares",value:[22,18]},{key:"direction",value:[1,-.5]},{key:"smoothness",value:[1.6]}]},U={vsSource:`
        attribute vec4 a_Position;
        attribute vec2 a_TexCoord;
        varying vec2 v_TexCoord;
        void main() {
            gl_Position =  a_Position;
            v_TexCoord = a_TexCoord;
        }
    `,fsSource:`
        #ifdef GL_ES
        precision mediump float;
        #endif
        uniform sampler2D u_Sampler;
        uniform sampler2D u_Sampler1;
        varying lowp vec2 v_TexCoord;
        uniform vec4 shadow_colour; 
        uniform float shadow_height; 
        uniform float bounces; 
        uniform float progress;
        const float PI = 3.14159265358;
        vec4 getToColor(vec2  uv){
            return texture2D(u_Sampler,uv);
        }
        vec4 getFromColor(vec2 uv){
            return texture2D(u_Sampler1,uv);
        }

        vec4 transition (vec2 uv) {
            float x = progress;
            x=smoothstep(.0,1.0,(x*2.0+uv.x-1.0));
            return mix(getFromColor((uv-.5)*(1.-x)+.5), getToColor((uv-.5)*x+.5), x);
        }

        void main() {
            gl_FragColor =  transition(v_TexCoord);
        }
    `,assignmentList:[]},z={vsSource:`
        attribute vec4 a_Position;
        attribute vec2 a_TexCoord;
        varying vec2 v_TexCoord;
        void main() {
            gl_Position =  a_Position;
            v_TexCoord = a_TexCoord;
        }
    `,fsSource:`
        #ifdef GL_ES
        precision mediump float;
        #endif
        uniform sampler2D u_Sampler;
        uniform sampler2D u_Sampler1;
        varying lowp vec2 v_TexCoord;
        uniform vec4 u_color;
        uniform vec4 shadow_colour; 
        uniform float shadow_height; 
        uniform float bounces; 
        uniform float progress;
        uniform float strength; // = 0.4
        const float PI = 3.14159265358;
    
        vec4 getToColor(vec2  uv){
            return texture2D(u_Sampler,uv);
        }
        vec4 getFromColor(vec2 uv){
        return texture2D(u_Sampler1,uv);
        }
    
        float Linear_ease(in float begin, in float change, in float duration, in float time) {
            return change * time / duration + begin;
        }
    
        float Exponential_easeInOut(in float begin, in float change, in float duration, in float time) {
            if (time == 0.0)
                return begin;
            else if (time == duration)
                return begin + change;
            time = time / (duration / 2.0);
            if (time < 1.0)
                return change / 2.0 * pow(2.0, 10.0 * (time - 1.0)) + begin;
            return change / 2.0 * (-pow(2.0, -10.0 * (time - 1.0)) + 2.0) + begin;
        }
    
        float Sinusoidal_easeInOut(in float begin, in float change, in float duration, in float time) {
            return -change / 2.0 * (cos(PI * time / duration) - 1.0) + begin;
        }
    
        float rand (vec2 co) {
            return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
        }
    
        vec3 crossFade(in vec2 uv, in float dissolve) {
            return mix(getFromColor(uv).rgb, getToColor(uv).rgb, dissolve);
        }
    
        vec4 transition (vec2 uv) {
            vec2 texCoord = uv.xy / vec2(1.0).xy;
        
            // Linear interpolate center across center half of the image
            vec2 center = vec2(Linear_ease(0.25, 0.5, 1.0, progress), 0.5);
            float dissolve = Exponential_easeInOut(0.0, 1.0, 1.0, progress);
        
            // Mirrored sinusoidal loop. 0->strength then strength->0
            float strength = Sinusoidal_easeInOut(0.0, strength, 0.5, progress);
        
            vec3 color = vec3(0.0);
            float total = 0.0;
            vec2 toCenter = center - texCoord;
        
            /* randomize the lookup values to hide the fixed number of samples */
            float offset = rand(uv);
        
            for (float t = 0.0; t <= 40.0; t++) {
                float percent = (t + offset) / 40.0;
                float weight = 4.0 * (percent - percent * percent);
                color += crossFade(texCoord + toCenter * percent * strength, dissolve) * weight;
                total += weight;
            }
            return vec4(color / total, 1.0);
        }
        
        void main() {
            gl_FragColor =  transition(v_TexCoord);
        }
    `,assignmentList:[{key:"strength",value:[.4]}]},q={vsSource:`
        attribute vec4 a_Position;
        attribute vec2 a_TexCoord;
        varying vec2 v_TexCoord;
        void main() {
            gl_Position =  a_Position;
            v_TexCoord = a_TexCoord;
        }
    `,fsSource:`
        #ifdef GL_ES
        precision mediump float;
        #endif

        uniform vec2 direction; // = vec2(-1.0, 1.0)
        const float smoothness = 0.5;
        const vec2 center = vec2(0.5, 0.5);


        uniform sampler2D u_Sampler;
        uniform sampler2D u_Sampler1;
        varying lowp vec2 v_TexCoord;
        uniform vec4 shadow_colour; 
        uniform float shadow_height; 
        uniform float bounces; 
        uniform float progress;

        vec4 getToColor(vec2  uv){
            return texture2D(u_Sampler,uv);
        }
        vec4 getFromColor(vec2 uv){
            return texture2D(u_Sampler1,uv);
        }


        vec4 transition (vec2 uv) {
            vec2 v = normalize(direction);
            v /= abs(v.x) + abs(v.y);
            float d = v.x * center.x + v.y * center.y;
            float m = 1.0 - smoothstep(-smoothness, 0.0, v.x * uv.x + v.y * uv.y - (d - 0.5 + progress * (1.0 + smoothness)));
            return mix(getFromColor((uv - 0.5) * (1.0 - m) + 0.5), getToColor((uv - 0.5) * m + 0.5), m);
        }

        void main() {
            gl_FragColor =  transition(v_TexCoord);
        }
    `,assignmentList:[{key:"direction",value:[-1,1]}]},G={vsSource:`
        attribute vec4 a_Position;
        attribute vec2 a_TexCoord;
        varying vec2 v_TexCoord;
        void main() {
            gl_Position =  a_Position;
            v_TexCoord = a_TexCoord;
        }
    `,fsSource:`
        #ifdef GL_ES
        precision mediump float;
        #endif

        uniform sampler2D u_Sampler;
        uniform sampler2D u_Sampler1;
        varying lowp vec2 v_TexCoord;
        uniform vec4 shadow_colour; 
        uniform float shadow_height; 
        uniform float bounces; 
        uniform float progress;

        vec4 getToColor(vec2  uv){
            return texture2D(u_Sampler,uv);
        }
        vec4 getFromColor(vec2 uv){
            return texture2D(u_Sampler1,uv);
        }

        vec2 offset(float progress, float x, float theta) {
            float phase = progress*progress + progress + theta;
            float shifty = 0.03*progress*cos(10.0*(progress+x));
            return vec2(0, shifty);
        }


        vec4 transition (vec2 uv) {
            return mix(getFromColor(uv + offset(progress, uv.x, 0.0)), getToColor(uv + offset(1.0-progress, uv.x, 3.14)), progress);
        }

        void main() {
            gl_FragColor =  transition(v_TexCoord);
        }
    `,assignmentList:[]},O={vsSource:`
        attribute vec4 a_Position;
        attribute vec2 a_TexCoord;
        varying vec2 v_TexCoord;
        void main() {
            gl_Position =  a_Position;
            v_TexCoord = a_TexCoord;
        }
    `,fsSource:`
        #ifdef GL_ES
        precision mediump float;
        #endif

        uniform float size; // = 0.04
        uniform float zoom; // = 50.0
        uniform float colorSeparation; // = 0.3


        uniform sampler2D u_Sampler;
        uniform sampler2D u_Sampler1;
        varying lowp vec2 v_TexCoord;
        uniform vec4 shadow_colour; 
        uniform float shadow_height; 
        uniform float bounces; 
        uniform float progress;

        vec4 getToColor(vec2  uv){
            return texture2D(u_Sampler,uv);
        }
        vec4 getFromColor(vec2 uv){
            return texture2D(u_Sampler1,uv);
        }


        vec4 transition (vec2 uv) {
            float inv = 1. - progress;
            vec2 disp = size*vec2(cos(zoom*uv.x), sin(zoom*uv.y));
            vec4 texTo = getToColor(uv + inv*disp);
            vec4 texFrom = vec4(
                getFromColor(uv + progress*disp*(1.0 - colorSeparation)).r,
                getFromColor(uv + progress*disp).g,
                getFromColor(uv + progress*disp*(1.0 + colorSeparation)).b,
                1.0);
            return texTo*progress + texFrom*inv;
        }

        void main() {
            gl_FragColor =  transition(v_TexCoord);
        }
    `,assignmentList:[{key:"size",value:[.04]},{key:"zoom",value:[50]},{key:"colorSeparation",value:[.3]}]},M={vsSource:`
        attribute vec4 a_Position;
        attribute vec2 a_TexCoord;
        varying vec2 v_TexCoord;
        void main() {
            gl_Position =  a_Position;
            v_TexCoord = a_TexCoord;
        }
    `,fsSource:`
        #ifdef GL_ES
        precision mediump float;
        #endif

        uniform float strength; // = 0.1


        uniform sampler2D u_Sampler;
        uniform sampler2D u_Sampler1;
        varying lowp vec2 v_TexCoord;
        uniform vec4 shadow_colour; 
        uniform float shadow_height; 
        uniform float bounces; 
        uniform float progress;

        vec4 getToColor(vec2  uv){
            return texture2D(u_Sampler,uv);
        }
        vec4 getFromColor(vec2 uv){
            return texture2D(u_Sampler1,uv);
        }


        vec4 transition (vec2 p) {
            vec4 ca = getFromColor(p);
            vec4 cb = getToColor(p);
            
            vec2 oa = (((ca.rg+ca.b)*0.5)*2.0-1.0);
            vec2 ob = (((cb.rg+cb.b)*0.5)*2.0-1.0);
            vec2 oc = mix(oa,ob,0.5)*strength;
            
            float w0 = progress;
            float w1 = 1.0-w0;
            return mix(getFromColor(p+oc*w0), getToColor(p-oc*w1), progress);
        }

        void main() {
            gl_FragColor =  transition(v_TexCoord);
        }
    `,assignmentList:[{key:"strength",value:[.1]}]},B={vsSource:`
        attribute vec4 a_Position;
        attribute vec2 a_TexCoord;
        varying vec2 v_TexCoord;
        void main() {
            gl_Position =  a_Position;
            v_TexCoord = a_TexCoord;
        }
    `,fsSource:`
        #ifdef GL_ES
        precision mediump float;
        #endif
        uniform sampler2D u_Sampler;
        uniform sampler2D u_Sampler1;
        varying lowp vec2 v_TexCoord;
        uniform vec4 shadow_colour; 
        uniform float shadow_height; 
        uniform float bounces; 
        uniform float progress;

        const float PI = 3.14159265358979323;
        uniform float endx; // = 2
        uniform float endy; // = -1

        vec4 getToColor(vec2  uv){
            return texture2D(u_Sampler,uv);
        }
        vec4 getFromColor(vec2 uv){
            return texture2D(u_Sampler1,uv);
        }

        float Rand(vec2 v) {
            return fract(sin(dot(v.xy ,vec2(12.9898,78.233))) * 43758.5453);
        }
        vec2 Rotate(vec2 v, float a) {
            mat2 rm = mat2(cos(a), -sin(a), sin(a), cos(a));
            return rm*v;
        }
        float CosInterpolation(float x) {
            return -cos(x*PI)/2.+.5;
        }

        vec4 transition (vec2 uv) {
            vec2 p = uv.xy / vec2(1.0).xy - .5;
            vec2 rp = p;
            float rpr = (progress*2.-1.);
            float z = -(rpr*rpr*2.) + 3.;
            float az = abs(z);
            rp *= az;
            rp += mix(vec2(.5, .5), vec2(endx + .5, endy + .5), (CosInterpolation(progress) * CosInterpolation(progress)));
            vec2 mrp = mod(rp, 1.);
            vec2 crp = rp;
            bool onEnd = floor(crp.x)==endx&&floor(crp.y)==endy;
            if(!onEnd) {
                float ang = float(int(Rand(floor(crp))*4.))*.5*PI;
                mrp = vec2(.5) + Rotate(mrp-vec2(.5), ang);
            }
            if(onEnd || Rand(floor(crp))>.5) {
                return getToColor(mrp);
            } else {
                return getFromColor(mrp);
            }
        }

        void main() {
            gl_FragColor =  transition(v_TexCoord);
        }
    `,assignmentList:[{key:"endx",value:[2]},{key:"endy",value:[-1]}]},N={vsSource:`
        attribute vec4 a_Position;
        attribute vec2 a_TexCoord;
        varying vec2 v_TexCoord;
        void main() {
            gl_Position =  a_Position;
            v_TexCoord = a_TexCoord;
        }
    `,fsSource:`
        #ifdef GL_ES
        precision mediump float;
        #endif

        uniform float scale; // = 4.0
        uniform float smoothness; // = 0.01

        uniform float seed; // = 12.9898


        uniform sampler2D u_Sampler;
        uniform sampler2D u_Sampler1;
        varying lowp vec2 v_TexCoord;
        uniform vec4 shadow_colour; 
        uniform float shadow_height; 
        uniform float bounces; 
        uniform float progress;

        vec4 getToColor(vec2  uv){
            return texture2D(u_Sampler,uv);
        }
        vec4 getFromColor(vec2 uv){
            return texture2D(u_Sampler1,uv);
        }

        // http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
        float random(vec2 co)
        {
            highp float a = seed;
            highp float b = 78.233;
            highp float c = 43758.5453;
            highp float dt= dot(co.xy ,vec2(a,b));
            highp float sn= mod(dt,3.14);
            return fract(sin(sn) * c);
        }

        // 2D Noise based on Morgan McGuire @morgan3d
        // https://www.shadertoy.com/view/4dS3Wd
        float noise (in vec2 st) {
            vec2 i = floor(st);
            vec2 f = fract(st);

            // Four corners in 2D of a tile
            float a = random(i);
            float b = random(i + vec2(1.0, 0.0));
            float c = random(i + vec2(0.0, 1.0));
            float d = random(i + vec2(1.0, 1.0));

            // Smooth Interpolation

            // Cubic Hermine Curve.  Same as SmoothStep()
            vec2 u = f*f*(3.0-2.0*f);
            // u = smoothstep(0.,1.,f);

            // Mix 4 coorners porcentages
            return mix(a, b, u.x) +
                    (c - a)* u.y * (1.0 - u.x) +
                    (d - b) * u.x * u.y;
        }

        vec4 transition (vec2 uv) {
            vec4 from = getFromColor(uv);
            vec4 to = getToColor(uv);
            float n = noise(uv * scale);
            
            float p = mix(-smoothness, 1.0 + smoothness, progress);
            float lower = p - smoothness;
            float higher = p + smoothness;
            
            float q = smoothstep(lower, higher, n);
            
            return mix(
                from,
                to,
                1.0 - q
            );
        }

        void main() {
            gl_FragColor =  transition(v_TexCoord);
        }
    `,assignmentList:[{key:"scale",value:[4]},{key:"smoothness",value:[.01]},{key:"seed",value:[12.9898]}]},W={vsSource:`
        attribute vec4 a_Position;
        attribute vec2 a_TexCoord;
        varying vec2 v_TexCoord;
        void main() {
            gl_Position =  a_Position;
            v_TexCoord = a_TexCoord;
        }
    `,fsSource:`
        #ifdef GL_ES
        precision mediump float;
        #endif

        uniform vec2 size; // = ivec2(10, 10)
        uniform float smoothness; // = 0.5


        uniform sampler2D u_Sampler;
        uniform sampler2D u_Sampler1;
        varying lowp vec2 v_TexCoord;
        uniform vec4 shadow_colour; 
        uniform float shadow_height; 
        uniform float bounces; 
        uniform float progress;

        vec4 getToColor(vec2  uv){
            return texture2D(u_Sampler,uv);
        }
        vec4 getFromColor(vec2 uv){
            return texture2D(u_Sampler1,uv);
        }

        float rand (vec2 co) {
            return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
        }


        vec4 transition (vec2 uv) {
            float r = rand(floor(vec2(size) * uv));
            float m = smoothstep(0.0, -smoothness, r - (progress * (1.0 + smoothness)));
            return mix(getFromColor(uv), getToColor(uv), m);
        }

        void main() {
            gl_FragColor =  transition(v_TexCoord);
        }
    `,assignmentList:[{key:"size",value:[12,10]},{key:"smoothness",value:[.4]}]},X={vsSource:`
        attribute vec4 a_Position;
        attribute vec2 a_TexCoord;
        varying vec2 v_TexCoord;
        void main() {
            gl_Position =  a_Position;
            v_TexCoord = a_TexCoord;
        }
    `,fsSource:`
        #ifdef GL_ES
        precision mediump float;
        #endif

        uniform float amplitude; // = 100.0
        uniform float speed; // = 50.0


        uniform sampler2D u_Sampler;
        uniform sampler2D u_Sampler1;
        varying lowp vec2 v_TexCoord;
        uniform vec4 shadow_colour; 
        uniform float shadow_height; 
        uniform float bounces; 
        uniform float progress;

        vec4 getToColor(vec2  uv){
            return texture2D(u_Sampler,uv);
        }
        vec4 getFromColor(vec2 uv){
            return texture2D(u_Sampler1,uv);
        }


        vec4 transition (vec2 uv) {
            vec2 dir = uv - vec2(.5);
            float dist = length(dir);
            vec2 offset = dir * (sin(progress * dist * amplitude - progress * speed) + .5) / 30.;
            return mix(
                getFromColor(uv + offset),
                getToColor(uv),
                smoothstep(0.2, 1.0, progress)
            );
        }

        void main() {
            gl_FragColor =  transition(v_TexCoord);
        }
    `,assignmentList:[{key:"amplitude",value:[100]},{key:"speed",value:[50]}]},$={vsSource:`
        attribute vec4 a_Position;
        attribute vec2 a_TexCoord;
        varying vec2 v_TexCoord;
        void main() {
            gl_Position =  a_Position;
            v_TexCoord = a_TexCoord;
        }
    `,fsSource:`
        #ifdef GL_ES
        precision mediump float;
        #endif
        uniform sampler2D u_Sampler;
        uniform sampler2D u_Sampler1;
        varying lowp vec2 v_TexCoord;
        uniform vec4 shadow_colour; 
        uniform float shadow_height; 
        uniform float progress;
        
        uniform float zoom_quickness; // = 0.8
        float nQuick = clamp(zoom_quickness,0.2,1.0);
        
        vec4 getToColor(vec2  uv){
            return texture2D(u_Sampler,uv);
        }
        vec4 getFromColor(vec2 uv){
            return texture2D(u_Sampler1,uv);
        }

        vec2 zoom(vec2 uv, float amount) {
            return 0.5 + ((uv - 0.5) * (1.0-amount));
        }

        vec4 transition (vec2 uv) {
            return mix(
                getFromColor(zoom(uv, smoothstep(0.0, nQuick, progress))),
                getToColor(uv),
               smoothstep(nQuick-0.2, 1.0, progress)
            );
        }

        void main() {
            gl_FragColor =  transition(v_TexCoord);
        }
    `,assignmentList:[{key:"zoom_quickness",value:[.8]}]},V={vsSource:`
        attribute vec4 a_Position;
        attribute vec2 a_TexCoord;
        varying vec2 v_TexCoord;
        void main() {
            gl_Position =  a_Position;
            v_TexCoord = a_TexCoord;
        }
    `,fsSource:`
        #ifdef GL_ES
        precision mediump float;
        #endif
        uniform sampler2D u_Sampler;
        uniform sampler2D u_Sampler1;
        varying lowp vec2 v_TexCoord;
        uniform vec4 shadow_colour; 
        uniform float shadow_height; 
        uniform float progress;
        
        // 自定义uniform
        uniform vec2 direction; // = vec2(0.0, 1.0)
        
        vec4 getToColor(vec2  uv){
            return texture2D(u_Sampler,uv);
        }
        vec4 getFromColor(vec2 uv){
            return texture2D(u_Sampler1,uv);
        }

        vec4 transition (vec2 uv) {
            vec2 p = uv + progress * sign(direction);
            vec2 f = fract(p);
            return mix(
                getToColor(f),
                getFromColor(f),
                step(0.0, p.y) * step(p.y, 1.0) * step(0.0, p.x) * step(p.x, 1.0)
            );
        }

        void main() {
            gl_FragColor =  transition(v_TexCoord);
        }
    `,assignmentList:[{key:"direction",value:[0,1]}],intervalTime:30},H={vsSource:`
        attribute vec4 a_Position;
        attribute vec2 a_TexCoord;
        varying vec2 v_TexCoord;
        void main() {
            gl_Position =  a_Position;
            v_TexCoord = a_TexCoord;
        }
    `,fsSource:`
        #ifdef GL_ES
        precision mediump float;
        #endif
        // 固定
        uniform sampler2D u_Sampler;
        uniform sampler2D u_Sampler1;
        varying lowp vec2 v_TexCoord;
        uniform vec4 shadow_colour; 
        uniform float shadow_height; 
        uniform float progress;
        
        // 自定义uniform
        uniform float count; // = 10.0
        uniform float smoothness; // = 0.5
        
        // 固定方法
        vec4 getToColor(vec2  uv){
            return texture2D(u_Sampler,uv);
        }
        vec4 getFromColor(vec2 uv){
            return texture2D(u_Sampler1,uv);
        }

        vec4 transition (vec2 uv) {
            float pr = smoothstep(-smoothness, 0.0, uv.x - progress * (1.0 + smoothness));
            float s = step(pr, fract(count * uv.x));
            return mix(getFromColor(uv), getToColor(uv), s);
        }

        void main() {
            gl_FragColor =  transition(v_TexCoord);
        }
    `,assignmentList:[{key:"count",value:[20]},{key:"smoothness",value:[.5]}],intervalTime:100},Y={vsSource:`
        attribute vec4 a_Position;
        attribute vec2 a_TexCoord;
        varying vec2 v_TexCoord;
        void main() {
            gl_Position =  a_Position;
            v_TexCoord = a_TexCoord;
        }
    `,fsSource:`
        #ifdef GL_ES
        precision mediump float;
        #endif
        // 固定
        uniform sampler2D u_Sampler;
        uniform sampler2D u_Sampler1;
        varying lowp vec2 v_TexCoord;
        uniform vec4 shadow_colour; 
        uniform float shadow_height; 
        uniform float progress;
        
        // 自定义uniform及其它产量
        uniform float intensity; // = 0.1
        const int passes = 6;
        
        // 固定方法
        vec4 getToColor(vec2  uv){
            return texture2D(u_Sampler,uv);
        }
        vec4 getFromColor(vec2 uv){
            return texture2D(u_Sampler1,uv);
        }

        vec4 transition (vec2 uv) {
            vec4 c1 = vec4(0.0);
            vec4 c2 = vec4(0.0);
        
            float disp = intensity*(0.5-distance(0.5, progress));
            for (int xi=0; xi<passes; xi++)
            {
                float x = float(xi) / float(passes) - 0.5;
                for (int yi=0; yi<passes; yi++)
                {
                    float y = float(yi) / float(passes) - 0.5;
                    vec2 v = vec2(x,y);
                    float d = disp;
                    c1 += getFromColor( uv + d*v);
                    c2 += getToColor( uv + d*v);
                }
            }
            c1 /= float(passes*passes);
            c2 /= float(passes*passes);
            return mix(c1, c2, progress);
        }

        void main() {
            gl_FragColor =  transition(v_TexCoord);
        }
    `,assignmentList:[{key:"intensity",value:[.1]}],intervalTime:90},j={vsSource:`
        attribute vec4 a_Position;
        attribute vec2 a_TexCoord;
        varying vec2 v_TexCoord;
        void main() {
            gl_Position =  a_Position;
            v_TexCoord = a_TexCoord;
        }
    `,fsSource:`
        #ifdef GL_ES
        precision mediump float;
        #endif
        // 固定
        uniform sampler2D u_Sampler;
        uniform sampler2D u_Sampler1;
        varying lowp vec2 v_TexCoord;
        uniform vec4 shadow_colour; 
        uniform float shadow_height; 
        uniform float progress;
        
        // 自定义uniform及其它产量
        const float MIN_AMOUNT = -0.16;
        const float MAX_AMOUNT = 1.5;
        float amount = progress * (MAX_AMOUNT - MIN_AMOUNT) + MIN_AMOUNT;

        const float PI = 3.14;

        const float scale = 512.0;
        const float sharpness = 3.0;

        float cylinderCenter = amount;
        // 360 degrees * amount
        float cylinderAngle = 2.0 * PI * amount;

        const float cylinderRadius = 1.0 / PI / 2.0;
        
        // 固定方法
        vec4 getToColor(vec2  uv){
            return texture2D(u_Sampler,uv);
        }
        vec4 getFromColor(vec2 uv){
            return texture2D(u_Sampler1,uv);
        }

        // 自定义方法
        vec3 hitPoint(float hitAngle, float yc, vec3 point, mat3 rrotation)
        {
            float hitPoint = hitAngle / (2.0 * PI);
            point.y = hitPoint;
            return rrotation * point;
        }

        vec4 antiAlias(vec4 color1, vec4 color2, float distanc)
        {
            distanc *= scale;
            if (distanc < 0.0) return color2;
            if (distanc > 2.0) return color1;
            float dd = pow(1.0 - distanc / 2.0, sharpness);
            return ((color2 - color1) * dd) + color1;
        }

        float distanceToEdge(vec3 point)
        {
            float dx = abs(point.x > 0.5 ? 1.0 - point.x : point.x);
            float dy = abs(point.y > 0.5 ? 1.0 - point.y : point.y);
            if (point.x < 0.0) dx = -point.x;
            if (point.x > 1.0) dx = point.x - 1.0;
            if (point.y < 0.0) dy = -point.y;
            if (point.y > 1.0) dy = point.y - 1.0;
            if ((point.x < 0.0 || point.x > 1.0) && (point.y < 0.0 || point.y > 1.0)) return sqrt(dx * dx + dy * dy);
            return min(dx, dy);
        }

        vec4 seeThrough(float yc, vec2 p, mat3 rotation, mat3 rrotation)
        {
            float hitAngle = PI - (acos(yc / cylinderRadius) - cylinderAngle);
            vec3 point = hitPoint(hitAngle, yc, rotation * vec3(p, 1.0), rrotation);
            if (yc <= 0.0 && (point.x < 0.0 || point.y < 0.0 || point.x > 1.0 || point.y > 1.0))
            {
                return getToColor(p);
            }

            if (yc > 0.0) return getFromColor(p);

            vec4 color = getFromColor(point.xy);
            vec4 tcolor = vec4(0.0);

            return antiAlias(color, tcolor, distanceToEdge(point));
        }

        vec4 seeThroughWithShadow(float yc, vec2 p, vec3 point, mat3 rotation, mat3 rrotation)
        {
            float shadow = distanceToEdge(point) * 30.0;
            shadow = (1.0 - shadow) / 3.0;

            if (shadow < 0.0) shadow = 0.0; else shadow *= amount;

            vec4 shadowColor = seeThrough(yc, p, rotation, rrotation);
            shadowColor.r -= shadow;
            shadowColor.g -= shadow;
            shadowColor.b -= shadow;

            return shadowColor;
        }

        vec4 backside(float yc, vec3 point)
        {
            vec4 color = getFromColor(point.xy);
            float gray = (color.r + color.b + color.g) / 15.0;
            gray += (8.0 / 10.0) * (pow(1.0 - abs(yc / cylinderRadius), 2.0 / 10.0) / 2.0 + (5.0 / 10.0));
            color.rgb = vec3(gray);
            return color;
        }

        vec4 behindSurface(vec2 p, float yc, vec3 point, mat3 rrotation)
        {
            float shado = (1.0 - ((-cylinderRadius - yc) / amount * 7.0)) / 6.0;
            shado *= 1.0 - abs(point.x - 0.5);

            yc = (-cylinderRadius - cylinderRadius - yc);

            float hitAngle = (acos(yc / cylinderRadius) + cylinderAngle) - PI;
            point = hitPoint(hitAngle, yc, point, rrotation);

            if (yc < 0.0 && point.x >= 0.0 && point.y >= 0.0 && point.x <= 1.0 && point.y <= 1.0 && (hitAngle < PI || amount > 0.5))
            {
                    shado = 1.0 - (sqrt(pow(point.x - 0.5, 2.0) + pow(point.y - 0.5, 2.0)) / (71.0 / 100.0));
                    shado *= pow(-yc / cylinderRadius, 3.0);
                    shado *= 0.5;
            }
            else
            {
                    shado = 0.0;
            }
            return vec4(getToColor(p).rgb - shado, 1.0);
        }

        vec4 transition (vec2 uv) {
            const float angle = 100.0 * PI / 180.0;
            float c = cos(-angle);
            float s = sin(-angle);
    
            mat3 rotation = mat3( c, s, 0, -s, c, 0, -0.801, 0.8900, 1 );
            c = cos(angle);
            s = sin(angle);
    
            mat3 rrotation = mat3( c, s, 0, -s, c, 0, 0.98500, 0.985, 1 );
    
            vec3 point = rotation * vec3(uv, 1.0);
    
            float yc = point.y - cylinderCenter;
    
            if (yc < -cylinderRadius)
            {
                // Behind surface
                return behindSurface(uv,yc, point, rrotation);
            }
    
            if (yc > cylinderRadius)
            {
                // Flat surface
                return getFromColor(uv);
            }
    
            float hitAngle = (acos(yc / cylinderRadius) + cylinderAngle) - PI;
    
            float hitAngleMod = mod(hitAngle, 2.0 * PI);
            if ((hitAngleMod > PI && amount < 0.5) || (hitAngleMod > PI/2.0 && amount < 0.0))
            {
                return seeThrough(yc, uv, rotation, rrotation);
            }
    
            point = hitPoint(hitAngle, yc, point, rrotation);
    
            if (point.x < 0.0 || point.y < 0.0 || point.x > 1.0 || point.y > 1.0)
            {
                return seeThroughWithShadow(yc, uv, point, rotation, rrotation);
            }
    
            vec4 color = backside(yc, point);
    
            vec4 otherColor;
            if (yc < 0.0)
            {
                float shado = 1.0 - (sqrt(pow(point.x - 0.5, 2.0) + pow(point.y - 0.5, 2.0)) / 0.71);
                shado *= pow(-yc / cylinderRadius, 3.0);
                shado *= 0.5;
                otherColor = vec4(0.0, 0.0, 0.0, shado);
            }
            else
            {
                otherColor = getFromColor(uv);
            }
    
            color = antiAlias(color, otherColor, cylinderRadius - abs(yc));
    
            vec4 cl = seeThroughWithShadow(yc, uv, point, rotation, rrotation);
            float dist = distanceToEdge(point);
    
            return antiAlias(color, cl, dist);
        }

        void main() {
            gl_FragColor =  transition(v_TexCoord);
        }
    `,assignmentList:[],intervalTime:90},Q={vsSource:`
        attribute vec4 a_Position;
        attribute vec2 a_TexCoord;
        varying vec2 v_TexCoord;
        void main() {
            gl_Position =  a_Position;
            v_TexCoord = a_TexCoord;
        }
    `,fsSource:`
        #ifdef GL_ES
        precision mediump float;
        #endif
        // 固定
        uniform sampler2D u_Sampler;
        uniform sampler2D u_Sampler1;
        varying lowp vec2 v_TexCoord;
        uniform vec4 shadow_colour; 
        uniform float shadow_height; 
        uniform float progress;
        
        // 自定义uniform及其它产量
        
        // 固定方法
        vec4 getToColor(vec2  uv){
            return texture2D(u_Sampler,uv);
        }
        vec4 getFromColor(vec2 uv){
            return texture2D(u_Sampler1,uv);
        }

        vec4 transition (vec2 uv) {
          vec2 block = floor(uv.xy / vec2(16));
          vec2 uv_noise = block / vec2(64);
          uv_noise += floor(vec2(progress) * vec2(1200.0, 3500.0)) / vec2(64);
          vec2 dist = progress > 0.0 ? (fract(uv_noise) - 0.5) * 0.3 *(1.0 -progress) : vec2(0.0);
          vec2 red = uv + dist * 0.2;
          vec2 green = uv + dist * .3;
          vec2 blue = uv + dist * .5;
        
          return vec4(mix(getFromColor(red), getToColor(red), progress).r,mix(getFromColor(green), getToColor(green), progress).g,mix(getFromColor(blue), getToColor(blue), progress).b,1.0);
        }

        void main() {
            gl_FragColor =  transition(v_TexCoord);
        }
    `,assignmentList:[],intervalTime:100},Z={vsSource:`
        attribute vec4 a_Position;
        attribute vec2 a_TexCoord;
        varying vec2 v_TexCoord;
        void main() {
            gl_Position =  a_Position;
            v_TexCoord = a_TexCoord;
        }
    `,fsSource:`
        #ifdef GL_ES
        precision mediump float;
        #endif
        // 固定
        uniform sampler2D u_Sampler;
        uniform sampler2D u_Sampler1;
        varying lowp vec2 v_TexCoord;
        uniform vec4 shadow_colour; 
        uniform float shadow_height; 
        uniform float progress;
        
        // 自定义uniform及其它产量
        const float SQRT_2 = 1.414213562373;
        uniform float dots;// = 20.0;
        uniform vec2 center;// = vec2(0, 0);
        
        // 固定方法
        vec4 getToColor(vec2  uv){
            return texture2D(u_Sampler,uv);
        }
        vec4 getFromColor(vec2 uv){
            return texture2D(u_Sampler1,uv);
        }

        vec4 transition (vec2 uv) {
            bool nextImage = distance(fract(uv * dots), vec2(0.5, 0.5)) < ( progress / distance(uv, center));
            return nextImage ? getToColor(uv) : getFromColor(uv);
        }

        void main() {
            gl_FragColor =  transition(v_TexCoord);
        }
    `,assignmentList:[{key:"dots",value:[20]},{key:"center",value:[0,0]}],intervalTime:100},de=a=>(se("data-v-f0fb8ff2"),a=a(),ae(),a),fe={class:"separate-example-container"},ge=de(()=>_("h3",null,"Separate example",-1)),E="webgl-transition demo(V1.3.1)",pe=y({__name:"separate-example",setup(a){const e={wind:R,waterDrop:A,squaresWire:k,crossWarp:U,crossZoom:z,directionalWarp:q,dreamy:G,flyEye:O,morph:M,mosaic:B,perlin:N,randomSquares:W,ripple:X,simpleZoom:$,directional:V,windowSlice:H,invertedPageCurl:j,linearBlur:Y,glitchMemories:Q,polkaDotsCurtain:Z},o=p(),t=oe();let r=K.map((n,d)=>(n.id=`webgl-transition-parent-${Math.random().toString().slice(2,10)}${d}`,n));const s="https://images.pexels.com/photos/",l=[`${s}127028/pexels-photo-127028.jpeg`,`${s}236660/pexels-photo-236660.jpeg`];let i;const c=p(),v=async n=>{var d,w,b,L;if((i==null?void 0:i.playStatus)==="pause"&&((d=c.value)==null?void 0:d.id)===n.id)i==null||i.continue();else if((i==null?void 0:i.playStatus)==="stop"||((w=c.value)==null?void 0:w.id)!=n.id){if(c.value){const f=document.querySelector(`#${(b=c.value)==null?void 0:b.id}`);if(f){const g=f.children;for(let x=g.length-1;x>=0;x--)J.webglTransitionParent.pattern.test(g[x].id)&&f.removeChild(g[x])}}i==null||i.stop(),i==null||i.dispose(),ee(n.playPicList,f=>{const g={parentId:`#${n.id}`,transitionList:[e[n.title]],playPicUrlList:[...l],playPicList:f,watchResize:!0};i=new I(g),i==null||i.main(),c.value=n})}else(i==null?void 0:i.playStatus)==="playing"&&((L=c.value)==null?void 0:L.id)===n.id&&(i==null||i.pause())},u=()=>{t.push("/view-code")};return D(()=>{i==null||i.stop(),i==null||i.dispose(),console.log("separate-example释放webglTransitions",i)}),(n,d)=>(T(),S("div",fe,[_("h1",{class:"main-title"},te(E)),ge,_("p",null,[re(" Each is a separate instance showing a different transition animation effect. "),_("a",{onClick:u,class:"cursor"},"(documentation)")]),C(ie,{ref_key:"gridLayoutRef",ref:o,title:E,list:F(r),onOnClickGrid:v},null,8,["list"])]))}});const _e=P(pe,[["__scopeId","data-v-f0fb8ff2"]]),xe=y({__name:"batches-example",setup(a){let e;const o=p(),t=p(0),r=p(0),s=()=>{t.value=o.value?o.value.clientWidth:0},l=()=>{var c;r.value=o.value?Number(((c=o.value)==null?void 0:c.clientWidth)*2400/3600):0};ne(()=>{s(),l(),le(()=>{const c="https://images.pexels.com/photos/",v=[`${c}127028/pexels-photo-127028.jpeg`,`${c}236660/pexels-photo-236660.jpeg`],u={parentId:"#glcanvas",transitionList:[R,A,k,U,z,q,G,O,M,B,N,W,X,$,V,H,j,Y,Q,Z],playPicUrlList:v,playPicList:[],carouselTime:1e3,watchResize:!1};e=new I(u),e==null||e.main();const n=new ResizeObserver(ce(()=>{s(),l(),console.log("大小变化"),e==null||e.onResize({width:t.value,height:r.value})},300));o.value&&n.observe(o.value)})});const i=()=>{e==null||e.stop(),e==null||e.dispose(),console.log("batches-example释放webglTransitions",e)};return D(()=>{i()}),(c,v)=>(T(),S("div",null,[_("div",{ref_key:"glcanvasRef",ref:o,id:"glcanvas",style:ue({width:"100vw",height:F(r)+"px"})},null,4)]))}});const Ce=P(xe,[["__scopeId","data-v-ef24089c"]]),ye={class:"webgl-transition-demo--container ptb24"},Te=y({__name:"webgl-transition-demo",setup(a){return(e,o)=>(T(),S("div",ye,[C(Ce),C(_e)]))}});const we=P(Te,[["__scopeId","data-v-faa446ff"]]);export{we as default};
