// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Form.module.css";
import Button from "./Button";
import useUrlPosition from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}


function Form() {
  const [lat, lng] = useUrlPosition();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [emoji, setEmoji] = useState("")
  const [geoCodingError, setGeoCodingError] = useState("");
  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client?"

  useEffect(function () {
    if(!lat && !lng) return;
    async function fetchCityData(){
      try{
        setGeoCodingError("");
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}latitude=${lat}&longitude=${lng}`);
        const data = await res.json()

        if(!data.countryCode){
          throw new Error(
            "That doesn't seem to be city. Click somewher else."
          )
        }
        setCityName(data.city || data.locality || "");
        setEmoji(convertToEmoji(data.countryCode));
      }
      catch(err) {
        setGeoCodingError(err.message)
      }
      finally {
        setIsLoading(false);
      }
    }
    fetchCityData();
  },[lat,lng]);

  if (isLoading) return <Spinner/>

  if(!lat && !lng) return <Message message="Start by clikcing somewhere on the map"/>;

  if(geoCodingError) return <Message message={geoCodingError}/>

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button type="back"  onClik={(e)=> {
          e.preventDefault();
          navigate(-1)
        }}>&larr; Back</Button> 
      </div>
    </form>
  );
}

export default Form;
