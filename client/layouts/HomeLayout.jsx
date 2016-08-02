import React from "react";
import Footer from "../components/Footer.jsx";
import Alert from "../components/Alert.jsx";

export const HomeLayout = ({name, category, content, navbar, introVideo}) => (
	<div>
		<div className={name + " " + category}>
			<header>
				{navbar}
				<Alert type="success" message="Website has been fully updated for the 2016-17 year." />
				{introVideo}
			</header>
			<main className="container content">
				{content}
			</main>

			<Footer />
		</div>
	</div>
);
