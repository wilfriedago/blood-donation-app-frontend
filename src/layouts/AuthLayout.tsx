import Image from 'next/image';
import type { ReactNode } from 'react';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

export function AuthLayout(props: IMainProps) {
  return (
    <>
      {props.meta}
      <main className="relative mx-auto flex max-w-screen-2xl">
        <div className="my-8 flex h-full flex-1 flex-col items-center px-4 sm:justify-center sm:px-20 lg:flex-none">
          {props.children}
        </div>
        <div className="hidden lg:relative lg:block lg:flex-1">
          <Image
            className="absolute inset-0 h-full w-full object-cover"
            src="/assets/images/auth-bg.jpg"
            alt=""
            width={760}
            height={760}
          />
        </div>
      </main>
    </>
  );
}
