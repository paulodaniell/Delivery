import { Payment } from "./Payment";


export class PixPayment extends Payment{

    constructor(
        id: number,
        amount: number,
        private _pixKey: string,
    ){
        super(id,amount);

    if (!_pixKey || _pixKey.trim().length === 0) {
      throw new Error("A chave PIX não pode ser vazia.");
    }
    }

    public get pixKey(): string{
        return this._pixKey;
    }
    public processar(): boolean {
        //complete
        this._status = "PAGO";
    return true;
    }

      public cancelar(): boolean {
        if (this._status === "CANCELADO") {
            throw new Error("Este pagamento já está cancelado.");
        }
        this._status = "CANCELADO";

        return true;
    }

    public getDescricao(): string {
        return `Pagamento via PIX: Chave ${this._pixKey} | Total: R$ ${this.amount.toFixed(2)}`;
    }
}
