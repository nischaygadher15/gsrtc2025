"use client";

import { Provider } from "react-redux";
import { ReduxStore } from "@/redux/store";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={ReduxStore}>{children}</Provider>;
}
