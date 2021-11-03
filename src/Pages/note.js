import React from 'react';

//匯入GraphQL相依性
import { useQuery, gql } from '@apollo/client';

//匯入Note元件
import Note from '../components/Note';

//註記查詢，接受ID變數
const GET_NOTE = gql`
query note($id:ID!){
    note(id:$id){
       id
       createdAt
       content
       favoriteCount
       author{
         username
         id
         avatar
       }
     }
   }`;

const NotePage = props => {
    //將在url中找到的id儲存為變數
    const id = props.match.params.id;

    //查詢勾點，以變數形式傳遞id
    const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

    //若正在載入資料，則顯示正在載入訊息
    if (loading) return <p>Loading...</p>
    //若擷取資料時發生錯誤，則顯示錯誤訊息
    if (error) return <p>Error! Note not found</p>
    //若資料成功，則在UI中顯示資料
    return <Note note={data.note} />
};

export default NotePage;