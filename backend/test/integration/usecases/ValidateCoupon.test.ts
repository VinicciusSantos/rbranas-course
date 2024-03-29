import ValidateCoupon from "../../../src/application/usecase/validate_coupon/ValidateCoupon";
import PgPromiseConnectionAdapter from "../../../src/infra/database/PgPromiseConnectionAdapter"
import CouponRepositoryDatabase from "../../../src/infra/repository/database/CouponRepositoryDatabase"

test("Deve validar um cumpo de desconto", async () => {
    const connection = new PgPromiseConnectionAdapter();
    const couponRepository = new CouponRepositoryDatabase(connection);
    const validateCoupon = new ValidateCoupon(couponRepository);
    const isValid = await validateCoupon.execute("VALE20")
    expect(isValid).toBeTruthy()
})