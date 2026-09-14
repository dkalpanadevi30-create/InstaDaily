'use client';

import {
  forwardRef,
  useCallback,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react';

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  enableHaptics?: boolean;
  hapticPattern?: number | number[];
  children: ReactNode;
}

function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

function isVibrationSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof navigator !== 'undefined' &&
    'vibrate' in navigator &&
    typeof navigator.vibrate === 'function'
  );
}

function triggerHapticFeedback(pattern: number | number[]): void {
  if (!isVibrationSupported()) {
    return;
  }

  try {
    navigator.vibrate(pattern);
  } catch {
    // Silently ignore devices/browsers that throw on vibrate() calls.
  }
}

const BASE_STYLES =
  'inline-flex items-center justify-center gap-2 font-semibold ' +
  'transition-all duration-150 ease-out select-none ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
  'disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none ' +
  'active:scale-[0.98]';

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    'bg-[#F97316] text-white shadow-sm ' +
    'hover:bg-[#EA6A0C] ' +
    'active:bg-[#DB620B] ' +
    'focus-visible:ring-[#F97316] focus-visible:ring-offset-white ' +
    'dark:focus-visible:ring-offset-gray-900 ' +
    'dark:hover:bg-[#FB8332] dark:active:bg-[#EA6A0C]',
  secondary:
    'bg-white text-[#C2410C] border border-[#F97316] ' +
    'hover:bg-orange-50 ' +
    'active:bg-orange-100 ' +
    'focus-visible:ring-[#F97316] focus-visible:ring-offset-white ' +
    'dark:bg-gray-900 dark:text-[#FDBA74] dark:border-[#FB923C] ' +
    'dark:hover:bg-gray-800 dark:active:bg-gray-700 ' +
    'dark:focus-visible:ring-offset-gray-900',
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm rounded-xl',
  md: 'h-11 px-5 text-base rounded-2xl',
  lg: 'h-14 px-6 text-lg rounded-2xl',
};

const SPINNER_SIZE_STYLES: Record<ButtonSize, string> = {
  sm: 'h-3.5 w-3.5 border-2',
  md: 'h-4 w-4 border-2',
  lg: 'h-5 w-5 border-[3px]',
};

function LoadingSpinner({ size }: { size: ButtonSize }): ReactElement {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        'inline-block animate-spin rounded-full border-current border-t-transparent',
        SPINNER_SIZE_STYLES[size]
      )}
    />
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      enableHaptics = true,
      hapticPattern = 10,
      className,
      children,
      disabled,
      onClick,
      type = 'button',
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    const handleClick = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        if (isDisabled) {
          return;
        }

        if (enableHaptics) {
          triggerHapticFeedback(hapticPattern);
        }

        onClick?.(event);
      },
      [isDisabled, enableHaptics, hapticPattern, onClick]
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={isLoading}
        onClick={handleClick}
        className={cn(
          BASE_STYLES,
          VARIANT_STYLES[variant],
          SIZE_STYLES[size],
          fullWidth && 'w-full',
          className
        )}
        {...rest}
      >
        {isLoading ? (
          <LoadingSpinner size={size} />
        ) : (
          leftIcon && (
            <span className="inline-flex shrink-0 items-center">
              {leftIcon}
            </span>
          )
        )}
        <span className={cn(isLoading && 'opacity-90')}>{children}</span>
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0 items-center">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export interface UseHapticsReturn {
  vibrate: (pattern?: number | number[]) => void;
  isSupported: boolean;
}

export function useHaptics(): UseHapticsReturn {
  const isSupported = isVibrationSupported();

  const vibrate = useCallback((pattern: number | number[] = 10) => {
    triggerHapticFeedback(pattern);
  }, []);

  return { vibrate, isSupported };
}

export default Button;