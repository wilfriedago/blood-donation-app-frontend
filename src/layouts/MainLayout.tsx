import type { ReactNode } from 'react';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

export function MainLayout(props: IMainProps) {
  return (
    <>
      {props.meta}
      {props.children}
    </>
  );
}
