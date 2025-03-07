import { useState } from 'react';
import { useNavigate } from 'react-router';
import NextIcon from '@icons/NextIcon';
import { useInvitationStore } from '@store/useInvitaionStore';
import CloseIcon from '@icons/CloseIcon';

interface ModalProps {
  onClose: () => void;
}

const InputTitleModal = ({ onClose }: ModalProps) => {
  const [titleInput, setTitleInput] = useState('');
  const { setTitle } = useInvitationStore();
  const navigate = useNavigate();

  const maxLength = 8;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (input.length <= maxLength) {
      setTitleInput(input);
    }
  };

  const handleConfirm = () => {
    setTitle(titleInput); // 입력한 제목을 상태에 저장
    navigate('/create'); // 페이지 이동
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* 모달 내용 */}
      <div className="relative bg-white rounded-lg shadow-lg w-80">
        {/* 닫기 버튼 */}
        <div className="flex justify-end items-center py-2 px-4">
          <button
            className="text-black hover:text-gray-400"
            onClick={onClose}
            aria-label="Close modal"
          >
            <CloseIcon className="w-5" />
          </button>
        </div>

        <div className="p-1 text-center text-base">
          <p>청첩장 제목을 정해주세요</p>
        </div>

        <div className="flex w-full justify-center gap-2 pt-5 pb-12">
          <input
            type="text"
            placeholder="ex. 청첩장1, 친구용, 혼주용"
            className="text-center focus:outline-none focus:ring-0 focus:border-rose-300 focus:placeholder-transparent border-0 border-b border-gray-500 text-xs placeholder:text-gray-300 ml-4"
            value={titleInput}
            onChange={handleTitleChange}
          />
          {/* 입력 가능한 문자 표시 */}
          <div className="text-[8px] text-gray-400 flex justify-center items-center">
            {titleInput.length} / {maxLength}
          </div>
          <button
            onClick={handleConfirm}
            disabled={titleInput.length === 0}
            className={`rounded-full w-8 h-8 flex justify-center items-center ${
              titleInput.length === 0
                ? 'bg-black bg-opacity-10 cursor-not-allowed'
                : 'bg-rose-300 cursor-pointer hover:bg-rose-200'
            }`}
          >
            <NextIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputTitleModal;
