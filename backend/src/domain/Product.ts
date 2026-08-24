export abstract class Product{
    constructor(
        private readonly _id:number,
        private _name: string,
        private _description: string,
        private _available: boolean,
        protected _price: number,
        
        
    ){
    if(_price <=0){
        throw new Error("O preço do produto deve ser maior que zero.");
    }
    }

    public get id(): number{return this._id;}

    public get name(): string{return this._name;}

    public get price(): number{return this._price;}

    public get description(): string {return this._description;}

    public get available(): boolean {return this._available;}

    public abstract calcularPrecoFinal(): number;

    public abstract getDetalhes(): string;

    public abstract obterCategoria(): string;



}