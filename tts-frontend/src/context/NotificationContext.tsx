import { createContext, useState } from "react";
import { Props } from "./AuthContext";

export enum NotificationType {
    Success = "success",
    Error = "error",
    None = ""
}

type NotificationContextType = {
    trigger: NotificationType
    triggerText: string
    error: (alertText: string) => void;
    success: (alertText: string) => void;
};

const initialNotificationContext: NotificationContextType = {
    trigger: NotificationType.None,
    triggerText: "",
    error: (alertText: string) => {},
    success: (alertText: string) => {}
};
const NotificationContext = createContext<NotificationContextType>(initialNotificationContext);

const NotificationContextProvider = ({ children }: Props) => {
    const [trigger, setTrigger] = useState<NotificationType>(NotificationType.None);
    const [triggerText, setTriggerText] = useState<string>("")

    const reset = () => {
        setTimeout(() => {
            setTriggerText("")
            setTrigger(NotificationType.None)
        }, 2000);
    }

    const error = (alertText: string) => {
        setTriggerText(alertText)
        setTrigger(NotificationType.Error);
        reset();
    }

    const success = (alertText: string) => {
        setTriggerText(alertText)
        setTrigger(NotificationType.Success);
        reset();
    }

    const NotificationContextValues: NotificationContextType = {
        trigger,
        triggerText,
        success,
        error
    };

    return (
        <NotificationContext.Provider value={NotificationContextValues}>
            {children}
        </NotificationContext.Provider>
    );
};

export { NotificationContext, NotificationContextProvider };
