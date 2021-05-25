import { useRouter } from "next/router";
import Layout from "@/components/Layout";

export default function EventPage() {
  const router = useRouter();
  return (
    <Layout>
      <h2>Slug Event.</h2>
      <h3>{router.query.slug}</h3>
    </Layout>
  );
}
