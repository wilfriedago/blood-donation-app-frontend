import { InfoLayout, Meta } from '@/layouts';

const NotFoundPage = () => {
  return (
    <InfoLayout
      meta={
        <Meta
          title="Page introuvable | Blood Donation App"
          description="Désolé, nous n'avons pas pu trouver la page que vous cherchiez."
        />
      }
    >
      <div className="text-center">
        <p className="text-3xl font-bold text-indigo-600">404</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page introuvable
        </h1>
        <p className="mt-2 text-lg text-zinc-500">
          Désolé, nous n&apos;avons pas pu trouver la page que vous cherchiez.
        </p>
      </div>
    </InfoLayout>
  );
};

export default NotFoundPage;
