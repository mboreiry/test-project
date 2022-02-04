import { render, screen } from "@testing-library/react";
import { Toppings } from "../../components/Toppings";
import { server } from "../../mocks/server";
import { rest } from "msw";

describe("server call tests", () => {
  test("load all toppings", async () => {
    render(<Toppings />);
    const toppings = await screen.findAllByText(/topping$/i);
    expect(toppings.length).toBeGreaterThanOrEqual(1);
  });
  test("got server error", async () => {
    server.resetHandlers(
      rest.get("https://localhost:3030/toppings", (req, res, ctx) =>
        res(ctx.status(500))
      )
    );
    render(<Toppings />);
    const errorBox = await screen.findByText("unexpected server error ocurred");
    expect(errorBox).toBeInTheDocument();
  });
  test("list is empty", async () => {
    server.resetHandlers(
      rest.get("https://localhost:3030/toppings", (req, res, ctx) => 
        // res(ctx.json([{ name: "test", imagePath: "" }]));
        res(ctx.json([]))
      )
    );
    render(<Toppings />);
    const errorBox = await screen.findByText("no options found!");
    screen.debug();
    expect(errorBox).toBeInTheDocument();
  });
});
