import { Sidebar } from "@/components/Sidebar";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

const Index = () => {
  return (
    <div className="px-2 h-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full w-full rounded-lg"
      >
        <ResizablePanel defaultSize={23} className="h-full">
          <Sidebar />
        </ResizablePanel>
        <ResizablePanel defaultSize={77}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Index;
