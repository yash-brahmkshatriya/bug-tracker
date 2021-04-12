import React from 'react';
import { Chip } from '@material-ui/core';

const StyledChip = React.forwardRef(({ bgcolor, ...props }, ref) =>
  props.variant === 'outlined' ? (
    <Chip
      style={{ color: bgcolor, borderColor: bgcolor }}
      ref={ref}
      {...props}
    />
  ) : (
    <Chip style={{ backgroundColor: bgcolor }} ref={ref} {...props} />
  )
);
export default StyledChip;
