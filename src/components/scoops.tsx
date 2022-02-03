import react, { useEffect, useState } from "react";
import axios from "axios";
// import { response } from "msw";

interface IScoopProp {
  name: string;
  imagePath: string;
}
const Scoops: Function = () => {
  const [scoops, setScoops] = useState([] as IScoopProp[]);
  const [error, setError] = useState(false);
  useEffect(() => {
    axios
      .get("https://localhost:3030/scoops")
      .then((response) => {
        setScoops(response.data);
        setError(false);

      })
      .catch((error) => {
        setError(true);
      });
  }, []);
  const body = error ? (
    <div style={{ color: "red" }}>An unexpected problem occured!</div>
  ) : scoops.length ? (
    scoops.map((item) => <div key={item.name}>{`${item.name} scoop`}</div>)
  ) : (
    <div>No Scoops found!</div>
  );
  return (<div>{body}</div>);
};

export default Scoops;
