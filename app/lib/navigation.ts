import navigationData from './navigation-data.json';
import overrides from './navigation-overrides.json';

export type MenuItem = {
  label: string;
  href: string;
};

export type MenuGroup = {
  label: string;
  href?: string;
  items?: MenuItem[];
};

type Overrides = {
  order?: string[];
  hidden?: string[];
};

const { order: orderOverride = [], hidden: hiddenOverride = [] } = (overrides as Overrides) || {};

export function getNavigation(): MenuGroup[] {
  const raw = navigationData as MenuGroup[];

  // Filter hidden by label
  const visible = raw.filter(group => !hiddenOverride.includes(group.label));

  // Stable original index to preserve relative order
  const withIndex = visible.map((g, i) => ({ g, i }));

  // Apply top-level order override by label sequence; others keep original order
  const orderIndex = new Map(orderOverride.map((label, idx) => [label, idx]));
  const sortedTopLevel = withIndex
    .sort((a, b) => {
      const aIdx = orderIndex.has(a.g.label) ? (orderIndex.get(a.g.label) as number) : Number.POSITIVE_INFINITY;
      const bIdx = orderIndex.has(b.g.label) ? (orderIndex.get(b.g.label) as number) : Number.POSITIVE_INFINITY;
      if (aIdx !== bIdx) return aIdx - bIdx;
      return a.i - b.i;
    })
    .map(({ g }) => g);

  // Child items: do not reorder unless explicitly placed in orderOverride? Minimalist: keep original order and only filter hidden children by label
  const groups = sortedTopLevel.map(group => {
    const items = group.items?.filter(item => !hiddenOverride.includes(item.label));
    return { ...group, items } as MenuGroup;
  });

  return groups;
}
