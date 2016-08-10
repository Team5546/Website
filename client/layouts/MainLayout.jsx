import React from "react";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";

export const MainLayout = ({name, category, content}) => (
	<div>
		<div className={name + " layout " + category}>
			<header>
				<Navbar />
			</header>

			<main className="container content">
				{content}
			</main>
		</div>
		<Footer />
	</div>
);
