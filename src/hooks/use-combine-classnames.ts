
import { cc } from "@/lib/styles-utils";
import { useMemo } from "react";

/** Combines multiple classnames array to on class name string. Leaves out the undefined ones */
export function useCombineClassNames(...classNames: (string | undefined)[]) {
	const className = useMemo(() => cc(...classNames), [classNames]);
	return className;
}
