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
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai';

import {useSupabase} from '@/contexts/SupabaseContext';
import toast from 'react-hot-toast';
import Loading from '@/components/Loading';
import {AnimatePresence, motion} from 'framer-motion';
import {useRouter} from 'next/router';
import Link from 'next/link';
YupPassword(yup);
const schema = yup.object({
  email: yup
    .string()
    .email('メールアドレスの形式が不正です')
    .required('必須入力です'),
  password: yup
    .string()
    .min(8, `少なくとも8文字以上です`)
    .max(20, `多くとも20文字以下です`)
    .minLowercase(1, `少なくとも小文字1文字以上を含めてください`)
    .minUppercase(1, `少なくとも大文字1文字以上を含めてください`)
    .minNumbers(1, `少なくとも数字1文字以上を含めてください`)
    .minSymbols(1, `少なくとも記号1文字以上を含めてください`)
    .required(`必須入力です`),
});

const SignIn: NextPage = () => {
  const router = useRouter();
  const {supabaseClient} = useSupabase();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    watch,
    register,
    handleSubmit,
    setError,
    formState: {errors, isValid},
  } = useForm({resolver: yupResolver(schema), mode: 'all'});

  const onSubmit = async (data: any) => {
    const {email, password} = data;
    try {
      setError('Thank you for nice submit!', {
        message: 'Alreadly Pushed!',
        type: 'disabled',
      });
      setLoading(true);
      // https://supabase.com/docs/reference/javascript/auth-signup
      const {data, error} = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }
    } catch (error: any) {
      toast.error(`something went wrong...`);
    } finally {
      setTimeout(() => {
        setLoading(false);
        toast.success('Successfully Login!');
        setTimeout(() => {
          router.push({
            pathname: '/',
          });
        }, 1000);
      }, 3000);
    }
  };

  const handleShowPassword = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPassword((prevState) => {
      return !prevState;
    });
  };

  return (
    <div className="max-w-xs mx-auto w-full">
      <h2 className="text-2xl">SignIn Page</h2>
      <Spacer />
      <form onSubmit={handleSubmit(onSubmit)} className={'w-full'}>
        <FormControl>
          <FormLabel
            css={css`
              font-weight: 400;
              font-size: 0.875rem; /* 14px */
              line-height: 1.25rem; /* 20px */
            `}
            className="!font-noto"
          >
            メールアドレス
          </FormLabel>
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
        <Spacer />

        <FormControl
          css={css`
            position: relative;
          `}
        >
          <FormLabel
            css={css`
              font-weight: 400;
              font-size: 0.875rem; /* 14px */
              line-height: 1.25rem; /* 20px */
            `}
            className="!font-noto"
          >
            パスワード
          </FormLabel>
          <TextField
            id={'new-password'}
            type={showPassword ? 'text' : 'password'}
            autoComplete={'new-password'}
            {...register('password')}
            color={errors['password'] ? 'danger' : 'neutral'}
          />
          {showPassword ? (
            <AiFillEye
              size={24}
              css={css`
                position: absolute;
                top: 2rem;
                right: 5px;
                :hover {
                  cursor: pointer;
                }
              `}
              onClick={handleShowPassword}
            />
          ) : (
            <AiFillEyeInvisible
              size={24}
              css={css`
                position: absolute;
                top: 2rem;
                right: 5px;
                :hover {
                  cursor: pointer;
                }
              `}
              onClick={handleShowPassword}
            />
          )}
          <Spacer />
          {renderMessage({
            infoMessage:
              watch('password') &&
              !errors['password'] &&
              'ご入力ありがとうございます',
            errorMessage: errors['password'] && `${errors['password'].message}`,
          })}
          <Spacer />
        </FormControl>
        <Box
          css={css`
            position: relative;
          `}
        >
          <Button
            type="submit"
            disabled={!isValid}
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
            `}
          >
            SignIn
          </Button>
          <AnimatePresence>
            {loading && (
              <Box
                component={motion.div}
                initial={{
                  opacity: 0,
                  x: 60,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: 60,
                }}
                transition={{
                  duration: 0.4,
                  ease: 'easeInOut',
                }}
                css={css`
                  position: absolute;
                  top: 5px;
                  right: 5px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                `}
              >
                <Loading height={30} width={30} />
              </Box>
            )}
          </AnimatePresence>
        </Box>
      </form>
      <Spacer />
      <Link href={'/signup'}>
        <a className="!font-inter">Not yet have a account?</a>
      </Link>
    </div>
  );
};

export default SignIn;
