import React from "react";
import Box from "../Box";
// 文本组件透传参数，作为p标签
const Text = React.forwardRef((props, ref) => {
  return <Box ref={ref} as="p" fontFamily="body" {...props} />;
});

Text.displayName = "Text";

export default Text;
