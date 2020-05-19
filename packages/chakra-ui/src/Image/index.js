/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useEffect, useState, forwardRef, useRef } from "react";
import Box from "../Box";
// 自定义image loaded的hooks
export function useHasImageLoaded(props) {
  const { src, onLoad, onError, enabled = true } = props;
  //利用useRef来做标识位
  const isMounted = useRef(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  // 副作用
  useEffect(() => {
    if (!src || !enabled) {
      return;
    }

    const image = new window.Image();
    image.src = src;

    image.onload = event => {
      if (isMounted.current) {
        //调用useState的内容
        setHasLoaded(true);
        onLoad && onLoad(event);
      }
    };

    image.onerror = event => {
      if (isMounted.current) {
        setHasLoaded(false);
        onError && onError(event);
      }
    };
    // 以下值变化了才触发
  }, [src, onLoad, onError, enabled]);
  //将标识位置为false
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return hasLoaded;
}

const NativeImage = forwardRef(
  ({ htmlWidth, htmlHeight, alt, ...props }, ref) => (
    <img width={htmlWidth} height={htmlHeight} ref={ref} alt={alt} {...props} />
  ),
);

const Image = forwardRef((props, ref) => {
  const { src, fallbackSrc, onError, onLoad, ignoreFallback, ...rest } = props;

  const hasLoaded = useHasImageLoaded({
    src,
    onLoad,
    onError,
    enabled: !Boolean(ignoreFallback),
  });

  const imageProps = ignoreFallback
    ? { src, onLoad, onError }
    : { src: hasLoaded ? src : fallbackSrc };

  return <Box as={NativeImage} ref={ref} {...imageProps} {...rest} />;
});

Image.displayName = "Image";

export default Image;
