import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button, SocialButton } from '@/components';
import type { LoginUserDto } from '@/interfaces/dto';
import { MainLayout, Meta } from '@/layouts';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserDto>();

  useEffect(() => {
    router.prefetch('/profile');
  }, []);

  async function onSubmit(formValues: LoginUserDto) {
    setLoading(true);

    const result = await signIn('credentials', {
      ...formValues,
      redirect: false,
    });

    if (result?.error) {
      setLoading(false);
    }

    if (result?.ok) {
      setLoading(false);
      router.push('/profile');
    }
  }

  // Facebook Handler function
  async function handleFacebookSignin() {
    signIn('facebook', { callbackUrl: 'http://localhost:3000' });
  }

  // Google Handler function
  async function handleGoogleSignin() {
    signIn('google', { callbackUrl: 'http://localhost:3000' });
  }

  // Github Login
  async function handleGithubSignin() {
    signIn('github', { callbackUrl: 'http://localhost:3000' });
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
      <div className="h-full">
        <div className="flex flex-col justify-center sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
              Connectez-vous
            </h2>
          </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10">
              <form
                className="space-y-6"
                action="#"
                method="POST"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Adresse Email
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('email', {
                        required: "L'Adresse email est requis",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Adresse email invalide',
                        },
                      })}
                      id="email"
                      type="email"
                      autoComplete="email"
                      aria-invalid={errors?.email ? 'true' : 'false'}
                      className="mt-1 block h-10 w-full appearance-none rounded-md bg-white px-3 text-slate-900 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                {errors?.email && (
                  <span role="alert" className="text-xs text-red-500">
                    {errors.email.message}
                  </span>
                )}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mot de passe
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('password', {
                        required: 'Le mot de passe est requis',
                        maxLength: {
                          value: 64,
                          message:
                            'Le mot de passe doit contenir 64 caractères au maximum',
                        },
                      })}
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      aria-invalid={errors?.password ? 'true' : 'false'}
                      className="mt-1 block h-10 w-full appearance-none rounded-md bg-white px-3 text-slate-900 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                {errors?.password && (
                  <span role="alert" className="text-xs text-red-500">
                    {errors.password.message}
                  </span>
                )}
                <div className="flex items-center justify-between">
                  <Link
                    href="/forgot-password"
                    className="border-none text-sm font-medium text-indigo-600 hover:text-indigo-800"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
                <div>
                  <Button type="submit" className="mt-4" loading={loading}>
                    {loading ? 'Connexion...' : 'Se connecter'}
                  </Button>
                </div>
              </form>
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-400" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-600">
                      Ou se connecter avec
                    </span>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <SocialButton
                    onClick={handleFacebookSignin}
                    title="Facebook"
                    icon="facebook"
                  />
                  <SocialButton
                    onClick={handleGoogleSignin}
                    title="Google"
                    icon="google"
                  />
                  <SocialButton
                    onClick={handleGithubSignin}
                    title="Github"
                    icon="github"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center text-sm tracking-tight text-gray-900">
          <span className="px-2 text-gray-600">
            Vous n&apos;avez pas de compte ?
          </span>
          <Link
            href="/auth/register"
            className="font-medium text-indigo-600 hover:text-indigo-800"
          >
            Créer un compte
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
