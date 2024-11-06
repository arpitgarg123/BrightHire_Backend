import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name : "company",
    initialState : {
        companies : [],
        singleCompany : null,
        searchCompanyBytext : "",
    },
    reducers : {
        setCompanies(state, action) {
            state.companies = action.payload;
        },
        setSingleCompany(state, action) {
            state.singleCompany = action.payload;
        },
        setSearchCompanyByText(state, action) {
            state.searchCompanyBytext = action.payload;
        },
    }
})

export const { setCompanies, setSingleCompany, setSearchCompanyByText } = companySlice.actions;
export default companySlice.reducer;