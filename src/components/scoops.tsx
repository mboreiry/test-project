import react, { useEffect, useState } from "react";
import axios from "axios";
// import { response } from "msw";

interface IScoop {
  name: string;
  imagePath: string;
}
const Scoops: react.FC = () => {
  const [scoops, setScoops] = useState([] as IScoop[]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://localhost:3030/scoops")
      .then((response) => {
        setScoops(response.data);
        setError(false);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(true);
        setIsLoading(false);
      });
  }, []);
  const body = error ? (
    <div style={{ color: "red" }}>An unexpected problem occured!</div>
  ) : scoops.length ? (
    scoops.map((item) => <div key={item.name}>{`${item.name} scoop`}</div>)
  ) : isLoading ? (
    <div>Loading</div>
  ) : (
    <div>No items found!</div>
  );
  return <div>{body}</div>;
};

export default Scoops;
