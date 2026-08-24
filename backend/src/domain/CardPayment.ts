import { Payment, PaymentStatus } from "./Payment";

export class CardPayment extends Payment{
    constructor(
        id: number,
        amount: number,
        private _cardNumber: string,
        private _cardHolder: string,
        private _installments: number = 1,        
    ){
        super(id,amount);

        if(!_cardNumber || _cardNumber.replace(/\s+/g, "").length < 13){
            throw new Error("Número de cartão inválido.");
        }
        if (_installments < 1) {
            throw new Error("O número de parcelas deve ser no mínimo 1.");
        }
    }

    public get cardNumber(): string {
        return `**** **** **** ${this._cardNumber.slice(-4)}`;
    }

    public get cardHolder(): string {
        return this._cardHolder;
    }
    public get installments(): number {
        return this._installments;
    }

    public cancelar(): boolean {
        if (this._status === "CANCELADO") {
            throw new Error("Este pagamento já está cancelado.");
        }
        this._status = "CANCELADO";

        return true;
    }

    public processar(): boolean {
        //complete
        this._status = "PAGO";
        return true;
    }

    public getDescricao(): string {
        return `Cartão final ${this._cardNumber.slice(-4)} em ${this._installments}x de R$ ${(this.amount / this._installments).toFixed(2)}`;
    }
}


    