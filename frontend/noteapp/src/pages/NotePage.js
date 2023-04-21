import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import {ReactComponent as ArrowLeft} from "../assets/arrow-left.svg";

const NotePage = () => {

    const {noteId} = useParams();
    const [note, setNote] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getNote()
    }, [noteId])

    const getNote = async () => {
        if (noteId === "new") return
        const response = await fetch(`/api/v1/notes/${noteId}/`);
        const data = await response.json();
        setNote(data);
    }
    const createNote = async () => {
        fetch("/api/v1/notes/create/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        });
    }
    const updateNote = async () => {
        fetch(`/api/v1/notes/${noteId}/update/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        });
    }
    const deleteNote = async () => {
        fetch(`/api/v1/notes/${noteId}/delete/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        navigate("/")
    }
    const handleSubmit = () => {
        // TODO
        if (noteId !== "new" && note.body === "") {
            deleteNote()
        } else if (noteId !== "new") {
            updateNote()
        } else if (noteId === "new" && note.body !== null) {
            createNote()
        }
        navigate("/");
    }
    const handleChange = (value) => {
        setNote(note => ({...note, 'body': value}))
    }


    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <ArrowLeft onClick={handleSubmit}/>
                </h3>
                {noteId !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ) : (
                    <button onClick={handleSubmit}>Done</button>
                )}
            </div>
            <textarea
                onChange={(e) => {
                    handleChange(e.target.value)
                }}
                value={note?.body}
            >
            </textarea>
        </div>
    )
};

export default NotePage;