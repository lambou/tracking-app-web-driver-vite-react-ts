import IDelivery from "@/interfaces/IDelivery";
import debounce from "lodash.debounce";
import { X } from "lucide-react";
import { HTMLAttributes, useCallback, useEffect, useState } from "react";
import { cn, fetchJson } from "../lib/utils";
import Button from "./ui/Button";
import Input from "./ui/Input";
import toast from "react-hot-toast";

export type DeliveryLookupFormProps = HTMLAttributes<HTMLDivElement> & {
  onLoaded?: (delivery?: IDelivery) => void;
};

export default function DeliveryLookupForm({
  className,
  onLoaded,
  ...restProps
}: DeliveryLookupFormProps) {
  const [delivery, setDelivery] = useState<IDelivery | undefined>();
  const [entityId, setEntityId] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const loadDeliveryById = useCallback(
    debounce(async (inputId: string) => {
      setLoading(true);
      await fetchJson<IDelivery>(
        `${import.meta.env.VITE_APP_API_URL}/api/delivery/${inputId}`,
      )
        .then((data) => {
          setDelivery(data);
        })
        .catch(() => {
          toast.error("No delivery found");
        })
        .finally(() => {
          setLoading(false);
        });
    }, 0),
    [],
  );

  useEffect(() => {
    onLoaded?.(delivery);
  }, [delivery]);

  return (
    <div className={cn("flex items-center gap-4", className)} {...restProps}>
      <Input
        type="text"
        value={entityId ?? ""}
        disabled={!!delivery}
        placeholder="Enter delivery ID"
        onChange={(ev) => {
          setEntityId(ev.target.value);
        }}
      />
      {delivery ? (
        <Button
          variant="dark"
          icon={<X size={16} />}
          onClick={() => {
            setDelivery(undefined);
            setEntityId(undefined);
          }}
        >
          Clear
        </Button>
      ) : (
        <Button
          loading={loading}
          disabled={!entityId || loading}
          variant="default"
          onClick={() => {
            if (entityId) {
              loadDeliveryById(entityId);
            }
          }}
        >
          Submit
        </Button>
      )}
    </div>
  );
}
