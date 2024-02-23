import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { useEffect } from "react";
import { useAlertsContext } from "../App";
import { useState } from "react";

export function Alert({ type, message, onClose }) {
  let alertClasses = "absolute z-50 flex w-full items-center p-4 opacity-95 ";
  let iconColor;

  switch (type) {
    case "info":
      alertClasses += "text-blue-800 border-t-4 border-blue-300 bg-blue-100";
      iconColor = "blue";
      break;
    case "success":
      alertClasses += "text-green-800 border-t-4 border-green-300 bg-green-100";
      iconColor = "green";
      break;
    case "danger":
      alertClasses += "text-red-800 border-t-4 border-red-300 bg-red-100";
      iconColor = "red";
      break;
    default:
      alertClasses += "text-blue-800 border-t-4 border-blue-300 bg-blue-100"; // Default to info style
      iconColor = "blue";
      break;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div role="alert" className={alertClasses}>
      <IoIosInformationCircleOutline color={iconColor} />
      <p className="ms-3 text-sm font-medium opacity-100">{message}</p>
      <button className="ms-auto" type="button" onClick={onClose}>
        <MdClose />
      </button>
    </div>
  );
}

export function AlertList() {
  const { alerts, setAlerts } = useAlertsContext();

  const addAlert = (type, message) => {
    const newAlerts = [...alerts, { type, message }];
    setAlerts(newAlerts);
  };

  const removeAlert = (index) => {
    const newAlerts = [...alerts];
    newAlerts.splice(index, 1);
    setAlerts(newAlerts);
  };

  return (
    <>
      {alerts?.length > 0 && (
        <div className="relative">
          {alerts.map((alert, index) => (
            <Alert
              key={index}
              type={alert.type}
              message={alert.message}
              onClose={() => removeAlert(index)}
            />
          ))}
        </div>
      )}
    </>
  );
}
