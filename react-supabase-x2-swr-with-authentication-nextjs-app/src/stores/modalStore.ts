import {Todo} from '@/domains/Todo';
import {atom} from 'recoil';

type ModalType = {
  activeItem: Todo | null;
};

const modalState = atom<ModalType>({
  key: 'modal',
  default: {
    activeItem: null,
  },
});

export {modalState};
