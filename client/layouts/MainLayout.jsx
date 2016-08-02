import React from "react";
import Footer from "../components/Footer.jsx";

export const MainLayout = ({name, category, content, navbar}) => (
	<div>
		<div className={name + " " + category}>
			<header>
				{navbar}
			</header>

			<main className="container content">
				{content}
			</main>
		</div>
		<Footer />
	</div>
);
