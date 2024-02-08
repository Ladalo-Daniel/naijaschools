'use client'

import { slugify } from "@/lib/utils";
import Link from "next/link";

interface HeadingLinksProps {
  markdown: string;
}



const HeadingLinks: React.FC<HeadingLinksProps> = ({ markdown }) => {

  const scrollToHeading = (event: React.MouseEvent<HTMLAnchorElement>, heading: string) => {
      event.preventDefault();
  
      const targetHeading = document.getElementById(heading);
      if (targetHeading) {
        targetHeading.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
  
        window.scrollBy(0, -50);
      }
    };

    const regex = /^#\s(.+)$/gm;
  
    const headings: string[] = [];
  
    let match;
    while ((match = regex.exec(markdown)) !== null) {
      headings.push(match[1]);
    }
  
    const jsxElements = headings.map((heading, index) => (
      <li key={index}>
        <Link 
            href={`#${slugify(heading)}`}
            className="text-primary"
            // onClick={(e) => scrollToHeading(e, heading)}
        >{heading}</Link>
      </li>
    ));
  
    return (
    <div className="flex flex-col gap-2">
        <h2 className="text-2xl py-2">Table of Contents</h2>
        <ul className="flex flex-col gap-2 p-4 border rounded-md mb-3">{jsxElements}</ul>
    </div>
    )
  }

export default HeadingLinks