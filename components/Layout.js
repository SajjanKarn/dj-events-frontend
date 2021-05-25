import Head from "next/head";
import { useRouter } from "next/router";

import Footer from "./Footer";
import Header from "./Header";
import Showcase from "./Showcase";

import styles from "@/styles/Layout.module.css";

export default function Layout({ title, description, keywords, children }) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header />

      {router.pathname === "/" && <Showcase />}

      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "DJ Events | Find the hottest parties.",
  description: "Find the best DJ's and hottest nightclub parties.",
  keywords: "DJ, events, nighclub parties, parties",
};
