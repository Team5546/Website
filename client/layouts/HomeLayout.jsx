import React from "react";
import Footer from "../components/Footer.jsx";
import Alert from "../components/Alert.jsx";
import Navbar from "../components/Navbar.jsx";
import IntroVideo from "../components/IntroVideo.jsx";

export const HomeLayout = ({name, category, content}) => (
	<div>
		<div className={name + " " + category}>
			<header>
				<Navbar />
				<IntroVideo />
			</header>
			
			<main className="container content">
				{content}
			</main>

			<Footer />
		</div>
	</div>
);
