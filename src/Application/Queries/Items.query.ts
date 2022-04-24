export class Item {
    readonly id: string;
    readonly name: string;
    readonly quantity: number;
    readonly price: number;
    readonly imageUrl: string;
}

export class ItemInItems {
    readonly id: string;
    readonly name: string;
    readonly quantity: number;
    readonly price: number;
    readonly imageUrl: string;
}

export class Items extends Array<ItemInItems> {}

export interface ItemQuery {
    findById: (id: string) => Promise<Item>;
    find: (offset: number, limit: number) => Promise<Items>;
}