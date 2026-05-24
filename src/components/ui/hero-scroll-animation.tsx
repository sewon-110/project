'use client';

import { useScroll, useTransform, motion, MotionValue } from 'motion/react';
import React, { useRef, forwardRef } from 'react';
import { profile } from '@/data/portfolio';

interface SectionProps {
  scrollYProgress: MotionValue<number>;
}

// 히어로 그리드에 보여줄 대표 작업 4점
const heroShots = [
  '/work/gstar-2022-black.jpg',
  '/work/pubg-rondo-brotherhood-alpha.png',
  '/work/pubg-aespa-pnc-2025.png',
  '/work/pubg-contender-first-1.png',
];

const Section1: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  return (
    <motion.section
      style={{ scale, rotate }}
      className='sticky font-semibold top-0 h-screen bg-gradient-to-t to-[#dadada] from-[#ebebeb] flex flex-col items-center justify-center text-black'
    >
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>

      <p className='relative z-10 mb-6 font-mono text-xs uppercase tracking-[0.25em] text-neutral-500'>
        {profile.role} · {profile.location}
      </p>
      <h1 className='relative z-10 2xl:text-7xl text-5xl sm:text-6xl px-8 font-semibold text-center tracking-tight leading-[120%] whitespace-pre-line'>
        {profile.tagline}
      </h1>
      <p className='relative z-10 mt-12 animate-bounce font-mono text-sm text-neutral-500'>
        Scroll ↓
      </p>
    </motion.section>
  );
};

const Section2: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

  return (
    <motion.section
      style={{ scale, rotate }}
      className='relative h-screen bg-gradient-to-t to-[#1a1919] from-[#06060e] text-white'
    >
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
      <article className='container mx-auto relative z-10 px-6'>
        <h1 className='text-4xl sm:text-6xl leading-[110%] py-10 font-semibold tracking-tight'>
          PUBG · NEW STATE · inZOI <br /> 글로벌 게임 IP를 비주얼로.
        </h1>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {heroShots.map((src) => (
            <img
              key={src}
              src={src}
              alt='selected work'
              loading='lazy'
              className='object-cover w-full h-full max-h-[42vh] rounded-md'
            />
          ))}
        </div>
      </article>
    </motion.section>
  );
};

const HeroScrollAnimation = forwardRef<HTMLDivElement>((props, ref) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={container} className='relative h-[200vh] bg-black'>
      <Section1 scrollYProgress={scrollYProgress} />
      <Section2 scrollYProgress={scrollYProgress} />
      <footer className='group bg-[#06060e]'>
        <h1 className='text-[16vw] translate-y-20 leading-[100%] uppercase font-semibold text-center bg-gradient-to-r from-gray-400 to-gray-800 bg-clip-text text-transparent transition-all ease-linear'>
          {profile.name}
        </h1>
        <div className='bg-black text-white h-40 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full'></div>
      </footer>
    </div>
  );
});

HeroScrollAnimation.displayName = 'HeroScrollAnimation';

export default HeroScrollAnimation;
