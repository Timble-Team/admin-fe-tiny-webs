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
    },
    {
      label: 'Script',
      icon: 'pi pi-question',
      items: [
        {
          label: 'Tạo Record',
          routerLink: '/scripts',
          icon: 'pi pi-pencil'
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
      label: 'Phân quyền',
      routerLink: '/users',
      icon: 'pi pi-users'
    },
    {
      label: 'Danh mục',
      routerLink: '/categories',
      icon: 'pi pi-th-large'
    },
    {
      label: 'Nội dung',
      icon: 'pi pi-desktop',
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
    },
    {
      label: 'Script',
      icon: 'pi pi-question',
      items: [
        {
          label: 'Tạo Record',
          routerLink: '/scripts',
          icon: 'pi pi-pencil'
        }
      ]
    }
  ];

  sidebarAssistant = [
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
      icon: 'pi pi-desktop',
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
    },
    {
      label: 'Script',
      icon: 'pi pi-question',
      items: [
        {
          label: 'Tạo Record',
          routerLink: '/scripts',
          icon: 'pi pi-pencil'
        }
      ]
    }
  ];

  renderSidebar(adminType) {
    // if (+adminType === 0) {
    //   return this.sidebarSuper;
    // } else if (+adminType === 1) {
    //   return this.sidebar;
    // } else if (+adminType === 2) {
    //   return this.sidebarAssistant;
    // }
    return this.sidebar;
  }
}
