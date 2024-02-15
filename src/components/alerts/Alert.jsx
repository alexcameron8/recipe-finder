import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { useEffect } from "react";
import { useAlertsContext } from "../App";
import { useState } from "react";
export function Alert({ type, message, onClose }) {
    let alertStyle;
    let iconColor;

    switch (type) {
        case "info":
            alertStyle = "blue";
            iconColor = "blue";
            break;
        case "success":
            alertStyle = "green";
            iconColor = "green";
            break;
        case "danger":
            alertStyle = "red";
            iconColor = "red";
            break;
        default:
            alertStyle = "blue"; // Default to info style
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
        <div role="alert" className={`p-4 z-10 absolute flex items-center w-full text-${alertStyle}-800 border-t-4 border-${alertStyle}-300 bg-${alertStyle}-100`}>
            <IoIosInformationCircleOutline color={iconColor} />
            <p className="ms-3 text-sm font-medium">{message}</p>
            <button className="ms-auto" type="button" onClick={onClose}><MdClose /></button>
        </div>
    );
}

export function AlertList() {
    const {alerts, setAlerts} = useAlertsContext();
  
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
            {alerts?.length >0 && (
            <div className="relative">
            {alerts.map((alert, index) => (
                <Alert
                key={index}
                type={alert.type}
                message={alert.message}
                onClose={() => removeAlert(index)}
            />
            ))}
        </div>)}
        </>
    );
  }