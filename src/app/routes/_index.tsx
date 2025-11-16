import IndexPage from '@/pages/index/IndexPage';

const Route = () => {
  return Array.from({ length: 10 }).map((_, index) => <IndexPage key={index} />);
};

export default Route;
