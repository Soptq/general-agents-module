import type { BlockEvent, Finding, HandleBlock, HandleTransaction, TransactionEvent } from "forta-agent";
import type { FindingGenerator } from "./types";
export declare type HandlerOptions<Options, Metadata> = Options & {
    onFinding?: FindingGenerator<Metadata>;
};
export declare abstract class Handler<Options, Metadata> {
    options: HandlerOptions<Options, Metadata>;
    constructor(options: HandlerOptions<Options, Metadata>);
    private _checkOnFinding;
    handle(event: TransactionEvent | BlockEvent, onFinding?: FindingGenerator<Metadata>): Promise<Finding[]>;
    protected _handle(event: TransactionEvent | BlockEvent, onFinding: FindingGenerator<Metadata>): Promise<Finding[]>;
    abstract metadata(event: TransactionEvent | BlockEvent): Promise<Metadata[] | null>;
    getHandleBlock(onFinding?: FindingGenerator<Metadata>): HandleBlock;
    getHandleTransaction(onFinding?: FindingGenerator<Metadata>): HandleTransaction;
}
