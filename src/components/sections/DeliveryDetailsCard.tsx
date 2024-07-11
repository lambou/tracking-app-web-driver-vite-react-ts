import IDelivery from "@/interfaces/IDelivery";
import { cn, dateToLocale } from "@/lib/utils";
import ItemId from "@/components/ItemId";
import Card from "@/components/ui/Card";
import InfoItem from "@/components/ui/InfoItem";

export default function DeliveryDetailsCard({ data }: { data: IDelivery }) {
  return (
    <Card className="gap-6">
      <h2 className="text-xl font-semibold capitalize text-green-500">
        Delivery Details
      </h2>
      <div className="flex flex-col gap-3">
        <InfoItem label="ID" value={<ItemId value={data._id} />} />
        <InfoItem
          label="Status"
          value={
            <span className="w-full inline-flex items-center">
              <span
                className={cn(
                  "px-4 py-1 rounded-full text-sm uppercase font-semibold inline-flex items-center gap-2",
                  {
                    "bg-gray-100 text-gray-500": data.status === "open",
                    "bg-blue-100 text-blue-500": data.status === "picked-up",
                    "bg-orange-100 text-orange-500":
                      data.status === "in-transit",
                    "bg-green-100 text-green-500": data.status === "delivered",
                    "bg-red-100 text-red-500": data.status === "failed",
                  },
                )}
              >
                {data.status}
              </span>
            </span>
          }
        />
        <div className="grid grid-cols-2 gap-3">
          <InfoItem
            label="Start time"
            value={
              data.start_time ? dateToLocale(data.start_time) : "No defined"
            }
          />
          <InfoItem
            label="Pickup Time"
            value={
              data.pickup_time ? dateToLocale(data.pickup_time) : "No defined"
            }
          />
          <InfoItem
            label="End Time"
            value={data.end_time ? dateToLocale(data.end_time) : "No defined"}
          />
        </div>
      </div>
    </Card>
  );
}
