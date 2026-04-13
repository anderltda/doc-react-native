export const theme = {
  colors: {
    pageBg: '#0D2A30',
    sidebarBg: 'rgba(10, 31, 36, 0.94)',
    panelDark: 'rgba(6, 21, 25, 0.84)',
    panelLight: 'rgba(255,255,255,0.96)',
    borderSoft: 'rgba(255,255,255,0.14)',
    borderStrong: '#F2B077',
    textPrimary: '#EAF6F7',
    textSecondary: '#A8C6C9',
    textDark: '#1F434B',
    brand: '#F2B077',
    brandDark: '#7B3F0D',
    success: '#2F8E62',
  },
  radius: {
    sm: 10,
    md: 14,
    lg: 18,
    pill: 999,
  },
  spacing: {
    xs: 6,
    sm: 10,
    md: 14,
    lg: 18,
    xl: 24,
  },
  typography: {
    titleFamily: 'Georgia',
    monoFamily: 'Courier New',
  },
  layout: {
    desktopBreakpoint: 1024,
    sidebarExpandedWidth: 308,
    sidebarCollapsedWidth: 92,
    mobileDrawerWidth: 292,
    contentMaxWidth: 1280,
  },
} as const;

export type Theme = typeof theme;
