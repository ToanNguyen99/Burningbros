import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";


// eslint-disable-next-line react/prop-types
interface ImgProps {
    src: string,
    className: string,
    alt: string
}
const Img = ({ src, className, alt }: ImgProps) => {
    return <LazyLoadImage className={className || ""} alt={alt || "image"} effect="blur" src={src} />;
};

export default Img;
