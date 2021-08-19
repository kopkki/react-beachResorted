import React from "react";
import { useGlobalContext } from "../context";
import Loading from "../components/Loading";
import Room from "../components/Room";
import Title from "../components/Title";

const FeaturedRooms = () => {
  const { loading, featuredRooms } = useGlobalContext();

  return (
    <section className="featured-rooms">
      <Title title="Featured Rooms" />
      <div className="featured-rooms-center">
        {loading ? (
          <Loading />
        ) : (
          featuredRooms.map((room) => {
            return <Room key={room.id} room={room} />;
          })
        )}
      </div>
    </section>
  );
};

export default FeaturedRooms;
