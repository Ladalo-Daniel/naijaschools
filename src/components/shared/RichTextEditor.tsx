'use client'

import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useTheme } from 'next-themes';

export default function RichTextEditor({
    onChange,
    value,
}: {
    onChange: (str: string) => void,
    value: string
}) {
    const theme = useTheme()
  return (
    <Editor
      apiKey='d48wkrjhlneuqkai92rsunn6o7mevwmenu7m7gf6xvcize5g'
      value={value}
      onInit={(evt, editor) => {
        onChange(editor.getContent({format: 'text'}));
      }}
      onEditorChange={(newValue, editor) => {
        onChange(newValue);
        onChange(editor.getContent({format: 'text'}));
      }}
      init={{
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
        ],
        // ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
        // theme: theme.theme,
      }}
    //   initialValue="@Naijaschools!"
    />
  );
}