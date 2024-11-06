import { createSlice } from "@reduxjs/toolkit";


const jobSlice = createSlice({
    name: "job",
    initialState: {
        jobs: [],
        AllAdminJobs : [],
        singleJob : null,
        searchJobBytext : "",
        searchedQuery : "",
    },
    reducers: {
        setJobs(state, action) {
            state.jobs = action.payload;
        },
        setAllAdminJobs(state, action) {
            state.AllAdminJobs = action.payload;
        },
        setSingleJob(state, action) {
            state.singleJob = action.payload;
        },
        setSearchJobByText(state, action){
            state.searchJobBytext = action.payload;
        },
        setSearchedQuery(state, action){
            state.searchedQuery = action.payload;
        }

    }
})

export const { setJobs,setSingleJob, setAllAdminJobs,setSearchJobByText,setSearchedQuery } = jobSlice.actions;
export default jobSlice.reducer;
