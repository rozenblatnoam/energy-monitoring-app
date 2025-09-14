const mqttConfig = {
  brokerUrl: "ws://broker.hivemq.com:8000/mqtt",
  options: {
    keepalive: 30,
    reconnectPeriod: 1000,
  },
  topics: {
    voltage: "energy/voltage",
    current: "energy/current",
    power: "energy/power",
    total: "energy/total",
  },
};

export default mqttConfig;
