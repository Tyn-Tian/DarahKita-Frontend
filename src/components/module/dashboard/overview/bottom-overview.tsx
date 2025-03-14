"use client";

import { getUserRole } from "@/lib/utils";
import LastDonation from "./last-donation";
import LastSchedule from "./last-schedule";

export default function BottomOverview() {
  const isPmi = getUserRole() === "pmi";

  if (isPmi) {
    return <LastSchedule />;
  }

  return <LastDonation />;
}
