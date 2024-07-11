import IPackage from "@/interfaces/IPackage";
import { User } from "lucide-react";
import ItemId from "@/components/ItemId";
import Card from "@/components/ui/Card";
import InfoItem from "@/components/ui/InfoItem";

export default function PackageDetailsCard({ data }: { data: IPackage }) {
  return (
    <Card className="gap-6">
      <h2 className="text-xl font-semibold capitalize text-green-500">
        Package Details
      </h2>
      <div className="flex flex-col gap-3">
        <InfoItem label="ID" value={<ItemId value={data._id} />} />
        <InfoItem label="Description" value={data.description} />
        <div className="grid grid-cols-2 gap-3">
          <InfoItem label="Weight" value={`${data.weight} grams`} />
          <InfoItem label="Height" value={`${data.height} cm`} />
          <InfoItem label="Width" value={`${data.width} cm`} />
          <InfoItem label="Depth" value={`${data.depth} cm`} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-3 p-3 bg-gray-100 rounded-md">
            <h3 className="text-lg font-bold inline-flex items-center">
              <User size={16} className="mr-2" /> From
            </h3>
            <InfoItem label="Name" value={data.from_name} />
            <InfoItem label="Address" value={data.from_address} />
          </div>
          <div className="flex flex-col gap-3 p-3 bg-gray-100 rounded-md">
            <h3 className="text-lg font-bold inline-flex items-center">
              <User size={16} className="mr-2" />
              To
            </h3>
            <InfoItem label="Name" value={data.to_name} />
            <InfoItem label="Address" value={data.to_address} />
          </div>
        </div>
      </div>
    </Card>
  );
}
