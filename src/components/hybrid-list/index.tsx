//src/app/components/hybrid-list/index.tsx
"use client";

import { useEffect, useState } from "react";
import GridView from "./grid-view";
import TableView from "./table-view";
import InfiniteGridView from "./inifinite-scroll-grid-view";
import VirtualizedGridView from "./virtualized-grid-view";
import data from "./data.json";
import { Button } from "@/components/ui/button";
import { BaseItem, Field } from "./types";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select";
import { Search } from "lucide-react";


const fields: Field[] = [
    { key: "name", title: "Nome", dataIndex: "name" },
    { key: "category", title: "Categoria", dataIndex: "category" },
    { key: "year", title: "Ano", dataIndex: "year" },
];

export default function HybridList() {
    const [view, setView] = useState<"grid" | "table" | "infinite-scroll" | "virtualized">("grid");
    const [selected, setSelected] = useState<React.Key[]>([]);
    const [search, setSearch] = useState("");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const toggle = (item: BaseItem) => {
        setSelected(prev =>
            prev.includes(item.key)
                ? prev.filter(k => k !== item.key)
                : [...prev, item.key]
        );
    };

    const contextMenu = (item: BaseItem) => [
        { label: "Abrir" },
        { label: "Editar" },
        { label: "---" },
        { label: "Excluir", onClick: () => console.log("delete", item) },
    ];
    const filteredData = search
        ? data.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase())
        )
        : data;


    const sortedData = [...filteredData].sort((a, b) => {
        if (a.name < b.name) return sortDir === "asc" ? -1 : 1;
        if (a.name > b.name) return sortDir === "asc" ? 1 : -1;
        return 0;
    });

    const totalItems = sortedData.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const paginatedData = sortedData.slice(
        (page - 1) * pageSize,
        page * pageSize
    );
    useEffect(() => {
        setPage(1);
    }, [search, sortDir, pageSize]);

    return (
        <div className="space-y-4">
            <div className="flex gap-2">

                <Input
                    placeholder="Buscar por nome..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setPage(1);
                        }
                    }}
                />

                <Button onClick={() => setPage(1)} variant="outline">
                    <Search size={16} />
                </Button>
                <Button
                    variant="outline"
                    onClick={() => {
                        setSortDir(prev => (prev === "asc" ? "desc" : "asc"));
                        setPage(1);
                    }}
                >
                    Ordem: {sortDir === "asc" ? "A → Z" : "Z → A"}
                </Button>

        
            </div>
            <Select onValueChange={(e) => setView(e as "grid" | "table" | "infinite-scroll" | "virtualized")}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="table">Table</SelectItem>
                    <SelectItem value="grid">Grid</SelectItem>
                    <SelectItem value="infinite-scroll">Infinite Scroll (Render Stack)</SelectItem>
                              <SelectItem value="virtualized">Infinite Scroll (Virtualization)</SelectItem>
                </SelectContent>
            </Select>
            {view === "grid" &&
                <GridView
                    data={paginatedData}
                    selectedKeys={selected}
                    toggle={toggle}
                    contextMenu={contextMenu}
                />}
            {view === "table" &&
                <TableView
                    data={paginatedData}
                    fields={fields}
                    selectedKeys={selected}
                    toggle={toggle}
                    contextMenu={contextMenu}
                />
            }
            {view === "infinite-scroll" &&
                <InfiniteGridView
                    data={sortedData}
                    selectedKeys={selected}
                    toggle={toggle}
                    contextMenu={contextMenu}
                />
            }
                   {view === "virtualized" &&
                <VirtualizedGridView
                    data={sortedData}
                    selectedKeys={selected}
                    toggle={toggle}
                    contextMenu={contextMenu}
                />
            }
            {view !== 'infinite-scroll' && view !== 'virtualized' &&
                <div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <Button
                            variant="outline"
                            disabled={page === 1}
                            onClick={() => setPage(p => p - 1)}
                        >
                            Anterior
                        </Button>

                        {Array.from({ length: totalPages }).map((_, i) => {
                            const p = i + 1;
                            return (
                                <Button
                                    key={p}
                                    size="icon"
                                    variant={p === page ? "default" : "outline"}
                                    onClick={() => setPage(p)}
                                >
                                    {p}
                                </Button>
                            );
                        })}

                        <Button
                            variant="outline"
                            disabled={page === totalPages}
                            onClick={() => setPage(p => p + 1)}
                        >
                            Próxima
                        </Button>
                    </div>

                    <Select
                        value={String(pageSize)}
                        onValueChange={(v) => {
                            setPageSize(Number(v));
                            setPage(1);
                        }}
                    >
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Itens / página" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="6">6</SelectItem>
                            <SelectItem value="12">12</SelectItem>
                            <SelectItem value="24">24</SelectItem>
                        </SelectContent>
                    </Select>
                </div>}

        </div>
    );
}
