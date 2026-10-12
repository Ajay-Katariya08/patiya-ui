import { Box } from 'patiya';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import { TableOfContents } from '../../components/TableOfContents';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box className="min-h-screen flex flex-col bg-[var(--patiya-color-background)]">
      <Navbar />
      <Box className="flex flex-1 w-full border-t border-[var(--patiya-color-border)]">
        <Sidebar />
        <Box className="flex-1 flex min-w-0">
          <Box className="flex-1 py-8 px-4 md:px-8 min-w-0">
            <Box className="max-w-3xl mx-auto w-full">
              {children}
            </Box>
          </Box>
          <Box className="hidden xl:block w-64 shrink-0 border-l border-[var(--patiya-color-border)]">
            <Box className="h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto custom-scrollbar -ml-[2px] pl-[2px]">
              <TableOfContents />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
