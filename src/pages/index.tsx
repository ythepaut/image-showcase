import { GetStaticProps } from "next";
import Gallery from "../components/gallery/Gallery";
import { Image } from "../model/image";

interface Props {
  messages: any;
  images: Image[];
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  return {
    props: {
      messages: require(`../../public/lang/${context.locale}.json`),
      images: require("../../public/assets/images.json")
    }
  };
};

export default function HomePage(props: Readonly<Props>) {
  return (
    <section className="p-100 bg-bg-light" aria-label="Gallery Section">
      <Gallery images={props.images} />
    </section>
  );
}
