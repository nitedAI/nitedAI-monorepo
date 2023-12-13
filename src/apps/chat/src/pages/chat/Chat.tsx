import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useRef, useMemo, useState, useEffect } from 'react';
import { fToNow, stringAvatar, fetchSupabaseFunction } from '@utils';
import { useGetAuthUser, useGetAllAgents, useGetMessageByChannelId, useGetUsersFromChannelId, useGetAiChatResponse } from '@hooks';

import SendIcon from '@mui/icons-material/Send';
import { Box, Grid, Button, Avatar, Typography } from '@mui/material';

import ChatInput from './ChatInput';

interface MessageTypes {
  id: string;
  content: string;
  created_at: string;
  user_name: string;
  is_bot: string;
}

interface MessageProps {
  message: MessageTypes;
}

interface Participant {
  id: string;
  display: string;
}

export default function Chat() {
  const [allParticipants, setAllParticipants] = useState<Participant[]>([]);
  const users = useGetUsersFromChannelId();
  const allAgents = useGetAllAgents();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messages: MessageTypes[] = useGetMessageByChannelId();
  const reversedMessages = useMemo(() => [...messages].reverse(), [messages]);
  const user_id = useGetAuthUser();
  const { chat_id } = useParams();
  const { data, getAiChatResponse } = useGetAiChatResponse();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (users.length > 0 && allAgents.length > 0) {
      setAllParticipants([...users, ...allAgents]);
    }
  }, [users, allAgents]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim() !== '') {
      fetchSupabaseFunction('post_chat_message', {
        user_id,
        channel_id: chat_id,
        message_content: input,
      });
      setInput('');
      handleMentions();
    }
  };


  const handleMentions = () => {
    const mentions = extractMentions(input);
    console.log(mentions);
    mentions.forEach((mention) => {
      if (isUserMention(mention)) {
        // Trigger notification for the mentioned user
        notifyUser(mention);
      } else if (isAgentMention(mention)) {
        // Send request to AI agent
        requestAIResponse(mention);
      }
    });

    // Clear the input or handle the message submission as needed
    setInput('');
  };

    const extractMentions = (text: string): string[] => text
        .split('@')
        .slice(1)
        .map((potentialMention) => findLongestMatch(potentialMention.trim()))
        .filter((match) => match !== null)
        .map((match) => `@${match}`);

    const findLongestMatch = (text: string): string | null => allParticipants.reduce((longestMatch, participant) => text.startsWith(participant.display) && participant.display.length > (longestMatch?.length || 0) ? participant.display : longestMatch, null);



  const isUserMention = (mention: string): boolean => {
    const mentionWithoutAt = mention.substring(1); // Remove leading '@'
    return users.some((participant) => participant.display === mentionWithoutAt);
  };

  const isAgentMention = (mention: string): boolean => {
    const mentionWithoutAt = mention.substring(1);
    // Assuming you have a way to identify AI agents' full names
    return allAgents.some((agent) => agent.display === mentionWithoutAt);
  };

  const notifyUser = (mention: string) => {
    // Implement logic to notify the user
    console.log(`Notify user: ${mention}`);
  };

  const requestAIResponse = (mention: string) => {
    // Implement logic to send a request to the AI agent
    console.log(`Request AI agent response for: ${mention}`);
    const agent = allAgents.find((agent) => agent.display === mention.substring(1));
    console.log(agent);
    getAiChatResponse({
      message: input,
      channel_id: chat_id,
      invoker_id: user_id,
      participant_id: agent?.id,
    });
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
          {reversedMessages?.map((message) => <Message key={message.id} message={message} />)}
          <div ref={messagesEndRef} />
        </Box>
        <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <ChatInput
                inputValue={input}
                setInputValue={setInput}
                allParticipants={allParticipants}
              />
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
