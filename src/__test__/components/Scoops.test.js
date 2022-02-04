import { screen, render, findByLabelText } from "@testing-library/react";
import Scoops from "../../components/scoops";
import { server } from "../../mocks/server";
import { rest } from 'msw';

describe("service call tests", () => {
test("scoops are loaded", async () => {
  render(<Scoops />);
  const scoops = await screen.findAllByText(/scoop$/i);
  expect(scoops.length).toBeGreaterThanOrEqual(2);
});

test("facing server error", async () => {
  server.resetHandlers(
    rest.get("https://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );
  render(<Scoops />);
  const scoops = await screen.findByText("An unexpected problem occured!");
  expect(scoops).toBeInTheDocument();
});

test("empty list", async () => {
  server.resetHandlers(
    rest.get("https://localhost:3030/scoops", (req, res, ctx) =>
      // res(ctx.json([{name:'test', imagePath:''}]))
      res(ctx.json([]))
    )
  );
  render(<Scoops />);
  const emptyError = await screen.findByText("No items found!");
  screen.debug();
  expect(emptyError).toBeInTheDocument();
});
});


// await waitForElementToBeRemoved(() =>
// screen.queryByText(/no ice cream will actually be delivered/i)
// );


// await waitFor(async () => {
//   const alerts = await screen.findAllByRole('alert');
//   expect(alerts).toHaveLength(2);
// });


// wrapping
