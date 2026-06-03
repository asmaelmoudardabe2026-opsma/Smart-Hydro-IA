import { 
  DashboardOutlined, 
  EnvironmentOutlined, 
  BellOutlined, 
  PlusCircleOutlined,
  UserOutlined,
  EditOutlined,
  BuildOutlined
} from '@ant-design/icons';

const icons = { DashboardOutlined, EnvironmentOutlined, BellOutlined, PlusCircleOutlined, UserOutlined, EditOutlined, BuildOutlined };

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    { id: 'dashboard', title: 'Dashboard', type: 'item', url: '/dashboard/default', icon: icons.DashboardOutlined },
    { id: 'edit-localisation', title: 'Edit Localisation', type: 'item', url: '/edit-localisation', icon: icons.EnvironmentOutlined },
    { id: 'notification-page', title: 'Notification', type: 'item', url: '/notifications', icon: icons.BellOutlined },
    { 
      id: 'gestion-cultures', 
      title: 'Gestion des cultures', 
      type: 'item', 
      url: '/gestion-cultures', 
      icon: icons.BuildOutlined 
    },
    
    
    
    { id: 'view-profile', title: 'View Profile', type: 'item', url: '/view-profile', icon: icons.UserOutlined },
    { id: 'edit-profile', title: 'Edit Profile', type: 'item', url: '/edit-profile', icon: icons.EditOutlined }
  ]
};

const menuItems = { items: [dashboard] };
export default menuItems;