'use client';

import { ArrowRight } from 'lucide-react';

interface FlowButtonProps {
  text?: string;
  variant?: 'primary' | 'secondary' | 'light' | 'primary-solid';
  className?: string;
}

export function FlowButton({ text = "Modern Button", variant = "primary", className = "" }: FlowButtonProps) {
  // Determine color theme based on the variant prop
  let borderClass = "border-white/20";
  let textClass = "text-white";
  let bgCircleClass = "bg-white";
  let hoverTextClass = "hover:text-slate-950 hover:border-transparent";
  let arrowStroke = "stroke-white";
  let arrowHoverStroke = "group-hover:stroke-slate-950";
  let defaultBgClass = "bg-transparent";

  if (variant === 'primary') {
    // Bright Yellow brand button
    borderClass = "border-[#ffe600]/40 hover:border-transparent";
    textClass = "text-[#ffe600]";
    bgCircleClass = "bg-[#ffe600]";
    hoverTextClass = "hover:text-slate-950";
    arrowStroke = "stroke-[#ffe600]";
    arrowHoverStroke = "group-hover:stroke-slate-950";
  } else if (variant === 'secondary') {
    // Clean White/Border button
    borderClass = "border-white/30 hover:border-transparent";
    textClass = "text-white";
    bgCircleClass = "bg-white";
    hoverTextClass = "hover:text-slate-950";
    arrowStroke = "stroke-white";
    arrowHoverStroke = "group-hover:stroke-slate-950";
  } else if (variant === 'light') {
    // User's exact dark-on-light theme button (for light backgrounds)
    borderClass = "border-[#333333]/40 hover:border-transparent";
    textClass = "text-[#111111]";
    bgCircleClass = "bg-[#111111]";
    hoverTextClass = "hover:text-white";
    arrowStroke = "stroke-[#111111]";
    arrowHoverStroke = "group-hover:stroke-white";
  } else if (variant === 'primary-solid') {
    // Solid Yellow brand button that inverts to black on hover
    borderClass = "border-slate-950/20 hover:border-transparent";
    textClass = "text-slate-950";
    bgCircleClass = "bg-slate-950";
    hoverTextClass = "hover:text-[#ffe600]";
    arrowStroke = "stroke-slate-950";
    arrowHoverStroke = "group-hover:stroke-[#ffe600]";
    defaultBgClass = "bg-[#ffe600]";
  }

  return (
    <button className={`group relative flex items-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] ${borderClass} ${className || defaultBgClass} px-6 py-2.5 text-xs sm:px-8 sm:py-3 sm:text-sm font-semibold ${textClass} ${hoverTextClass} cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:rounded-[12px] active:scale-[0.95]`}>
      {/* Left arrow (arr-2) */}
      <ArrowRight 
        className={`absolute w-4 h-4 left-[-25%] ${arrowStroke} fill-none z-[9] group-hover:left-3 sm:group-hover:left-4 ${arrowHoverStroke} transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]`} 
      />

      {/* Text */}
      <span className="relative z-[1] -translate-x-2 sm:-translate-x-3 group-hover:translate-x-2 sm:group-hover:translate-x-3 transition-all duration-[800ms] ease-out">
        {text}
      </span>

      {/* Circle background hover expand */}
      <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 ${bgCircleClass} rounded-[50%] opacity-0 group-hover:w-[220px] group-hover:h-[220px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]`}></span>

      {/* Right arrow (arr-1) */}
      <ArrowRight 
        className={`absolute w-4 h-4 right-3 sm:right-4 ${arrowStroke} fill-none z-[9] group-hover:right-[-25%] ${arrowHoverStroke} transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]`} 
      />
    </button>
  );
}
