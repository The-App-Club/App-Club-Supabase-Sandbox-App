/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import Button from '@mui/joy/Button';
import TextField from '@mui/joy/TextField';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import {Box} from '@mui/joy';
import Spacer from '@/components/Spacer';
import useModal from '@/hooks/useModal';
import {useCallback, useEffect, useMemo} from 'react';
import useTodo from '@/hooks/useTodo';
import {useForm} from 'react-hook-form';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const UpdateModal = ({open, setOpen}: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm();

  const {updateTodo, mutate} = useTodo();

  const {activeModal} = useModal();

  const {activeItem} = useMemo(() => {
    return {...activeModal};
  }, [activeModal]);

  const onSubmit = useCallback(
    async (data: any) => {
      if (!activeItem) {
        return;
      }
      try {
        const willPostedData = {...activeItem, ...data};
        const response = await updateTodo(willPostedData);
        setOpen(false);
        mutate();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    [updateTodo, activeItem, setOpen, mutate]
  );

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(false);
  };

  useEffect(() => {
    if (!activeItem) {
      return;
    }
    setValue('name', activeItem.name);
  }, [activeItem, setValue]);

  if (!activeItem) {
    return null;
  }

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
          Update
        </Typography>
        <Spacer />
        <form onSubmit={handleSubmit(onSubmit)} className={'w-full'}>
          <TextField
            label="Name"
            autoFocus
            required
            defaultValue={activeItem.name}
            {...register('name')}
          />
          <Spacer />
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
            <Button type="submit" fullWidth>
              Submit
            </Button>
          </Box>
        </form>
      </ModalDialog>
    </Modal>
  );
};

export default UpdateModal;
