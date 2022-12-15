export default class Item {
    constructor(
        readonly idItem: number,
        readonly category: string,
        readonly description: string,
        readonly price: number,
        readonly width: number = 0,
        readonly height: number = 0,
        readonly lenght: number = 0,
        readonly weight: number = 0
    ) { }

    public getVolume(): number {
        return this.width / 100 * this.height / 100 * this.lenght / 100;
    }

    public getDensity(): number {
        return this.weight / this.getVolume();
    }
}