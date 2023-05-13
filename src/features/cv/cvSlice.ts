import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cvDataMock } from '../../components/CvViewer/CvViewer.stub';
import { Template } from '../../components/CvViewer/CvViewer.types';

const cvSlice = createSlice({
  name: 'cv',
  initialState: cvDataMock,
  reducers: {
    setFullName(state, action: PayloadAction<string>) {
      // You can do it like this with RTK
      state.personalInfo.fullName = action.payload;
    },
    setJob(state, action: PayloadAction<string>) {
      state.personalInfo.jobTitle = action.payload;
    },
    setAddress(state, action: PayloadAction<string>) {
      state.personalInfo.address = action.payload;
    },
    setIntroResultFromAI(state, action: PayloadAction<string>) {
      state.personalInfo.description = action.payload;
    },
    setSkills(state, action: PayloadAction<string[]>) {
      state.skills = action.payload;
    },
    setHobbies(state, action: PayloadAction<string[]>) {
      state.hobbies = action.payload;
    },
    setTemplate(state, action: PayloadAction<Template>) {
      state.template = action.payload;
    }
  }
});

export const { setFullName, setJob, setAddress, setIntroResultFromAI, setSkills, setHobbies, setTemplate } =
  cvSlice.actions;
export default cvSlice.reducer;
