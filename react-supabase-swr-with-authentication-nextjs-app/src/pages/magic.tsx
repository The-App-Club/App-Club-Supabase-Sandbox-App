/** @jsxImportSource @emotion/react */
import type {NextPage} from 'next';
import {css} from '@emotion/react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import {yupResolver} from '@hookform/resolvers/yup';
import {Box, Button, FormControl, FormLabel, TextField} from '@mui/joy';
import Spacer from '@/components/Spacer';
import {renderMessage} from '@/components/Message';
import {useState} from 'react';
import {useSupabase} from '@/contexts/SupabaseContext';

YupPassword(yup);
const schema = yup.object({
  email: yup
    .string()
    .email('メールアドレスの形式が不正です')
    .required('必須入力です'),
  // password: yup
  //   .string()
  //   .min(8, `少なくとも8文字以上です`)
  //   .max(20, `多くとも20文字以下です`)
  //   .minLowercase(1, `少なくとも小文字1文字以上を含めてください`)
  //   .minUppercase(1, `少なくとも大文字1文字以上を含めてください`)
  //   .minNumbers(1, `少なくとも数字1文字以上を含めてください`)
  //   .minSymbols(1, `少なくとも記号1文字以上を含めてください`)
  //   .required(`必須入力です`),
});

const Magic: NextPage = () => {
  const {supabaseClient} = useSupabase();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    watch,
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({resolver: yupResolver(schema), mode: 'all'});

  const onSubmit = async (data: any) => {
    const {email} = data;
    try {
      setLoading(true);
      const {user, session, error} = await supabaseClient.auth.signIn(
        {email},
        {
          redirectTo: 'http://localhost:3000',
        }
      );
      console.log(`user,session,error`, user, session, error);
      alert('Check your email for the login link!');
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xs mx-auto w-full">
      <h2 className="text-2xl">SignUp Page</h2>
      <Spacer />
      <form onSubmit={handleSubmit(onSubmit)} className={'w-full'}>
        <FormControl>
          <FormLabel>メールアドレス</FormLabel>
          <TextField
            type={'email'}
            {...register('email')}
            color={errors['email'] ? 'danger' : 'neutral'}
          />
          <Spacer />
          {renderMessage({
            infoMessage:
              watch('email') &&
              !errors['email'] &&
              'ご入力ありがとうございます',
            errorMessage: errors['email'] && `${errors['email'].message}`,
          })}
          <Spacer />
        </FormControl>
        <Box>
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
            Send magic link
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Magic;
