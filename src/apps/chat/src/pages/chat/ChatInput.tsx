import React, { useRef, useState, useEffect } from 'react';

import { List, Popover, TextField, ListItemText, ListItemButton } from '@mui/material';

interface Participant {
  id: string;
  name: string;
}

// Assume this function fetches participants and AI agents
const getChatParticipants = async (): Promise<Participant[]> =>
  // Replace with actual logic to fetch participants
   [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'AI Agent' },
  ]
;

interface ChatInputProps {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  allParticipants: Participant[];
  setAllParticipants: React.Dispatch<React.SetStateAction<Participant[]>>;
}

const ChatInput = ({ inputValue, setInputValue, allParticipants, setAllParticipants }: ChatInputProps) => {
  const [filteredParticipants, setFilteredParticipants] = useState<Participant[]>([]);
  const [mentionedUsers, setMentionedUsers] = useState<string[]>([]);
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const anchorElRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputRows, setInputRows] = useState<number>(1);
  const maxRows = 5;

  useEffect(() => {
    getChatParticipants().then(setAllParticipants);
  }, []);

  useEffect(() => {
    const atIndex = inputValue.lastIndexOf('@');
    if (atIndex !== -1) {
      const search = inputValue.substring(atIndex + 1).toLowerCase();
      const matchedParticipants = allParticipants.filter((participant) => participant.name.toLowerCase().includes(search));
      setFilteredParticipants(matchedParticipants);
      setPopoverOpen(matchedParticipants.length > 0);
      setHighlightedIndex(0); // Reset highlighted index
    } else {
      setPopoverOpen(false);
    }
  }, [inputValue, allParticipants]);

  useEffect(() => {
    // Update mentioned users based on current input value
    const currentMentions = allParticipants.filter((participant) => inputValue.includes(`@${participant.name}`)).map((participant) => participant.id);
    setMentionedUsers(currentMentions);
  }, [inputValue, allParticipants, mentionedUsers]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);

    const lineBreaks = (event.target.value.match(/\n/g) || []).length;
    setInputRows(Math.min(lineBreaks + 1, maxRows));
  };

  const handleSelectParticipant = (participant: Participant) => {
    const atIndex = inputValue.lastIndexOf('@');
    const newValue = `${inputValue.substring(0, atIndex)}@${participant.name} `;
    setInputValue(newValue);
    setMentionedUsers((prev) => [...prev, participant.id]);
    setPopoverOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (popoverOpen) {
      let newIndex = highlightedIndex;
      if (event.key === 'ArrowDown') {
        do {
          newIndex = (newIndex + 1) % filteredParticipants.length;
        } while (mentionedUsers.includes(filteredParticipants[newIndex].id) && newIndex !== highlightedIndex);
        setHighlightedIndex(newIndex);
        event.preventDefault();
      } else if (event.key === 'ArrowUp') {
        do {
          newIndex = (newIndex - 1 + filteredParticipants.length) % filteredParticipants.length;
        } while (mentionedUsers.includes(filteredParticipants[newIndex].id) && newIndex !== highlightedIndex);
        setHighlightedIndex(newIndex);
        event.preventDefault();
      } else if (event.key === 'Enter' || event.key === ' ') {
        const participant = filteredParticipants[highlightedIndex];
        if (participant && !mentionedUsers.includes(participant.id)) {
          handleSelectParticipant(participant);
          event.preventDefault();
        }
      } else if (event.key === 'Escape') {
        setPopoverOpen(false);
      }
    }
  };

  const open = popoverOpen && inputValue.includes('@');
  const id = open ? 'simple-popover' : undefined;

  return (
    <div ref={anchorElRef} className="chat-input-container">
      <TextField
        label="Type your message"
        variant="outlined"
        fullWidth
        multiline
        rows={inputRows}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        inputRef={inputRef}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorElRef.current}
        onClose={() => setPopoverOpen(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        disableAutoFocus
        disableEnforceFocus
      >
        <List>
          {filteredParticipants.map((participant, index) => (
            <ListItemButton
              key={participant.id}
              onClick={() => handleSelectParticipant(participant)}
              selected={index === highlightedIndex}
              disabled={mentionedUsers.includes(participant.id)}
            >
              <ListItemText primary={participant.name} />
            </ListItemButton>
          ))}
        </List>
      </Popover>
    </div>
  );
};

export default ChatInput;
