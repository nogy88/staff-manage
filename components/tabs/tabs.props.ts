export interface TabsProps {
  activePage: string;
  tablePages: { key: string; title: string }[];
  onChangeActivePage: (newActivePage: string) => void;
}
