import React from "react";

export interface BaseItem {
  key: React.Key;
  name: string;
  image: string;
  category: string;
  year: number;
}

export interface Field {
  key: string;
  title: string;
  dataIndex: keyof BaseItem;
}

