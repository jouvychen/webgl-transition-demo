import{l as V,R as Y,a as Q}from"./constant-7a89e202.js";import{d as _,r as y,o as S,a as x,c as C,b as f,t as j,e as Z,f as p,u as P,g as K,p as J,h as ee,i as oe,_ as b,j as T,k as te,n as re}from"./index-3f91c474.js";const ie={isNetworkImageLoose:{pattern:/^(http:\/\/|https:\/\/).*$/,msg:"不是网络图片，不以http://或https://开头"},webglTransitionParent:{pattern:/^(webgl-transition-).*$/}},se=c=>Array.isArray(c)&&c.every(e=>typeof e=="string");var ae=globalThis&&globalThis.__awaiter||function(c,e,r,o){function a(t){return t instanceof r?t:new r(function(i){i(t)})}return new(r||(r=Promise))(function(t,i){function u(n){try{s(o.next(n))}catch(m){i(m)}}function v(n){try{s(o.throw(n))}catch(m){i(m)}}function s(n){n.done?t(n.value):a(n.value).then(u,v)}s((o=o.apply(c,e||[])).next())})};class w{constructor(e,r,o,a){var t;this.loadImageSelf=!1,this.numberOfLostContext=0,this.analogLossContentCounts=0,this.parent={domId:"",width:void 0,height:void 0},this.parentId="",this.canvasId="",this.canvas=null,this.vertexShader=null,this.fragmentShader=null,this.firstInit=!0,this.timer=void 0,this.intervalTime=100,this.vsSource="",this.fsSource="",this.assignmentList=[],this.textures=[],this.playIndex=0,this.playPicIndex=0,this.playPicList=[],this.playPicPreloadList=[],this.stopPlaying=!1,this.shaderProgram=null,this.vertexBuffer=null,this.checkInitResource(e.domId,r,o),this.canvasId=`webgl-transition-${Math.random().toString().slice(2,10)}`,this.parentId=e.domId,this.parent.domId=e.domId,this.parent.width=typeof e.width=="string"?Number(e.width):e.width,this.parent.height=typeof e.height=="string"?Number(e.height):e.height,this.canvas=document.createElement("canvas"),this.canvas.id=this.canvasId;const i=document.querySelector(e.domId);if(this.parent.width&&this.parent.height){const{clientWidth:v,clientHeight:s}={clientWidth:this.parent.width,clientHeight:this.parent.height};this.canvas.width=v,this.canvas.height=s}else{const{clientWidth:v,clientHeight:s}=i||{clientWidth:1920,clientHeight:1080};this.canvas.width=v,this.canvas.height=s}(t=document.querySelector(e.domId))===null||t===void 0||t.appendChild(this.canvas);let u=this;if(this.canvas.addEventListener("webglcontextlost",function(v){console.log("WebGL上下文丢失"),v.preventDefault(),console.log("3秒后重新渲染"),setTimeout(()=>{u.restart()},3e3)},!1),this.gl=this.canvas.getContext("webgl"),this.transitionList=r,se(o)?this.playPicList=o:this.asyncLoadImageSelf(o),this.carouselTime=a||3e3,!this.gl){console.error("无法初始化WebGL, 您的浏览器或机器可能不支持它。");return}}checkInitResource(e,r,o){if(!e||typeof e!="string")throw new Error("WebglTransitions初始化失败, 缺少Dom元素ID");if((r==null?void 0:r.length)<1)throw new Error("WebglTransitions初始化失败, 至少需要1种转场动画");if((o==null?void 0:o.length)===0)throw new Error("WebglTransitions初始化失败, 缺少参数playPicList转场图片");if((o==null?void 0:o.length)<2)throw new Error("至少需要2张图片")}asyncLoadImage(){return new Promise(e=>{for(let r=0;r<this.playPicList.length;r++){const o=new Image;o.src=this.playPicList[r],o.setAttribute("crossOrigin","Anonymous"),o.onload=()=>{this.playPicPreloadList.push(o),this.playPicPreloadList.length===this.playPicList.length&&e(1)}}})}asyncLoadImageSelf(e){this.loadImageSelf=!0,this.playPicPreloadList=e}creatFirstTexture(){if(!this.gl)return;const e=this.createTexture(this.gl.LINEAR,this.playPicPreloadList[this.playPicIndex]);this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,e),e&&this.textures.push(e)}creatSecondTexture(){if(!this.gl)return;const e=this.createTexture(this.gl.LINEAR,this.playPicPreloadList[this.playPicIndex+1===this.playPicPreloadList.length?0:this.playPicIndex+1]);this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,e),e&&this.textures.push(e)}main(){return ae(this,void 0,void 0,function*(){if(!this.gl)return;const e=this.transitionList[this.playIndex];if(this.intervalTime=e.intervalTime||100,this.vsSource=e.vsSource,this.fsSource=e.fsSource,this.assignmentList=e.assignmentList,this.initShaderProgram(),!this.shaderProgram)return console.log("shaderProgram初始化失败"),!1;this.firstInit&&(this.gl.clearColor(0,0,0,0),this.gl.clearDepth(1),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT),this.firstInit=!1),this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.gl.useProgram(this.shaderProgram);const r=new Float32Array([-1,1,0,1,-1,-1,0,0,1,1,1,1,1,-1,1,0]),o=r.BYTES_PER_ELEMENT;this.vertexBuffer=this.gl.createBuffer(),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.vertexBuffer),this.gl.bufferData(this.gl.ARRAY_BUFFER,r,this.gl.STATIC_DRAW);const a=this.gl.getAttribLocation(this.shaderProgram,"a_Position"),t=this.gl.getAttribLocation(this.shaderProgram,"a_TexCoord");this.gl.vertexAttribPointer(a,2,this.gl.FLOAT,!1,o*4,0),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,o*4,o*2),this.gl.enableVertexAttribArray(a),this.gl.enableVertexAttribArray(t);const i=this.gl.getUniformLocation(this.shaderProgram,"u_color");this.gl.uniform4f(i,1,1,1,1);const u=this.gl.getUniformLocation(this.shaderProgram,"u_Sampler"),v=this.gl.getUniformLocation(this.shaderProgram,"u_Sampler1"),s=this.gl.getUniformLocation(this.shaderProgram,"shadow_colour"),n=this.gl.getUniformLocation(this.shaderProgram,"shadow_height"),m=this.gl.getUniformLocation(this.shaderProgram,"bounces");this.gl.uniform4f(s,0,0,0,.6),this.gl.uniform1f(n,.075),this.gl.uniform1f(m,3),!this.loadImageSelf&&this.playPicPreloadList.length!=this.playPicList.length&&(yield Promise.all([this.asyncLoadImage()])),this.textures.length===2&&(this.gl.deleteTexture(this.textures[1]),this.gl.deleteTexture(this.textures[0]),this.textures=[]),this.creatFirstTexture(),this.creatSecondTexture(),this.gl.uniform1i(u,0),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.textures[1]),this.gl.uniform1i(v,1),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.textures[0]);let h=0;this.timer&&clearInterval(this.timer),this.timer=setInterval(()=>{if(this.gl&&this.textures.length===2){if(!this.shaderProgram){console.error("shaderProgram失败");return}const d=this.gl.getUniformLocation(this.shaderProgram,"progress");this.gl.uniform1f(d,h);for(let g=0;g<this.assignmentList.length;g++){const l=this.assignmentList[g];switch(l.value.length){case 1:this.gl.uniform1f(this.gl.getUniformLocation(this.shaderProgram,l.key),l.value[0]);break;case 2:this.gl.uniform2f(this.gl.getUniformLocation(this.shaderProgram,l.key),l.value[0],l.value[1]);break;case 3:this.gl.uniform3f(this.gl.getUniformLocation(this.shaderProgram,l.key),l.value[0],l.value[1],l.value[2]);break;case 4:this.gl.uniform4f(this.gl.getUniformLocation(this.shaderProgram,l.key),l.value[0],l.value[1],l.value[2],l.value[3]);break}}if(this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),h>=1&&(this.timer&&clearInterval(this.timer),h=0,this.playPicIndex===this.playPicPreloadList.length-1?this.playPicIndex=0:this.playPicIndex+=1,this.playIndex===this.transitionList.length-1?(this.playIndex=0,setTimeout(()=>{this.main()},this.carouselTime)):(this.playIndex+=1,setTimeout(()=>{this.main()},this.carouselTime))),h+=.02,!this.gl||this.stopPlaying)return}},this.intervalTime)})}initShaderProgram(){if(this.loadVertexShader(this.vsSource),this.loadFragmentShader(this.fsSource),!this.vertexShader||!this.fragmentShader||!this.gl)return!1;if(this.shaderProgram=this.gl.createProgram(),!this.shaderProgram)return console.log("createProgram失败，可能上下文丢失",this.vertexShader,this.fragmentShader,this.shaderProgram),!1;if(this.gl.attachShader(this.shaderProgram,this.vertexShader),this.gl.attachShader(this.shaderProgram,this.fragmentShader),this.gl.linkProgram(this.shaderProgram),!this.gl.getProgramParameter(this.shaderProgram,this.gl.LINK_STATUS))return null}createTexture(e,r){if(!this.gl)return!1;const o=this.gl.createTexture();return this.gl.bindTexture(this.gl.TEXTURE_2D,o),this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,1),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,e),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,e),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,r),o}loadVertexShader(e){this.gl&&(this.vertexShader||(this.vertexShader=this.gl.createShader(this.gl.VERTEX_SHADER)),this.gl.shaderSource(this.vertexShader,e),this.gl.compileShader(this.vertexShader),this.gl.getShaderParameter(this.vertexShader,this.gl.COMPILE_STATUS)||(console.error("编译顶点着色器时发生错误: ",this.gl.getShaderInfoLog(this.vertexShader)),this.gl.deleteShader(this.vertexShader)))}loadFragmentShader(e){this.gl&&(this.fragmentShader||(this.fragmentShader=this.gl.createShader(this.gl.FRAGMENT_SHADER)),this.gl.shaderSource(this.fragmentShader,e),this.gl.compileShader(this.fragmentShader),this.gl.getShaderParameter(this.fragmentShader,this.gl.COMPILE_STATUS)||(console.error("编译片元着色器时发生错误: ",this.gl.getShaderInfoLog(this.fragmentShader)),this.gl.deleteShader(this.fragmentShader),console.log("500ms后重新渲染"),setTimeout(()=>{this.restart()},500)))}simulatedLostContext(){if(this.gl&&this.gl.getExtension("WEBGL_lose_context")){if(++this.analogLossContentCounts,!this.gl||this.analogLossContentCounts>1)return;const e=this.gl.getExtension("WEBGL_lose_context");e&&e.loseContext(),console.clear(),console.log("模拟丢失"),this.timer&&clearInterval(this.timer),this.numberOfLostContext=0;return}}stop(){this.stopPlaying=!0,this.timer&&clearInterval(this.timer)}restart(){var e;this.dispose();let r=this;console.log("restart webgl transition..."),this.analogLossContentCounts=0;const o=document.querySelector(this.parentId);if(o){const t=o.children;for(let i=t.length-1;i>=0;i--)ie.webglTransitionParent.pattern.test(t[i].id)&&o.removeChild(t[i])}this.canvasId=`webgl-transition-${Math.random().toString().slice(2,10)}`,this.canvas=document.createElement("canvas"),this.canvas.id=this.canvasId;const a=document.querySelector(this.parentId);if((e=document.querySelector(this.parentId))===null||e===void 0||e.appendChild(this.canvas),this.canvas.width=a?a.clientWidth:1920,this.canvas.height=a?a.clientHeight:1080,this.canvas.addEventListener("webglcontextlost",function(){++r.numberOfLostContext,!(r.numberOfLostContext>1)&&(console.log("2次监听"),r.restart())}),this.gl=this.canvas.getContext("webgl"),!this.gl){console.error("无法重新初始化WebGL, 您的浏览器或机器可能不支持它。");return}setTimeout(()=>{this.main()},1e3)}dispose(){this.gl&&(this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null),this.vertexBuffer&&this.gl.deleteBuffer(this.vertexBuffer),this.vertexBuffer&&(this.vertexBuffer=null),this.gl.deleteProgram(this.shaderProgram),this.gl.deleteShader(this.vertexShader),this.gl.deleteShader(this.fragmentShader),this.gl.deleteTexture(this.textures[1]),this.gl.deleteTexture(this.textures[0])),this.firstInit=!0,this.vsSource="",this.fsSource="",this.playPicPreloadList=[],this.shaderProgram=null,this.vertexShader=null,this.fragmentShader=null,this.gl=null,this.textures=[],this.playIndex=0,this.playPicIndex=0,this.canvas=null}}const E={vsSource:`
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
    `,assignmentList:[{key:"size",value:[.2]}]},D={vsSource:`
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
    `,assignmentList:[{key:"amplitude",value:[40]},{key:"speed",value:[30]}]},L={vsSource:`
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
    `,assignmentList:[{key:"squares",value:[22,18]},{key:"direction",value:[1,-.5]},{key:"smoothness",value:[1.6]}]},I={vsSource:`
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
    `,assignmentList:[]},F={vsSource:`
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
    `,assignmentList:[{key:"strength",value:[.4]}]},R={vsSource:`
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
    `,assignmentList:[{key:"direction",value:[-1,1]}]},A={vsSource:`
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
    `,assignmentList:[]},k={vsSource:`
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
    `,assignmentList:[{key:"size",value:[.04]},{key:"zoom",value:[50]},{key:"colorSeparation",value:[.3]}]},U={vsSource:`
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
    `,assignmentList:[{key:"strength",value:[.1]}]},G={vsSource:`
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
    `,assignmentList:[{key:"endx",value:[2]},{key:"endy",value:[-1]}]},z={vsSource:`
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
    `,assignmentList:[{key:"scale",value:[4]},{key:"smoothness",value:[.01]},{key:"seed",value:[12.9898]}]},q={vsSource:`
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
    `,assignmentList:[{key:"size",value:[12,10]},{key:"smoothness",value:[.4]}]},B={vsSource:`
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
    `,assignmentList:[{key:"amplitude",value:[100]},{key:"speed",value:[50]}]},M={vsSource:`
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
    `,assignmentList:[{key:"zoom_quickness",value:[.8]}]},W={vsSource:`
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
    `,assignmentList:[{key:"direction",value:[0,1]}],intervalTime:30},N={vsSource:`
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
    `,assignmentList:[{key:"count",value:[20]},{key:"smoothness",value:[.5]}],intervalTime:100},O={vsSource:`
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
    `,assignmentList:[{key:"intensity",value:[.1]}],intervalTime:90},X={vsSource:`
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
    `,assignmentList:[],intervalTime:90},$={vsSource:`
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
    `,assignmentList:[],intervalTime:100},H={vsSource:`
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
    `,assignmentList:[{key:"dots",value:[20]},{key:"center",value:[0,0]}],intervalTime:100},ne=c=>(J("data-v-88a2bef9"),c=c(),ee(),c),le={class:"separate-example-container"},ce=ne(()=>f("h3",null,"Separate example",-1)),ue=_({__name:"separate-example",setup(c){const e={wind:E,waterDrop:D,squaresWire:L,crossWarp:I,crossZoom:F,directionalWarp:R,dreamy:A,flyEye:k,morph:U,mosaic:G,perlin:z,randomSquares:q,ripple:B,simpleZoom:M,directional:W,windowSlice:N,invertedPageCurl:X,linearBlur:O,glitchMemories:$,polkaDotsCurtain:H},r=oe();let o=V.map((s,n)=>(s.id=`webgl-transition-parent-${Math.random().toString().slice(2,10)}${n}`,s));const a="webgl-transition demo(V1.2.0)";let t;const i=y(),u=async s=>{var m;t==null||t.stop(),t==null||t.dispose();const n=document.querySelector(`#${(m=i.value)==null?void 0:m.id}`);if(n){const h=n.children;for(let d=h.length-1;d>=0;d--)Y.webglTransitionParent.pattern.test(h[d].id)&&n.removeChild(h[d])}Q(s.playPicList,h=>{t=new w({domId:`#${s.id}`},[e[s.title]],h),t==null||t.main(),i.value=s})},v=()=>{r.push("/view-code")};return S(()=>{t==null||t.stop(),t==null||t.dispose(),console.log("separate-example释放webglTransitions",t)}),(s,n)=>{const m=K("grid-layout");return x(),C("div",le,[f("h1",{class:"main-title"},j(a)),ce,f("p",null,[Z(" Each is a separate instance showing a different transition animation effect. "),f("a",{onClick:v,class:"cursor"},"(documentation)")]),p(m,{title:a,list:P(o),onOnClickGrid:u},null,8,["list"])])}}});const ve=b(ue,[["__scopeId","data-v-88a2bef9"]]),me=_({__name:"batches-example",setup(c){let e;const r=y(),o=T(()=>{var i;return(i=r.value)==null?void 0:i.clientWidth}),a=T(()=>{var u;return r.value?Number(((u=r.value)==null?void 0:u.clientWidth)*1080/1920):0});te(()=>{const i=["http://pic4.zhimg.com/v2-02ae8129fed6feadc1514fd861a44a2f_r.jpg","http://pic1.zhimg.com/v2-aa528fcd1a5ff3ba4a4a8429d3c11222_r.jpg","http://pic1.zhimg.com/v2-4ce925afd994d72a16276bc7fbddf97c_r.jpg"];e=new w({domId:"#glcanvas",width:o.value,height:a.value},[E,D,L,I,F,R,A,k,U,G,z,q,B,M,W,N,X,O,$,H],i),e==null||e.main()});const t=()=>{e==null||e.stop(),e==null||e.dispose(),console.log("batches-example释放webglTransitions",e)};return S(()=>{t()}),(i,u)=>(x(),C("div",null,[f("div",{ref_key:"glcanvasRef",ref:r,id:"glcanvas",style:re({width:"100%",height:P(a)+"px"})},null,4)]))}}),he={class:"webgl-transition-demo--container ptb24"},de=_({__name:"webgl-transition-demo",setup(c){return(e,r)=>(x(),C("div",he,[p(me),p(ve)]))}});const _e=b(de,[["__scopeId","data-v-faa446ff"]]);export{_e as default};
