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
      <div className="flex h-screen min-h-full flex-col bg-white pt-16 pb-12">
        <main className="mx-auto flex w-full max-w-7xl grow flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="flex shrink-0 justify-center">
            <Link href="/" className="inline-flex">
              <span className="sr-only">Your Company</span>
              {/* <Image
                className="h-12 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
                width={48}
                height={48}
              /> */}
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center">
            {props.children}
            {props.nextLink ? (
              <Link
                href={props.nextLink.href}
                className="mt-4 text-base font-medium text-indigo-600 hover:text-indigo-500"
              >
                {props.nextLink.label}
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            ) : (
              <Link
                href="/"
                className="mt-4 text-base font-medium text-indigo-600 hover:text-indigo-500"
              >
                Retour à l&apos;accueil
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            )}
          </div>
        </main>
        <footer className="mx-auto w-full max-w-7xl shrink-0 px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-center space-x-4">
            <Link
              href="#"
              className="text-sm font-medium text-gray-500 hover:text-gray-600"
            >
              Contact
            </Link>
            <span
              className="inline-block border-l border-gray-300"
              aria-hidden="true"
            />
            <Link
              href="#"
              className="text-sm font-medium text-gray-500 hover:text-gray-600"
            >
              Privacy
            </Link>
            <span
              className="inline-block border-l border-gray-300"
              aria-hidden="true"
            />
            <Link
              href="#"
              className="text-sm font-medium text-gray-500 hover:text-gray-600"
            >
              Twitter
            </Link>
          </nav>
        </footer>
      </div>
    </>
  );
}
