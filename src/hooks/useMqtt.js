import { useEffect, useState } from "react";
import mqtt from "mqtt";
import mqttConfig from "../config/mqttConfig";

export function useMqtt() {
  const [data, setData] = useState({
    voltage: null,
    current: null,
    power: null,
    total: null,
  });

  useEffect(() => {
    const client = mqtt.connect(mqttConfig.brokerUrl, mqttConfig.options);

    client.on("connect", () => {
      console.log("✅ MQTT connected");
      Object.values(mqttConfig.topics).forEach((topic) => {
        client.subscribe(topic, (err) => {
          if (!err) console.log("Subscribed:", topic);
        });
      });
    });

    client.on("message", (topic, message) => {
      const value = parseFloat(message.toString());
      setData((prev) => {
        if (topic === mqttConfig.topics.voltage) return { ...prev, voltage: value };
        if (topic === mqttConfig.topics.current) return { ...prev, current: value };
        if (topic === mqttConfig.topics.power) return { ...prev, power: value };
        if (topic === mqttConfig.topics.total) return { ...prev, total: value };
        return prev;
      });
    });

    return () => client.end();
  }, []);

  return data;
}
