"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/ui/SegmentedControl";

export function SegmentedControlDemo() {
  const items = ["No-code", "Low-code", "Pro-code"];
  const [active, setActive] = useState(items[0]);
  return (
    <SegmentedControl items={items} active={active} onChange={setActive} />
  );
}
