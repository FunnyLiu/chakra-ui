/** @jsx jsx */
import { jsx } from "@emotion/core";
import { createContext, useContext, forwardRef } from "react";
import Box from "../Box";
//暴露自定义hooks，获取FormControlContext的参数们
export const useFormControl = props => {
  const context = useFormControlContext();
  if (!context) {
    return props;
  }
  const keys = Object.keys(context);
  return keys.reduce((acc, prop) => {
    /** Giving precedence to `props` over `context` */
    acc[prop] = props[prop];

    if (context) {
      if (props[prop] == null) {
        acc[prop] = context[prop];
      }
    }

    return acc;
  }, {});
};
//创建context
const FormControlContext = createContext();
//封装useContext
export const useFormControlContext = () => useContext(FormControlContext);
// 表单容器组件、
const FormControl = forwardRef(
  ({ isInvalid, isRequired, isDisabled, isReadOnly, ...rest }, ref) => {
    const context = {
      isRequired,
      isDisabled,
      isInvalid,
      isReadOnly,
    };

    return (
      <FormControlContext.Provider value={context}>
        <Box role="group" ref={ref} {...rest} />
      </FormControlContext.Provider>
    );
  },
);

FormControl.displayName = "FormControl";

export default FormControl;
