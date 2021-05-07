/* eslint-disable import/no-extraneous-dependencies */
import { createServer, Model, Factory } from "miragejs";
import faker from "faker";
import _ from "lodash";
import moment from "moment";

export const makeServer = ({ environment = "test" } = {}) => {
  const mockServer = createServer({
    environment,

    models: {
      attribute: Model,
      recording: Model,
    },

    factories: {
      recording: Factory.extend({
        fileName: () =>
          `video_${_.sample(["front", "back"])}_${moment(
            faker.date.past()
          ).format("YYYY-MM-DD_HH-mm-ss")}.mp4`,
        uploaded: () => _.sample([true, false]),
      }),
    },

    seeds(server) {
      server.create("attribute", {
        attribute: "OS",
        value: "DietPi v7.1.2",
        type: "system",
      });
      server.create("attribute", {
        attribute: "Device Model",
        value: "RPi 4 Model B (armv7l)",
        type: "system",
      });
      server.create("attribute", {
        attribute: "IP Address",
        value: "192.168.146.192",
        type: "system",
      });
      server.create("attribute", {
        attribute: "Connected Cameras",
        value: 2,
        type: "video",
      });
      server.create("attribute", {
        attribute: "Total Recordings",
        value: 1234,
        type: "video",
      });
      server.create("attribute", {
        attribute: "Software Version",
        value: "0.1.0",
        type: "software",
      });
      server.create("attribute", {
        attribute: "Git Hash",
        value: "12eqebv34r",
        type: "software",
      });
      server.createList("recording", 30);
    },

    routes() {
      // WebRTC-streamer routes
      this.passthrough("http://192.168.146.144:8000/**");

      this.urlPrefix = "http://192.168.146.192";
      this.namespace = "/api-dev/v1";

      this.get("/stats/system", (schema) =>
        schema.attributes.where({ type: "system" })
      );
      this.get("/stats/video", (schema) =>
        schema.attributes.where({ type: "video" })
      );
      this.get("/stats/software", (schema) =>
        schema.attributes.where({ type: "software" })
      );
      this.get("/recordings", (schema) => schema.recordings.all());
      this.get("/system", () => ({
        cpu: {
          arch: "ARMv7 Processor rev 3 (v7l)",
          clockSpeed: "1.5000 GHz",
          cores: 4,
          soc: "BCM2711",
          temp: 51.1,
          usagePct: 21.5,
        },
        disk: {
          freeGB: 114.1,
          percent: 5.2,
          totalGB: 125.6,
          usedGB: 6.3,
        },
        gpu: {
          temp: 51.1,
        },
        memory: {
          freeGiB: 6.9,
          percent: 9.2,
          totalGiB: 7.6,
        },
        network: {
          addresses: ["192.168.146.192"],
          bytesReceivedMB: 19.9,
          bytesSentMB: 24.8,
          hostname: "guglhupf-controller",
          packetsReceived: 21062,
          packetsSent: 22310,
        },
        software: {
          git: "b3ecbed",
          python: "3.7.10",
          version: "0.1.0",
        },
        system: {
          kernel: "5.10.17-v7l+",
          load: "17.2%",
          platform: "Debian 10.9",
          started: "4 minutes ago",
        },
        video: {
          cameras: 2,
          recordings: 0,
        },
      }));
    },
  });
  return mockServer;
};

export { makeServer as default };
