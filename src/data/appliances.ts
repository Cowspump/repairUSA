export type Appliance = {
  slug: string;
  label: string;
  issues: string[];
};

export const appliances: Appliance[] = [
  { slug: "washer", label: "Washer", issues: ["Not draining", "Won’t spin", "Leaking", "Won’t start", "Loud noise", "Door won’t open", "Error code"] },
  { slug: "dryer", label: "Dryer", issues: ["Not heating", "Won’t start", "Drum not turning", "Takes too long to dry", "Loud noise", "Burning smell"] },
  { slug: "refrigerator", label: "Refrigerator", issues: ["Not cooling", "Freezer not freezing", "Leaking water", "Ice maker issue", "Loud noise", "Frost buildup"] },
  { slug: "dishwasher", label: "Dishwasher", issues: ["Not draining", "Not cleaning", "Leaking", "Won’t start", "Door won’t latch"] },
  { slug: "oven", label: "Oven & Range", issues: ["Not heating", "Burner won’t light", "Wrong temperature", "Door won’t open", "Gas smell"] },
  { slug: "cooktop", label: "Cooktop", issues: ["Burner won’t light", "Not heating", "Knob or touch panel issue", "Gas smell"] },
  { slug: "microwave", label: "Microwave", issues: ["Not heating", "Sparks", "Turntable stuck", "Display dead"] },
  { slug: "other", label: "Other", issues: ["Not sure", "Other issue"] },
];

export const getIssueOptions = (appliance?: Appliance) => [
  ...(appliance?.issues ?? []),
  "Other (describe it)",
];
