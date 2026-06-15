// assets
import { 
  DashboardOutlined, 
  EnvironmentOutlined, 
  BellOutlined, 
  DatabaseOutlined, 
  UserOutlined, 
  EditOutlined 
} from '@ant-design/icons';

const icons = {
  DashboardOutlined,
  EnvironmentOutlined,
  BellOutlined,
  DatabaseOutlined,
  UserOutlined,
  EditOutlined
};

const navigationGroup = {
  id: 'group-navigation',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/free/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'edit-localisation',
      title: 'Edit Localisation',
      type: 'item',
      url: '/free/edit-localisation',
      icon: icons.EnvironmentOutlined,
      breadcrumbs: false
    },
    {
      id: 'notification',
      title: 'Notification',
      type: 'item',
      url: '/free/notification',
      icon: icons.BellOutlined,
      breadcrumbs: false
    },
    {
      id: 'gestion-cultures',
      title: 'Gestion des cultures',
      type: 'item',
      url: '/free/gestion-cultures',
      icon: icons.DatabaseOutlined,
      breadcrumbs: false
    }
  ]
};

const profileGroup = {
  id: 'group-profile',
  title: 'Utilisateur',
  type: 'group',
  children: [
    {
      id: 'view-profile',
      title: 'View Profile',
      type: 'item',
      url: '/free/view-profile',
      icon: icons.UserOutlined,
      breadcrumbs: false
    },
    {
      id: 'edit-profile',
      title: 'Edit Profile',
      type: 'item',
      url: '/free/edit-profile',
      icon: icons.EditOutlined,
      breadcrumbs: false
    }
  ]
};

const menuItems = {
  items: [navigationGroup, profileGroup]
};

export default menuItems;