export namespace Card {
  export type Props = React.HTMLAttributes<HTMLDivElement>;

  export type Component = React.ForwardRefExoticComponent<
    Props & React.RefAttributes<HTMLDivElement>
  >;

  export type HeaderProps = React.HTMLAttributes<HTMLDivElement>;

  export type HeaderComponent = React.ForwardRefExoticComponent<
    HeaderProps & React.RefAttributes<HTMLDivElement>
  >;

  export type TitleProps = React.HTMLAttributes<HTMLDivElement>;

  export type TitleComponent = React.ForwardRefExoticComponent<
    TitleProps & React.RefAttributes<HTMLDivElement>
  >;

  export type DescriptionProps = React.HTMLAttributes<HTMLDivElement>;

  export type DescriptionComponent = React.ForwardRefExoticComponent<
    DescriptionProps & React.RefAttributes<HTMLDivElement>
  >;

  export type ContentProps = React.HTMLAttributes<HTMLDivElement>;

  export type ContentComponent = React.ForwardRefExoticComponent<
    ContentProps & React.RefAttributes<HTMLDivElement>
  >;

  export type FooterProps = React.HTMLAttributes<HTMLDivElement>;

  export type FooterComponent = React.ForwardRefExoticComponent<
    FooterProps & React.RefAttributes<HTMLDivElement>
  >;

  export type Definition = { type: "card" } & {
    component?: Component;
    headerCompoonent?: HeaderComponent;
    titleCommponent?: TitleComponent;
    descriptionCommponent?: DescriptionComponent;
    contentComponent?: ContentComponent;
    footerComponent?: FooterComponent;
  } & Props;
}
