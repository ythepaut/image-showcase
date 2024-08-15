import {useTranslations} from "next-intl";
import { GetStaticProps } from "next";

export default function HomePage() {
  const t = useTranslations("home");
  return <h1 className="text-red-600">{t("hello")}</h1>;
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      messages: require(`../../public/lang/${locale}.json`),
    },
  };
};
