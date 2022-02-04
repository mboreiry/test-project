import { rest } from "msw";

export const handlers = [
  rest.get("https://localhost:3030/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "vanilla", imagePath: "/images/vanilla.png" },
        { name: "chocolate", imagePath: "/images/chocolate.png" },
        { name: "creme", imagePath: "/images/creme.png" },
      ])
    );
  }),
  rest.get("https://localhost:3030/toppings", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Cherries", imagePath: "/images/cherries.png" },
        { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
        { name: "Hot fudge", imagePath: "/images/hot-fudge.png" },
      ])
    );
  }),
];
