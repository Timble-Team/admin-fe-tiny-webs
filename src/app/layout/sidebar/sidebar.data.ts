export class SidebarData {
  sidebarSuper = [
    {
      label: 'Trang chủ',
      routerLink: '/',
      icon: 'pi pi-pw pi-home'
    },
    {
      label: 'Danh mục',
      routerLink: '/categories',
      icon: 'pi pi-th-large'
    },
    {
      label: 'Đơn vị',
      icon: 'pi pi-briefcase',
      items: [
        {
          label: 'Danh sách', 
          icon: 'pi pi-bookmark',
          routerLink: '/agencies'
        }
      ]
    },
    {
      label: 'Nội dung',
      icon: 'pi pi-question',
      items: [
        {
          label: 'Bài viết',
          routerLink: '/articles',
          icon: 'pi pi-pencil'
        },
        {
          label: 'Hình ảnh',
          routerLink: '/albums',
          icon: 'pi pi-image'
        },
        {
          label: 'Videos',
          routerLink: '/videos',
          icon: 'pi pi-video'
        }
      ]
    }
  ];

  sidebar = [
    {
      label: 'Trang chủ',
      routerLink: '/',
      icon: 'pi pi-pw pi-home'
    },
    {
      label: 'Danh mục',
      routerLink: '/categories',
      icon: 'pi pi-th-large'
    },
    {
      label: 'Nội dung',
      icon: 'pi pi-question',
      items: [
        {
          label: 'Bài viết',
          routerLink: '/articles',
          icon: 'pi pi-pencil'
        },
        {
          label: 'Hình ảnh',
          routerLink: '/albums',
          icon: 'pi pi-image'
        },
        {
          label: 'Videos',
          routerLink: '/videos',
          icon: 'pi pi-video'
        }
      ]
    }
  ];

  renderSidebar(adminType) {
    return adminType === 0 ? this.sidebarSuper : this.sidebar;
  }
}
