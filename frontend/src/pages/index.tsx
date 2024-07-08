import CardCountry from "@/components/country/cardCountry";
import { useCountriesQuery } from "@/graphql/generated/schema";
import Link from "next/link";

export default function Home() {
  const { data, loading, error } = useCountriesQuery();

  return (
    <main className="allContries">
      <h1>List of countries</h1>

      <Link className="button" href={"/country/addCountry"}>
        Ajouter un pays →
      </Link>

      <ul>
        {data?.countries.map((country: any) => (
          <CardCountry country={country} key={country.id} />
        ))}
      </ul>
    </main>
  );
}
