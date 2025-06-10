interface Props {
	title: string;
	num: number;
}

const Card = ({ title, num }: Props) => {
	return (
		<div className="flex flex-col lg:flex-row place-items-center justify-center">
			<div className="mb-5 bg-blue-50 flex flex-row w-fit h-fit justify-center gap-12 p-10 border rounded-2xl md:shadow-xl">
				<div className="text-center">
					<h5 className="text-xl text-blue-600 mb-2">{title}</h5>
					<p className="text-4xl font-bold text-gray-700">{num}</p>
				</div>
			</div>
		</div>
	);
};

export default Card;
