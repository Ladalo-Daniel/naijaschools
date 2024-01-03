import React from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

import CopyButton from "./CopyButton";
import "highlight.js/styles/atom-one-dark.min.css";
import { cn } from "@/lib/utils";
import { TerminalIcon } from "lucide-react";
import { icons } from "../ui/icons";

export default function MarkdownPreview({
	content,
	className = "sm:p-10",
}: {
	content: string;
	className?: string;
}) {
	return (
		<Markdown
			className={cn("dark:text-gray-200 space-y-8", className)}
			rehypePlugins={[rehypeHighlight]}
			components={{
				h1: ({ node, ...props }) => {
					return <h1 {...props} className="text-2xl font-bold text-primary hover:underline transition-all" />;
				},
				h2: ({ node, ...props }) => {
					return (
						<h1
							{...props}
							className="text-2xl font-bold mt-10 mb-10 text-primary hover:underline transition-all"
						/>
					);
				},
				h3: ({ node, ...props }) => {
					return (
						<h1
							{...props}
							className="text-xl font-bold mt-10 mb-10 text-primary hover:underline transition-all"
						/>
					);
				},
				a: ({ node, ...props }) => {
					return (
						<a
							{...props}
							className="my-4 text-primary hover:underline transition-all"
						/>
					);
				},
				b: ({ node, ...props }) => {
					return (
						<b
							{...props}
							className="my-4 text-fuchsia-700 hover:underline transition-all font-bold"
						/>
					);
				},
				blockquote: ({ node, ...props }) => {
					return (
						<blockquote
							{...props}
							className="my-4 hover:underline transition-all font-bold p-4 border rounded-md"
						/>
					);
				},
				i: ({ node, ...props }) => {
					return (
						<i
							{...props}
							className="italic text-muted-foreground"
						/>
					);
				},
                
				code: ({ node, className, children, ...props }) => {
					const match = /language-(\w+)/.exec(className || "");
					const id = (Math.floor(Math.random() * 100) + 1).toString();
					if (match?.length) {
						let Icon = TerminalIcon;
						const isMatch = icons.hasOwnProperty(match[1]);
						if (isMatch) {
							Icon = icons[match[1] as keyof typeof icons];
						}

						return (
							<div className=" bg-graident-dark text-gray-700 border-[0.5px] rounded-md border-zinc-900">
								<div className="flex items-center justify-between px-5 py-2 border-b-[0.5px] border-zinc-600 bg-background">
									<div className="flex items-center gap-2">
										<Icon />
										<p className="text-sm text-gray-400">
											{/* @ts-ignore  */}
											{node?.data?.meta}
										</p>
									</div>
									<CopyButton id={id} />
								</div>
								<div className="overflow-x-auto">
									<div className="p-5" id={id}>
										{children}
									</div>
								</div>
							</div>
						);
					} else {
						return (
							// TODO: convert to code block
							<code
								className="text-lg break-words bg-zinc-700 px-1 w-auto overflow-auto font-serif rounded-sm"
								{...props}
							>
								{children}
							</code>
						);
					}
				},
			}}
		>
			{content}
		</Markdown>
	);
}