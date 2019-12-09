/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */

declare module "json!*" {
    const json: object;
    export = json;
}
declare module "tmpl!*" {
    const tmpl: (...args: any[]) => string;
    export = tmpl;
}
declare module "SBIS3.*" {
    const module: {
        new(...args: any[]): any;
        [propName: string]: any;
    };
    export = module;
}
declare module "optional!*" {
    const module: {
        new(...args: any[]): any;
        [propName: string]: any;
    } | null;
    export = module;
}
declare module "Core/*" {
    const module: {
        new(...args: any[]): any;
        [propName: string]: any;
    } | null;
    export = module;
}
declare module "*.json" {
    const value: any;
    export default value;
}

/// <amd-module name='VideoCall/Utils/EventEmitter' />
declare module "VideoCall/Utils/EventEmitter" {
    class EventEmitter {
        public emit(type: string, ...args: any): boolean;

        public addListener(type: string, listener: Function): void;

        public on(type: string, listener: Function): void;

        public once(type: string, listener: Function): void;

        public setMaxListeners(n: number): EventEmitter;

        public getMaxListeners(): number;

        public removeListener(type: string, listener: Function): void;

        public removeAllListeners(type?: string): void;
    }
    export = EventEmitter;
}

/// <amd-module name='SBIS.VC/Base/Core/Connection' />
declare module "SBIS.VC/Base/Core/Connection" {
        import Deferred from "Core/Deferred";
import EventEmitter from "VideoCall/Utils/EventEmitter";

    interface VCIceCandidate {
        candidate: RTCIceCandidate["candidate"];
        sdpMid: RTCIceCandidate["sdpMid"];
        sdpMLineIndex: RTCIceCandidate["sdpMLineIndex"];
    }

    class Connection extends EventEmitter {
        public getPeerConnection(): RTCPeerConnection;

        public onDataChannel(): Function;

        public createOffer(options: {}): Deferred<RTCSessionDescriptionInit>;

        public setLocalDescription(data: RTCSessionDescriptionInit, options?: {}): Deferred<RTCSessionDescription>;

        public onIceCandidates(): Deferred<VCIceCandidate[]>;

        public close(): void;
    }

    export = Connection;
}

/// <amd-module name='SBIS.VC/Base/Core/Connections' />
declare module "SBIS.VC/Base/Core/Connections" {
    import Connection from "SBIS.VC/Base/Core/Connection";

    class Connections {
        public static create(id: string): Connection;
    }

    export = Connections;
}

/// <amd-module name='Core/Deferred' />
declare module "Core/Deferred" {
    class Deferred<T> extends Promise<T> {

        public static toPromise<T>(def: Deferred<T>): Promise<T>;
        public logCallbackExecutionTime(value: boolean): Deferred<T>;

        public callback(res?: any): Deferred<T>;

        public errback(res?: any): Deferred<T>;

        public addCallback(fn: Function): Deferred<T>;

        public addErrback(fn: Function): Deferred<T>;

        public then<TResult1 = T, TResult2 = never>(
            onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
            onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
        ): Promise<TResult1 | TResult2>;
    }

    export = Deferred;
}
