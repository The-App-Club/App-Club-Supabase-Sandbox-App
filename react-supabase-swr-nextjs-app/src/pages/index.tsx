import type {NextPage} from 'next';
import {useSupabase} from '@/contexts/SupabaseContext';
import useSWR, {SWRResponse} from 'swr';
import {Button, TextField} from '@mui/joy';
import {useForm} from 'react-hook-form';

type Test = {
  id: string;
  name: string;
  created_at: Date;
};

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();

  const {supabaseClient} = useSupabase();

  const {data, error, mutate} = useSWR(`test`, async (url) => {
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
      return error;
    }
  }) as SWRResponse<Test[], Error>;

  const onSubmit = async (formData: any) => {
    const {error} = await supabaseClient.from('test').insert([
      {
        name: formData.name,
      },
    ]);
    if (error) {
      alert('Something went worng...');
      return;
    }
    mutate();
  };

  if (error) {
    console.log(`error`, error);
    return <p>something went wrong...</p>;
  }
  if (!data) {
    return <p>Loading...</p>;
  }

  console.log(data);

  return (
    <div className="max-w-xl mx-auto w-full">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={'w-full'}>
        <TextField {...register('name')} />
        <Button type="submit">Submit</Button>
      </form>
      <ul>
        {data.map((item, index) => {
          return <li key={index}>{item.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default Home;
