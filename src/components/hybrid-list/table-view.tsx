//src/app/components/hybrid-list/table-view.tsx
"use client";

import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import CustomContextMenu from "../context-menu";
import { BaseItem, Field } from "./types";
import { ContextMenuItemType } from "../context-menu/types";
interface Props {
  data: BaseItem[];
  fields: Field[];
  selectedKeys: React.Key[];
  toggle: (item: BaseItem) => void;
  contextMenu: (item: BaseItem) => ContextMenuItemType[];
}

export default function TableView({ data, fields, selectedKeys, toggle, contextMenu }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead />
          {fields.map(f => <TableHead key={f.key}>{f.title}</TableHead>)}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map(item => {
          const selected = selectedKeys.includes(item.key);

          return (
            <CustomContextMenu key={item.key} items={contextMenu(item)}>
              <TableRow onClick={() => toggle(item)} className="cursor-pointer">
                <TableCell>{selected ? "✓" : "+"}</TableCell>
                {fields.map(f => (
                  <TableCell key={f.key}>{item[f.dataIndex]}</TableCell>
                ))}
              </TableRow>
            </CustomContextMenu>
          );
        })}
      </TableBody>
    </Table>
  );
}
