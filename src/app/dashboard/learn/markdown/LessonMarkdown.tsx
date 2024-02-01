'use client'

import React from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/github-dark.css";
import { cn } from "@/lib/utils";
import { TerminalIcon, icons } from "lucide-react";
import { Fira_Code } from "next/font/google";
import CopyButton from "@/components/shared/CopyButton";

const fira = Fira_Code({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
  })

export default function LessonMarkdown({
	content,
	className = "",
}: {
	content: string;
	className?: string;
}) {
	return (
		<Markdown
			className={cn("space-y-8", className)}
			rehypePlugins={[rehypeHighlight]}
			components={{
				h1: ({ node, ...props }) => {
					return <h1 {...props} className="text-3xl font-semibold transition-all" id={props.children as string}/>;
				},
				h2: ({ node, ...props }) => {
					return (
						<h2
							{...props}
							className="text-2xl font-semibold py-2.5 transition-all"
						/>
					);
				},
				h3: ({ node, ...props }) => {
					return (
						<h3
							{...props}
							className="text-xl py-2.5 transition-all"
						/>
					);
				},
				ul: ({ node, ...props }) => {
					return (
						<ul
							{...props}
							className="text-xl py-2.5 px-2 list-disc transition-all no-underline"
						/>
					);
				},
				ol: ({ node, ...props }) => {
					return (
						<ol
							{...props}
							className="text-xl py-2.5 px-2 list-decimal transition-all"
						/>
					);
				},
				li: ({ node, ...props }) => {
					return (
						<li
							{...props}
							className="text-xl py-2.5 transition-all"
						/>
					);
				},
				a: ({ node, ...props }) => {
					return (
						<a
							{...props}
							className="my-2 text-primary hover:underline transition-all"
						/>
					);
				},
				b: ({ node, ...props }) => {
					return (
						<b
							{...props}
							className="my-2 text-primary transition-all font-bold"
						/>
					);
				},
				blockquote: ({ node, ...props }) => {
					return (
						<blockquote
							{...props}
							className="my-2 transition-all p-4 py-8 bg-secondary border-l-4 border-l-primary rounded-sm"
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
							<div className={cn(" bg-graident-dark border-[0.5px] rounded-2xl border-zinc-900 break-words overflow-auto", fira.className)}>
								<div className="flex items-center justify-between px-5 py-2 border-b-[0.5px] border-zinc-600">
									<div className="flex items-center gap-2">
										<Icon />
										<p className="text-sm text-gray-400">
											{/* @ts-ignore  */}
											{node?.data?.meta}
										</p>
									</div>
									<CopyButton id={id} />
								</div>
								<div className="overflow-x-auto overflow-auto break-words">
									<div className="p-4" id={id}>
										{children}
									</div>
								</div>
							</div>
						);
					} else {
						return (
							// TODO: convert to code block
							<code
								className={cn("text-md bg-secondary px-1 break-words w-auto overflow-auto rounded-md p-1", fira.className)}
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