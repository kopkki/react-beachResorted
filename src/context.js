import React, { useContext, useState, useEffect } from "react";
import items from "./data";
import Client from "./Contentful";

const RoomContext = React.createContext();

const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [sortedRooms, setSortedRooms] = useState([]);
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("all");
  const [capacity, setCapacity] = useState(1);
  const [price, setPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minSize, setMinSize] = useState(0);
  const [maxSize, setMaxSize] = useState(0);
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);

  const getData = async () => {
    try {
      const client = Client;
      const response = await client.getEntries({
        content_type: "beachResortedRoom",
      });
      const newItems = [...items, ...response.items];
      // console.log(newItems);

      let rooms = formatData(newItems);
      let featuredRooms = rooms.filter((room) => room.featured === true);
      let maxPrice = Math.max(...rooms.map((item) => item.price));
      let maxSize = Math.max(...rooms.map((item) => item.size));

      setRooms(rooms);
      setFeaturedRooms(featuredRooms);
      setLoading(false);
      setPrice(maxPrice);
      setMaxPrice(maxPrice);
      setMaxSize(maxSize);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    // let rooms = formatData(items);
    // let featuredRooms = rooms.filter((room) => room.featured === true);
    // let maxPrice = Math.max(...rooms.map((item) => item.price));
    // let maxSize = Math.max(...rooms.map((item) => item.size));

    // setRooms(rooms);
    // setFeaturedRooms(featuredRooms);
    // setLoading(false);
    // setPrice(maxPrice);
    // setMaxPrice(maxPrice);
    // setMaxSize(maxSize);
  }, []);

  const formatData = (items) => {
    let tempItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url);

      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  };

  const getRoom = (slug) => {
    let tempRooms = [...rooms];
    const room = tempRooms.find((room) => room.slug === slug);
    return room;
  };

  const handleChange = (e) => {
    console.log(e);
    const target = e.target;
    const name = e.target.name;
    const value = target.value;
    if (name === "type") {
      setType(value);
    }
  };

  const getSortedData = async () => {
    try {
      const client = Client;
      const response = await client.getEntries({
        content_type: "beachResortedRoom",
      });
      console.log(response);
      const newItems = [...items, ...response.items];
      let rooms = formatData(newItems);
      let tempRooms = [...rooms];
      console.log(rooms);

      if (type !== "all") {
        tempRooms = tempRooms.filter((room) => room.type === type);
      }
      if (capacity !== 1) {
        tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
      }

      tempRooms = tempRooms.filter((room) => room.price <= price);

      tempRooms = tempRooms.filter((room) => room.size >= minSize);
      tempRooms = tempRooms.filter((room) => room.size <= maxSize);

      if (breakfast) {
        tempRooms = tempRooms.filter((room) => room.breakfast === true);
      }

      if (pets) {
        tempRooms = tempRooms.filter((room) => room.pets === true);
      }

      setLoading(false);
      setSortedRooms(tempRooms);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSortedData();
    // let rooms = formatData(items);
    // let tempRooms = [...rooms];

    // if (type !== "all") {
    //   tempRooms = tempRooms.filter((room) => room.type === type);
    // }
    // if (capacity !== 1) {
    //   tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
    // }

    // tempRooms = tempRooms.filter((room) => room.price <= price);

    // tempRooms = tempRooms.filter((room) => room.size >= minSize);
    // tempRooms = tempRooms.filter((room) => room.size <= maxSize);

    // if (breakfast) {
    //   tempRooms = tempRooms.filter((room) => room.breakfast === true);
    // }

    // if (pets) {
    //   tempRooms = tempRooms.filter((room) => room.pets === true);
    // }

    // setSortedRooms(tempRooms);
  }, [type, capacity, price, minSize, maxSize, breakfast, pets]);

  return (
    <RoomContext.Provider
      value={{
        rooms,
        sortedRooms,
        loading,
        featuredRooms,
        type,
        capacity,
        price,
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        breakfast,
        pets,
        getRoom,
        handleChange,
        setCapacity,
        setPrice,
        setMinSize,
        setMaxSize,
        setBreakfast,
        setPets,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

// export RoomProvider;

export const useGlobalContext = () => {
  return useContext(RoomContext);
};

export { RoomContext, RoomProvider };
