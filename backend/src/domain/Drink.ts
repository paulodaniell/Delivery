import { Product } from "./Product";

export class Drink extends Product {
    constructor(
        id: number,
        name: string,
        description: string,
        available: boolean,
        price: number,
        private _capacity: number,
        private _alcoholic: boolean
    ) {
        
        super(id, name, description, available, price);

        if (_capacity <= 0) {
        throw new Error("A capacidade da bebida deve ser maior que zero.");
        }
    }

    public get capacity(): number {
        return this._capacity;
    }

    public get isAlcoholic(): boolean {
        return this._alcoholic;
    }

    public calcularPrecoFinal(): number {
        return this._price;
    }

    public obterCategoria(): string {
        return "DRINK";
    }

    public getDetalhes(): string {
        const tipoAlcool = this._alcoholic ? "Alcoólica" : "Não alcoólica";
        return `${this.name} (${this._capacity}ml) - ${tipoAlcool}`;
    }
}