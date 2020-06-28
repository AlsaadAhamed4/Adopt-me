import React, { useState, useEffect, useContext } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropDown from "./useDropdown";
import Results from "./Results";
import ThemeContext from "./ThemeContext";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, updateBreeds] = useState([]); //for storing APi data
  const [animal, AnimalDropDown] = useDropDown("Animal", "dog", ANIMALS); //animal api
  const [breed, BreedDropDown, updateBreed] = useDropDown("Breed", "", breeds); //label for select ,state, options
  const [pets, setPets] = useState([]);
  const [theme, setTheme] = useContext(ThemeContext);

  useEffect(() => {
    //based on animal selected we get breeds
    updateBreeds([]);
    updateBreed("");
    pet.breeds(animal).then(({ breeds: apiBreeds }) => {
      const breedsString = apiBreeds.map(({ name }) => name);
      updateBreeds(breedsString);
    }, console.error);
  }, [animal, updateBreeds, updateBreed]);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed, //this the breed which was loaded when you selected a animal
      type: animal, //this is the animal you selected
    });
    setPets(animals || []);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
          />
        </label>
        <AnimalDropDown />
        <BreedDropDown />
        <label>
          Theme
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="Blue" defaultValue={true}>
              Defualt
            </option>
            <option value="cyan">Cyan</option>
            <option value="Red">Red</option>
            <option value="Brown">Brown</option>
          </select>
        </label>
        <button style={{ background: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
