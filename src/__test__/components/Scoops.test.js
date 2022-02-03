import { screen, render, findByLabelText } from "@testing-library/react";
import Scoops from "../../components/scoops";
import { server } from "../../mocks/server";

describe("Scoops tests group", () => {
  test("scoops are loaded", async () => {
    render(<Scoops />);
    const scoops = await screen.findAllByText(/scoop$/i);
    expect(scoops.length).toBeGreaterThanOrEqual(1);
  });

  test("facing server error", async () => {
    server.resetHandlers("https://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    );
    render(<Scoops />);
    const scoops = await screen.findByText("An unexpected problem occured!");
    expect(scoops).toBeInTheDocument();
  });

  test.only("empty list", async () => {
    render(<Scoops />);
    screen.debug();
    const emptyError = await screen.findByText("No Scoops found!");
    expect(emptyError).toBeInTheDocument();
  });
});
