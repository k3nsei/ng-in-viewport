export declare enum InViewportConfigDirection {
    Both = 0,
    Vertical = 1,
    Horizontal = 2,
}
export interface InViewportConfigOptions {
    rootElement?: any;
    partial?: boolean;
    direction?: InViewportConfigDirection;
}
export declare class InViewportConfig {
    protected _rootElement: Element;
    protected _partial: boolean;
    protected _direction: InViewportConfigDirection;
    constructor(options?: InViewportConfigOptions);
    rootElement: Element;
    partial: boolean;
    direction: InViewportConfigDirection;
}
