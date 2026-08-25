import { Client } from "./Client"

export class Cart{
    constructor(
        private readonly _id: number,
        private readonly _client: Client, 
        private _freight: number = 0  
    ){
    if (_freight < 0) {
        throw new Error("O valor do frete não pode ser negativo.");
    }
    }
}