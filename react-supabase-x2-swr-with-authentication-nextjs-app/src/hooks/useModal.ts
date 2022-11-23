import {modalState} from '@/stores/modalStore';
import {useRecoilValue, useSetRecoilState} from 'recoil';

const useModal = () => {
  const activeModal = useRecoilValue(modalState);

  const setActiveModal = useSetRecoilState(modalState);

  return {
    activeModal,
    setActiveModal,
  };
};

export default useModal;
