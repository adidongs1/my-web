import { useEffect, useRef } from "react"
import { Editor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

function TextEditor() {
    const editor = useRef(null)

    useEffect(() => {
        editor.current = new Editor({
            extensions: [
                StarterKit
            ],
            content: " ",
        })
        return editor.current.destroy();
    }, []);

    return (
        <EditorContent editor={editor.current} />
    )
}

export default TextEditor