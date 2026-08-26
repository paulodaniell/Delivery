export interface IAuthenticable {
  autenticar(senha: string): boolean;
  getEmail(): string;
}