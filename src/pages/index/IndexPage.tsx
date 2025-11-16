import { useTranslation } from 'react-i18next';
import Counter from '@/shared/components/Counter';

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <span>{t('welcome')}</span>
      <Counter />
    </div>
  );
};

export default IndexPage;
