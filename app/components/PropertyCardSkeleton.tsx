'use client';

import { motion } from 'framer-motion';

export default function PropertyCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="bg-white rounded-3xl overflow-hidden border border-slate-200/60 flex flex-col h-full shadow-md"
    >
      {/* Image Skeleton */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <div className="absolute inset-0 skeleton-shimmer" />
        {/* Badge Skeletons */}
        <div className="absolute top-3 left-3 z-20 flex flex-row items-center gap-1.5">
          <div className="h-6 w-20 rounded-full bg-slate-200 skeleton-shimmer" />
          <div className="h-6 w-28 rounded-full bg-slate-200 skeleton-shimmer" />
        </div>
        {/* Price Tag Skeleton */}
        <div className="absolute bottom-4 right-4 z-20 h-10 w-32 rounded-2xl bg-slate-200 skeleton-shimmer" />
      </div>

      {/* Content Skeleton */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Location */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="h-4 w-4 rounded-full bg-slate-200 skeleton-shimmer" />
          <div className="h-3.5 w-40 rounded-lg bg-slate-200 skeleton-shimmer" />
        </div>

        {/* Title */}
        <div className="h-5 w-3/4 rounded-lg bg-slate-200 skeleton-shimmer mb-2" />

        {/* Description lines */}
        <div className="space-y-2 mb-6 flex-grow">
          <div className="h-3.5 w-full rounded-lg bg-slate-100 skeleton-shimmer" />
          <div className="h-3.5 w-5/6 rounded-lg bg-slate-100 skeleton-shimmer" />
        </div>

        {/* Specs Row */}
        <div className="grid grid-cols-3 gap-2 py-4 border-t border-slate-100">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center justify-center gap-1.5">
              <div className="h-4.5 w-4.5 rounded-full bg-slate-200 skeleton-shimmer" />
              <div className="h-3 w-14 rounded-lg bg-slate-200 skeleton-shimmer" />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Skeleton for the FeaturedProperties carousel cards (larger format)
 */
export function FeaturedCardSkeleton() {
  return (
    <div className="w-[85vw] sm:w-[75vw] shrink-0 snap-center lg:w-[calc(25%-15px)] lg:shrink-0 lg:snap-start">
      <div className="w-full bg-white border border-slate-200/60 rounded-[32px] overflow-hidden flex flex-col h-full">
        {/* Image Skeleton */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
          <div className="absolute inset-0 skeleton-shimmer" />
          {/* Badge */}
          <div className="absolute top-4 right-4 z-10 h-6 w-28 rounded-full bg-slate-200 skeleton-shimmer" />
        </div>

        {/* Content Skeleton */}
        <div className="px-6 pt-5 pb-5 sm:px-10 sm:pt-6 sm:pb-6 flex flex-col flex-grow bg-white">
          {/* Title & Price */}
          <div className="flex justify-between items-start gap-6 mb-2">
            <div className="space-y-2 flex-grow">
              <div className="h-5 w-3/4 rounded-lg bg-slate-200 skeleton-shimmer" />
              <div className="h-4 w-1/2 rounded-lg bg-slate-100 skeleton-shimmer" />
            </div>
            <div className="shrink-0 space-y-1.5">
              <div className="h-3 w-12 rounded-lg bg-slate-100 skeleton-shimmer" />
              <div className="h-6 w-28 rounded-lg bg-slate-200 skeleton-shimmer" />
            </div>
          </div>

          {/* Specs */}
          <div className="flex items-center gap-6 sm:gap-8 mt-2.5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-slate-200 skeleton-shimmer" />
                <div className="h-4 w-16 rounded-lg bg-slate-200 skeleton-shimmer" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
