import React from "react";
import Stack from "components/Stack/Stack";
import Typography from "components/Typography/Typography";

export interface ISearchResultHintProps {
  icon: JSX.Element;
  text: string;
}

const SearchResultHint: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > &
    ISearchResultHintProps
> = ({ icon, text, ...props }) => {
  return (
    <Stack
      y="center"
      spacing={10}
      className="px-4 h-10 cursor-pointer"
      {...props}
    >
      {icon}
      <Typography.Span variant="h4" className="text-rg truncate">
        {text}
      </Typography.Span>
    </Stack>
  );
};

export default SearchResultHint;
