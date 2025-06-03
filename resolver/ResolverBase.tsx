/* eslint-disable react/display-name */
"use client"
import React from "react";
import { ApplicationUserInterface, panellyComponentNames } from "@/contracts/ui";
import ui from "@/components/kit"; // Or any other kit

function resolve<TComponent extends keyof ApplicationUserInterface>(
    component: TComponent
): ApplicationUserInterface[TComponent] {
    return React.forwardRef<
        React.ComponentPropsWithoutRef<ApplicationUserInterface[TComponent]>,
        React.ComponentRef<ApplicationUserInterface[TComponent]>
    >((props, ref) => {
        const Comp: any = ui[component];
        return <Comp ref={ref} {...(props as any)} />;
    }) as ApplicationUserInterface[TComponent];
}

const ResolverBase: ApplicationUserInterface = Object.fromEntries(
    panellyComponentNames.map((x) => [x, resolve(x)])
) as ApplicationUserInterface;

export default ResolverBase;
