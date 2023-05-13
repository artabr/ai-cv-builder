import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cvDataMock } from '../../components/CvViewer/CvViewer.stub';
import { EducationType, Template, WorkExperienceType } from '../../components/CvViewer/CvViewer.types';

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
    setDescription(state, action: PayloadAction<string>) {
      state.personalInfo.description = action.payload;
    },
    addWorkingExperience(state, action: PayloadAction<WorkExperienceType>) {
      state.workExperience = [...state.workExperience, action.payload];
    },
    updateWorkExperience(state, action: PayloadAction<WorkExperienceType>) {
      state.workExperience = state?.workExperience?.map((company) => {
        return company.id === action.payload.id ? { ...company, ...action.payload } : company;
      });
    },
    addEducation(state, action: PayloadAction<EducationType>) {
      state.education = [...state.education, action.payload];
    },
    updateEducation(state, action: PayloadAction<EducationType>) {
      state.education = state?.education?.map((institution) => {
        return institution.id === action.payload.id ? { ...institution, ...action.payload } : institution;
      });
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

export const {
  setFullName,
  setJob,
  setAddress,
  setDescription,
  addWorkingExperience,
  updateWorkExperience,
  addEducation,
  updateEducation,
  setSkills,
  setHobbies,
  setTemplate
} = cvSlice.actions;
export default cvSlice.reducer;
