export const colors = {
  background: '#FBFAFE',
  surface: '#FFFFFF',
  surfaceSoft: '#F7F3FF',
  surfaceLavender: '#F1ECFF',

  primary: '#6C32F4',
  primaryPressed: '#5624D8',
  primarySoft: '#EEE7FF',
  primaryMuted: '#A98AFB',

  secondary: '#FF2D78',
  secondaryPressed: '#E51E65',
  secondarySoft: '#FFE7F0',

  text: '#111318',
  textStrong: '#0B0D12',
  textMuted: '#5F6675',
  textSoft: '#8C93A2',
  textOnPrimary: '#FFFFFF',

  border: '#E7E4EC',
  borderStrong: '#D7D2DF',
  divider: '#EFEDF3',

  success: '#21C875',
  successSoft: '#E8FAF1',
  warning: '#F5A623',
  warningSoft: '#FFF5DF',
  danger: '#ED3C64',
  dangerSoft: '#FDE8ED',

  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

export const gradients = {
  brand: ['#6635F4', '#9B39F4', '#FF3F8F'] as const,
  brandSoft: ['#F0E9FF', '#FFE8F2'] as const,
  premium: ['#7137F5', '#C63EEB', '#FF3F86'] as const,
} as const;

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
  giant: 48,
} as const;

export const radius = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 30,
  pill: 999,
} as const;

export const typography = {
  display: { fontSize: 34, lineHeight: 40, fontWeight: '800' as const },
  h1: { fontSize: 28, lineHeight: 34, fontWeight: '800' as const },
  h2: { fontSize: 22, lineHeight: 28, fontWeight: '700' as const },
  h3: { fontSize: 18, lineHeight: 24, fontWeight: '700' as const },
  bodyLg: { fontSize: 17, lineHeight: 25, fontWeight: '400' as const },
  body: { fontSize: 15, lineHeight: 22, fontWeight: '400' as const },
  bodyMedium: { fontSize: 15, lineHeight: 22, fontWeight: '600' as const },
  small: { fontSize: 13, lineHeight: 18, fontWeight: '400' as const },
  smallMedium: { fontSize: 13, lineHeight: 18, fontWeight: '600' as const },
  caption: { fontSize: 11, lineHeight: 15, fontWeight: '500' as const },
  button: { fontSize: 16, lineHeight: 20, fontWeight: '700' as const },
} as const;

export const shadows = {
  soft: {
    shadowColor: '#241D35',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
  },
  raised: {
    shadowColor: '#241D35',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 4,
  },
} as const;

export const layout = {
  screenPadding: 20,
  contentMaxWidth: 520,
  touchTarget: 44,
  tabBarHeight: 86,
} as const;
