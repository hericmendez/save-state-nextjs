"use client";
import Link from "next/link";

import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { useParams } from "next/navigation";
import { useGameListsStore } from "@/stores/useGameListsStore";
import { useGamesStore } from "@/stores/useGamesStore";

export default function PlaceholderPage() {
    const {
    lists,
  } = useGameListsStore();

    const {
      games,
    } = useGamesStore();
  const {listId} = useParams()
  console.log("listId ==> ", listId);
            const list = lists.find(l => l._id === listId);
            console.log("list ==> ", list);
              if (!list) return null;
  return (
    <ContentLayout title={list?.name || "Game List"}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{list?.name} ({list.gamesCount})</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PlaceholderContent />
    </ContentLayout>
  );
}
