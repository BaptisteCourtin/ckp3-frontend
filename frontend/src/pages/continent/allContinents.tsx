import CardContinent from "@/components/continent/cardContinent";
import { useContinentsQuery } from "@/graphql/generated/schema";
import Link from "next/link";
import React from "react";

const allContinents = () => {
  const { data, loading, error } = useContinentsQuery();

  return (
    <main className="allContinents">
      <h1>Liste des continents</h1>

      <Link className="button" href={"/continent/addContinent"}>
        Ajouter un continent →
      </Link>

      <ul>
        {data?.continents.map((continent: any) => (
          <CardContinent continent={continent} key={continent.id} />
        ))}
      </ul>
    </main>
  );
};

export default allContinents;
