import IDelivery from "./IDelivery";

export default interface IPackage {
    _id:string;
    active_delivery?: IDelivery,
    description: string;
    weight: number;
    height: number;
    width: number;
    depth: number;
    from_name: string;
    from_address: string;
    from_location: {
        lat: number;
        lng: number;
    };
    to_name: string;
    to_address: string;
    to_location: {
        lat: number;
        lng: number;
    };
}