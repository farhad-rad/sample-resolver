import { ReactNode } from "react";
import { Sidebar } from "./sidebar";

export namespace Layout {
  export type BaseProps = {
    children: ReactNode | ReactNode[];
  };
  export type BaseComponent = React.FC<BaseProps>;

  export type PanelProps = {
    children: ReactNode | ReactNode[];
    // definition: PanelDefinition;
    sidebar?: ReactNode | ReactNode[];
  };
  export type PanelComponent = React.FC<PanelProps>;
  export type PanelDefinition = {
    component?: PanelComponent;
    sideBar?: false | Omit<Sidebar.Definition, "type">;
    topBar?:
      | false
      | {
          breadcrumb?: boolean | React.ComponentType;
          // user?: false | "avatar";
        };
  };

  export type AuthProps = {
    children: ReactNode | ReactNode[];
  };
  export type AuthComponent = React.FC<AuthProps>;
  export type AuthDefinition = {};

  export type LandingProps = {
    children: ReactNode | ReactNode[];
    sidebar?: ReactNode | ReactNode[];
  };
  export type LandingComponent = React.FC<LandingProps>;
  export type LandingDefinition = {};

  export type ErrorProps = {
    children: ReactNode | ReactNode[];
  };
  export type ErrorComponent = React.FC<ErrorProps>;
}
