

"use client"; // this registers <Editor> as a Client Component
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
 
export default function EditorBlockNote() {
  const editor = useCreateBlockNote();
  const onChange = async () => {
    const block = editor.document

    console.log("daa",block)

};

  console.log("Vabda",editor);
 
  return <BlockNoteView editor={editor} onChange={onChange}/>;
}
