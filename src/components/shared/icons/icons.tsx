import { useCombineClassNames } from "@/hooks/use-combine-classnames";
import { SVGProps } from "react";

const xlmns = "http://www.w3.org/2000/svg";

export function OneCirleIcon(props: SVGProps<SVGSVGElement>) {
    const { className, ...remainingProps } = props;
    const cn = useCombineClassNames(props.className);
    return (
        <svg
            className={cn}
            xmlns={xlmns}
            height="24px"
            width="24px"
            viewBox="0 -960 960 960"
            fill="#5f6368"
        >
            <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Zm-20 200h80v-400H380v80h80v320Z" />
        </svg>
    )
}
