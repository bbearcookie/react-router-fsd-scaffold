import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { ROUTES } from '@/shared/router';

const Route = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t('posts')}</h2>
      <Link to={ROUTES.POSTS.DETAIL('1')}>{t('postDetail')}</Link>
    </div>
  );
};

export default Route;
