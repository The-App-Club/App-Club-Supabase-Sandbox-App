/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import {Box} from '@mui/joy';
import Spacer from '@/components/Spacer';
import useModal from '@/hooks/useModal';
import {useCallback, useMemo} from 'react';
import useTodo from '@/hooks/useTodo';
import toast from 'react-hot-toast';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DeleteModal = ({open, setOpen}: Props) => {
  const {deleteTodo, mutate} = useTodo();
  const {activeModal, setActiveModal} = useModal();

  const {activeItem} = useMemo(() => {
    return {...activeModal};
  }, [activeModal]);

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(false);
    setActiveModal((prevState) => {
      return {
        ...prevState,
        activeItem: null,
      };
    });
  };

  const handleDelete = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!activeItem) {
        return;
      }
      try {
        const response = await deleteTodo(activeItem);
        setOpen(false);
        setActiveModal((prevState) => {
          return {
            ...prevState,
            activeItem: null,
          };
        });
        mutate();
        console.log(response);
        toast.success('Successfully deleted!');
      } catch (error: any) {
        toast.error('Something went wrong...');
        console.log(error);
      }
    },
    [activeItem, deleteTodo, setActiveModal, setOpen, mutate]
  );

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog
        aria-labelledby="basic-modal-dialog-title"
        aria-describedby="basic-modal-dialog-description"
        css={css`
          max-width: 500px;
          width: 100%;
          padding: 1rem;
          box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
            0 8px 10px -6px rgb(0 0 0 / 0.1); // shadow-xl
          border-radius: 0.5rem; // rounded-lg
        `}
      >
        <Typography
          id="basic-modal-dialog-title"
          component="h2"
          css={css`
            font-size: 1.25rem; /* 20px */
            line-height: 1.75rem; /* 28px */
          `}
        >
          Delete
        </Typography>
        <Typography
          component="p"
          css={css`
            font-size: 1rem; /* 16px */
            line-height: 1.5rem; /* 24px */
          `}
        >
          {`"${activeItem?.name}" Really Delete?`}
        </Typography>
        <Spacer />
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <Box
            css={css`
              display: flex;
              align-items: center;
              gap: 0.5rem;
              width: 100%;
            `}
          >
            <Button
              type="button"
              color="neutral"
              onClick={handleCancel}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              type="button"
              color="danger"
              onClick={handleDelete}
              fullWidth
            >
              Delete
            </Button>
          </Box>
        </form>
      </ModalDialog>
    </Modal>
  );
};

export default DeleteModal;
