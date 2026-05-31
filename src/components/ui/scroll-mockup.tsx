"use client";

import { useEffect, useRef, useState } from "react";

// 활성 상태일 때만 위→아래로 1회 스크롤하고, 끝나면 onDone 호출
function ScrollFrame({
  src,
  alt,
  variant,
  active,
  onDone,
}: {
  src: string;
  alt: string;
  variant: "pc" | "mobile";
  active: boolean;
  onDone: () => void;
}) {
  const vpRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const vp = vpRef.current;
    const img = imgRef.current;
    if (!vp || !img) return;
    let anim: Animation | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let onload: (() => void) | undefined;

    const play = () => {
      const dist = img.offsetHeight - vp.clientHeight;
      if (dist <= 4) {
        timer = setTimeout(() => onDoneRef.current(), 1500);
        return;
      }
      anim = img.animate(
        [
          { transform: "translateY(0)" },
          { transform: `translateY(${-dist}px)` },
        ],
        { duration: Math.max(12000, dist * 11), easing: "ease-in-out", fill: "forwards" },
      );
      anim.onfinish = () => {
        timer = setTimeout(() => onDoneRef.current(), 800);
      };
    };

    if (active) {
      img.style.transform = "translateY(0)";
      if (img.complete && img.naturalHeight) play();
      else {
        onload = play;
        img.addEventListener("load", onload);
      }
    } else {
      img.style.transform = "translateY(0)";
    }

    return () => {
      anim?.cancel();
      if (timer) clearTimeout(timer);
      if (onload) img.removeEventListener("load", onload);
    };
  }, [active, src]);

  if (variant === "mobile") {
    return (
      <div className="w-[150px] shrink-0">
        <div className="overflow-hidden rounded-xl border border-white/25 p-1.5">
          <div
            ref={vpRef}
            className="h-[55vh] w-full overflow-hidden rounded-lg bg-black"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img ref={imgRef} src={src} alt={alt} className="block w-full" />
          </div>
        </div>
        <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-wider text-white/40">
          Mobile
        </p>
      </div>
    );
  }

  return (
    <div className="min-w-0 flex-1">
      <div className="overflow-hidden rounded-lg border border-white/25">
        <div className="flex items-center gap-1.5 border-b border-white/20 px-3 py-2.5">
          <span className="h-2 w-2 rounded-full border border-white/35" />
          <span className="h-2 w-2 rounded-full border border-white/35" />
          <span className="h-2 w-2 rounded-full border border-white/35" />
          <span className="ml-3 font-mono text-[10px] text-white/35">
            krafton.com
          </span>
        </div>
        <div
          ref={vpRef}
          className="h-[55vh] w-full overflow-hidden bg-black"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={imgRef} src={src} alt={alt} className="block w-full" />
        </div>
      </div>
      <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-wider text-white/40">
        Desktop
      </p>
    </div>
  );
}

export default function ScrollMockup({
  pc,
  mobile,
  alt,
}: {
  pc: string;
  mobile?: string;
  alt: string;
}) {
  const hasMobile = Boolean(mobile);
  const [active, setActive] = useState<"pc" | "mobile">("pc");

  return (
    <div className="flex w-full items-start gap-6">
      <ScrollFrame
        src={pc}
        alt={alt}
        variant="pc"
        active={active === "pc"}
        onDone={() => setActive(hasMobile ? "mobile" : "pc")}
      />
      {mobile && (
        <ScrollFrame
          src={mobile}
          alt={alt}
          variant="mobile"
          active={active === "mobile"}
          onDone={() => setActive("pc")}
        />
      )}
    </div>
  );
}
