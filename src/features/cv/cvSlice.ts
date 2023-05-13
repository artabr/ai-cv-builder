import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cvDataMock } from '../../components/CvViewer/CvViewer.stub';

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
    setSkills(state, action: PayloadAction<string[]>) {
      state.skills = action.payload;
    },
    setHobbies(state, action: PayloadAction<string[]>) {
      state.hobbies = action.payload;
    }
  }
});

export const { setFullName, setJob, setAddress, setSkills, setHobbies } = cvSlice.actions;
export default cvSlice.reducer;
