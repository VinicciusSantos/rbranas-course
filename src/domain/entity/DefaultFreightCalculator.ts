import FreightCalculator from "./FreightCalculator";
import Item from "./Item";

export default class DefaultFreightCalculator implements FreightCalculator {
    calculate(item: Item): number {
        const minFreight = 10;
        const freight = 1000 * item.getVolume() * (item.getDensity() / 100);
        return Math.max(minFreight, freight)
    }
}