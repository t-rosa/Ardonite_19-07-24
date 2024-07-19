import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { css } from "styled-system/css";

export const Route = createLazyFileRoute("/")({
	component: Page,
});

function Page() {
	return (
		<main
			className={css({
				display: "grid",
				placeItems: "center",
				h: "full",
			})}
		>
			<Link to="/game">COMMENCER</Link>
			<Link to="/canvas">COMMENCER CANVAS</Link>
		</main>
	);
}
