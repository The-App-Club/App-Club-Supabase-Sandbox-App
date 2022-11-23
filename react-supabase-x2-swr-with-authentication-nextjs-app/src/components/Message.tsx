/** @jsxImportSource @emotion/react */
import {css, ClassNamesArg} from '@emotion/react';
import {motion, AnimatePresence} from 'framer-motion';
import Spacer from '@/components/Spacer';
import {Typography, ColorPaletteProp} from '@mui/joy';

const motionConfig = {
  initial: {
    y: 20,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  hidden: {
    y: 20,
    opacity: 0,
  },
};

const Message = ({
  message,
  color,
  widthAuto = false,
}: {
  message: string | boolean;
  color: ColorPaletteProp;
  widthAuto?: boolean;
}) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={'initial'}
          animate={'animate'}
          exit={'hidden'}
          variants={motionConfig}
          transition={{duration: 0.4, ease: 'easeInOut'}}
          css={css`
            width: ${widthAuto ? 'auto' : '100%'};
          `}
        >
          <Typography
            color={color}
            component="p"
            className="!font-noto"
            css={css`
              width: ${widthAuto ? 'auto' : '100%'};
              height: 1rem;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-bottom: 0 !important;
            `}
          >
            {message}
          </Typography>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const renderMessage = ({
  successMessage,
  errorMessage,
  infoMessage,
  widthAuto = false,
}: {
  successMessage?: string | undefined | null | boolean;
  errorMessage?: string | undefined | null | boolean;
  infoMessage?: string | undefined | null | boolean;
  widthAuto?: boolean;
}) => {
  if (successMessage) {
    return (
      <Message
        message={successMessage}
        color={'success'}
        widthAuto={widthAuto}
      />
    );
  } else if (errorMessage) {
    return (
      <Message message={errorMessage} color={'danger'} widthAuto={widthAuto} />
    );
  } else if (infoMessage) {
    return (
      <Message message={infoMessage} color={'primary'} widthAuto={widthAuto} />
    );
  } else {
    return <Spacer height="1rem" />;
  }
};

export {Message, renderMessage};
