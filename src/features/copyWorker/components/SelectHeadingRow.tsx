import React from "react";
import Typography from "components/Typography/Typography";
import Stack from "components/Stack/Stack";
import SolidHighlight from "icons/SolidHighlight";
import SolidSelect from "icons/SolidSelect";
import SolidCross from "icons/SolidCross";

export interface IHeadingRowProps {
  selectCount: number;
  onUnselectAll?: () => void;
  onPin?: () => void;
  onDelete?: () => void;
}

const HeadingRow: React.FC<IHeadingRowProps> = ({
  selectCount,
  onUnselectAll,
  onPin,
  onDelete,
}) => {
  return (
    <Stack
      y="center"
      spacing={0}
      className="sticky pl-2 top-0 h-12 text-primary bg-elevation-primary border-b border-modifier-primary z-10"
    >
      <SolidSelect
        width={22}
        height={22}
        className="cursor-pointer"
        onClick={onUnselectAll}
      />
      <SolidHighlight className="ml-4 mr-2 cursor-pointer" onClick={onPin} />
      <SolidCross className="cursor-pointer" onClick={onDelete} />
      <Typography.Span className="ml-auto text-rg text-primary">
        Wybrane: {selectCount}
      </Typography.Span>
    </Stack>
  );
};

export default HeadingRow;
