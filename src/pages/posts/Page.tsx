import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { ROUTES } from '@/shared/router';

const Page = () => {
  const { t } = useTranslation();

  console.log('import.meta.env.VITE_API_URL', import.meta.env.VITE_API_URL);
  console.log('import.meta.env.VITE_ENV', import.meta.env.VITE_ENV);

  return (
    <div>
      <h2>{t('posts')}</h2>
      <Link to={ROUTES.POSTS.DETAIL('1')}>{t('postDetail')}</Link>
    </div>
  );
};

export default Page;
