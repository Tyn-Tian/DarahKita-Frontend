"use client";

import { getUserRole } from "@/lib/utils";
import { ProfileForm } from "./profile-form";
import { ProfilePmiForm } from "./profile-pmi-form";

export default function ProfileDetail() {
  return getUserRole() == "pmi" ? <ProfilePmiForm /> : <ProfileForm />;
}
