import IPackage from "@/interfaces/IPackage";
import { cn } from "@/lib/utils";
import { Car, House } from "lucide-react";
import {
  MapContainer,
  MapContainerProps,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";

export type DeliveryMapProps = MapContainerProps & {
  packageData: IPackage;
  deliveryPosition?: { lat: number; lng: number };
};

export default function DeliveryMap({
  className,
  packageData,
  deliveryPosition,
  ...restProps
}: DeliveryMapProps) {
  return (
    <MapContainer
      className={cn("min-h-[320px]", className)}
      zoom={13}
      center={deliveryPosition ?? packageData.from_location}
      scrollWheelZoom={false}
      {...restProps}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={packageData.from_location}>
        <Popup closeButton={false} autoPan>
          <span className="flex flex-col items-center justify-center gap-1 w-full">
            <span className="flex items-center gap-1 text-blue-500 font-bold">
              <House size={24} />
              <span>From</span>
            </span>
            <span className="text-base font-semibold">
              {packageData.from_name}
            </span>
            <span className="text-gray-400 text-sm">
              {packageData.from_address}
            </span>
          </span>
        </Popup>
      </Marker>
      <Marker position={packageData.to_location} autoPan>
        <Popup closeButton={false}>
          <span className="flex flex-col items-center justify-center gap-1 w-full">
            <span className="flex items-center gap-1 text-blue-500 font-bold">
              <House size={24} />
              <span>To</span>
            </span>
            <span className="text-base font-semibold">
              {packageData.to_name}
            </span>
            <span className="text-gray-400 text-sm">
              {packageData.to_address}
            </span>
          </span>
        </Popup>
      </Marker>
      {deliveryPosition && (
        <Marker position={deliveryPosition}>
          <Popup closeButton={false}>
            <span className="flex flex-col items-center justify-center gap-2 w-full">
              <Car size={32} className="text-green-500" />
              <span className="text-base font-semibold">Driver</span>
            </span>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
