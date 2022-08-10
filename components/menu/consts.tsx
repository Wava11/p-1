import PersonIcon from '@mui/icons-material/Person';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarViewMonth';
import PortraitIcon from '@mui/icons-material/Portrait';

export const views = [
    {
        label: 'איזור אישי',
        icon: <PersonIcon />,
        route: '/'
    },
    {
        label: 'אילוצים',
        icon: <DoNotDisturbAltIcon />,
        route: '/preferences'
    },
    {
        label: 'פק"ל שמירות',
        icon: <CalendarMonthIcon />,
        route: '/schedule'
    },
    {
        label: 'מסך מנהל',
        icon: <PortraitIcon />,
        route: '/'
    },
]