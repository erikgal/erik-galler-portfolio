import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';
import axios from 'axios';
import AppBarComponent from './AppBar';
import profile_picture from './assets/profile_picture.jpg';
import IntroText from './IntroText';

interface Comment {
    id?: string;
    name: string;
    description: string;
}
const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #1d1d1d;
    flex-direction: column;
    justify-content: flex-start;
    flex: 1;
    overflow: auto;
`;

const Intro = styled.div`
    display: flex;
    height: 70vh;
`;

const ProfileContainer = styled.div`
    display: flex;
    width: 40%;
    margin: 20px;
    justify-content: center;
    align_items: center
    paddingleft: 100;
`;

function App() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>('');

    useEffect(() => {
        axios //http://localhost:8000/api/view/
            .get('https://erik-galler-portfolio.herokuapp.com/api/view/') // sending data to backend
            .then((response) => {
                setComments(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const addComment = () => {
        if (newComment) {
            axios //http://localhost:8000/api/create/
                .post('https://erik-galler-portfolio.herokuapp.com/api/create/', {
                    name: newComment, //sending data to backend
                    description: 'This is comment number ' + comments.length,
                }) // sending data to backend
                .then((response) => {
                    console.log(response.data); // view the response
                })
                .catch((error) => {
                    console.log(error); // check if any error
                });
        }
    };
    return (
        <Container className="Container">
            <AppBarComponent />
            <Intro>
                <ProfileContainer>
                    <img src={profile_picture}></img>
                </ProfileContainer>
                <IntroText />
            </Intro>
            {/* <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn to React
                </a>
                <input
                    type="text"
                    value={newComment}
                    onChange={(event) => setNewComment(event.target.value)}
                />
                <button onClick={addComment}>Submit</button>
                {comments.map((comment) => {
                    return <a key={comment.id}>{comment.name + ': ' + comment.description}</a>;
                })}
            </header> */}
        </Container>
    );
}

export default App;
