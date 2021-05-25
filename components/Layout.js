import Head from "next/head";

import styles from "../styles/Layout.module.css";

export default function Layout({ title, description, keywords, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <div className={styles.container}>{children}</div>
    </div>
  );
}

Layout.defaultProps = {
  title: "DJ Events | Find the hottest parties.",
  description: "Find the best DJ's and hottest nightclub parties.",
  keywords: "DJ, events, nighclub parties, parties",
};
