export type PaymentStatus = "PENDENTE" | "PAGO" | "CANCELADO" | "FALHA";

export abstract class Payment{
    constructor(
        private readonly _id: number,
        private _amount: number,
        protected _status: PaymentStatus = "PENDENTE",
        private _datePayment: Date = new Date(),

    ){
    if (_amount <= 0) {
        throw new Error("O valor do pagamento deve ser maior que zero.");
    }   
    }

    public get id(): number{return this._id;}

    public get amount(): number{return this._amount};

    public get status(): string{return this._status};

    public get datePayment(): Date{return this._datePayment};

    public abstract processar(): boolean;

    public abstract cancelar(): boolean;

    public abstract getDescricao(): string;
}
