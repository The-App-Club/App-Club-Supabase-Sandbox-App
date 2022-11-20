import {useSupabase} from '@/contexts/SupabaseContext';
import {Todo} from '@/domains/Todo';
import useSWR, {SWRResponse} from 'swr';

const useTodo = () => {
  const {supabaseClient, session} = useSupabase();

  const getTodos = async (): Promise<Todo[]> => {
    try {
      const {data, error} = await supabaseClient
        .from('todos')
        .select()
        .order('id', {ascending: true});
      if (error) {
        return Promise.reject(error);
      }
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const addTodo = async (formData: any, userId: string) => {
    try {
      const {data, error} = await supabaseClient.from('todos').insert([
        {
          name: formData.name,
          user_id: userId,
        },
      ]);
      if (error) {
        return Promise.reject(error);
      }
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateTodo = async (formData: any) => {
    try {
      const {data, error} = await supabaseClient
        .from('todos')
        .update({name: formData.name})
        .match({id: formData.id});
      if (error) {
        return Promise.reject(error);
      }
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteTodo = async (formData: any) => {
    try {
      const {data, error} = await supabaseClient.from('todos').delete().match({
        id: formData.id,
      });
      if (error) {
        return Promise.reject(error);
      }
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const {data, error, mutate} = useSWR(`todos`, async (url) => {
    try {
      return await getTodos();
    } catch (error) {
      return Promise.reject(error);
    }
  }) as SWRResponse<Todo[], Error>;

  return {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    mutate,
    data,
    error,
  };
};

export default useTodo;
