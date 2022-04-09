import React, { PropsWithChildren, ReactElement } from "react";

export interface ITypographyProps {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "span"
    | "strong"
    | "small"
    | "p";
  className?: string;
}

const Headline: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > &
    ITypographyProps
> = ({ children, variant: Variant = "h1", className = "", ...props }) => {
  return (
    <Variant
      className={`text-content-primary font-medium ${className}`}
      {...props}
    >
      {children}
    </Variant>
  );
};

const Subhead: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > &
    ITypographyProps
> = ({
  children,
  variant: Variant = "span",
  className = "text-rg",
  ...props
}) => {
  return (
    <Variant className={`block text-content-secondary ${className}`} {...props}>
      {children}
    </Variant>
  );
};

const Span: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > &
    ITypographyProps
> = ({ children, className = "text-interactive-normal", ...props }) => {
  return (
    <span className={`block ${className}`} {...props}>
      {children}
    </span>
  );
};

const Paragraph: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > &
    ITypographyProps
> = ({ children, variant: Variant = "p", className = "", ...props }) => {
  return (
    <Variant className={`text-content-secondary ${className}`} {...props}>
      {children}
    </Variant>
  );
};

const Typography = Object.assign(Headline, {
  Subhead,
  Span,
  Paragraph,
}) as {
  ({
    children,
  }: PropsWithChildren<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    > &
      ITypographyProps
  >): ReactElement;
  Subhead({
    children,
  }: PropsWithChildren<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    > &
      ITypographyProps
  >): ReactElement;
  Span({
    children,
  }: PropsWithChildren<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    > &
      ITypographyProps
  >): ReactElement;
  Paragraph({
    children,
  }: PropsWithChildren<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    > &
      ITypographyProps
  >): ReactElement;
};

export default Typography;
