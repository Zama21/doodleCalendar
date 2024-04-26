import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useField } from 'formik';
import classNames from 'classnames';
import cls from './FormCKEditor.module.css';
import './FormCKEditor.css';

function FormCKEditor({
    errorClassName,
    selectedContent,
    handleContentPageChange,
    ...props
}) {
    const [editorData, setEditorData] = useState('');

    useEffect(() => {
        if ((selectedContent ?? true) == true) return;
        setEditorData(selectedContent);
    }, [selectedContent]);

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data);
        handleContentPageChange(data);
    };

    return (
        <div className={cls.wrapperEditor}>
            <CKEditor
                editor={ClassicEditor}
                data={editorData}
                config={{
                    toolbar: [
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        'link',
                        'bulletedList',
                        'numberedList',
                        'blockQuote',
                        'insertTable',
                        'undo',
                        'redo',
                    ],
                }}
                onChange={handleEditorChange}
            />
        </div>
    );
}

export default FormCKEditor;
