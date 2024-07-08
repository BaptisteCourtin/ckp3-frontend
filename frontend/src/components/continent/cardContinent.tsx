import { Continent } from "@/graphql/generated/schema";
import React from "react";

const cardContinent = ({ continent }: { continent: Continent }) => {
  return (
    <li className="cardContinent">
      <p>{continent.name}</p>
    </li>
  );
};

export default cardContinent;
