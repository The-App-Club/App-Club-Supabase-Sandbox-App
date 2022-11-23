/** @jsxImportSource @emotion/react */
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Divider,
} from '@chakra-ui/react';
import {HamburgerIcon} from '@chakra-ui/icons';
import {useSupabase} from '@/contexts/SupabaseContext';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {Session} from '@supabase/supabase-js';
// import Image from 'next/image';
import {css} from '@emotion/react';
import {cx} from '@emotion/css';
const Header = () => {
  const router = useRouter();
  const {supabaseClient, session} = useSupabase();
  const {isOpen, onOpen, onClose} = useDisclosure();

  const handleLogout = async () => {
    const {error} = await supabaseClient.auth.signOut();
    if (error) {
      console.log(error);
    }
  };

  const renderMenu = ({session}: {session: Session | null | undefined}) => {
    if (session) {
      return (
        <Menu>
          <MenuButton
            as={Button}
            rounded={'full'}
            variant={''}
            cursor={'pointer'}
            minW={0}
          >
            <Avatar size={'sm'} name={session.user?.email} />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => {}}>Setting</MenuItem>
            <MenuItem onClick={() => {}}>Topics</MenuItem>
            <MenuDivider />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      );
    }

    return <Link href="/signup">signup</Link>;
  };

  return (
    <Box className="bg-gradient-to-r from-slate-600/90 to-zinc-300" px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Menu>
          <MenuButton
            tabIndex={0}
            as={Button}
            onClick={isOpen ? onClose : onOpen}
            aria-label={'Open Menu'}
            display={{md: 'none'}}
            className={`cursor-pointer outline-none focus-visible:ring-2 focus-visible:border-blue-500`}
            css={css`
              &,
              :hover,
              :active {
                background: transparent !important;
              }
            `}
          >
            <HamburgerIcon width={'6'} height={'6'} />
          </MenuButton>
          <MenuList>
            <Link href={'/magic'}>
              <a
                tabIndex={0}
                className={cx(
                  `block p-2 hover:bg-gray-100`,
                  `cursor-pointer outline-none focus-visible:ring-2 focus-visible:border-blue-500`
                )}
              >
                Magic1
              </a>
            </Link>
            <Link href={'/magic'}>
              <a
                tabIndex={0}
                className={cx(
                  `block p-2 hover:bg-gray-100`,
                  `cursor-pointer outline-none focus-visible:ring-2 focus-visible:border-blue-500`
                )}
              >
                Magic2
              </a>
            </Link>
            <Link href={'/magic'}>
              <a
                tabIndex={0}
                className={cx(
                  `block p-2 hover:bg-gray-100`,
                  `cursor-pointer outline-none focus-visible:ring-2 focus-visible:border-blue-500`
                )}
              >
                Magic3
              </a>
            </Link>
          </MenuList>
        </Menu>
        <HStack spacing={8} alignItems={'center'}>
          <picture
            onClick={(e) => {
              router.push({
                pathname: '/',
              });
            }}
          >
            <source srcSet={`/assets/logo.png`} type={`image/png`} />
            <img src={'/assets/logo.png'} alt={'logo'} width={60} height={60} />
          </picture>
          {/* <Image
            src={`/assets/logo.png`}
            alt={'logo'}
            width={60}
            height={60}
            css={css`
              :hover {
                cursor: pointer;
              }
            `}
            onClick={(e) => {
              router.push({
                pathname: '/',
              });
            }}
          /> */}
          <HStack as={'nav'} spacing={4} display={{base: 'none', md: 'flex'}}>
            <Link href={'/signup'}>
              <a
                tabIndex={0}
                className={cx(
                  `block p-2 text-gray-200`,
                  `cursor-pointer outline-none focus-visible:ring-2 focus-visible:border-blue-500`
                )}
              >
                Magic1
              </a>
            </Link>
            <Link href={'/signup'}>
              <a
                tabIndex={0}
                className={cx(
                  `block p-2 text-gray-200`,
                  `cursor-pointer outline-none focus-visible:ring-2 focus-visible:border-blue-500`
                )}
              >
                Magic1
              </a>
            </Link>
            <Link href={'/signup'}>
              <a
                tabIndex={0}
                className={cx(
                  `block p-2 text-gray-200`,
                  `cursor-pointer outline-none focus-visible:ring-2 focus-visible:border-blue-500`
                )}
              >
                Magic1
              </a>
            </Link>
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>{renderMenu({session})}</Flex>
      </Flex>
    </Box>
  );
};

export default Header;
