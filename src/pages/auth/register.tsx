import Link from 'next/link';
import router from 'next/router';
import { signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button, SocialButton } from '@/components';
import { RegisterUserDto } from '@/interfaces/dto';
import { AuthLayout, Meta } from '@/layouts';
import api from '@/services/api';
import { getPasswordStrength, getProgressBarColor } from '@/utils/functions';

function Register() {
  const [loading, setLoading] = useState(false);
  const [progressBar, setProgressBar] = useState({
    width: 0,
    backgroundColor: '',
  });
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm<RegisterUserDto>();

  useEffect(() => {
    router.prefetch('/auth/confirm-email');
  }, []);

  async function onSubmit(formValues: RegisterUserDto) {
    setLoading(true);

    await api
      .registerEmail(formValues)
      .then(() => {
        setLoading(false);
        router.push('/auth/confirm-email');
      })
      .catch(({ response }) => {
        setLoading(false);
        if (response?.data?.errors) {
          const { data } = response;

          Object.keys(data.errors).forEach((key: string) =>
            // @ts-ignore
            setError(key, { message: data.errors[key] })
          );
        }
      });
  }

  // Facebook Handler function
  async function handleFacebookSignIn() {
    signIn('facebook', { callbackUrl: 'http://localhost:3000' });
  }

  // Google Handler function
  async function handleGoogleSignIn() {
    signIn('google', { callbackUrl: 'http://localhost:3000' });
  }

  // Github Login
  async function handleGithubSignIn() {
    signIn('github', { callbackUrl: 'http://localhost:3000' });
  }

  return (
    <AuthLayout
      meta={
        <Meta
          title="S'enregistrer | Blood Donation App"
          description="Créez un compte pour continuer."
        />
      }
    >
      <div className="flex flex-col justify-center sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Inscrivez-vous
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex gap-x-2">
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nom
                  </label>
                  <input
                    {...register('lastName', {
                      required: 'Le nom est requis',
                      maxLength: {
                        value: 32,
                        message: 'Le nom doit être inférieur à 32 caractères',
                      },
                    })}
                    type="text"
                    id="lastName"
                    name="lastName"
                    autoComplete="family-name"
                    aria-describedby="lastName-error"
                    aria-invalid={!!errors?.lastName}
                    className={`mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                      errors?.lastName && 'border-red-500'
                    }`}
                  />
                  {errors?.lastName && (
                    <span
                      role="alert"
                      id="lastName-error"
                      className="text-xs text-red-500"
                    >
                      {errors.lastName.message}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Prénom
                  </label>
                  <input
                    {...register('firstName', {
                      required: 'Le prénom est requis',
                      maxLength: {
                        value: 32,
                        message:
                          'Le prénom doit être inférieur à 32 caractères',
                      },
                    })}
                    type="text"
                    id="firstName"
                    name="firstName"
                    autoComplete="given-name"
                    aria-describedby="firstName-error"
                    aria-invalid={!!errors?.firstName}
                    className={`mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                      errors?.firstName && 'border-red-500'
                    }`}
                  />
                  {errors?.firstName && (
                    <span
                      role="alert"
                      id="firstName-error"
                      className="text-xs text-red-500"
                    >
                      {errors.firstName.message}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Adresse Email
                </label>
                <input
                  {...register('email', {
                    required: "L'adresse email est requis",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Adresse email invalide',
                    },
                  })}
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-describedby="email-error"
                  aria-invalid={!!errors?.email}
                  className={`mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                    errors?.email && 'border-red-500'
                  }`}
                />
              </div>
              {errors?.email && (
                <span
                  role="alert"
                  id="email-error"
                  className="text-xs text-red-500"
                >
                  {errors.email.message}
                </span>
              )}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mot de passe
                </label>
                <input
                  {...register('password', {
                    required: 'Le mot de passe est requis',
                    minLength: {
                      value: 6,
                      message: 'Le mot de passe doit contenir 6 caractères',
                    },
                    maxLength: {
                      value: 32,
                      message:
                        'Le mot de passe doit contenir 32 caractères au maximum',
                    },
                  })}
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  aria-describedby="password-error"
                  aria-invalid={!!errors?.password}
                  className={`mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                    errors?.password && 'border-red-500'
                  }`}
                />
              </div>
              {errors?.password && (
                <span
                  role="alert"
                  id="password-error"
                  className="text-xs text-red-500"
                >
                  {errors.password.message}
                </span>
              )}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirmer le mot de passe
                </label>
                <input
                  {...register('passwordConfirmation', {
                    required: 'Veuillez confirmer le mot de passe',
                    onBlur(e) {
                      if (e.target.value !== getValues('password'))
                        setError('passwordConfirmation', {
                          type: 'manual',
                          message: 'Les mots de passe ne correspondent pas',
                        });
                    },
                    onChange(e) {
                      clearErrors('passwordConfirmation');
                      const strength = getPasswordStrength(e.target.value);
                      setProgressBar({
                        width: strength,
                        backgroundColor: getProgressBarColor(strength),
                      });
                    },
                  })}
                  id="confirm-password"
                  type="password"
                  autoComplete="current-password"
                  aria-describedby="confirm-password-error"
                  aria-invalid={!!errors?.passwordConfirmation}
                  className={`mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                    errors?.passwordConfirmation && 'border-red-500'
                  }`}
                />
              </div>
              {errors?.passwordConfirmation && (
                <span
                  role="alert"
                  id="confirm-password-error"
                  className="text-xs text-red-500"
                >
                  {errors.passwordConfirmation.message}
                </span>
              )}
              {progressBar.width !== 0 && (
                <div className="h-1 w-full rounded-full">
                  <div
                    className="h-full rounded-full text-center text-xs text-white shadow-inner transition-all duration-500 ease-in-out"
                    style={{
                      width: `${progressBar.width}%`,
                      backgroundColor: progressBar.backgroundColor,
                    }}
                  ></div>
                </div>
              )}
              <div>
                <Button type="submit" className="mt-4" loading={loading}>
                  {loading ? 'En cours...' : 'Créer un compte'}
                </Button>
              </div>
            </form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-600">
                    Ou s&apos;enregistrer avec
                  </span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
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
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center text-sm tracking-tight text-gray-900">
        <span className="px-2 text-gray-600">Vous aviez déjà un compte ?</span>
        <Link
          href="/auth/login"
          className="border-none text-sm font-medium text-indigo-600 hover:text-indigo-800"
        >
          Se connecter
        </Link>
      </div>
    </AuthLayout>
  );
}

export default Register;
