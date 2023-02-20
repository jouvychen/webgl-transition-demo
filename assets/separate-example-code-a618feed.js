import{b as g,s as y,c as $,d as L}from"./constant-7a89e202.js";import{d as v,a as c,c as r,b as a,e,F as S,l as C,t as b,u as d,m as T,q as w,p as _,h as p,_ as u,r as I,w as j,v as P,f as l,g as k}from"./index-70ee3688.js";const n=t=>(_("data-v-394fdd23"),t=t(),p(),t),W={class:"api-caution"},M=w('<h2 class="h2" data-v-394fdd23>Constructor</h2><h3 class="h3" data-v-394fdd23> WebglTransitions( parent:<a class="param links" data-v-394fdd23>ParentDom</a>, transitionList:<a class="param links" data-v-394fdd23>Transition[]</a>, playPicList:<a class="param links" data-v-394fdd23>string[] | HTMLImageElement[]</a>, carouselTime?:<a class="param links" data-v-394fdd23>number</a>) </h3>',2),E=n(()=>a("a",{class:"links"},"parent",-1)),N=n(()=>a("br",null,null,-1)),V=n(()=>a("a",{class:"links"},"transitionList",-1)),z=n(()=>a("br",null,null,-1)),D={key:0},G=n(()=>a("br",null,null,-1)),B=n(()=>a("a",{class:"links"},"playPicList",-1)),H=n(()=>a("br",null,null,-1)),R=n(()=>a("a",{class:"links"},"carouselTime",-1)),q=n(()=>a("b",null,"Unit",-1)),A=n(()=>a("a",null,"ms",-1)),O=n(()=>a("b",null,"Default",-1)),F=n(()=>a("a",null,"3000",-1)),U=n(()=>a("br",null,null,-1)),J=n(()=>a("br",null,null,-1)),K=w('<h2 class="h2" data-v-394fdd23>Properties</h2><p data-v-394fdd23> See all properties in webgl-transition <a class="links" href="https://github.com/jouvychen/webgl-transition/blob/master/lib/index.ts" target="_blank" data-v-394fdd23>index.ts</a></p><div data-v-394fdd23><a class="links" data-v-394fdd23>.canvas</a>: HTMLCanvasElement.</div><div data-v-394fdd23><a class="links" data-v-394fdd23>.vsSource</a>: vertex shader source.</div><div data-v-394fdd23><a class="links" data-v-394fdd23>.fsSource</a>: fragment shader source.</div><div data-v-394fdd23><a class="links" data-v-394fdd23>.vertexShader</a>: vertex Shader, a WebGLShader.</div><div data-v-394fdd23><a class="links" data-v-394fdd23>.fragmentShader</a>: fragment Shader, a WebGLShader. </div><div data-v-394fdd23><a class="links" data-v-394fdd23>.shaderProgram</a>: WebGLProgram.</div><div data-v-394fdd23><a class="links" data-v-394fdd23>.vertexBuffer</a>: WebGLBuffer.</div><div data-v-394fdd23><a class="links" data-v-394fdd23>.gl</a>: WebGLRenderingContext.</div><div data-v-394fdd23><a class="links" data-v-394fdd23>.playPicPreloadList</a>: store preloaded images.</div><div data-v-394fdd23><a class="links" data-v-394fdd23>.textures</a>: take out 2 images from playPicPreloadList to create textures every times. </div><div data-v-394fdd23><a class="links" data-v-394fdd23>.stopPlaying</a>: indicates whether the current state is stopped. </div><div data-v-394fdd23><a class="links" data-v-394fdd23>.assignmentList</a>: set uniform parameters.</div><h2 class="h2" data-v-394fdd23>Methods</h2><p data-v-394fdd23> See all methods in webgl-transition <a class="links" href="https://github.com/jouvychen/webgl-transition/blob/master/lib/index.ts" target="_blank" data-v-394fdd23>index.ts</a></p><h3 class="h3" data-v-394fdd23> .<a class="links" data-v-394fdd23>main</a> ( ) : <span class="param" data-v-394fdd23>undefined</span></h3><p data-v-394fdd23>Create webgl content and start the animation.</p><h3 class="h3" data-v-394fdd23> .<a class="links" data-v-394fdd23>simulatedLostContext</a> () : <span class="param" data-v-394fdd23>undefined</span></h3><p data-v-394fdd23> Simulate lost webgl context, canvas will catch the webglcontextlost event and restarts main method in few seconds. </p><h3 class="h3" data-v-394fdd23> .<a class="links" data-v-394fdd23>stop</a> () : <span class="param" data-v-394fdd23>undefined</span></h3><p data-v-394fdd23>Call clearInterval method but no dispose webgl content.</p><h3 class="h3" data-v-394fdd23> .<a class="links" data-v-394fdd23>dispose</a> () : <span class="param" data-v-394fdd23>undefined</span></h3><p data-v-394fdd23>Release webgl resources.</p><h3 class="h3" data-v-394fdd23> .<a class="links" data-v-394fdd23>restart</a> () : <span class="param" data-v-394fdd23>undefined</span></h3><p data-v-394fdd23> Dispose webgl content and recreate a new animation, it will be called automatically when the system sleeps(at most twice). </p><h2 class="h2" data-v-394fdd23>Source</h2><p data-v-394fdd23><a href="https://github.com/jouvychen/webgl-transition/blob/master/lib/index.ts" target="_blank" data-v-394fdd23>webgl-transition/lib/index.ts</a></p>',28),Q=v({__name:"api-caution",setup(t){return(o,m)=>(c(),r("div",W,[M,a("p",null,[E,e(" -- parent node informations, expect to pass a HTMLDIVElement which inincludes id, width(Optional), height(Optional)."),N,V,e(" -- a collection of animation modules. Import the corresponding animation module to transitionList. The supported types are:"),z,(c(!0),r(S,null,C(d(g),(i,h)=>(c(),r("a",{key:h},[e(b(i)+" ",1),h!=d(g).length-1?(c(),r("span",D,"、")):T("",!0)]))),128)),G,B,e(" -- allow online images array or HTMLImageElements array."),H,R,e(" -- time between two animations. "),q,e(":"),A,e(". "),O,e(": "),F,e("."),U,J,e(" Create a new WebglTransition instance. ")]),K]))}});const X=u(Q,[["__scopeId","data-v-394fdd23"]]),Y=`
    // old version
    let webglTransitions = new WebglTransitions(
        {
            domId: "#webgl-transition",
        },
        [
            "wind"
        ],
        [
            "http://pic1.zhimg.com/v2-aa528fcd1a5ff3ba4a4a8429d3c11222_r.jpg",
        
            "http://pic1.zhimg.com/v2-4ce925afd994d72a16276bc7fbddf97c_r.jpg",
        ]
    );

    // new version(1.2.0+)
    import { wind } from "/webgl-transition/dist/transition-types";
    let webglTransitions = new WebglTransitions(
        {
            domId: "#webgl-transition",
        },
        [
            wind
        ], // here
        [
            "http://pic1.zhimg.com/v2-aa528fcd1a5ff3ba4a4a8429d3c11222_r.jpg",
        
            "http://pic1.zhimg.com/v2-4ce925afd994d72a16276bc7fbddf97c_r.jpg",
        ]
    );
`,f=t=>(_("data-v-d062dfa9"),t=t(),p(),t),Z={class:"version-iteration"},aa=f(()=>a("b",null,"1.2.0",-1)),ta=f(()=>a("br",null,null,-1)),ea=f(()=>a("i",null,"Ⅰ.",-1)),sa=v({__name:"version-iteration",setup(t){const o=I(!1);return(m,i)=>{const h=k("highlightjs");return c(),r("div",Z,[aa,ta,a("p",null,[ea,e(" Considering the size of the packaged products, in version 1.2.0+, transitionList parameter in the constructor has been changed from any[] to Transition[], animations' names will no longer accepted by the transitionList. "),a("a",{onClick:i[0]||(i[0]=Va=>o.value=!d(o)),class:"cursor"},b(d(o)?"put away":"show more"),1)]),j(l(h,{class:"highlight",language:"js",code:d(Y)},null,8,["code"]),[[P,d(o)]])])}}});const na=u(sa,[["__scopeId","data-v-d062dfa9"]]);const da={},x=t=>(_("data-v-6dfcae18"),t=t(),p(),t),ia={class:"some-tips"},oa=x(()=>a("p",null,[e(" Ⅰ."),a("b",null,"Release resources"),e("：Since continuous animation requires higher GPU overhead and consumes more resources as the size of the canvas increases, please call the stop() and dispose() to free the memory when you no longer need the instance"),a("b",{title:"webglTransitions is the WebglTransitions's instance"},"(demo: webglTransitions.stop(); webglTransitions.dispose())"),e(". ")],-1)),la=x(()=>a("p",null,[e(" Ⅱ. "),a("b",null,"numberOfLostContext"),e("：Since webgl will lose its context when the system or web page sleeps, define this parameter to control the number of times Webgl-transitions should be re-instantiated,it will try twice at most. ")],-1)),ca=[oa,la];function ra(t,o){return c(),r("div",ia,ca)}const ha=u(da,[["render",ra],["__scopeId","data-v-6dfcae18"]]),s=t=>(_("data-v-43b02f3f"),t=t(),p(),t),_a={class:"separate-example-code-container"},pa=s(()=>a("h3",null,"Api",-1)),ua={class:"code-container"},va=s(()=>a("br",null,null,-1)),fa=s(()=>a("br",null,null,-1)),ma=s(()=>a("h3",null,"Version iteration",-1)),ga={class:"code-container"},ba=s(()=>a("br",null,null,-1)),wa=s(()=>a("br",null,null,-1)),ka=s(()=>a("h3",null,"Some tips",-1)),xa={class:"code-container"},ya=s(()=>a("br",null,null,-1)),$a=s(()=>a("br",null,null,-1)),La=s(()=>a("h3",null,"Create a single transition animation",-1)),Sa=s(()=>a("i",null,"Ⅰ. All pictures from the Internet",-1)),Ca={class:"code-container"},Ta=s(()=>a("i",null,"Ⅱ. Mixed mode, with both local and network images",-1)),Ia={class:"code-container"},ja=s(()=>a("br",null,null,-1)),Pa=s(()=>a("br",null,null,-1)),Wa=s(()=>a("h3",null,"Create transition animations in batches",-1)),Ma=s(()=>a("p",{class:"long-text"}," Regarding the image type, it is the same with the requirement to create a single transition animation. Just fill some animation's name to the transitionList, then you'll get multiple types of transition animations. ",-1)),Ea={class:"code-container"},Na=v({__name:"separate-example-code",setup(t){return(o,m)=>{const i=k("highlightjs");return c(),r("div",_a,[pa,a("div",ua,[l(X)]),va,fa,ma,a("div",ga,[l(na)]),ba,wa,ka,a("div",xa,[l(ha)]),ya,$a,La,Sa,a("div",Ca,[l(i,{class:"highlight",language:"js",code:d(y)},null,8,["code"])]),Ta,a("div",Ia,[l(i,{class:"highlight",language:"js",code:d($)},null,8,["code"])]),ja,Pa,Wa,Ma,a("div",Ea,[l(i,{class:"highlight",language:"js",code:d(L)},null,8,["code"])])])}}});const Ga=u(Na,[["__scopeId","data-v-43b02f3f"]]);export{Ga as default};
