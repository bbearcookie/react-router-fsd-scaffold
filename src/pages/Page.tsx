import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { Counter } from '@/entities/counter';
import { ROUTES } from '@/shared/router';

const Page = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-50 p-6">
      <div className="flex w-full max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="flex flex-col items-center space-y-6 text-center lg:items-start lg:text-left">
          <h1 className="text-3xl font-semibold text-slate-800">{t('welcome')}</h1>
          <nav className="flex flex-wrap justify-center gap-4 lg:justify-start">
            <Link
              to={ROUTES.PETS.LIST()}
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none"
            >
              {t('pets')}
            </Link>
            <Link
              to={ROUTES.POSTS.LIST()}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
              {t('posts')}
            </Link>
          </nav>
        </div>
        <div className="flex justify-center">
          <Counter />
        </div>
      </div>
    </div>
  );
};

export default Page;
