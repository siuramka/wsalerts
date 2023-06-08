import MuiAlert from '@mui/material/Alert';
import { NotificationContext, NotificationType } from "../context/NotificationContext"
import React, { useContext } from 'react'
import { Box } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';

const AlertNotification = () => {
    const { trigger, triggerText } = useContext(NotificationContext);
    return (
        <div>
            {
                trigger === NotificationType.None ? <></> :
                    <>
                        <Box sx={{ zIndex: 2000, position: 'absolute', bottom: '5vh', right: '5vh' }}>
                            <MuiAlert variant="filled" severity={trigger}>{triggerText}</MuiAlert>
                        </Box>
                    </>
            }

        </div>
    )
}

export default AlertNotification;