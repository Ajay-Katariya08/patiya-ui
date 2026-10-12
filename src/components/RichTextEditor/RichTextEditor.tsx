import { forwardRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { cn } from '../../utils/cn';

export const RichTextEditor = forwardRef<HTMLDivElement, {
  content?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  className?: string;
}>(({ content = '', onChange, placeholder = 'Write something...', className }, ref) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm dark:prose-invert focus:outline-none min-h-[200px] p-4 text-[var(--patiya-color-foreground)] [&_p.is-editor-empty:first-child::before]:text-(--patiya-color-muted-foreground) [&_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_p.is-editor-empty:first-child::before]:float-left [&_p.is-editor-empty:first-child::before]:pointer-events-none [&_p.is-editor-empty:first-child::before]:h-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:font-bold [&_em]:italic [&_s]:line-through',
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div ref={ref} className={cn("border border-[var(--patiya-color-border)] rounded-md overflow-hidden bg-[var(--patiya-color-background)] focus-within:ring-2 focus-within:ring-[var(--patiya-color-ring)] focus-within:border-[var(--patiya-color-ring)] transition-shadow", className)}>
      <div className="flex flex-wrap items-center gap-1 border-b border-[var(--patiya-color-border)] p-2 bg-[var(--patiya-color-muted)]/30">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn("p-2 rounded hover:bg-[var(--patiya-color-muted)] transition-colors", editor.isActive('bold') ? "bg-[var(--patiya-color-muted)] font-bold text-[var(--patiya-color-foreground)]" : "text-(--patiya-color-muted-foreground)")}
          type="button"
          title="Bold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 12a4 4 0 0 0 0-8H6v8"/><path d="M15 20a4 4 0 0 0 0-8H6v8h9Z"/></svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn("p-2 rounded hover:bg-[var(--patiya-color-muted)] transition-colors", editor.isActive('italic') ? "bg-[var(--patiya-color-muted)] italic text-[var(--patiya-color-foreground)]" : "text-(--patiya-color-muted-foreground)")}
          type="button"
          title="Italic"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" x2="10" y1="4" y2="4"/><line x1="14" x2="5" y1="20" y2="20"/><line x1="15" x2="9" y1="4" y2="20"/></svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={cn("p-2 rounded hover:bg-[var(--patiya-color-muted)] transition-colors line-through", editor.isActive('strike') ? "bg-[var(--patiya-color-muted)] text-[var(--patiya-color-foreground)]" : "text-(--patiya-color-muted-foreground)")}
          type="button"
          title="Strike"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4H9a3 3 0 0 0-2.83 4"/><path d="M14 12a4 4 0 0 1 0 8H6"/><line x1="4" x2="20" y1="12" y2="12"/></svg>
        </button>
        <div className="w-px h-4 bg-[var(--patiya-color-border)] mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn("p-2 rounded hover:bg-[var(--patiya-color-muted)] transition-colors", editor.isActive('bulletList') ? "bg-[var(--patiya-color-muted)] text-[var(--patiya-color-foreground)]" : "text-(--patiya-color-muted-foreground)")}
          type="button"
          title="Bullet List"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn("p-2 rounded hover:bg-[var(--patiya-color-muted)] transition-colors", editor.isActive('orderedList') ? "bg-[var(--patiya-color-muted)] text-[var(--patiya-color-foreground)]" : "text-(--patiya-color-muted-foreground)")}
          type="button"
          title="Ordered List"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="10" x2="21" y1="6" y2="6"/><line x1="10" x2="21" y1="12" y2="12"/><line x1="10" x2="21" y1="18" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>
        </button>
      </div>
      <EditorContent editor={editor} className="cursor-text" />
    </div>
  );
});
RichTextEditor.displayName = 'RichTextEditor';
