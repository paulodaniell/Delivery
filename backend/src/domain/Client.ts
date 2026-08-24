import {User} from "./User";

export class Client extends User{
    constructor(
        id: number,
        name: string,
        cpf: string,
        email: string,
        password: string,
        private _endereco: string
    ){
        super(id,name,cpf,email,password);
    }

    public get endereco(): string{
        return this._endereco;
    }

    public alterarEndereco(novoEndereco: string): void{
        if (!novoEndereco || novoEndereco.trim().length === 0) {
        throw new Error("Digite um endereço válido.");
    }

    if (novoEndereco.trim() === this._endereco) {
        throw new Error("O novo endereço não pode ser igual ao endereço atual.");
    }
        this._endereco = novoEndereco;
    }

    public obterPerfil(): string {
        return `Cliente: ${this.name} - ${this.email}`;
    }


}