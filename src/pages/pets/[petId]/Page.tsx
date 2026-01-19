import { useMutation, useQuery } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router';
import { petQueries } from '@/shared/api/pet/queries';
import { petMutations } from '@/shared/api/pet/mutations';
import { ROUTES } from '@/shared/router';

const Page = () => {
  const params = useParams();
  const navigate = useNavigate();
  const petId = params.petId as string;

  const { data: pet, isLoading, isError, error } = useQuery(petQueries.byId(petId));

  const deleteMutation = useMutation(petMutations.deletePet);

  const handleDelete = () => {
    if (window.confirm(`정말로 "${pet?.name}"을(를) 삭제하시겠습니까?`)) {
      deleteMutation.mutate(Number(petId), {
        onSuccess: () => {
          navigate(ROUTES.PETS.LIST());
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (isError || !pet) {
    return (
      <div className="p-8">
        <div className="mb-4 text-red-600">Error: {error?.message || 'Pet을 찾을 수 없습니다'}</div>
        <Link to={ROUTES.PETS.LIST()} className="text-blue-600 hover:underline">
          ← 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl p-8">
      {/* 헤더 */}
      <div className="mb-6">
        <Link to={ROUTES.PETS.LIST()} className="mb-4 inline-block text-blue-600 hover:underline">
          ← 목록으로 돌아가기
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">{pet.name}</h1>
      </div>

      {/* Pet 정보 */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6">
        <div className="space-y-4">
          <div>
            <p className="mb-1 block text-sm font-medium text-gray-500">ID</p>
            <p className="text-gray-900">{pet.id}</p>
          </div>

          {pet.status && (
            <div>
              <p className="mb-1 block text-sm font-medium text-gray-500">상태</p>
              <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                {pet.status}
              </span>
            </div>
          )}

          {pet.category && (
            <div>
              <p className="mb-1 block text-sm font-medium text-gray-500">카테고리</p>
              <p className="text-gray-900">
                {pet.category.name} {pet.category.id && `(ID: ${pet.category.id})`}
              </p>
            </div>
          )}

          {pet.photoUrls && pet.photoUrls.length > 0 && (
            <div>
              <p className="mb-2 block text-sm font-medium text-gray-500">사진</p>
              <div className="grid grid-cols-2 gap-2"></div>
            </div>
          )}

          {pet.tags && pet.tags.length > 0 && (
            <div>
              <p className="mb-2 block text-sm font-medium text-gray-500">태그</p>
              <div className="flex flex-wrap gap-2">
                {pet.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                  >
                    {tag.name} {tag.id && `(ID: ${tag.id})`}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="flex gap-3">
        <button
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
          className="rounded-md bg-red-600 px-6 py-2 font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300"
        >
          {deleteMutation.isPending ? '삭제 중...' : '삭제'}
        </button>
      </div>

      {/* 에러 메시지 */}
      {deleteMutation.isError && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-800">
            삭제 실패: {deleteMutation.error?.message || '알 수 없는 오류가 발생했습니다'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;
