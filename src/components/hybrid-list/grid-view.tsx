//src/app/components/hybrid-list/grid-view.tsx
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import CustomContextMenu from "./context-menu";
import { BaseItem, ContextMenuItemType } from "./types";

interface Props {
  data: BaseItem[];
  selectedKeys: React.Key[];
  toggle: (item: BaseItem) => void;
  contextMenu: (item: BaseItem) => ContextMenuItemType[];
}

export default function GridView({ data, selectedKeys, toggle, contextMenu }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {data.map(item => {
        const selected = selectedKeys.includes(item.key);

        return (
          <CustomContextMenu key={item.key} items={contextMenu(item)}>
            <div
              onClick={() => toggle(item)}
              className={`relative cursor-pointer rounded overflow-hidden border
                ${selected ? "border-primary" : "border-muted"}`}
            >
              <Image
                src={item.image}
                alt={item.name}
                width={400}
                height={600}
                className="object-cover"
              />

              <div className="absolute bottom-0 w-full bg-black/70 p-2 text-white">
                {item.name}
              </div>

              <Button size="icon" variant="ghost" className="absolute top-2 right-2">
                {selected ? "✓" : "+"}
              </Button>
            </div>
          </CustomContextMenu>
        );
      })}
    </div>
  );
}
