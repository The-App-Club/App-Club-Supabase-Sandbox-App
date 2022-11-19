import {Test} from '@/domains/Test';
import {atom} from 'recoil';

type ModalType = {
  activeItem: Test | null;
};

const modalState = atom<ModalType>({
  key: 'modal',
  default: {
    activeItem: null,
  },
});

export {modalState};
