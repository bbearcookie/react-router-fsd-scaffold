// import { CommentEntity } from '@/entities/comment/ui/CommentEntity'; // @NOTE: (금지: PUBLIC API를 통한 import만 허용합니다.)
import { CommentEntity } from '@/entities/comment';

const CreateUserFeature = () => {
  return (
    <div>
      CreateUserFeature
      <CommentEntity />
    </div>
  );
};

export { CreateUserFeature };
