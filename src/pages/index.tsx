import { DefaultLayout, Meta } from '@/layouts';

export default function Index() {
  return (
    <DefaultLayout
      meta={
        <Meta
          title="Next.js Boilerplate Presentation"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <h1 className="text-6xl font-bold">
            Welcome to&nbsp;
            <a className="text-blue-600" href="https://nextjs.org">
              Next.js!
            </a>
          </h1>
        </main>
      </div>
    </DefaultLayout>
  );
}
