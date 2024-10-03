import React, { useState, useEffect } from "react";
import { Box, Icon, Page, Sheet, Text } from "zmp-ui";

const events = [
  {
    id: 1,
    title: "10.2 PACER MEET UP",
    name: "Web, Oci 2",
    des: "The Courtyard",
    image: "./images/banner/banner-2.jpg",
  },
  {
    id: 2,
    title: "Pickup Runs",
    name: "Web, Oci 2",
    des: "The Courtyard",
    image: "./images/banner/banner-3.jpg",
  },
  {
    id: 3,
    title: "Squad Day",
    name: "Web, Oci 2",
    des: "The Courtyard",
    image: "./images/banner/banner-4.jpg",
  },
  {
    id: 4,
    title: "OPEN FLOOR",
    name: "Web, Oci 2",
    des: "Hope Alkazar",
    image: "./images/banner/banner-5.jpg",
  },
  {
    id: 5,
    title: "Urban Active ile HIIT",
    name: "Fri,Oci 4",
    des: "Hope Alkazar",
    image: "./images/banner/banner-6.jpg",
  },
  {
    id: 6,
    title: "Primetime Her Hoops",
    name: "Fri,Oci 4",
    des: "The Courtyard",
    image: "./images/banner/banner-7.jpg",
  },
];

const List = () => {
  return (
    <Box className="box-list-event grid-cols-2 gap-2">
        {events.map((event) => (
          <Box key={event.id} className="space-y-2 event-index">
            <Box className="w-full aspect-square relative">
              <img className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-cover object-center bg-skeleton" src={event.image} alt="" />
            </Box>
            <Box className="info-event-profile">
            <Text className="event-title-item">{event.title}</Text>
            <Text className="event-name-item">{event.name}</Text>
            <Text className="event-des-item">{event.title}</Text>

            </Box>
          </Box>
        ))}
      </Box>
  );
};
export default List;
