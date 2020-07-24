import React from "react";
import { useParams } from "react-router-dom";

export default function EditPostPage() {
    const { id } = useParams();

    return <div>EditPostPage {id}</div>;
}
