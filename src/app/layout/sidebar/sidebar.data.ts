export function renderSidebar(adminType) {
  return adminType === 0 ? sidebarSuper : sidebar;
}

export const sidebarSuper = [
  {
    path: '/agencies',
    title: 'Đơn vị',
    icon: 'icon-home',
    children: [
      {
        path: '',
        title: 'Quản lý đơn vị'
      }
    ]
  },
  {
    path: 'content',
    title: 'Nội dung',
    icon: 'icon-home',
    children: [
      {
        path: 'articles',
        title: 'Bài viết',
      },
      {
        path: 'files',
        title: 'Quản lý File',
      }
    ]
  },
  {
    path: 'pictures',
    title: 'Hình ảnh',
    icon: 'icon-grid',
    children: [
      {
        path: '',
        title: 'Quản lý ảnh',
      },
      {
        path: 'albums',
        title: 'Quản lý albums',
      }
    ]
  }
];

export const sidebar = [
  {
    path: '/agencies/me',
    title: 'Đơn vị',
    icon: 'icon-home',
    children: [
      {
        path: '',
        title: 'Đơn vị của tôi'
      }
    ]
  },
  {
    path: '',
    title: 'Nội dung',
    icon: 'icon-home',
    children: [
      {
        path: '/articles',
        title: 'Bài viết',
      },
      {
        path: '/albums',
        title: 'Album',
      },
      {
        path: '/videos',
        title: 'Video',
      }
    ]
  },
  {
    path: 'pictures',
    title: 'Hình ảnh',
    icon: 'icon-grid',
    children: [
      {
        path: '',
        title: 'Quản lý ảnh',
      },
      {
        path: 'albums',
        title: 'Quản lý albums',
      }
    ]
  }
];
