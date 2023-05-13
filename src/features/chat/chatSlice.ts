import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConversationHistory } from '../../api/api';

export type ChatDataStore = {
  introResultFromAI: string;
  workResultFromAI: string;
  educationResultFromAI: string;
  skillsResultFromAI: string;
  introConversationHistory: ConversationHistory[];
  workConversationHistory: ConversationHistory[];
  educationConversationHistory: ConversationHistory[];
  skillsConversationHistory: ConversationHistory[];
};

const initialChatData: ChatDataStore = {
  introResultFromAI: '',
  workResultFromAI: '',
  educationResultFromAI: '',
  skillsResultFromAI: '',
  introConversationHistory: [],
  workConversationHistory: [],
  educationConversationHistory: [],
  skillsConversationHistory: []
};

const cvSlice = createSlice({
  name: 'chat',
  initialState: initialChatData,
  reducers: {
    setIntroResultFromAI(state, action: PayloadAction<string>) {
      state.introResultFromAI = action.payload;
    },
    setWorkResultFromAI(state, action: PayloadAction<string>) {
      state.workResultFromAI = action.payload;
    },
    setEducationResultFromAI(state, action: PayloadAction<string>) {
      state.educationResultFromAI = action.payload;
    },
    setSkillsResultFromAI(state, action: PayloadAction<string>) {
      state.skillsResultFromAI = action.payload;
    },
    setIntroConversationHistory(state, action: PayloadAction<ConversationHistory>) {
      state.introConversationHistory = [...state.introConversationHistory, action.payload];
    },
    setWorkConversationHistory(state, action: PayloadAction<ConversationHistory>) {
      state.workConversationHistory = [...state.workConversationHistory, action.payload];
    },
    setEducationConversationHistory(state, action: PayloadAction<ConversationHistory>) {
      state.educationConversationHistory = [...state.educationConversationHistory, action.payload];
    },
    setSkillsConversationHistory(state, action: PayloadAction<ConversationHistory>) {
      state.skillsConversationHistory = [...state.skillsConversationHistory, action.payload];
    }
  }
});

export const {
  setIntroResultFromAI,
  setWorkResultFromAI,
  setEducationResultFromAI,
  setSkillsResultFromAI,
  setIntroConversationHistory,
  setWorkConversationHistory,
  setEducationConversationHistory,
  setSkillsConversationHistory
} = cvSlice.actions;
export default cvSlice.reducer;
