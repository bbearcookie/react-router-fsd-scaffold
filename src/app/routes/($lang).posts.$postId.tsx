import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router';
import { ROUTES } from '@/shared/constants/routes';

const Route = () => {
  const { t } = useTranslation();
  const { postId } = useParams();

  return (
    <div>
      <h2>{t('postDetail')}</h2>
      <span>postId: {postId}</span>
      <Link to={ROUTES.POSTS()}>{t('backToPosts')}</Link>
    </div>
  );
};

export default Route;
