import { Payment } from "./Payment";

export class CashPayment extends Payment {
    constructor(
        id: number,
        amount: number,
        private _trocoPara: number = amount 
    ) {
        super(id, amount);

        if (_trocoPara < amount) {
        throw new Error("O valor entregue para troco não pode ser menor que o total a pagar.");
        }
    }

    public get trocoPara(): number {
        return this._trocoPara;
    }

    public calcularTroco(): number {
        return this._trocoPara - this.amount;
    }

    public processar(): boolean {
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
        const troco = this.calcularTroco();
        const infoTroco = troco > 0 ? ` (Troco para R$ ${this._trocoPara.toFixed(2)}: R$ ${troco.toFixed(2)})` : " (Sem troco)";
        return `Pagamento em dinheiro: R$ ${this.amount.toFixed(2)}${infoTroco}`;
    }
}