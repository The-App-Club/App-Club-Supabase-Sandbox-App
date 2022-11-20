/** @jsxImportSource @emotion/react */
import {cx} from '@emotion/css';
import {css} from '@emotion/react';
import type {NextPage} from 'next';
import {Button, Divider, FormControl, FormLabel, TextField} from '@mui/joy';
import {useForm} from 'react-hook-form';
import useTodo from '@/hooks/useTodo';
import {Todo} from '@/domains/Todo';
import {yupResolver} from '@hookform/resolvers/yup';
import {MdModeEdit} from 'react-icons/md';
import {MdDeleteOutline} from 'react-icons/md';
import Spacer from '@/components/Spacer';
import React, {useCallback, useMemo, useState} from 'react';
import UpdateTodoModal from '@/components/UpdateModal';
import DeleteTodoModal from '@/components/DeleteModal';
import useModal from '@/hooks/useModal';
import * as yup from 'yup';
import {useSupabase} from '@/contexts/SupabaseContext';
import {renderMessage} from '@/components/Message';

const schema = yup.object({
  name: yup.string().required('必須入力です'),
});

const Home: NextPage = () => {
  const {setActiveModal} = useModal();
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const {session} = useSupabase();

  const {user} = useMemo(() => {
    return {...session};
  }, [session]);
  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({resolver: yupResolver(schema)});

  const {data, error, mutate, addTodo} = useTodo();

  const onSubmit = useCallback(
    async (formData: any) => {
      if (!user) {
        return;
      }
      try {
        await addTodo(formData, user.id);
        mutate();
        reset();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    [user, addTodo, mutate, reset]
  );

  const handleEdit = (e: React.MouseEvent, item: Todo) => {
    setEditModalOpen(true);
    setActiveModal({
      activeItem: item,
    });
  };

  const handleDelete = (e: React.MouseEvent, item: Todo) => {
    setDeleteModalOpen(true);
    setActiveModal({
      activeItem: item,
    });
  };

  const handleRefresh = (e: React.MouseEvent<HTMLButtonElement>) => {
    mutate();
  };

  if (error) {
    console.log(`error`, error);
    return <p>something went wrong...</p>;
  }
  if (!data) {
    return <p>Loading...</p>;
  }

  const renderContent = ({data}: {data: Todo[]}) => {
    if (data.length === 0) {
      return <p>No Data</p>;
    }

    return (
      <ul className="flex flex-col justify-start gap-4">
        {data.map((item, index) => {
          return (
            <li
              key={item.id}
              tabIndex={0}
              className={cx(
                `min-[3rem] p-2 border-2 flex items-center justify-between`,
                `outline-none focus-visible:border-blue-500`
              )}
            >
              {item.name}
              <div className="flex items-center gap-2">
                <MdModeEdit
                  size={24}
                  tabIndex={0}
                  className={`cursor-pointer outline-none focus-visible:ring-2 focus-visible:border-blue-500`}
                  onClick={(e) => {
                    handleEdit(e, item);
                  }}
                />
                <MdDeleteOutline
                  size={24}
                  tabIndex={0}
                  className={`cursor-pointer outline-none focus-visible:ring-2 focus-visible:border-blue-500`}
                  onClick={(e) => {
                    handleDelete(e, item);
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <>
      <UpdateTodoModal open={editModalOpen} setOpen={setEditModalOpen} />
      <DeleteTodoModal open={deleteModalOpen} setOpen={setDeleteModalOpen} />
      <div className="max-w-md mx-auto w-full">
        <h1 className="text-3xl font-bold">Supabase Todo</h1>
        <Spacer />
        <Button type="button" onClick={handleRefresh}>
          Refresh
        </Button>
        <Spacer />
        <form onSubmit={handleSubmit(onSubmit)} className={'w-full'}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <TextField
              type={'text'}
              {...register('name')}
              color={errors['name'] ? 'danger' : 'neutral'}
            />
            <Spacer />
            {renderMessage({
              infoMessage:
                watch('name') &&
                !errors['name'] &&
                'ご入力ありがとうございます',
              errorMessage: errors['name'] && `${errors['name'].message}`,
            })}
            <Spacer />
            <Button
              type="submit"
              disabled={Object.keys(errors).length > 0 ? true : false}
              css={css`
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
              `}
            >
              Submit
            </Button>
          </FormControl>
        </form>
        <Spacer />
        <Divider />
        <Spacer />
        {renderContent({data})}
      </div>
    </>
  );
};

export default Home;
