import { withIronSessionSsr } from 'iron-session/next';
import { GetServerSideProps } from 'next';
import Image from 'next/image';

import { sessionOptions } from '@/config';
import { InfoLayout, Meta } from '@/layouts';

export default function ValidateEmail({
  validateEmail: { email },
}: {
  validateEmail: { email: string };
}) {
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
        <Image
          src="/assets/icons/New message-cuate.svg"
          width={300}
          height={300}
          alt="Vous aviez reçu un email de confirmation"
        />
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
          Confirmation email
        </h1>
        <p className="text-center text-base">
          Merci pour votre inscription. Un lien pour activer votre compte a été
          envoyé à l&apos;adresse email&nbsp;
          <span className="font-semibold text-rose-600">
            {email.replace(/^(.{3}).*(.{4})$/, '$1******$2')}
          </span>
          . Veuillez vérifier votre boîte de réception et cliquer sur le lien
          pour activer votre compte.
        </p>
      </div>
    </InfoLayout>
  );
}

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req, res }) => {
    const { validateEmail } = req.session;

    if (!validateEmail) {
      res.setHeader('location', '/auth/register');
      res.statusCode = 302;
      res.end();
      return {
        props: {
          validateEmail: {},
        },
      };
    }

    return {
      props: {
        validateEmail,
      },
    };
  },
  sessionOptions
);
