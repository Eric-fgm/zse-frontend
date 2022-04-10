import React from "react";
import { Link } from "react-router-dom";
import Typography from "components/Typography/Typography";
import Stack from "components/Stack/Stack";
import SolidShield from "icons/SolidShield";

export interface ILogoProps {}

const Logo: React.FC<ILogoProps> = (props) => {
  return (
    <Link to="/" {...props}>
      <Stack spacing={8} y="center" className="pl-0.5 pr-1">
        <SolidShield className="text-primary" />
        <Typography className="text-xl">Studio</Typography>
      </Stack>
    </Link>
  );
};

export default Logo;
