"use client";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

import axios from "axios";
import { getDeviceId, setDeviceId } from "./getDeviceId";

export const GetDeviceInfo = async (): Promise<{
  device_id: string;
  device_ip: string | null;
  device_lat: number | null;
  device_long: number | null;
}> => {
  try {
    // Device id no.
    let device_id: string | null = await getDeviceId();

    if (!device_id) {
      const fpAgent = FingerprintJS.load();
      const fp = await fpAgent;
      const newDeviceId = await fp.get();
      if (!newDeviceId.visitorId) {
        throw new Error("No device id generated!");
      }
      setDeviceId(newDeviceId.visitorId);
      device_id = newDeviceId.visitorId;
      console.log("device_id: ", newDeviceId.visitorId);
    }

    let device_ip: string | null = null,
      device_lat: number | null = null,
      device_long: number | null = null;

    // console.log("device_id: ", device_id);

    //Device Location
    const deviceNavLoc = await new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("position.coords: ", position.coords);
            resolve(() => {
              device_lat = position.coords.latitude;
              device_long = position.coords.longitude;
            });
          },
          resolve,
          { timeout: 10000 },
        );
      } else {
        resolve(null);
      }
    });

    //Device IP and Location by third party api
    const deviceInfo = await axios.get("https://ipinfo.io/json");

    if (deviceInfo.data) {
      // console.log("deviceInfo.data.loc: ", deviceInfo.data.loc);
      device_ip = deviceInfo.data.ip;

      if (!device_lat || !device_long) {
        device_lat = parseFloat(deviceInfo.data.loc.split(",")[0]);
        device_long = parseFloat(deviceInfo.data.loc.split(",")[1]);
      }
    }

    return {
      device_id,
      device_ip,
      device_lat,
      device_long,
    };
  } catch (error: any) {
    console.log("", error);
    throw new Error(error.message);
  }
};
