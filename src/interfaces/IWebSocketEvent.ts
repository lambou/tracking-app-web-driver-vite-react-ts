import IDelivery from "./IDelivery";

type IWebSocketEvent = { event: "location_changed", delivery_id: string; location: { lat: number; lng: number } } | {
    event: "status_changed"; delivery_id: string; status: "open" | "picked-up" | "in-transit" |
    "delivered" | "failed"
} | {
    event: "delivery_updated",
    delivery_object: IDelivery
};

export default IWebSocketEvent;