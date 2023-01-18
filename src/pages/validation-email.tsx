import { ShieldCheckIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';

import { InfoLayout, Meta } from '@/layouts';

export default function ValidateEmail() {
  const router = useRouter();
  const { email } = router.query;

  return (
    <InfoLayout
      meta={
        <Meta
          title="Vérification email | Blood Donation App"
          description="Vérifiez votre boîte de réception pour confirmer votre adresse email."
        />
      }
    >
      <div className="flex max-w-xl flex-col items-center px-4 text-center">
        <ShieldCheckIcon className="h-14 text-indigo-500" />
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
          Confirmation email
        </h1>
        <p className="text-center text-base">
          Merci pour votre inscription. Un lien pour activer votre compte a été
          envoyé à l&apos;adresse email&nbsp;
          <span className="font-semibold text-indigo-600">{email}</span>.
          Veuillez vérifier votre boîte de réception et cliquer sur le lien pour
          activer votre compte.
        </p>
      </div>
    </InfoLayout>
  );
}
