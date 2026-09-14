"use client";

import { useEffect, useRef, useCallback } from "react";
import { X, ChefHat, ClipboardList } from "lucide-react";

export interface CookingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  steps: string[];
}

export default function CookingGuideModal({
  isOpen,
  onClose,
  title,
  steps,
}: CookingGuideModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedElement.current = document.activeElement as HTMLElement;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const focusTimeout = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.clearTimeout(focusTimeout);
      previouslyFocusedElement.current?.focus();
    };
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const hasSteps = steps.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
      role="presentation"
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cooking-guide-title"
        className="relative flex max-h-[85vh] w-full flex-col rounded-t-[24px] bg-white shadow-2xl animate-in slide-in-from-bottom duration-300 dark:bg-neutral-900 sm:max-h-[80vh] sm:max-w-lg sm:rounded-[24px] sm:duration-200 sm:zoom-in-95"
      >
        <div className="mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-700 sm:hidden" />

        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 rounded-t-[24px] border-b border-neutral-200 bg-white px-6 py-4 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-50 dark:bg-orange-500/10">
              <ChefHat className="h-5 w-5 text-[#F97316]" aria-hidden="true" />
            </div>
            <h2
              id="cooking-guide-title"
              className="truncate text-lg font-semibold leading-7 text-neutral-900 dark:text-neutral-50"
            >
              {title}
            </h2>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close cooking guide"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-neutral-500 transition-colors duration-200 hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:ring-offset-2 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 dark:focus-visible:ring-offset-neutral-900"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {hasSteps ? (
            <ol className="flex flex-col gap-6">
              {steps.map((step, index) => (
                <li key={index} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F97316] text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-[15px] leading-6 text-neutral-700 dark:text-neutral-300">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                <ClipboardList
                  className="h-8 w-8 text-neutral-400 dark:text-neutral-500"
                  aria-hidden="true"
                />
              </div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                No cooking steps have been added for this recipe yet.
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-neutral-200 px-6 py-4 dark:border-neutral-800">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-full items-center justify-center rounded-2xl bg-[#F97316] px-4 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#EA6A0C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:ring-offset-2 active:bg-[#DB6208] dark:focus-visible:ring-offset-neutral-900"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}