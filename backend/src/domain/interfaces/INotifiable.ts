export interface INotifiable{
    enviarNotificacao(mensagem: string): void;
    getContatoPrincipal(): string;
}