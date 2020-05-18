import React, { forwardRef } from "react";
import Box from "../Box";
// 套一层属性转化而已
const Flex = forwardRef(({ align, justify, wrap, direction, ...rest }, ref) => (
  <Box
    ref={ref}
    display="flex"
    flexDirection={direction}
    alignItems={align}
    justifyContent={justify}
    flexWrap={wrap}
    {...rest}
  />
));

Flex.displayName = "Flex";

export default Flex;
