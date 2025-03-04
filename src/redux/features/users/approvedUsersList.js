import { apiSlice } from "../../api/apiSlice";


// const getApprovedUsers = apiSlice.injectEndpoints({
//     endpoints: (builder) => ({
//         getApprovedUsers: builder.query({
//             query: ({  text}) => ({
//                 url: `/admin-userList/showAllVerifyUser?name=${text}`,
//                 method: "GET"
//             })
//         })
//     })
// })


// export const {useGetApprovedUsersQuery} = getApprovedUsers;

const getApprovedUsers = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getApprovedUsers: builder.query({
            query: ({ name = "", date }) => ({
                url: `/admin-userList/showAllVerifyUser?name=${name}&date=${date}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetApprovedUsersQuery } = getApprovedUsers;
