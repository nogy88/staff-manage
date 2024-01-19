import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-full">
			<div>STAFF MANAGE</div>

			<div className="flex gap-3">
				<Link
					href={"/login"}
					className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })} 
				>
					Login
				</Link>
				<Link
					className={buttonStyles({ variant: "bordered", radius: "full" })}
					href={"/users"}
				>
					Users
				</Link>
			</div>

		
		</section>
	);
}
