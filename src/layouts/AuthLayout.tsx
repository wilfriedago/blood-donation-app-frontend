import Image from 'next/image';
import type { ReactNode } from 'react';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

export function AuthLayout(props: IMainProps) {
  return (
    <div className="mx-auto max-w-screen-2xl text-gray-700 antialiased">
      {props.meta}
      <div className="flex">
        <div className="flex h-full flex-1 flex-col items-center bg-gray-300 px-4 sm:justify-center md:flex-none md:px-20">
          {props.children}
        </div>
        <div className="hidden sm:contents lg:relative lg:block lg:flex-1">
          <Image
            className="absolute inset-0 h-full w-full object-cover"
            src="/assets/images/auth-bg.jpg"
            alt=""
            width={760}
            height={760}
          />
        </div>
      </div>
    </div>
  );
}
