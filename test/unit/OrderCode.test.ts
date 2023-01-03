import OrderCode from "../../src/domain/entity/OrderCode"

test("Deve criar um código de pedido", function() {
    const date = new Date("2010-10-11")
    const sequence = 1
    const orderCode = new OrderCode(date, sequence)
    const value = orderCode.value
    expect(value).toBe("201000000001")
})