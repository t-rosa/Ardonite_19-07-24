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
			})}
		>
			<Link to="/game">COMMENCER</Link>
		</main>
	);
}
