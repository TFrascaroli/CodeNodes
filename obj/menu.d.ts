import { CodeNodes } from "./codenodes";
export declare class CodeNodesMenu {
    g: SVGGElement;
    private main;
    private popup;
    constructor(main: CodeNodes);
    open(x: number, y: number): void;
    close(): void;
}
