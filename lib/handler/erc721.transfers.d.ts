import { LogDescription, TransactionEvent, ethers, BlockEvent } from "forta-agent";
import { Handler, HandlerOptions } from "./handler";
declare namespace Erc721Transfers {
    interface Options {
        emitter?: string;
        from?: string;
        to?: string;
        tokenId?: ethers.BigNumberish | ((tokenId: ethers.BigNumber) => boolean);
    }
    interface Metadata {
        emitter: string;
        from: string;
        to: string;
        tokenId: ethers.BigNumber;
    }
}
declare class Erc721Transfers extends Handler<Erc721Transfers.Options, Erc721Transfers.Metadata> {
    filter: (log: LogDescription) => boolean;
    constructor(options: HandlerOptions<Erc721Transfers.Options, Erc721Transfers.Metadata>);
    private _createFilter;
    metadata(event: TransactionEvent | BlockEvent): Promise<Erc721Transfers.Metadata[] | null>;
}
export default Erc721Transfers;
