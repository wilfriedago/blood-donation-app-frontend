import Image from 'next/image';
import Link from 'next/link';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  loading?: boolean;
};

type SocialButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  icon: string;
};

export function Button({
  href,
  title,
  className,
  loading = false,
  ...props
}: ButtonProps) {
  const classList = `flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-150 cursor-pointer disabled:cursor-not-allowed disabled:bg-indigo-500 disabled:hover:bg-indigo-500 ${className}`;

  return href ? (
    <Link href={href} className={classList} />
  ) : (
    <button className={classList} {...props} disabled={loading}>
      {loading && (
        <svg
          className="mr-2 h-4 w-4 animate-spin"
          viewBox="3 3 18 18"
          aria-label="Loading..."
          role="status"
        >
          <path
            className="fill-blue-800"
            d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
          ></path>
          <path
            className="fill-blue-100"
            d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
          ></path>
        </svg>
      )}
      {title || props.children}
    </button>
  );
}

export function SocialButton({ title, icon, onClick }: SocialButtonProps) {
  return (
    <Button
      type="button"
      onClick={onClick}
      className="w-full justify-center rounded-md border border-gray-400 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm transition-all duration-150 hover:border-indigo-500 hover:bg-gray-50"
    >
      <span className="sr-only">{title}</span>
      <Image
        src={`/assets/images/${icon}.svg`}
        alt={title}
        width="22"
        height="22"
      />
    </Button>
  );
}
