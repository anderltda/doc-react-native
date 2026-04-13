import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Href, usePathname, useRouter } from 'expo-router';
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  DEFAULT_DOC_PATH,
  DEFAULT_DOC_SLUG,
  DOC_ROUTES,
  DocRoutePath,
  getDocByPath,
} from '@/features/docs/model/docRoutes';
import { theme } from '@/shared/theme/tokens';
import { typedMemo } from '@/shared/utils/typedMemo';

interface DocsShellProps {
  children: ReactNode;
}

function getPathnameRoute(pathname: string): DocRoutePath {
  const found = DOC_ROUTES.find((route) => route.path === pathname);
  return found?.path ?? DEFAULT_DOC_PATH;
}

function getInitials(label: string) {
  const clean = label.replace(/^\d+\s*-\s*/, '');
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'RM';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

interface SidebarMenuProps {
  collapsed: boolean;
  activePath: DocRoutePath;
  onNavigate: (path: DocRoutePath) => void;
  onCloseMobile?: () => void;
}

const SidebarMenu = typedMemo(function SidebarMenu({
  collapsed,
  activePath,
  onNavigate,
  onCloseMobile,
}: SidebarMenuProps) {
  return (
    <View style={styles.sidebarInner}>
      <View style={styles.sidebarTop}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoBadgeText}>RN</Text>
        </View>
        {!collapsed ? (
          <View style={styles.logoTextGroup}>
            <Text style={styles.logoTitle}>Readme Lab</Text>
            <Text style={styles.logoSubtitle}>Projeto Aula 2</Text>
          </View>
        ) : null}
      </View>

      <ScrollView contentContainerStyle={styles.menuList}>
        {DOC_ROUTES.map((route) => {
          const doc = getDocByPath(route.path);
          const isActive = route.path === activePath;
          const numberLabel = doc.title.split('-')[0]?.trim() || 'RM';

          return (
            <Pressable
              key={route.slug}
              onPress={() => {
                onNavigate(route.path);
                onCloseMobile?.();
              }}
              style={({ pressed }) => [
                styles.menuItem,
                collapsed && styles.menuItemCollapsed,
                isActive && styles.menuItemActive,
                pressed && styles.menuItemPressed,
              ]}
            >
              <View style={[styles.menuBadge, isActive && styles.menuBadgeActive]}>
                <MaterialCommunityIcons
                  name={route.icon}
                  size={collapsed ? 20 : 18}
                  color={isActive ? '#08242B' : '#D8E6E8'}
                />
              </View>
              {!collapsed ? (
                <View style={styles.menuTextGroup}>
                  <Text style={[styles.menuTitle, isActive && styles.menuTitleActive]} numberOfLines={1}>
                    {doc.title}
                  </Text>
                  <View style={styles.metaRow}>
                    <Text style={styles.menuNumber}>{numberLabel}</Text>
                    <Text style={styles.menuSubtitle} numberOfLines={1}>
                      {doc.sourcePath}
                    </Text>
                  </View>
                </View>
              ) : (
                <Text style={[styles.collapsedLabel, isActive && styles.collapsedLabelActive]}>
                  {getInitials(doc.title)}
                </Text>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
});

export const DocsShell = typedMemo(function DocsShell({ children }: DocsShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { width } = useWindowDimensions();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDesktop = width >= theme.layout.desktopBreakpoint;

  const drawerAnim = useRef(new Animated.Value(-theme.layout.mobileDrawerWidth)).current;
  const activePath = getPathnameRoute(pathname);
  const activeDoc = getDocByPath(activePath);

  useEffect(() => {
    if (isDesktop) {
      setMobileOpen(false);
      drawerAnim.setValue(-theme.layout.mobileDrawerWidth);
    }
  }, [isDesktop, drawerAnim]);

  useEffect(() => {
    Animated.timing(drawerAnim, {
      toValue: mobileOpen ? 0 : -theme.layout.mobileDrawerWidth,
      duration: mobileOpen ? 260 : 220,
      useNativeDriver: true,
    }).start();
  }, [drawerAnim, mobileOpen]);

  const sidebarWidth = collapsed
    ? theme.layout.sidebarCollapsedWidth
    : theme.layout.sidebarExpandedWidth;

  const handleNavigate = useCallback(
    (path: DocRoutePath) => {
      router.push(path as Href);
    },
    [router],
  );

  const desktopSidebar = useMemo(
    () => (
      <View style={[styles.sidebarContainer, { width: sidebarWidth }]}>
        <SidebarMenu collapsed={collapsed} activePath={activePath} onNavigate={handleNavigate} />
        <Pressable style={styles.collapseButton} onPress={() => setCollapsed((prev) => !prev)}>
          <Text style={styles.collapseButtonText}>{collapsed ? 'Expandir menu' : 'Encolher menu'}</Text>
        </Pressable>
      </View>
    ),
    [activePath, collapsed, handleNavigate, sidebarWidth],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.backgroundLayer}>
        <View style={[styles.glowOrb, styles.glowA]} />
        <View style={[styles.glowOrb, styles.glowB]} />
        <View style={[styles.glowOrb, styles.glowC]} />
      </View>

      <View style={styles.root}>
        {isDesktop ? desktopSidebar : null}

        <View style={styles.contentArea}>
          {!isDesktop ? (
            <View style={styles.mobileHeader}>
              <Pressable style={styles.burgerButton} onPress={() => setMobileOpen(true)}>
                <MaterialCommunityIcons name="menu" size={24} color="#EDF6F8" />
              </Pressable>
              <View style={styles.mobileHeaderText}>
                <Text style={styles.mobileHeaderTitle} numberOfLines={1}>
                  {activeDoc?.title ?? DEFAULT_DOC_SLUG}
                </Text>
                <Text style={styles.mobileHeaderSubtitle} numberOfLines={1}>
                  {activeDoc?.sourcePath ?? 'README.md'}
                </Text>
              </View>
            </View>
          ) : null}

          <View style={styles.pageSlot}>{children}</View>
        </View>
      </View>

      {!isDesktop ? (
        <View pointerEvents={mobileOpen ? 'auto' : 'none'} style={styles.mobileOverlayRoot}>
          <Pressable
            style={[styles.mobileBackdrop, !mobileOpen && styles.mobileBackdropHidden]}
            onPress={() => setMobileOpen(false)}
          />
          <Animated.View style={[styles.mobileDrawer, { transform: [{ translateX: drawerAnim }] }]}>
            <SidebarMenu
              collapsed={false}
              activePath={activePath}
              onNavigate={handleNavigate}
              onCloseMobile={() => setMobileOpen(false)}
            />
          </Animated.View>
        </View>
      ) : null}
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.pageBg,
  },
  backgroundLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  glowOrb: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.35,
  },
  glowA: {
    width: 260,
    height: 260,
    backgroundColor: theme.colors.brand,
    top: -60,
    right: -40,
  },
  glowB: {
    width: 420,
    height: 420,
    backgroundColor: '#2A7A7B',
    bottom: -180,
    left: -120,
  },
  glowC: {
    width: 220,
    height: 220,
    backgroundColor: '#9EE3DD',
    top: 220,
    left: 140,
  },
  root: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebarContainer: {
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.15)',
    backgroundColor: theme.colors.sidebarBg,
  },
  sidebarInner: {
    flex: 1,
  },
  sidebarTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.12)',
  },
  logoBadge: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: theme.colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBadgeText: {
    color: '#08242B',
    fontSize: 15,
    fontWeight: '900',
    fontFamily: theme.typography.titleFamily,
  },
  logoTextGroup: {
    flexShrink: 1,
  },
  logoTitle: {
    color: '#F8FBFC',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: theme.typography.titleFamily,
  },
  logoSubtitle: {
    color: '#A8C2C5',
    fontSize: 12,
    marginTop: 2,
  },
  menuList: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    gap: 7,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  menuItemCollapsed: {
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  menuItemActive: {
    borderColor: theme.colors.borderStrong,
    backgroundColor: 'rgba(242,176,119,0.14)',
  },
  menuItemPressed: {
    opacity: 0.86,
  },
  menuBadge: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuBadgeActive: {
    backgroundColor: theme.colors.brand,
  },
  menuTextGroup: {
    flex: 1,
  },
  menuTitle: {
    color: '#E5EEF0',
    fontSize: 13,
    fontWeight: '700',
  },
  menuTitleActive: {
    color: '#FFFDF6',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  menuNumber: {
    color: '#86A9AE',
    fontSize: 10,
    fontWeight: '700',
  },
  menuSubtitle: {
    color: '#9AB6BA',
    fontSize: 11,
    flex: 1,
  },
  collapsedLabel: {
    color: '#B6CFD2',
    fontSize: 10,
    fontWeight: '700',
  },
  collapsedLabelActive: {
    color: '#FDEED9',
  },
  collapseButton: {
    marginHorizontal: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.xs,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  collapseButtonText: {
    color: '#DAEAEC',
    fontSize: 12,
    fontWeight: '700',
  },
  contentArea: {
    flex: 1,
    minWidth: 0,
  },
  pageSlot: {
    flex: 1,
    maxWidth: theme.layout.contentMaxWidth,
    width: '100%',
    alignSelf: 'center',
  },
  mobileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(9, 30, 35, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 10,
  },
  burgerButton: {
    width: 42,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  mobileHeaderText: {
    flex: 1,
    minWidth: 0,
  },
  mobileHeaderTitle: {
    color: '#F7FCFD',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: theme.typography.titleFamily,
  },
  mobileHeaderSubtitle: {
    color: '#A6C1C5',
    fontSize: 12,
  },
  mobileOverlayRoot: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
  },
  mobileBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  mobileBackdropHidden: {
    opacity: 0,
  },
  mobileDrawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: theme.layout.mobileDrawerWidth,
    backgroundColor: 'rgba(10, 31, 36, 0.98)',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.12)',
  },
});
