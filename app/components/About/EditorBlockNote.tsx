

"use client";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useState } from "react";
import ReactMarkdown from "react-markdown"

export default function EditorBlockNote({ geteditorRef, articleData }: any) {
  const [markdown, setMarkdown] = useState<string>("");
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: 'Hello',
      },
    ],
  });


  const onChange = async () => {
    // const block = editor.document
    const markdown = await editor.blocksToHTMLLossy(editor.document);
    setMarkdown(markdown);
    geteditorRef(markdown)
  };

  console.log(markdown);
  return (

    <>
      <BlockNoteView editor={editor} contentEditable={"plaintext-only"} />

      <div
        className="markdown"
        dangerouslySetInnerHTML={{ __html: markdown }}
      />    </>
  )
}
