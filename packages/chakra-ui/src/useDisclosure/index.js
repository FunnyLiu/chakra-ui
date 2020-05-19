import { useState, useCallback } from "react";
// 封装弹框等打开和关闭的相关hooks
const useDisclosure = defaultIsOpen => {
  const [isOpen, setIsOpen] = useState(Boolean(defaultIsOpen));
  // 各方法只执行一次  
  const onClose = useCallback(() => setIsOpen(false), []);
  const onOpen = useCallback(() => setIsOpen(true), []);
  const onToggle = useCallback(() => setIsOpen(prevIsOpen => !prevIsOpen), []);
  return { isOpen, onOpen, onClose, onToggle };
};

export default useDisclosure;
