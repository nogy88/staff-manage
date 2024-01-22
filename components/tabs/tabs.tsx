import { TabsProps } from "./tabs.props";
import { Tab, Tabs as TabsUI } from "@nextui-org/react";

const Tabs = ({ tablePages, onChangeActivePage }: TabsProps): JSX.Element => {
  return (
    <div className="flex flex-wrap gap-4">
      {tablePages && (
        <TabsUI
          variant="underlined"
          aria-label="Tabs variants"
          items={tablePages}
          onSelectionChange={onChangeActivePage as any}
        >
          {(item) => <Tab key={item.key} title={item.title} />}
        </TabsUI>
      )}
    </div>
  );
};
export default Tabs;
