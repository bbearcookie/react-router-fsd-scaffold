// import { CreateUserFeature } from '@/features/create-user'; // @NOTE: (금지: features 레이어는 entities 레이어를 import 할 수 없습니다.)
import { type Comment } from '@/entities/comment';

const UserEntity = () => {
  return (
    <div>
      <h1>UserEntity</h1>
    </div>
  );
};

export { UserEntity };
