import Link from 'next/link';
import type { ReactNode } from 'react';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  nextLink?: {
    href: string;
    label: string;
  };
};

export function InfoLayout(props: IMainProps) {
  return (
    <>
      {props.meta}
      <div className="mx-auto flex h-screen min-h-full max-w-screen-2xl flex-col py-12">
        <main className=" flex w-full  grow flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center">
            <div className="absolute inset-0 text-slate-900/[0.07] [mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]">
              <svg
                className="absolute inset-0 h-full w-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="grid-bg"
                    width="32"
                    height="32"
                    patternUnits="userSpaceOnUse"
                    x="100%"
                    patternTransform="translate(0 -1)"
                  >
                    <path
                      d="M0 32V.5H32"
                      fill="none"
                      stroke="currentColor"
                    ></path>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-bg)"></rect>
              </svg>
            </div>
            <div className="relative py-12">
              <div className="flex max-w-sm flex-col items-center text-center">
                {props.children}
              </div>
            </div>
            {props.nextLink ? (
              <Link
                href={props.nextLink.href}
                className="relative mt-2 cursor-pointer text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                {props.nextLink.label}
                <span aria-hidden="true">&nbsp;&rarr;</span>
              </Link>
            ) : (
              <Link
                href="/"
                className="relative mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Retour à l&apos;accueil
                <span aria-hidden="true">&nbsp;&rarr;</span>
              </Link>
            )}
          </div>
        </main>
        <footer className="relative mx-auto w-full max-w-7xl shrink-0 px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-center space-x-4">
            <Link
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-gray-700"
            >
              Contact
            </Link>
            <span
              className="inline-block border-l border-gray-300"
              aria-hidden="true"
            />
            <Link
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-gray-700"
            >
              Privacy
            </Link>
            <span
              className="inline-block border-l border-gray-300"
              aria-hidden="true"
            />
            <Link
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-gray-700"
            >
              Twitter
            </Link>
          </nav>
        </footer>
      </div>
    </>
  );
}
