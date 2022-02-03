import { rest } from "msw";

export const handlers = [
  rest.get("https://localhost:3030/scoops", (req, res, ctx) => {
      return res (
        ctx.json([
            {name: 'vanila', imagePath: '/images/vanila.png'},
            {name: 'chocolate', imagePath: '/images/chocolate.png'},
            {name: 'creme', imagePath: '/images/creme.png'},
        ])
      )
  }),
];
