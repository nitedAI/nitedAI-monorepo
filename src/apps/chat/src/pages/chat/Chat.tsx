import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { fToNow, stringAvatar } from '@utils';
import { useGetMessageByChannelId } from '@hooks/useGetMessageByChannelId';

import SendIcon from '@mui/icons-material/Send';
import { Box, Grid, Button, Avatar, TextField, Typography } from '@mui/material';

interface MessageTypes {
  id: string;
  content: string;
  created_at: string;
  user_name: string;
  is_bot: string;
};

interface MessageProps {
  message: MessageTypes;
}

export default function Chat() {
  const [input, setInput] = useState('');
  const messages: MessageTypes[] = useGetMessageByChannelId();

  const handleSend = () => {
    if (input.trim() !== '') {
      console.log(input);
      setInput('');
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: One</title>
      </Helmet>
      <Box
        sx={{
          height: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </Box>
        <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <TextField size="small" fullWidth placeholder="Type a message" variant="outlined" value={input} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={2}>
              <Button fullWidth color="primary" variant="contained" endIcon={<SendIcon />} onClick={handleSend}>
                Send
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

function Message({ message }: MessageProps) {
  const isBot = message?.is_bot === 'bot';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: isBot ? 'rgba(0, 0, 0, .2)' : 'transparent',
        }}
      >
        <Avatar {...stringAvatar(message.user_name)} />
        <Box
          sx={{
            p: 2,
            width: 'calc(100vw - 420px)',
          }}
        >
          <Typography variant="subtitle2">
            {message.user_name} <small>{fToNow(message.created_at)}</small>
          </Typography>
          <Typography variant="body1">{message.content}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
