import { Flower, Star } from "lucide-react";
import React, { PropsWithChildren } from "react";

import { months } from "../../state";

// Card component
export const Card = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
	return <div className={`rounded-xl shadow-md ${className}`}>{children}</div>;
};

// CardContent component
export const CardContent = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
	return <div className={`p-4 ${className}`}>{children}</div>;
};

const PlantCard = (props: any) => {

	return (
		<div className="bg-transparent text-white p-4 rounded-xl w-64 font-sans">
			<Card className="bg-[#1E1E1E] rounded-xl overflow-hidden shadow-lg">
				<div className="relative">
					<img
						src="https://picsum.photos/id/1/233/184" // Replace with actual image path
						alt="Lily of the Valley"
						// className="w-full h-48 object-cover rounded-t-xl"
					/>
					{
						props?.sb !== '-' && <div title="Bloeitijd" className="absolute top-2 left-2 bg-green-800 text-white text-sm font-bold px-2 py-1 rounded-full flex items-center gap-1">
						<Flower className="w-4 h-4" />
						{months[props.sb]}/{months[props.eb]}
					</div>
					}
					<div className="absolute top-2 right-2">
						<Star className="text-white fill-white w-5 h-5" />
					</div>
				</div>
				<CardContent className="p-4">
					<h3 className="text-md font-semibold">{props.nl}</h3>
					<p className="text-sm text-gray-400">{props.latin}</p>
					<p className="text-sm text-white font-bold mt-2">{props.type}</p>
				</CardContent>
			</Card>
		</div>
	);
};

export default PlantCard;
