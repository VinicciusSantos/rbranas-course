import Coupon from "../../../src/domain/entity/Coupon";
const today = new Date("2022-12-15");

test("Deve criar um cupom de desconto valido", function () {
    const coupon = new Coupon("VALE20", 20, new Date("2022-12-16"));
    const isValid = coupon.isValid(today);
    expect(isValid).toBeTruthy();
})

test("Deve criar um cupom de desconto expirado", function () {
    const coupon = new Coupon("VALE20", 20, new Date("2022-12-10"));
    const isExpired = coupon.isExpired(today);
    expect(isExpired).toBeTruthy();
})

test("Deve criar um cupom de desconto valido e calcular o desconto", function () {
    const coupon = new Coupon("VALE20", 20)
    const disccount = coupon.calculateDiscount(1000);
    expect(disccount).toBe(200);
})