import type {NextPage} from 'next';
import {Button, Divider, TextField} from '@mui/joy';
import {useForm} from 'react-hook-form';
import useTodo from '@/hooks/useTodo';
import {Test} from '@/domains/Test';
import {MdModeEdit} from 'react-icons/md';
import {MdDeleteOutline} from 'react-icons/md';
import Spacer from '@/components/Spacer';
import React, {useState} from 'react';
import UpdateTodoModal from '@/components/UpdateModal';
import DeleteTodoModal from '@/components/DeleteModal';
import useModal from '@/hooks/useModal';

const Home: NextPage = () => {
  const {setActiveModal} = useModal();
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const {data, error, mutate, addTodo} = useTodo();

  const onSubmit = async (formData: any) => {
    try {
      await addTodo(formData);
      mutate();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleEdit = (e: React.MouseEvent, item: Test) => {
    setEditModalOpen(true);
    setActiveModal({
      activeItem: item,
    });
  };

  const handleDelete = (e: React.MouseEvent, item: Test) => {
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

  const renderContent = ({data}: {data: Test[]}) => {
    if (data.length === 0) {
      return <p>No Data</p>;
    }

    return (
      <ul className="flex flex-col justify-start gap-4">
        {data.map((item, index) => {
          return (
            <li
              key={item.id}
              className={
                'min-[3rem] p-2 border-2 flex items-center justify-between'
              }
            >
              {item.name}
              <div className="flex items-center gap-2">
                <MdModeEdit
                  size={24}
                  className={`cursor-pointer`}
                  onClick={(e) => {
                    handleEdit(e, item);
                  }}
                />
                <MdDeleteOutline
                  size={24}
                  className={`cursor-pointer`}
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
        <h1 className="text-3xl font-bold underline">Supabase Test</h1>
        <Spacer />
        <Button type="button" onClick={handleRefresh}>
          Refresh
        </Button>
        <Spacer />
        <form onSubmit={handleSubmit(onSubmit)} className={'w-full'}>
          <TextField {...register('name')} required />
          <Spacer />
          <Button type="submit">Submit</Button>
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
