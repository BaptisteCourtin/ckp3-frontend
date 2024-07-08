import { useCountryLazyQuery } from "@/graphql/generated/schema";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const oneCountry = () => {
  const router = useRouter();
  const { code } = router.query;

  const [getCountry, { data, loading, error }] = useCountryLazyQuery();

  useEffect(() => {
    getCountry({
      variables: { code: code as string },
      onError(err: any) {
        console.error("error", err);
      },
    });
  }, [router.isReady]);

  return (
    <main className="oneCountry">
      <h1>
        {data?.country.name}({data?.country.code})
      </h1>
      <span>{data?.country.emoji}</span>
      {data?.country.continent && (
        <p>continent : {data?.country.continent.name}</p>
      )}
    </main>
  );
};

export default oneCountry;
