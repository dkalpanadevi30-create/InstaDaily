/**
 * packages/ui/src/tokens/colors.ts
 *
 * InstaDaily Design System — Color Primitives & Semantic Tokens
 * ----------------------------------------------------------------
 * This file defines the single source of truth for all color values
 * used across the InstaDaily application. It exports raw primitive
 * scales (never used directly in components) and semantic tokens
 * (mapped to primitives, consumed by Tailwind config and UI components).
 */

export type ColorShade =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "950";

export type ColorScale = Readonly<Record<ColorShade, string>>;

export interface PrimitivePalette {
  readonly orange: ColorScale;
  readonly slate: ColorScale;
  readonly cream: ColorScale;
  readonly green: ColorScale;
  readonly red: ColorScale;
  readonly amber: ColorScale;
  readonly blue: ColorScale;
}

export interface SemanticColorSet {
  readonly background: string;
  readonly backgroundSubtle: string;
  readonly surface: string;
  readonly surfaceElevated: string;
  readonly surfaceOverlay: string;
  readonly border: string;
  readonly borderSubtle: string;
  readonly textPrimary: string;
  readonly textSecondary: string;
  readonly textTertiary: string;
  readonly textInverse: string;
  readonly textDisabled: string;
}

export interface StatusColorSet {
  readonly bg: string;
  readonly bgSubtle: string;
  readonly border: string;
  readonly text: string;
  readonly icon: string;
  readonly solid: string;
  readonly solidHover: string;
  readonly onSolid: string;
}

export interface BrandColorSet {
  readonly primary: string;
  readonly primaryHover: string;
  readonly primaryActive: string;
  readonly primarySubtle: string;
  readonly primarySubtleHover: string;
  readonly primaryBorder: string;
  readonly onPrimary: string;
}

export interface ThemeColors {
  readonly brand: BrandColorSet;
  readonly semantic: SemanticColorSet;
  readonly success: StatusColorSet;
  readonly error: StatusColorSet;
  readonly warning: StatusColorSet;
  readonly info: StatusColorSet;
}

export interface InstaDailyColorTokens {
  readonly primitives: PrimitivePalette;
  readonly light: ThemeColors;
  readonly dark: ThemeColors;
}

/* ------------------------------------------------------------------ */
/* PRIMITIVE PALETTES                                                  */
/* Raw hex scales. Never import these directly into components.        */
/* Consume via `light` / `dark` semantic tokens below.                 */
/* ------------------------------------------------------------------ */

const orange: ColorScale = {
  "50": "#FFF7ED",
  "100": "#FFEDD5",
  "200": "#FED7AA",
  "300": "#FDBA74",
  "400": "#FB923C",
  "500": "#F97316",
  "600": "#EA580C",
  "700": "#C2410C",
  "800": "#9A3412",
  "900": "#7C2D12",
  "950": "#431407",
} as const;

const slate: ColorScale = {
  "50": "#F8FAFC",
  "100": "#F1F5F9",
  "200": "#E2E8F0",
  "300": "#CBD5E1",
  "400": "#94A3B8",
  "500": "#64748B",
  "600": "#475569",
  "700": "#334155",
  "800": "#1E293B",
  "900": "#0F172A",
  "950": "#020617",
} as const;

const cream: ColorScale = {
  "50": "#FFFDF9",
  "100": "#FEFBF3",
  "200": "#FDF6E8",
  "300": "#FAEFD8",
  "400": "#F5E4C0",
  "500": "#EDD5A3",
  "600": "#D9B876",
  "700": "#B8944F",
  "800": "#8C6E3A",
  "900": "#5C4826",
  "950": "#332715",
} as const;

const green: ColorScale = {
  "50": "#F0FDF4",
  "100": "#DCFCE7",
  "200": "#BBF7D0",
  "300": "#86EFAC",
  "400": "#4ADE80",
  "500": "#22C55E",
  "600": "#16A34A",
  "700": "#15803D",
  "800": "#166534",
  "900": "#14532D",
  "950": "#052E16",
} as const;

const red: ColorScale = {
  "50": "#FEF2F2",
  "100": "#FEE2E2",
  "200": "#FECACA",
  "300": "#FCA5A5",
  "400": "#F87171",
  "500": "#EF4444",
  "600": "#DC2626",
  "700": "#B91C1C",
  "800": "#991B1B",
  "900": "#7F1D1D",
  "950": "#450A0A",
} as const;

const amber: ColorScale = {
  "50": "#FFFBEB",
  "100": "#FEF3C7",
  "200": "#FDE68A",
  "300": "#FCD34D",
  "400": "#FBBF24",
  "500": "#F59E0B",
  "600": "#D97706",
  "700": "#B45309",
  "800": "#92400E",
  "900": "#78350F",
  "950": "#451A03",
} as const;

const blue: ColorScale = {
  "50": "#EFF6FF",
  "100": "#DBEAFE",
  "200": "#BFDBFE",
  "300": "#93C5FD",
  "400": "#60A5FA",
  "500": "#3B82F6",
  "600": "#2563EB",
  "700": "#1D4ED8",
  "800": "#1E40AF",
  "900": "#1E3A8A",
  "950": "#172554",
} as const;

const primitives: PrimitivePalette = {
  orange,
  slate,
  cream,
  green,
  red,
  amber,
  blue,
} as const;

/* ------------------------------------------------------------------ */
/* LIGHT THEME                                                         */
/* Background base uses the off-white cream scale for warmth.          */
/* ------------------------------------------------------------------ */

const lightTheme: ThemeColors = {
  brand: {
    primary: orange["500"],
    primaryHover: orange["600"],
    primaryActive: orange["700"],
    primarySubtle: orange["50"],
    primarySubtleHover: orange["100"],
    primaryBorder: orange["300"],
    onPrimary: "#FFFFFF",
  },
  semantic: {
    background: cream["50"],
    backgroundSubtle: cream["100"],
    surface: "#FFFFFF",
    surfaceElevated: "#FFFFFF",
    surfaceOverlay: "rgba(15, 23, 42, 0.48)",
    border: cream["400"],
    borderSubtle: cream["300"],
    textPrimary: slate["900"],
    textSecondary: slate["600"],
    textTertiary: slate["500"],
    textInverse: cream["50"],
    textDisabled: slate["400"],
  },
  success: {
    bg: green["50"],
    bgSubtle: green["100"],
    border: green["300"],
    text: green["800"],
    icon: green["600"],
    solid: green["600"],
    solidHover: green["700"],
    onSolid: "#FFFFFF",
  },
  error: {
    bg: red["50"],
    bgSubtle: red["100"],
    border: red["300"],
    text: red["800"],
    icon: red["600"],
    solid: red["600"],
    solidHover: red["700"],
    onSolid: "#FFFFFF",
  },
  warning: {
    bg: amber["50"],
    bgSubtle: amber["100"],
    border: amber["300"],
    text: amber["800"],
    icon: amber["600"],
    solid: amber["500"],
    solidHover: amber["600"],
    onSolid: slate["900"],
  },
  info: {
    bg: blue["50"],
    bgSubtle: blue["100"],
    border: blue["300"],
    text: blue["800"],
    icon: blue["600"],
    solid: blue["600"],
    solidHover: blue["700"],
    onSolid: "#FFFFFF",
  },
} as const;

/* ------------------------------------------------------------------ */
/* DARK THEME                                                          */
/* Background base uses the near-black slate scale.                    */
/* ------------------------------------------------------------------ */

const darkTheme: ThemeColors = {
  brand: {
    primary: orange["500"],
    primaryHover: orange["400"],
    primaryActive: orange["300"],
    primarySubtle: "rgba(249, 115, 22, 0.16)",
    primarySubtleHover: "rgba(249, 115, 22, 0.24)",
    primaryBorder: orange["700"],
    onPrimary: slate["950"],
  },
  semantic: {
    background: slate["950"],
    backgroundSubtle: slate["900"],
    surface: slate["900"],
    surfaceElevated: slate["800"],
    surfaceOverlay: "rgba(2, 6, 23, 0.64)",
    border: slate["700"],
    borderSubtle: slate["800"],
    textPrimary: cream["50"],
    textSecondary: slate["300"],
    textTertiary: slate["400"],
    textInverse: slate["900"],
    textDisabled: slate["600"],
  },
  success: {
    bg: "rgba(34, 197, 94, 0.12)",
    bgSubtle: "rgba(34, 197, 94, 0.20)",
    border: green["700"],
    text: green["300"],
    icon: green["400"],
    solid: green["500"],
    solidHover: green["400"],
    onSolid: slate["950"],
  },
  error: {
    bg: "rgba(239, 68, 68, 0.12)",
    bgSubtle: "rgba(239, 68, 68, 0.20)",
    border: red["700"],
    text: red["300"],
    icon: red["400"],
    solid: red["500"],
    solidHover: red["400"],
    onSolid: slate["950"],
  },
  warning: {
    bg: "rgba(245, 158, 11, 0.12)",
    bgSubtle: "rgba(245, 158, 11, 0.20)",
    border: amber["700"],
    text: amber["300"],
    icon: amber["400"],
    solid: amber["500"],
    solidHover: amber["400"],
    onSolid: slate["950"],
  },
  info: {
    bg: "rgba(59, 130, 246, 0.12)",
    bgSubtle: "rgba(59, 130, 246, 0.20)",
    border: blue["700"],
    text: blue["300"],
    icon: blue["400"],
    solid: blue["500"],
    solidHover: blue["400"],
    onSolid: slate["950"],
  },
} as const;

/* ------------------------------------------------------------------ */
/* PUBLIC EXPORT                                                       */
/* ------------------------------------------------------------------ */

export const colors: InstaDailyColorTokens = {
  primitives,
  light: lightTheme,
  dark: darkTheme,
} as const;

export default colors;