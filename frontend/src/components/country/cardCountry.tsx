import { Country } from "@/graphql/generated/schema";
import Link from "next/link";
import React from "react";

const cardCountry = ({ country }: { country: Country }) => {
  return (
    <li>
      <Link href={`/country/${country.code}`} className="cardCountry">
        <span>{country.emoji}</span>
        <p>{country.name}</p>
      </Link>
    </li>
  );
};

export default cardCountry;
