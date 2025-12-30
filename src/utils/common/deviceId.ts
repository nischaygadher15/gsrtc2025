export const DeviceId = () => {
  const device_id = localStorage.getItem("gsrtc_device_id");

  if (!device_id) {
    const new_device_id = crypto.randomUUID();
    localStorage.setItem("gsrtc_device_id", new_device_id);
    return new_device_id;
  } else {
    return device_id;
  }
};
