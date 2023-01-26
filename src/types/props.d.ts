type InfoLayoutProps = {
  title: string;
  description: string;
  image: string;
  url: string;
}

type TableProps = {
  content: {
    title: string;
    description: string;
    button: string;
  };
  datalist: any[];
  columns: any[];
  actions: {
    add: () => void;
    edit: (id: string) => void;
    delete: (id: string) => void;
  };
}

type ModalProps = {
  type?: string;
  title?: string;
  description?: string;
  actions?: {
    cancel: () => void;
    confirm: () => void;
    confirmText: string;
    cancelText: string;
  };
  open: boolean;
  setOpen: (value: boolean) => void;
}

type BannerProps = {
  smallDescription: string;
  description: string;
  link : {
    text: string;
    url: string;
  }
}

export type { InfoLayoutProps, TableProps, ModalProps, BannerProps };
