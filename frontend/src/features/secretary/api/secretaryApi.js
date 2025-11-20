import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const secretaryApi = createApi({
  reducerPath: "secretaryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/api/secretary`,
    credentials: "include",
  }),
  tagTypes: ["Clients", "Cases", "Archive", "ActivityLogs", "DashboardStats"],
  endpoints: (builder) => ({
    // ==================== CLIENT ENDPOINTS ====================
    createClient: builder.mutation({
      query: (clientData) => ({
        url: "/clients",
        method: "POST",
        body: clientData,
      }),
      invalidatesTags: ["Clients"],
    }),
    getAllClients: builder.query({
      query: () => ({
        url: "/clients",
        method: "GET",
      }),
      providesTags: ["Clients"],
      transformResponse: (response) => ({
        clients: response.data || [],
        totalPages: response.totalPages || 1,
        currentPage: response.currentPage || 1,
      }),
    }),
    getClientById: builder.query({
      query: (id) => ({
        url: `/clients/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Clients", id }],
    }),
    updateClient: builder.mutation({
      query: ({ id, data }) => ({
        url: `/clients/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Clients", id },
        "Clients",
      ],
    }),
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `/clients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Clients"],
    }),

    // ==================== CASE ENDPOINTS ====================
    getAllCases: builder.query({
      query: ({ page = 1, limit = 50, search = "" } = {}) => ({
        url: `/cases?page=${page}&limit=${limit}&search=${encodeURIComponent(
          search
        )}`,
        method: "GET",
      }),
      providesTags: ["Cases"],
    }),
    createCase: builder.mutation({
      query: (caseData) => ({
        url: "/cases",
        method: "POST",
        body: caseData,
      }),
      invalidatesTags: ["Cases", "DashboardStats"],
    }),
    getCaseById: builder.query({
      query: (id) => ({
        url: `/cases/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Cases", id }],
    }),
    updateCase: builder.mutation({
      query: ({ id, data }) => ({
        url: `/cases/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Cases", id },
        "Cases",
      ],
    }),
    uploadCaseDocuments: builder.mutation({
      query: ({ id, documents }) => ({
        url: `/cases/${id}/documents`,
        method: "POST",
        body: { documents },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Cases", id }],
    }),
    deleteCase: builder.mutation({
      query: (id) => ({
        url: `/cases/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cases", "DashboardStats", "ActivityLogs"],
    }),
    uploadCaseDocumentsWithFiles: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/cases/${id}/documents/upload`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Cases", id }],
    }),
    assignCaseToLawyer: builder.mutation({
      query: ({ id, lawyerId }) => ({
        url: `/cases/${id}/assign`,
        method: "POST",
        body: { lawyerId },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Cases", id },
        "Cases",
      ],
    }),

    // ==================== CASE STAGE ENDPOINTS ====================
    addCaseStage: builder.mutation({
      query: ({ id, stageData }) => ({
        url: `/cases/${id}/stages`,
        method: "POST",
        body: stageData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Cases", id }],
    }),
    uploadStageDocuments: builder.mutation({
      query: ({ id, stageId, documents }) => ({
        url: `/cases/${id}/stages/documents`,
        method: "POST",
        body: { stageId, documents },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Cases", id }],
    }),
    uploadStageDocumentsWithFiles: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/cases/${id}/stages/documents/upload`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Cases", id }],
    }),
    updateHearingDetails: builder.mutation({
      query: ({ id, hearingData }) => ({
        url: `/cases/${id}/hearing`,
        method: "PUT",
        body: hearingData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Cases", id }],
    }),

    // ==================== COURT SUBMISSION ENDPOINTS ====================
    submitToCourt: builder.mutation({
      query: ({ id, submissionData }) => ({
        url: `/cases/${id}/submit`,
        method: "POST",
        body: submissionData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Cases", id },
        "ActivityLogs",
      ],
    }),
    uploadCourtSubmissionProof: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/cases/${id}/submit/upload`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Cases", id }],
    }),

    // ==================== ARCHIVE ENDPOINTS ====================
    archiveCase: builder.mutation({
      query: (id) => ({
        url: `/cases/${id}/archive`,
        method: "POST",
      }),
      invalidatesTags: ["Cases", "Archive", "DashboardStats"],
    }),
    getArchivedCases: builder.query({
      query: () => ({
        url: "/archive",
        method: "GET",
      }),
      providesTags: ["Archive"],
    }),

    // ==================== NOTES & ACTIVITY ENDPOINTS ====================
    addCaseNote: builder.mutation({
      query: ({ id, note }) => ({
        url: `/cases/${id}/notes`,
        method: "POST",
        body: { note },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Cases", id },
        "ActivityLogs",
      ],
    }),
    getActivityLogs: builder.query({
      query: () => ({
        url: "/activity-logs",
        method: "GET",
      }),
      providesTags: ["ActivityLogs"],
    }),
    getReminders: builder.query({
      query: () => ({
        url: "/reminders",
        method: "GET",
      }),
    }),

    // ==================== DASHBOARD & LAWYERS ====================
    getDashboardStats: builder.query({
      query: () => ({
        url: "/dashboard/stats",
        method: "GET",
      }),
      providesTags: ["DashboardStats"],
    }),
    getLawyers: builder.query({
      query: () => ({
        url: "/lawyers",
        method: "GET",
      }),
    }),
  }),
});

export const {
  // Client hooks
  useCreateClientMutation,
  useGetAllClientsQuery,
  useGetClientByIdQuery,
  useUpdateClientMutation,
  useDeleteClientMutation,

  // Case hooks
  useGetAllCasesQuery,
  useCreateCaseMutation,
  useGetCaseByIdQuery,
  useUpdateCaseMutation,
  useDeleteCaseMutation,
  useUploadCaseDocumentsMutation,
  useUploadCaseDocumentsWithFilesMutation,
  useAssignCaseToLawyerMutation,

  // Case stage hooks
  useAddCaseStageMutation,
  useUploadStageDocumentsMutation,
  useUploadStageDocumentsWithFilesMutation,
  useUpdateHearingDetailsMutation,

  // Court submission hooks
  useSubmitToCourtMutation,
  useUploadCourtSubmissionProofMutation,

  // Archive hooks
  useArchiveCaseMutation,
  useGetArchivedCasesQuery,

  // Notes & activity hooks
  useAddCaseNoteMutation,
  useGetActivityLogsQuery,
  useGetRemindersQuery,

  // Dashboard & lawyers hooks
  useGetDashboardStatsQuery,
  useGetLawyersQuery,
} = secretaryApi;
