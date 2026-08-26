import { INotifiable } from "./interfaces/INotifiable";
import { User } from "./User";

export type CourierVehicle = "MOTO" | "CAR" | "BICYCLE";

export class Courier extends User implements INotifiable{
    constructor(
        id: number,
        name: string,
        cpf: string,
        email: string,
        password: string,
        contactPhone: string,
        private _vehiclePlate: string,
        private _vehicleType: CourierVehicle,
        private _isAvailable: boolean = true

    ){
        super(id,name,cpf,email,password,contactPhone);
    }

    public get vehiclePlate():string{
        return this._vehiclePlate;
    }

    public get vehicleType(): string{
        return this._vehicleType;
    }

    public get available(): boolean{
        return this._isAvailable;
    }
    
    public setDisponibilidade(status: boolean): void {
        this._isAvailable = status;
    }

    public obterPerfil(): string {
        return `ENTREGADOR ${this.name} - ${this._vehiclePlate} - ${this._vehicleType} `;
    }

    enviarNotificacao(mensagem: string): void {
        console.log(`[Notificação Entregador ${this.name}]: ${mensagem}`)

    }

    getContatoPrincipal(): string {
        return this.contactPhone;
    }
}