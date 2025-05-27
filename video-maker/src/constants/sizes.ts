import { CSSProperties } from "react";

const LINE = "5.71875%"; // 5.93125%
const DOT = "0.5%"; // 0.3

export const LINE_WIDTH: CSSProperties = { width: "100%" }; // "w-full";
export const LINE_BLOCK_HEIGHT: CSSProperties = { height: LINE }; //  `h-[${LINE}%]`;
export const LINE_BORDER_HEIGHT: CSSProperties = { height: DOT }; // `h-[${DOT}%]`;

export const BLOCK_WIDTH: CSSProperties = { width: LINE }; //  `w-[${LINE}%]`;
export const BLOCK_HEIGHT: CSSProperties = { height: "100%" }; // "h-full";

export const VERTICAL_BORDER_WIDTH: CSSProperties = { width: DOT }; // `w-[${DOT}%]`;
export const VERTICAL_BORDER_HEIGHT: CSSProperties = { height: "100%" }; // "h-full";

export const HORIZONTAL_BORDER_WIDTH: CSSProperties = { width: LINE }; // `w-[${LINE}%]`;
export const HORIZONTAL_BORDER_HEIGHT: CSSProperties = { height: "100%" }; // "h-full";
