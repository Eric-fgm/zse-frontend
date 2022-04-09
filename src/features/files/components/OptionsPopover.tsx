import Icon from "components/Icon/Icon";
import Typography from "components/Typography/Typography";
import SolidMore from "icons/SolidMore";
import React, { useState } from "react";
import { Popover } from "react-tiny-popover";

export interface IOptionsPopoverProps {
  options: { highlight?: boolean; text: string; onClick: () => void }[];
}

const PopoverContent: React.FC<
  IOptionsPopoverProps & { setPopoverOpen: (payload: boolean) => void }
> = ({ options, setPopoverOpen }) => {
  return (
    <div className="py-1 w-40 bg-elevation-primary border border-modifier-primary rounded shadow-lg">
      {options.map(({ highlight, text, onClick }) => (
        <div
          key={text}
          className={`px-3 py-2 text-rg cursor-pointer hover:bg-elevation-active ${
            highlight
              ? "text-primary"
              : "text-content-secondary hover:text-content-primary"
          }`}
          onClick={() => {
            onClick();
            setPopoverOpen(false);
          }}
        >
          <Typography.Span>{text}</Typography.Span>
        </div>
      ))}
    </div>
  );
};

const OptionsPopover: React.FC<IOptionsPopoverProps> = (props) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const toggleOpen = () => setPopoverOpen((wasOpen) => !wasOpen);

  const handleClose = () => setPopoverOpen(false);

  return (
    <Popover
      isOpen={isPopoverOpen}
      padding={4}
      boundaryInset={8}
      positions={["left"]}
      align="center"
      containerStyle={{ zIndex: "99" }}
      content={<PopoverContent setPopoverOpen={setPopoverOpen} {...props} />}
      onClickOutside={handleClose}
    >
      <div onClick={toggleOpen}>
        <Icon
          size={32}
          content={<SolidMore width={20} />}
          interactive
          // onClick={handleDelete(id)}
        />
      </div>
    </Popover>
  );
};

export default OptionsPopover;
