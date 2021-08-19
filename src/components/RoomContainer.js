import React from "react";
import RoomFilter from "./RoomFilter";
import RoomList from "./RoomList";
import Loading from "./Loading";
import { useGlobalContext } from "../context";

const RoomsContainer = () => {
  const { rooms, sortedRooms, loading } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <RoomFilter />
      <RoomList sortedRooms={sortedRooms} />
    </div>
  );
};

export default RoomsContainer;
