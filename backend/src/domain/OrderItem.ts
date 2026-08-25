import { Product } from "./Product";

export class OrderItem {
  constructor(
    private readonly _product: Product,
    private _quantity: number,
    private _observation: string = ""
  ) {
    if (_quantity <= 0) {
      throw new Error("A quantidade do item deve ser no mínimo 1.");
    }
  }

  public get product(): Product {
    return this._product;
  }

  public get quantity(): number {
    return this._quantity;
  }

  public get observation(): string {
    return this._observation;
  }

  public changeQuantity(newQuantity: number): void {
    if (newQuantity <= 0) {
      throw new Error("A quantidade deve ser maior que zero.");
    }
    this._quantity = newQuantity;
  }

  public addQuantity(quantity: number): void {
    if (quantity <= 0) {
      throw new Error("A quantidade a adicionar deve ser positiva.");
    }
    this._quantity += quantity;
  }

  public calculateSubtotal(): number {
    return this._product.calcularPrecoFinal() * this._quantity;
  }

  public getDetails(): string {
    const obs = this._observation ? ` (Obs: ${this._observation})` : "";
    return `${this._quantity}x ${this._product.name}${obs} - R$ ${this.calculateSubtotal().toFixed(2)}`;
  }
}