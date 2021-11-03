import React from "react";
import Button from "../components/Button";
import { useQuery, gql } from "@apollo/client";
import NoteFeed from "../components/NoteFeed";

const GET_NOTES = gql`
query noteFeed($cursor:String){
    noteFeed(cursor:$cursor){
     cursor
     hasNextPage
     notes{
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
   }
   }`;

const Home = () => {
    //查詢勾點
    const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

    //若正在載入資料，則顯示正在載入訊息
    if (loading) return <p>Loading</p>;
    //若擷取資料時發生錯誤，則顯示錯誤訊息
    if (error) return <p>Error!</p>
    console.log(data);
    //若資料成功，則在UI中顯示資料
    return (
        //新增<React.Fragment>元素以提供父元素
        <React.Fragment>
            <NoteFeed notes={data.noteFeed.notes} />
            {/*僅在hasNextPage為true的情況下顯示Load More按鈕 */}
            {data.noteFeed.hasNextPage && (<Button onClick={() => fetchMore({
                variables: {
                    cursor: data.noteFeed.cursor
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                    return {
                        noteFeed: {
                            cursor: fetchMoreResult.noteFeed.cursor,
                            hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                            //將新舊結果合併
                            notes: [
                                ...previousResult.noteFeed.notes,
                                ...fetchMoreResult.noteFeed.notes
                            ],
                            __typename: 'noteFeed'
                        }
                    };
                }
            })}>Load more</Button>)}
        </React.Fragment>
    )



};

export default Home;

