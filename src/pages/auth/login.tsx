import axios from 'axios';
import { withIronSessionSsr } from 'iron-session/next';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Logo from '@/assets/icons/logo-blood-donation.png';
import { Button, SocialButton } from '@/components/Buttons';
import { InputField } from '@/components/Fields';
import { sessionOptions } from '@/config';
import { MainLayout, Meta } from '@/layouts';
import type { LoginUserDto } from '@/types/dto';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/profile');
  }, []);

  const { control, handleSubmit, setError } = useForm<LoginUserDto>();

  async function onSubmit(formValues: LoginUserDto) {
    setLoading(true);

    axios
      .post('/api/auth/login', formValues)
      .then(({ data }) => {
        Cookies.set('auth.jwt', data.token, {
          expires: new Date(data.exp * 1000),
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        });
        router.push('/profile');
      })
      .catch(() =>
        setError('password', {
          type: 'manual',
          message: 'Adresse email ou mot de passe incorrect',
        })
      )
      .finally(() => setLoading(false));
  }

  // Facebook Handler function
  async function handleFacebookSignIn() {
    //
  }

  // Google Handler function
  async function handleGoogleSignIn() {
    //
  }

  // Github Login
  async function handleGithubSignIn() {
    //
  }

  return (
    <MainLayout
      meta={
        <Meta
          title="Se connecter | Blood Donation App"
          description="Connectez-vous à votre compte pour continuer."
        />
      }
    >
      <div className="flex flex-col">
        <Link href="/" aria-label="Home" className="w-fit">
          <Image
            src={Logo}
            alt="Blood Donation App Logo"
            width={70}
            height={70}
            unoptimized
          />
        </Link>
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Connectez-vous à votre compte
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            Vous n&apos;avez pas de compte ?&nbsp;
            <Link
              href="/auth/register"
              className="font-medium text-rose-600 hover:underline"
            >
              Inscrivez-vous
            </Link>
            .
          </p>
        </div>
      </div>
      <form
        className="mt-10 grid grid-cols-1 gap-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          control={control}
          id="email"
          type="email"
          name="email"
          label="Adresse email"
          readOnly={loading}
          required
          rules={{
            required: "Veuillez renseigner l'adresse email.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Veuillez renseigner une adresse email valide.',
            },
          }}
        />

        <InputField
          control={control}
          id="password"
          type="password"
          name="password"
          label="Mot de passe"
          readOnly={loading}
          required
          rules={{
            required: 'Veuillez renseigner le mot de passe.',
          }}
        />

        <div className="flex items-center justify-between">
          <Link
            href="/auth/forgot-password"
            className="border-none text-sm font-medium text-rose-600 hover:text-rose-800"
          >
            Mot de passe oublié ?
          </Link>
        </div>
        <div>
          <Button
            type="submit"
            variant="solid"
            color="rose"
            loading={loading}
            className="flex w-full items-center justify-center"
          >
            <span>{loading ? 'Connexion...' : 'Se connecter'}</span>
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-400" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-600">
              Ou connectez-vous avec
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <SocialButton
            onClick={handleFacebookSignIn}
            title="Facebook"
            icon="facebook"
          />
          <SocialButton
            onClick={handleGoogleSignIn}
            title="Google"
            icon="google"
          />
          <SocialButton
            onClick={handleGithubSignIn}
            title="Github"
            icon="github"
          />
        </div>
      </form>
    </MainLayout>
  );
}

export const getServerSideProps = withIronSessionSsr(async ({ req, res }) => {
  const { data } = req.session;
  if (data && data.isLoggedIn) {
    res.setHeader('location', '/profile');
    res.statusCode = 302;
    res.end();
    return {
      props: {
        data,
      },
    };
  }

  return {
    props: {
      data: {},
    },
  };
}, sessionOptions);
