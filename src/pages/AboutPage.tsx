export const AboutPage = () => {
	return (
		<section className="max-w-5xl mx-auto px-4 py-10 space-y-10">
			<h1 className="text-center text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
				Nuestra empresa
			</h1>

			<div className="relative w-full h-[300px] md:h-[500px] overflow-hidden rounded-2xl shadow-lg">
				<img
					src="./img/brands/sobre-nosotros.jpeg"
					alt="Imagen de fondo"
					className="w-full h-full object-cover object-center md:object-[50%_20%]"
				/>
			</div>

			<div className="space-y-6 text-gray-700 text-base leading-relaxed">
				<p className="text-justify">
					<strong className="text-black">TusCalzados</strong> es una tienda en línea dedicada a la venta de
					indumentaria, fundada en 2024. Nuestro objetivo es ofrecer a nuestros clientes la mejor calidad y
					precio. Contamos con un equipo de profesionales que selecciona cuidadosamente los productos que
					merecen estar en tu guardarropa.
				</p>

				<p className="text-justify">
					En <strong className="text-black">TusCalzados</strong> encontrarás una amplia variedad de
					indumentarias de las mejores marcas. Además, ofrecemos promociones y descuentos exclusivos para que
					puedas vestir con estilo sin pagar de más.
				</p>

				<div className="bg-gray-100 p-6 rounded-xl shadow-inner">
					<h2 className="text-2xl font-semibold text-gray-900 mb-3">
						¡No esperes más y renueva tu look con TusCalzados!
					</h2>
					<p>
						Si deseas más información, podés comunicarte con nosotros a través de nuestro correo:{' '}
						
						<a
							href="mailto:tuscalzadosok2025@gmail.com?subject=Consulta%20sobre%20un%20producto&body=Hola%20TusCalzados,%20quiero%20hacerles%20una%20consulta%20sobre..."
							className="text-blue-600 hover:underline font-medium"
						>
							tuscalzadosok2025@gmail.com
						</a>{' '}
						
						o por teléfono al{' '}
						<a href="tel:#" className="text-blue-600 hover:underline font-medium">
							+54 9 3454 148573
						</a>.
					</p>
					<p>
						También podés encontrarnos en nuestras redes sociales:{' '}
						<a
							href="https://www.instagram.com/tus_calzadosok/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-pink-600 hover:underline font-semibold"
						>
							Instagram
						</a>
					</p>
				</div>
			</div>
		</section>
	);
};
