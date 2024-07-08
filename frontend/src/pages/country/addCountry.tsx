import {
  NewCountryInput,
  useAddCountryMutation,
  useContinentsQuery,
} from "@/graphql/generated/schema";
import TextField from "@mui/material/TextField";
import router from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { number, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

let createCountrySchema = object({
  name: string()
    .max(50, "Pas besoin d'avoir un titre aussi long")
    .min(2, "un peu plus long stp")
    .required("Veuillez entrer un titre"),

  code: string()
    .max(3, "Moins long le code")
    .min(2, "Plus long le code")
    .required("Veuillez entrer un code"),

  emoji: string()
    .max(4, "Moins long l'emoji")
    .required("Veuillez entrer un emoji"),

  continent: number(),
});

const addCountry = () => {
  // --- GET CONTINENTS ---
  const {
    data: dataContinents,
    loading: loadingContinents,
    error: errorContinents,
  } = useContinentsQuery();

  // --- CREATE ---
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createCountrySchema),
  });

  const [createCountry, { data, loading, error }] = useAddCountryMutation({
    fetchPolicy: "no-cache",
  });

  const [choosenContinent, setChoosenContinent] = useState<number>();

  const handleCreateCountry = async (data: NewCountryInput) => {
    const dataAggregate = {
      ...data,
      continent: choosenContinent,
    };

    createCountry({
      variables: { data: dataAggregate },
      onCompleted(data) {
        if (data.addCountry.id) {
          toast.success(
            `GG, vous avez créé le country ${data.addCountry.name}`
          );
          router.push(`/country/${data.addCountry.code}`);
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
    code: "",
    emoji: "",
  });

  const handleChangeAThing = (name: string, value: any) => {
    setValues({ ...values, [name]: value });
  };

  return (
    <main>
      <form onSubmit={handleSubmit(handleCreateCountry)}>
        <div className="champ">
          <TextField
            className="mui-input"
            fullWidth
            variant="outlined"
            label="Nom du pays"
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

        <div className="champ">
          <TextField
            className="mui-input"
            fullWidth
            variant="outlined"
            label="Code du pays"
            required
            {...register("code")}
            id="code"
            name="code"
            type="text"
            inputProps={{ maxLength: 3 }}
            onChange={(e) => handleChangeAThing("code", e.target.value)}
          />
          <span>{values.code.length > 0 ? `${values.code.length}/3` : ""}</span>
          <p className="error">{errors?.code?.message}</p>
        </div>

        <div className="champ">
          <TextField
            className="mui-input"
            fullWidth
            variant="outlined"
            label="Emoji du pays"
            required
            {...register("emoji")}
            id="emoji"
            name="emoji"
            type="text"
            inputProps={{ maxLength: 4 }}
            onChange={(e) => handleChangeAThing("emoji", e.target.value)}
          />
          <span>
            {values.emoji.length > 0 ? `${values.emoji.length}/4` : ""}
          </span>
          <p className="error">{errors?.emoji?.message}</p>
        </div>

        <div className="champ">
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel>Continent</InputLabel>
            <Select
              className="mui-input"
              variant="outlined"
              id="continentToChoose"
              name="continentToChoose"
              label="Continent"
              required
              onChange={(e) => setChoosenContinent(e.target.value as number)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {dataContinents?.continents.map((continent) => (
                <MenuItem value={continent.id}>{continent.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <p className="error">{errors?.continent?.message}</p>
        </div>

        <button type="submit" disabled={loading}>
          Créer le pays
        </button>
      </form>
    </main>
  );
};

export default addCountry;
