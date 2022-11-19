import {useSupabase} from '@/contexts/SupabaseContext';
import {Test} from '@/domains/Test';
import useSWR, {SWRResponse} from 'swr';

const useTodo = () => {
  const {supabaseClient} = useSupabase();

  const getTodos = async (): Promise<Test[]> => {
    try {
      const {data, error} = await supabaseClient
        .from('test')
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

  const addTodo = async (formData: any) => {
    try {
      const {data, error} = await supabaseClient.from('test').insert([
        {
          name: formData.name,
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
        .from('test')
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
      const {data, error} = await supabaseClient.from('test').delete().match({
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

  const {data, error, mutate} = useSWR(`test`, async (url) => {
    try {
      return await getTodos();
    } catch (error) {
      return Promise.reject(error);
    }
  }) as SWRResponse<Test[], Error>;

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
