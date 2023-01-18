import type { ReactNode } from 'react';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

export function DefaultLayout(props: IMainProps) {
  return (
    <>
      {props.meta}
      <main className="grid place-items-center">{props.children}</main>
    </>
  );
}
