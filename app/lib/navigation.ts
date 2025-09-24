import navigationData from './navigation-data.json';

export type MenuItem = {
  label: string;
  href: string;
};

export type MenuGroup = {
  label: string;
  href?: string;
  items?: MenuItem[];
};

export function getNavigation(): MenuGroup[] {
  return navigationData as MenuGroup[];
}
