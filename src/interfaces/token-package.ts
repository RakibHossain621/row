export interface IPackageToken {
    _id?: string;
    name?: string;
    description?: string;
    ordering?: number;
    price?: number;
    tokens?: number;
    bonusTokens?:number;
    isActive?: boolean
}
