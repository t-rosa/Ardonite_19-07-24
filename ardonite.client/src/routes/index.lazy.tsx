import { Link, createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
	component: Page,
});

function Page() {
	return <StartMenu />;
}

function StartMenu() {
	function handleClick() {
		console.log("START");
	}

	return (
		<main className="h-dvh grid place-items-center">
			<Link to="/game" className="px-6 py-3 border" onClick={handleClick}>
				COMMENCER
			</Link>
		</main>
	);
}
