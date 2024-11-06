import { createSlice } from "@reduxjs/toolkit";

const applicantSlice = createSlice({
    name: "applicant",
    initialState: {
        applicants: [],
        singleApplicant : null,
        appliedJobs : [],
    },
    reducers: {
        setApplicants(state, action) {
            state.applicants = action.payload;
        },
        setSingleApplicant(state, action) {
            state.singleApplicant = action.payload;
        },
        setAppliedJobs(state, action) {
            state.appliedJobs = action.payload;
        }
    }

})

export const { setApplicants, setSingleApplicant,setAppliedJobs } = applicantSlice.actions;
export default applicantSlice.reducer;