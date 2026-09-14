"use client";

import { useState } from "react";
import Image from "next/image";
import { Clock, UtensilsCrossed, ChefHat, ImageOff } from "lucide-react";

export interface RecipeCardProps {
  title: string;
  imageUrl?: string | null;
  prepTimeMinutes: number;
  ingredientCount: number;
  servings?: number;
  isVeg?: boolean;
  onViewRecipe: () => void;
  className?: string;
}

function formatPrepTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }
  return `${hours} hr ${remainingMinutes} min`;
}

export default function RecipeCardUI({
  title,
  imageUrl,
  prepTimeMinutes,
  ingredientCount,
  servings,
  isVeg = true,
  onViewRecipe,
  className = "",
}: RecipeCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showFallback = !imageUrl || imageFailed;

  return (
    <div
      className={`group relative flex w-full max-w-[320px] flex-col overflow-hidden rounded-[20px] border border-neutral-200 bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 ${className}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        {showFallback ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-neutral-100 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500">
            <ImageOff className="h-10 w-10" strokeWidth={1.5} aria-hidden="true" />
            <span className="text-xs font-medium">Image unavailable</span>
          </div>
        ) : (
          <Image
            src={imageUrl as string}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            onError={() => setImageFailed(true)}
          />
        )}

        <div className="absolute left-3 top-3 flex h-6 w-6 items-center justify-center rounded-md border-2 border-white bg-white/90 shadow-sm dark:border-neutral-900 dark:bg-neutral-900/90">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              isVeg ? "bg-green-600 dark:bg-green-500" : "bg-red-600 dark:bg-red-500"
            }`}
            aria-hidden="true"
          />
        </div>
        <span className="sr-only">{isVeg ? "Vegetarian" : "Non-vegetarian"}</span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="line-clamp-2 min-h-[3rem] text-base font-semibold leading-6 tracking-tight text-neutral-900 dark:text-neutral-50">
          {title}
        </h3>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-neutral-500 dark:text-neutral-400" aria-hidden="true" />
            <span>{formatPrepTime(prepTimeMinutes)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <UtensilsCrossed className="h-4 w-4 text-neutral-500 dark:text-neutral-400" aria-hidden="true" />
            <span>
              {ingredientCount} {ingredientCount === 1 ? "ingredient" : "ingredients"}
            </span>
          </div>
          {typeof servings === "number" && servings > 0 && (
            <div className="flex items-center gap-1.5">
              <ChefHat className="h-4 w-4 text-neutral-500 dark:text-neutral-400" aria-hidden="true" />
              <span>
                {servings} {servings === 1 ? "serving" : "servings"}
              </span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onViewRecipe}
          className="mt-1 inline-flex h-11 w-full items-center justify-center rounded-2xl bg-[#F97316] px-4 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#EA6A0C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:ring-offset-2 focus-visible:ring-offset-white active:bg-[#DB6208] dark:focus-visible:ring-offset-neutral-900"
        >
          View Recipe
        </button>
      </div>
    </div>
  );
}