import React from 'react';
import ReactMarkdown from 'react-markdown';
import { format, parse } from 'date-fns';
import styled from 'styled-components';
// Keep notes from extending wider than 800px
const StyledNote = styled.article`
  max-width: 800px;
  margin: 0 auto;
`;

// Style the note meta data
const MetaData = styled.div`
  @media (min-width: 500px) {
    display: flex;
    align-items: top;
  }
`;

// add some space between the avatar and meta info
const MetaInfo = styled.div`
  padding-right: 1em;
`;

// align 'Favorites' to the right on large screens
const UserActions = styled.div`
  margin-left: auto;
`;
const Note = ({ note }) => {
    const date = parse(note.createdAt, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", new Date());
    return (
        <StyledNote>
            <MetaData>
                <MetaInfo>
                    <img src={note.author.avatar}
                        alt={`${note.author.username} avatar`} height="50px" />
                </MetaInfo>
                <MetaInfo>
                    <em>by</em>{note.author.username}<br />
                    {format(date, "yyyy-MM-dd")}
                </MetaInfo>
                <UserActions>
                    <em>Favorites:</em>{note.favoriteCount}
                </UserActions>
            </MetaData>
            <ReactMarkdown source={note.content} />
        </StyledNote>
    );
};

export default Note;
