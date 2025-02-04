import React from "react";
import { HistoryList, PageContainer } from "@/src/components";

export default function HistoryScreen() {
  return (
    <PageContainer isHeaderEnabled={true}>
      <HistoryList />
    </PageContainer>
  );
}
