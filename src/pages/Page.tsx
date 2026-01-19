import { useTranslation } from 'react-i18next';
import { Counter } from '@/entities/counter';

const Page = () => {
  const { t } = useTranslation();

  return (
    <div>
      <span>{t('welcome')}</span>
      <Counter />
    </div>
  );
};

export default Page;
