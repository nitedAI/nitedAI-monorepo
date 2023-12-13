import { useState } from 'react';

// get env variable
const url = import.meta.env.VITE_HOST_API || 'http://localhost:5000';

interface GetAiChatResponseArgs {
  message: string;
  channel_id: string;
  invoker_id: string;
  participant_id: string;
}

export function useGetAiChatResponse() {
  const [data, setData] = useState<object | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  function getAiChatResponse(args: GetAiChatResponseArgs) {
    setLoading(true);
    fetch(`${url}/agent/converse`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }

  return { data, loading, getAiChatResponse };
}
