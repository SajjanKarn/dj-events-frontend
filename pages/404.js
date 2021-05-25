import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

import Layout from "@/components/Layout";

import styles from "@/styles/404.module.css";

export default function NotFoundPage() {
  return (
    <Layout title="Not Found | DJ Events">
      <div className={styles.error}>
        <h1>
          {" "}
          <FaExclamationTriangle /> Not Found
        </h1>
        <h4>The requested page doesn't exist.</h4>
        <Link href="/">Go Back Home</Link>
      </div>
    </Layout>
  );
}
