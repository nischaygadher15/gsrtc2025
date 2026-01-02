import axios from "axios";

export const GetDeviceInfo = async (): Promise<{
  device_id: string;
  device_ip: string | null;
  device_lat: number | null;
  device_long: number | null;
}> => {
  // Device id no.
  let device_id: string | null = localStorage.getItem("gsrtc_device_id");
  let device_ip: string | null = null,
    device_lat: number | null = null,
    device_long: number | null = null;

  if (!device_id) {
    const new_device_id = crypto.randomUUID();
    localStorage.setItem("gsrtc_device_id", new_device_id);
    device_id = new_device_id;
  }

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
        { timeout: 10000 }
      );
    } else {
      resolve(null);
    }
  });

  // console.log("deviceNavLoc: ", deviceNavLoc);

  // console.log({
  //   device_lat,
  //   device_long,
  // });

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

  // console.log({
  //   device_ip,
  //   device_lat,
  //   device_long,
  // });

  return {
    device_id,
    device_ip,
    device_lat,
    device_long,
  };
};
