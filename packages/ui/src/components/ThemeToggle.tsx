'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';

type ThemeOption = 'light' | 'dark' | 'system';

interface ThemeToggleProps {
  className?: string;
}

const THEME_ORDER: readonly ThemeOption[] = ['light', 'dark', 'system'];

const THEME_LABELS: Record<ThemeOption, string> = {
  light: 'Light mode',
  dark: 'Dark mode',
  system: 'System theme',
};

function getNextTheme(current: ThemeOption): ThemeOption {
  const currentIndex = THEME_ORDER.indexOf(current);
  const nextIndex = (currentIndex + 1) % THEME_ORDER.length;
  return THEME_ORDER[nextIndex];
}

function isThemeOption(value: string | undefined): value is ThemeOption {
  return value === 'light' || value === 'dark' || value === 'system';
}

export function ThemeToggle({ className }: ThemeToggleProps): React.JSX.Element {
  const [mounted, setMounted] = React.useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme: ThemeOption = isThemeOption(theme) ? theme : 'system';

  const handleClick = React.useCallback((): void => {
    const next = getNextTheme(activeTheme);
    setTheme(next);
  }, [activeTheme, setTheme]);

  const baseClassName =
    'inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center ' +
    'rounded-2xl border border-neutral-200 bg-white text-neutral-700 ' +
    'transition-colors duration-150 ease-out ' +
    'hover:bg-neutral-100 hover:text-neutral-900 ' +
    'active:scale-95 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:ring-offset-2 focus-visible:ring-offset-white ' +
    'disabled:cursor-not-allowed disabled:opacity-50 ' +
    'dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 ' +
    'dark:hover:bg-neutral-800 dark:hover:text-neutral-50 ' +
    'dark:focus-visible:ring-offset-neutral-900';

  const combinedClassName = className ? `${baseClassName} ${className}` : baseClassName;

  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        aria-hidden="true"
        tabIndex={-1}
        className={combinedClassName}
      >
        <span className="block h-5 w-5" />
      </button>
    );
  }

  const iconProps = {
    className: 'h-5 w-5',
    strokeWidth: 2,
    'aria-hidden': true,
  } as const;

  let icon: React.JSX.Element;
  if (activeTheme === 'light') {
    icon = <Sun {...iconProps} />;
  } else if (activeTheme === 'dark') {
    icon = <Moon {...iconProps} />;
  } else {
    icon = <Monitor {...iconProps} />;
  }

  const nextTheme = getNextTheme(activeTheme);
  const ariaLabel = `Current theme: ${THEME_LABELS[activeTheme]}. Activate to switch to ${THEME_LABELS[nextTheme]}.`;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      title={THEME_LABELS[activeTheme]}
      className={combinedClassName}
    >
      {icon}
    </button>
  );
}

export default ThemeToggle;