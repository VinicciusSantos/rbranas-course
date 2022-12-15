export default class Coupon {
    constructor (
        readonly code: string,
        readonly percentage: number,
        readonly expireDate?: Date
    ) {}

    public isValid(today: Date = new Date()): boolean {
        if (!this.expireDate) return true;
        return this.expireDate.getTime() >= today.getTime();
    }

    public isExpired(today: Date = new Date()): boolean {
        return !this.isValid(today)
    }

    public calculateDiscount(amount: number) {
        if (this.isExpired()) return 0
        return amount * this.percentage / 100
    }
}