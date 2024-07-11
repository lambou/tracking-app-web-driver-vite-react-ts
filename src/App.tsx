import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import ActiveStatusItem from "./components/ActiveStatusItem";
import DeliveryLookupForm from "./components/DeliveryLookupForm";
import EmptyContent from "./components/EmptyContent";
import DeliveryDetailsCard from "./components/sections/DeliveryDetailsCard";
import PackageDetailsCard from "./components/sections/PackageDetailsCard";
import Button from "./components/ui/Button";
import IDelivery from "./interfaces/IDelivery";
import IWebSocketEvent from "./interfaces/IWebSocketEvent";
import DeliveryMap from "./components/sections/DeliveryMap";

function App() {
  const [delivery, setDelivery] = useState<IDelivery | undefined>();
  const [currentPosition, setCurrentPosition] = useState<
    { lat: number; lng: number } | undefined
  >();

  const { sendJsonMessage } = useWebSocket(
    `${import.meta.env.VITE_WEBSOCKET_API_URL}`,
    {
      shouldReconnect: () => true,
      onMessage: (message) => {
        const data = JSON.parse(message.data) as IWebSocketEvent;

        // a delivery has been selected
        if (delivery) {
          // a delivery has been updated and it matches the selected delivery
          if (
            data.event === "delivery_updated" &&
            data.delivery_object._id === delivery._id
          ) {
            setDelivery(data.delivery_object);
          }
        }
      },
    },
  );

  useEffect(() => {
    if (currentPosition) {
      if (delivery) {
        sendJsonMessage({
          event: "location_changed",
          delivery_id: delivery._id,
          location: currentPosition,
        } as IWebSocketEvent);
      }
    }
  }, [currentPosition]);

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;

      // update local state
      setCurrentPosition({ lat, lng });
    });
  };

  useEffect(() => {
    // first load
    getCurrentPosition();

    // interval for continues update
    const interval = setInterval(() => {
      getCurrentPosition();
    }, 20_000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex-auto flex flex-col gap-6 py-10 container">
      <h1 className="text-4xl font-bold capitalize text-center">Web driver</h1>
      <div className="flex-auto flex flex-col items-center gap-6">
        <DeliveryLookupForm
          className="max-w-3xl w-full"
          onLoaded={setDelivery}
        />
        <div className="w-full flex gap-6">
          {delivery ? (
            <div className="flex flex-col gap-6 w-full max-w-sm">
              <PackageDetailsCard data={delivery.package} />
              <DeliveryDetailsCard data={delivery} />
            </div>
          ) : (
            <EmptyContent className="min-h-[256px] w-full max-w-sm" />
          )}
          {delivery ? (
            <DeliveryMap
              className="flex-auto"
              packageData={delivery.package}
              deliveryPosition={delivery.location}
            />
          ) : (
            <EmptyContent className="flex-auto" />
          )}
          {delivery ? (
            <div className=" w-full max-w-xs flex flex-col gap-4">
              {delivery.status === "picked-up" ? (
                <ActiveStatusItem success label="Picked Up" />
              ) : (
                <Button
                  disabled={delivery.status !== "open"}
                  variant="blue"
                  onClick={() => {
                    sendJsonMessage({
                      event: "status_changed",
                      status: "picked-up",
                      delivery_id: delivery._id,
                    } as IWebSocketEvent);
                  }}
                >
                  Picked Up
                </Button>
              )}
              {delivery.status === "in-transit" ? (
                <ActiveStatusItem success label="In-Transit" />
              ) : (
                <Button
                  disabled={delivery.status !== "picked-up"}
                  variant="orange"
                  onClick={() => {
                    sendJsonMessage({
                      event: "status_changed",
                      status: "in-transit",
                      delivery_id: delivery._id,
                    } as IWebSocketEvent);
                  }}
                >
                  In-Transit
                </Button>
              )}
              {delivery.status === "delivered" ? (
                <ActiveStatusItem success label="Delivered" />
              ) : (
                <Button
                  disabled={delivery.status !== "in-transit"}
                  onClick={() => {
                    sendJsonMessage({
                      event: "status_changed",
                      status: "delivered",
                      delivery_id: delivery._id,
                    } as IWebSocketEvent);
                  }}
                >
                  Delivered
                </Button>
              )}
              {delivery.status === "failed" ? (
                <ActiveStatusItem success={false} label="Failed" />
              ) : (
                <Button
                  disabled={delivery.status !== "in-transit"}
                  variant="red"
                  onClick={() => {
                    sendJsonMessage({
                      event: "status_changed",
                      status: "failed",
                      delivery_id: delivery._id,
                    } as IWebSocketEvent);
                  }}
                >
                  Failed
                </Button>
              )}
            </div>
          ) : (
            <EmptyContent className="min-h-[256px] w-full max-w-xs" />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
