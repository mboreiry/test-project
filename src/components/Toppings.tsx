import axios from "axios";
import react, { useEffect, useState } from "react";

interface ITopping {
  name: string;
  imagePath: string;
}
export const Toppings: react.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [toppings, setToppings] = useState([] as ITopping[]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://localhost:3030/toppings")
      .then((response) => {
        // console.log("respoooo", response.data);
        setToppings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const body = error ? (
    <div>unexpected server error ocurred</div>
  ) : toppings.length ? (
    toppings.map((item) => (
      <div key={item.name}>
        <img alt={item.name} src={`http://localhost:3030/${item.imagePath}`} />
        <div>{`${item.name} topping`}</div>
      </div>
    ))
  ) : loading ? (
    <div>loading</div>
  ) : (
    <div>no options found!</div>
  );

  return <div>{body}</div>;
};
