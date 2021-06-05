import { useRouter } from "next/router";

import Layout from "@/components/Layout";
import DashboardEvent from "@/components/DashboardEvent";

import { API_URL } from "@/config/index";
import { parseCookie } from "@/helpers/index";

import styles from "@/styles/Dashboard.module.css";

export default function Dashboard({ events, token }) {
  const router = useRouter();

  // delete event.
  const deleteEvent = async (id) => {
    if (confirm("Are you sure ?")) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          toast.error("Unauthorized!");
          return;
        }
        toast.error("something went wrong.");
      } else {
        router.push("/events");
      }
    }
  };

  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>
        {events.length === 0 && <h4>You haven't created any events yet.</h4>}
        {events.map((event) => (
          <DashboardEvent
            key={event.id}
            event={event}
            handleDelete={deleteEvent}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookie(req);

  const res = await fetch(`${API_URL}/events/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const events = await res.json();
  events.reverse();

  return {
    props: { events, token },
  };
}
