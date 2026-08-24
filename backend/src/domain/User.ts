export abstract class User {
    constructor(
        private readonly _id: number,
        private _name:string,
        private _cpf: string,
        private _email: string,
        private _password: string

    ){}
    public get id():number{
        return this._id;
    }
    public get name(): string{
        return this._name;
    }
    public get email(): string{
        return this._email;
    }
    
    public alterarSenha(senhaAntiga: string, novaSenha: string): void {
  
    if (this._password !== senhaAntiga) {
        throw new Error("Senha atual incorreta.");
    }

    if (novaSenha.length < 6) {
        throw new Error("A nova senha deve ter no mínimo 6 caracteres.");
    }
    this._password = novaSenha;
    }


    public abstract obterPerfil(): string;
}
