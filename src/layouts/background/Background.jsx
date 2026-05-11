import React, { useEffect, useRef, useState, useCallback } from 'react';
import './Background.css';

export default function Background() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const generateStar = useCallback(() => ({
    top: `${Math.random() * 100}vh`,
    left: `${Math.random() * 100}vw`,
    angle: `${Math.random() * 360}deg`,
    distance: `${300 + Math.random() * 600}px`,
    duration: `${1 + Math.random() * 2}s`,
  }), []);

  const [starKey, setStarKey] = useState(0);
  const [starProps, setStarProps] = useState(generateStar);
  const [isShooting, setIsShooting] = useState(true);

  const handleAnimationEnd = () => {
    setIsShooting(false);
    const nextDelay = 1000 + Math.random() * 5000;
    setTimeout(() => {
      setStarProps(generateStar());
      setStarKey(k => k + 1);
      setIsShooting(true);
    }, nextDelay);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2");
    if (!gl) return;

    let targetMoves = [0, 0];
    let currentMoves = [0, 0];
    let targetParallax = [0, 0];
    let currentParallax = [0, 0];
    let lastScrollY = window.scrollY;

    // Adjust these multipliers to change how much distance is covered
    const mouseSensitivity = 0.1;
    const scrollSensitivity = 0.05;

    const onMouseMove = (e) => {
      targetMoves[0] += e.movementX * mouseSensitivity;
      targetMoves[1] += e.movementY * mouseSensitivity;
      
      targetParallax[0] = (e.clientX / window.innerWidth - 0.5) * -100;
      targetParallax[1] = (e.clientY / window.innerHeight - 0.5) * -100;
    };

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;
      targetMoves[1] += deltaY * scrollSensitivity; 
      targetParallax[1] -= deltaY * scrollSensitivity * 5; 
      lastScrollY = currentScrollY;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);

    const vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

    const fragmtSrc = `#version 300 es
precision highp float;
out vec4 O;
uniform float time;
uniform vec2 resolution;
uniform vec2 move;
#define FC gl_FragCoord.xy
#define R resolution
#define T time
#define N normalize
#define S smoothstep
#define MN min(R.x,R.y)
#define rot(a) mat2(cos((a)-vec4(0,11,33,0)))
float rnd(vec2 p) {
	p=fract(p*vec2(12.9898,78.233));
	p+=dot(p,p+34.56);
	return fract(p.x*p.y);
}
vec3 sky(vec2 p, bool anim) {
	p.x-=.17-(anim?2e-4*T:.0);
	p*=500.;
	vec2 id=floor(p), gv=fract(p)-.5;
	float n=rnd(id), d=length(gv);
	if (n<.975) return vec3(0);
	return vec3(S(3e-2*n,1e-3*n,d*d));
}
void cam(inout vec3 p) {
	p.yz*=rot(move.y*6.3/MN-T*.05);
	p.xz*=rot(-move.x*6.3/MN+T*.025);
}
void main() {
	vec2 uv=(FC-.5*R)/MN;
	uv *= 1.8; // Scale UV to make the nebula appear smaller
	vec3 col=vec3(0),
	p=vec3(0,0,-16),
	rd=N(vec3(uv,1));
	cam(p); cam(rd);
	vec2 sn=.5+vec2(atan(rd.x,rd.z),atan(length(rd.xz),rd.y))/6.28318;
	col=max(col,vec3(sky(sn,true)+sky(2.+sn*2.,true)));
	float t=min((time-.5)*.3,1.);
	uv=FC/R*2.-1.;
	uv*=.7;
	float v=pow(dot(uv,uv),1.8);
	col=mix(col,vec3(0),v);
	col=mix(vec3(0),col,t);
	col=max(col,.08);
  O=vec4(col,1);
}`;

    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, vertexSrc);
    const fs = compileShader(gl.FRAGMENT_SHADER, fragmtSrc);

    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resolutionLoc = gl.getUniformLocation(program, "resolution");
    const timeLoc = gl.getUniformLocation(program, "time");
    const moveLoc = gl.getUniformLocation(program, "move");

    const resize = () => {
      // Using a max dpr of 1.5 to maintain good performance while keeping visual quality
      const scale = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = window.innerWidth * scale;
      canvas.height = window.innerHeight * scale;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("resize", resize);
    resize();

    let animationFrameId;
    // Adjust this value to change the smoothness (lower = slower/smoother)
    const lerpFactor = 0.03;

    const render = (now) => {
      // Smoothly interpolate towards the target position
      currentMoves[0] += (targetMoves[0] - currentMoves[0]) * lerpFactor;
      currentMoves[1] += (targetMoves[1] - currentMoves[1]) * lerpFactor;
      
      currentParallax[0] += (targetParallax[0] - currentParallax[0]) * lerpFactor;
      currentParallax[1] += (targetParallax[1] - currentParallax[1]) * lerpFactor;
      
      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${currentParallax[0]}px, ${currentParallax[1]}px, 0)`;
      }

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      
      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      // Adjusted auto-animation speed (was 1e-3), significantly slowed down
      gl.uniform1f(timeLoc, now * 0.001);
      gl.uniform2f(moveLoc, currentMoves[0], currentMoves[1]);
      
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="webgl-background" />
      <div ref={containerRef} className="shooting-stars-container">
        {isShooting && (
          <span
            key={starKey}
            className="star"
            onAnimationEnd={handleAnimationEnd}
            style={{
              '--top': starProps.top,
              '--left': starProps.left,
              '--angle': starProps.angle,
              '--distance': starProps.distance,
              '--duration': starProps.duration,
            }}
          ></span>
        )}
      </div>
    </>
  );
}
