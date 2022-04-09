import React from "react";
import Stack from "components/Stack/Stack";
import Typography from "components/Typography/Typography";
import Icon from "components/Icon/Icon";
import SolidLoader from "icons/SolidLoader";

export interface ITableProps<Entry>
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  columns: {
    id: string;
    title: string;
    size?: string;
    cell?(entry: Entry & { cellSize?: string }): React.ReactElement;
  }[];
  data: Entry[];
  customHeadingRow?: JSX.Element;
  isLoading?: boolean;
}

const Table = <Entry extends { id: number }>({
  columns,
  data,
  customHeadingRow,
  isLoading = false,
  ...props
}: ITableProps<Entry>) => {
  return (
    <div {...props}>
      {customHeadingRow ? (
        customHeadingRow
      ) : (
        <Stack
          spacing={6}
          x="start"
          y="center"
          className="sticky top-0 h-12 bg-elevation-primary border-b border-modifier-primary z-10"
        >
          {columns.map(({ id, title, size }) => (
            <Typography.Span
              key={id}
              className={`text-rg text-content-normal ${size}`}
            >
              {title}
            </Typography.Span>
          ))}
        </Stack>
      )}
      {isLoading ? (
        <Stack x="center" className="mt-12">
          <Icon content={<SolidLoader />} />
        </Stack>
      ) : (
        data.map((rowProps) => (
          <Stack
            key={rowProps.id}
            spacing={6}
            x="start"
            y="center"
            className="h-12 border-b border-modifier-primary"
          >
            {columns.map(
              ({ id, size, cell: Cell }) =>
                Cell && (
                  <Cell
                    key={`${rowProps.id}-${id}`}
                    cellSize={size}
                    {...rowProps}
                  />
                )
            )}
          </Stack>
        ))
      )}
    </div>
  );
};

export default Table;
