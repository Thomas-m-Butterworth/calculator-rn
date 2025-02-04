import React from "react";
import { HistoryList, PageContainer, TitleText } from "@/src/components";

export default function HistoryScreen() {
  return (
    <PageContainer>
      <TitleText testId={"historyTitle"}>History</TitleText>
      <HistoryList />
    </PageContainer>
  );
}
