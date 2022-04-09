import Stack from "components/Stack/Stack";
import Typography from "components/Typography/Typography";
import React from "react";

export interface IComingSoonProps {}

const ComingSoon: React.FC<IComingSoonProps> = (props) => {
  return (
    <Stack x="center" className="pt-12">
      <Typography className="text-2xl">Coming Soon</Typography>
    </Stack>
  );
};

export default ComingSoon;
