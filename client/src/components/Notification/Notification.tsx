import { CircleCheckBig } from "lucide-react";
import { useState, useEffect } from "react";

const Notification = ({ message }: { message: string }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    if (!show) return null;

    return (
        <div className="fixed top-2 right-2 border border-green-500 bg-white text-gray-600 p-3 rounded-lg shadow-lg flex items-center">
            <CircleCheckBig className="text-green-500 mr-2" />
            {message}
        </div>
    );
};

export default Notification;