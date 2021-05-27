import qs from "qs";
import Link from "next/link";
import { useRouter } from "next/router";

import { API_URL } from "@/config/index";

import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";

export default function SearchEventsPage({ events }) {
  const router = useRouter();
  return (
    <Layout title="Search Results">
      <Link href="/events"> Go Back</Link>
      <h1>Search Results.</h1>
      <h2>Search Results for : {router.query.term}</h2>

      {events.length === 0 && <h1>No Events found.</h1>}

      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { venue_contains: term },
        { description_contains: term },
      ],
    },
  });
  const res = await fetch(`${API_URL}/events?${query}`);
  const events = await res.json();

  return {
    props: { events },
  };
}
