export class Restaurant {
    constructor(
        private readonly _id: number,
        private _name: string,
        private _cnpj: string,
        private _email: string,
        private _password: string,
        private _address: string,
        private _cep: string,
        private _contactPhone: string,
        private _weekdayHours: string,    
        private _weekendHours: string,    
        private _category: string = "Geral",
        private _isOpen: boolean = false  
    ) {
        if (!_name || _name.trim().length === 0) {
        throw new Error("O nome do restaurante é obrigatório.");
        }
        if (!_cnpj || _cnpj.replace(/\D/g, "").length !== 14) {
        throw new Error("CNPJ inválido (deve conter 14 dígitos).");
        }
    }

    
    public get id(): number { return this._id; }
    public get name(): string { return this._name; }
    public get cnpj(): string { return this._cnpj; }
    public get email(): string { return this._email; }
    public get address(): string { return this._address; }
    public get cep(): string { return this._cep; }
    public get contactPhone(): string { return this._contactPhone; }
    public get weekdayHours(): string { return this._weekdayHours; }
    public get weekendHours(): string { return this._weekendHours; }
    public get category(): string { return this._category; }
    public get isOpen(): boolean { return this._isOpen; }


    public toggleOpenStatus(): void {
        this._isOpen = !this._isOpen;
    }

    public atualizarHorarios(semana: string, fimDeSemana: string): void {
        this._weekdayHours = semana;
        this._weekendHours = fimDeSemana;
    }

    public getDetails(): string {
        const status = this._isOpen ? "Aberto" : "Fechado";
        return `${this._name} (${this._category}) - Status: ${status} | Endereço: ${this._address} | Contato: ${this._contactPhone}`;
  }
}