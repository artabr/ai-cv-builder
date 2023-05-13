import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cvDataMock } from '../../components/CvViewer/CvViewer.stub';
import { Template, WorkExperienceType } from '../../components/CvViewer/CvViewer.types';

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
    setCompanyName(state, action: PayloadAction<{ id: string | number; companyName: string }>) {
      state.workExperience = state?.workExperience?.map((company) => {
        if (company.id === action.payload.id) {
          company.companyName = action.payload.companyName;
        }
        return company;
      });
    },
    setPosition(state, action: PayloadAction<{ id: string | number; position: string }>) {
      state.workExperience = state?.workExperience?.map((company) => {
        if (company.id === action.payload.id) {
          company.position = action.payload.position;
        }
        return company;
      });
    },
    setCompanyDescription(state, action: PayloadAction<{ id: string | number; description: string }>) {
      state.workExperience = state?.workExperience?.map((company) => {
        if (company.id === action.payload.id) {
          company.description = action.payload.description;
        }
        return company;
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
  setCompanyName,
  setPosition,
  setCompanyDescription,
  setSkills,
  setHobbies,
  setTemplate
} = cvSlice.actions;
export default cvSlice.reducer;
