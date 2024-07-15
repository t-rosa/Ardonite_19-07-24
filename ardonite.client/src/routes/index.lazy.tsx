import { Link, createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
	component: Page,
});

function Page() {
	return (
		<main className="h-dvh grid place-items-center">
			<Link to="/game" className="px-6 py-3 border">
				COMMENCER
			</Link>
		</main>
	);
}
