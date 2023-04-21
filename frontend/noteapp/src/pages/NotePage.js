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
        const response = await fetch(`/api/v1/notes/${noteId}/`);
        const data = await response.json();
        setNote(data);
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
    const handleSubmit = () => {
        updateNote()
        navigate("/");
    }

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <ArrowLeft onClick={handleSubmit}/>
                </h3>
            </div>
            <textarea
                onChange={
                    (e) => {
                        setNote({...note, 'body': e.target.value})
                    }
                }
                defaultValue={note?.body}
            >
            </textarea>
        </div>
    )
};

export default NotePage;