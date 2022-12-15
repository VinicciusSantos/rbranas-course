import PlaceOrder from "../../src/application/usecase/PlaceOrder";

it("deve fazer um pedido", async () => {
  const placeOrder = new PlaceOrder();
  const input = {
    cpf: "839.435-452-10",
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
    date: new Date("2022-12-10"),
    coupon: "VALE20",
  };
  const output = await placeOrder.execute(input);
  expect(output.total).toBe(1000);
});
