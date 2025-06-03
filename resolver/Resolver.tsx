"use client";
import {
  ApplicationUserInterface,
  panellyComponentNames,
} from "@/contracts/ui";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const items: any[] = [];
for (const compName of panellyComponentNames) {
  const CompLazyLoaded = dynamic(
    () =>
      import("./ResolverBase").then((module) => ({
        default: module.default[compName],
      })) as any,
    {
      // suspense: true,
    }
  );
  const Comp: React.ComponentType<any> = (props) => (
    <Suspense fallback={<></>}>
      <CompLazyLoaded {...props} />
    </Suspense>
  );
  items.push([compName, Comp]);
}

const Resolver: ApplicationUserInterface = Object.fromEntries(
  items
) as ApplicationUserInterface;

export { Resolver };
