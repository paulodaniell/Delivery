import { Product } from "./Product";

export class Food extends Product {
    constructor(
        id: number,
        name: string,
        description: string,
        available: boolean,
        price: number,
        private _preparation_time: number,
        private _packaging: number = 0
    ) {
        
        super(id, name, description, available, price);

        if (_preparation_time <= 0) {
        throw new Error("O tempo de preparo deve ser maior que zero.");
        }
        if (_packaging < 0) {
        throw new Error("A taxa de embalagem não pode ser negativa.");
        }
    }

    public get taxaEmbalagem(): number {
        return this._packaging;
    }

    public get tempoPreparo(): number {
        return this._preparation_time;
    }

    public calcularPrecoFinal(): number {
        return this._price + this._packaging;
    }

    public obterCategoria(): string {
        return "FOOD";
    }

    public getDetalhes(): string {
        return `${this.name} - ${this.description} | Tempo de preparo: ${this._preparation_time} min`;
    }
}