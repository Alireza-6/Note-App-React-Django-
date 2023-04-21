import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import {ReactComponent as ArrowLeft} from "../assets/arrow-left.svg";

const NotePage = () => {
    const {noteId} = useParams();
    const [note, setNote] = useState(null);
    useEffect(() => {
        getNote()
    }, [noteId])
    const getNote = async () => {
        const response = await fetch(`/api/v1/notes/${noteId}/`);
        const data = await response.json();
        setNote(data);
    }

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <Link to="/">
                        <ArrowLeft/>
                    </Link>
                </h3>
            </div>
            <textarea defaultValue={note?.body}></textarea>
        </div>
    )
};

export default NotePage;