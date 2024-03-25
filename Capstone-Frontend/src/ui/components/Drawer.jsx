// Drawer.js
import { Button } from "@/components/ui/button";
import * as React from "react";
import { default as UIDrawer } from "react-modern-drawer";

/**
 * Drawer Component
 * 
 * This component provides a customizable drawer that slides from the bottom of the screen.
 * It is built on top of `react-modern-drawer` and extends its functionality with additional
 * features like automatic scroll lock and customizable sections (title, content, and footer).
 * 
 * Props:
 *  - title: ReactNode | string - Content to be displayed in the header section of the drawer.
 *  - content: ReactNode - The main content to be displayed in the drawer. It can be any React node.
 *  - trigger: ReactNode - The element that, when clicked, will open the drawer.
 *  - footer: ReactNode - Content to be displayed in the footer section of the drawer. This section
 *    typically contains actions related to the drawer's content, like form submission or navigation buttons.
 *  - fullScreen: boolean - If true, the drawer will cover the entire viewport height. Defaults to false.
 * 
 * Behavior:
 *  - Opening the drawer will disable scrolling on the body element to prevent background scroll.
 *  - Closing the drawer or unmounting the component will re-enable body scrolling.
 * 
 * Usage:
 *  - The `Drawer` component is used by wrapping it around the trigger element and passing the
 *    desired `title`, `content`, and `footer` as props. The `fullScreen` prop can be used to
 *    control the drawer's height.
 *  - The drawer can be triggered by the element provided as `trigger` prop, which, when clicked,
 *    opens the drawer.
 * 
 * Example:
 *  ```jsx
 *  <Drawer
 *    title="My Drawer Title"
 *    content={<div>My Content</div>}
 *    trigger={<button>Open Drawer</button>}
 *    footer={<div>My Footer</div>}
 *    fullScreen={false}
 *  />
 *  ```
 */
export function Drawer({ title, content, trigger, footer, fullScreen = false }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const onOpenDrawer = () => {
    document.body.style.overflow = 'hidden'; // Disable scroll when drawer opens
    setIsOpen(true);
  };

  const onCloseDrawer = () => {
    document.body.style.overflow = ''; // Re-enable scroll when drawer closes
    setIsOpen(false);
  };

  React.useEffect(() => {
    // Cleanup function to ensure the scroll is enabled when the component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const drawerStyle = fullScreen ? { height: '100vh' } : {};
  const contentClass = `flex-grow overflow-auto w-full ${fullScreen ? '' : 'max-h-[calc(100vh-10rem)]'}`;

  return (
    <>
      <button onClick={onOpenDrawer}>{trigger}</button>
      <UIDrawer
        open={isOpen}
        onClose={onCloseDrawer}
        direction="bottom"
        className="flex flex-col"
        style={drawerStyle}
      >
        <header>{title}</header>
        <div className={contentClass}>
          {content}
        </div>
        <footer className="w-full flex flex-col gap-3 my-3">
          {footer}
          <Button className="w-full bg-[#23272A] hover:bg-[#292841]" onClick={onCloseDrawer}>Close</Button>
        </footer>
      </UIDrawer>
    </>
  );
}
