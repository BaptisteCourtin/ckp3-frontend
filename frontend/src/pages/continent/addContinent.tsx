import {
  NewContinentInput,
  useAddContinentMutation,
} from "@/graphql/generated/schema";
import TextField from "@mui/material/TextField";
import router from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

let createContinentSchema = object({
  name: string()
    .max(50, "Pas besoin d'avoir un titre aussi long")
    .required("Veuillez entrer un titre"),
});

const addContinent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createContinentSchema),
  });

  const [createContinent, { data, loading, error }] = useAddContinentMutation({
    fetchPolicy: "no-cache",
  });

  const handleCreateContinent = async (data: NewContinentInput) => {
    createContinent({
      variables: { data: data },
      onCompleted(data) {
        if (data.addContinent.id) {
          toast.success(
            `GG, vous avez créé le continent ${data.addContinent.name}`
          );
          router.push(`/continent/allContinents`);
        }
      },
      onError(error) {
        toast.error(error.message);
      },
    });
  };

  // --- DEAL WITH LENGTH ---
  const [values, setValues] = useState({
    name: "",
  });

  const handleChangeAThing = (name: string, value: any) => {
    setValues({ ...values, [name]: value });
  };

  return (
    <main className="addContinent">
      <form onSubmit={handleSubmit(handleCreateContinent)}>
        <div className="champ">
          <TextField
            className="mui-input"
            fullWidth
            variant="outlined"
            label="Nom du continent"
            required
            {...register("name")}
            id="name"
            name="name"
            type="text"
            inputProps={{ maxLength: 50 }}
            onChange={(e) => handleChangeAThing("name", e.target.value)}
          />
          <span>
            {values.name.length > 0 ? `${values.name.length}/50` : ""}
          </span>
          <p className="error">{errors?.name?.message}</p>
        </div>

        <button type="submit" disabled={loading}>
          Créer le continent
        </button>
      </form>
    </main>
  );
};

export default addContinent;
