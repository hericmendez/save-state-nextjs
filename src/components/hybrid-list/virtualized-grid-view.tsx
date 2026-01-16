"use client";

import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
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

const COLUMN_COUNT = 4;
const CARD_HEIGHT = 280; // ajuste fino depois

export default function VirtualizedGridView({
  data,
  selectedKeys,
  toggle,
  contextMenu,
}: Props) {
  const parentRef = useRef<HTMLDivElement | null>(null);

  const rowCount = Math.ceil(data.length / COLUMN_COUNT);

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => CARD_HEIGHT,
    overscan: 5,
  });

  return (
    <div
      ref={parentRef}
      className="h-[80vh] overflow-auto"
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map(virtualRow => {
            
          const rowIndex = virtualRow.index;
          const start = rowIndex * COLUMN_COUNT;
          const rowItems = data.slice(start, start + COLUMN_COUNT);
          console.log("rowItems ==> ", rowItems.length);

          return (
            <div
              key={virtualRow.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
              }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 px-1"
            >
              {rowItems.map(item => {
                console.log("render", item.key);
                if (!item) return null;
                const selected = selectedKeys.includes(item.key);

                return (
                  <CustomContextMenu
                    key={item.key}
                    items={contextMenu(item)}
                  >
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

                      <div className="absolute bottom-0 w-full bg-black/70 p-2 text-white text-sm">
                        {item.name}
                      </div>

                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2"
                      >
                        {selected ? "✓" : "+"}
                      </Button>
                    </div>
                  </CustomContextMenu>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
