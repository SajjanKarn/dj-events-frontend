import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaImage } from "react-icons/fa";
import moment from "moment";

import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import { API_URL } from "@/config/index.js";

import styles from "@/styles/Form.module.css";
import "react-toastify/dist/ReactToastify.css";
import ImageUpload from "@/components/ImageUpload";

export default function AddEventsPage({ event }) {
  const [values, setValues] = useState({
    name: event.name,
    performers: event.performers,
    venue: event.venue,
    address: event.address,
    date: event.date,
    time: event.time,
    description: event.description,
  });
  const [eventImage, setEventImage] = useState(
    event.image ? event.image.formats.thumbnail.url : null
  );
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasEmptyFields = Object.values(values).some((field) => field === "");
    if (hasEmptyFields) {
      toast.error("🤨 Please fill all fields.");
    } else {
      const res = await fetch(`${API_URL}/events/${event.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        toast.error("Something went wrong. 💥");
      } else {
        router.push(`/events/${event.slug}`);
      }
    }
  };

  const imageUploaded = async () => {
    const res = await fetch(`${API_URL}/events/${event.id}`);
    const data = await res.json();

    setEventImage(data.image.formats.thumbnail.url);
    setShowModal(false);
  };

  return (
    <Layout title="Add New Event">
      <Link href="/events">Go Back</Link>
      <ToastContainer />
      <h1>Edit Event</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={moment(values.date).format("yyyy-MM-DD")}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type="submit" value="Update Event" className="btn" />
      </form>

      <h2>Event Image</h2>
      {eventImage ? (
        <Image src={eventImage} height={100} width={170} />
      ) : (
        <h3>No image uplaoded.</h3>
      )}

      <div>
        <button onClick={() => setShowModal(true)} className="btn-secondary">
          <FaImage /> Set Image
        </button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload eventId={event.id} imageUploaded={imageUploaded} />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/events/${id}`);
  const event = await res.json();
  return {
    props: { event },
  };
}
