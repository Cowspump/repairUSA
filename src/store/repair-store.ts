import { create } from "zustand";

export type RepairAnswers = {
  appliance: string;
  issue: string;
  details?: string;
  howItHappened?: string;
  whenStarted?: string;
  brand?: string;
  date?: string;
  time?: string;
};

type RepairStore = RepairAnswers & {
  setAnswers: (answers: Partial<RepairAnswers>) => void;
  reset: () => void;
};

const initial: RepairAnswers = { appliance: "", issue: "" };

export const useRepairStore = create<RepairStore>((set) => ({
  ...initial,
  setAnswers: (answers) => set((state) => ({ ...state, ...answers })),
  reset: () => set(initial),
}));

export function syncRepairUrl(answers: Pick<RepairAnswers, "appliance" | "issue">) {
  const url = new URL(window.location.href);
  if (answers.appliance) url.searchParams.set("appliance", answers.appliance);
  else url.searchParams.delete("appliance");
  if (answers.issue) url.searchParams.set("issue", answers.issue === "Other (describe it)" ? "other" : answers.issue);
  else url.searchParams.delete("issue");
  window.history.replaceState({}, "", url);
}
