export interface Rocket {
    id:number;
    name:string;
    configuration: {
        full_name:string;
        variant:string;
    };
}

export interface LaunchProvider {
    id: number;
    name : string;
    type: string;
}

export interface Pad {
    id:number;
    name: string;
    location: {
        name: string;
        country_code: string;
    };
}

export interface Launch {
    id: string;
    url: string;
    name: string;
    status: {
        id: number;
        name: string;
        abbrev: string;
    };
    net: string;
    rocket: Rocket;
    launch_service_provider: LaunchProvider;
    pad: Pad;
    image: string | null;
}

export interface SpaceDevsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Launch[];
}